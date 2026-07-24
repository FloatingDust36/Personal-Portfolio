import { NextRequest, NextResponse } from "next/server";
import { buildKnowledgeContext } from "@/lib/dusk/knowledge";
import { duskSystemPrompt } from "@/lib/dusk/prompt";
import { rateLimit } from "@/lib/dusk/rateLimit";
import { profile } from "@/content/profile";

export const runtime = "nodejs";

const MAX_MESSAGE = 600;
const MAX_HISTORY = 12;
const TIMEOUT_MS = 15_000;

type ChatMsg = { role: "user" | "assistant"; content: string };

const UNAVAILABLE = `Dusk is resting just now — every model is busy or unreachable. You can reach John Peter directly at ${profile.email}.`;

export async function POST(req: NextRequest) {
  const ip = (req.headers.get("x-forwarded-for")?.split(",")[0] ?? "local").trim();
  const rl = rateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      {
        reply: `A moment, please — that's a lot of questions at once. Try again shortly, or email ${profile.email}.`,
        unavailable: true,
      },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter ?? 30) } },
    );
  }

  const messages = parseMessages(await safeJson(req));
  if (!messages || messages.length === 0 || messages.at(-1)!.role !== "user") {
    return NextResponse.json(
      { reply: "Ask me something about John Peter's work.", unavailable: false },
      { status: 200 },
    );
  }

  const system = duskSystemPrompt(buildKnowledgeContext());

  try {
    const reply = await generate(system, messages);
    return NextResponse.json(
      reply
        ? { reply, unavailable: false }
        : { reply: UNAVAILABLE, unavailable: true },
    );
  } catch {
    return NextResponse.json({ reply: UNAVAILABLE, unavailable: true });
  }
}

async function safeJson(req: NextRequest): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    return null;
  }
}

function parseMessages(body: unknown): ChatMsg[] | null {
  if (typeof body !== "object" || body === null) return null;
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw)) return null;
  return raw
    .filter(
      (m): m is ChatMsg =>
        typeof m === "object" &&
        m !== null &&
        (m as ChatMsg).role !== undefined &&
        ((m as ChatMsg).role === "user" || (m as ChatMsg).role === "assistant") &&
        typeof (m as ChatMsg).content === "string",
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE) }));
}

async function generate(system: string, messages: ChatMsg[]): Promise<string | null> {
  const orKey = process.env.OPENROUTER_API_KEY;
  const gemKey = process.env.GEMINI_API_KEY;
  // Free model slugs on OpenRouter churn often — override with the
  // OPENROUTER_MODELS env var (comma-separated) without a redeploy if these die.
  const orModels = (
    process.env.OPENROUTER_MODELS ??
    "google/gemma-4-26b-a4b-it:free,google/gemma-4-31b-it:free,openai/gpt-oss-20b:free"
  )
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (orKey) {
    for (const model of orModels) {
      const r = await callOpenRouter(orKey, model, system, messages).catch(() => null);
      if (r) return r;
    }
  }
  if (gemKey) {
    const r = await callGemini(gemKey, system, messages).catch(() => null);
    if (r) return r;
  }
  return null;
}

async function callOpenRouter(
  key: string,
  model: string,
  system: string,
  messages: ChatMsg[],
): Promise<string | null> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: system }, ...messages],
        max_tokens: 400,
        temperature: 0.5,
      }),
      signal: ctrl.signal,
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = data.choices?.[0]?.message?.content;
    return typeof text === "string" && text.trim() ? text.trim() : null;
  } finally {
    clearTimeout(timer);
  }
}

async function callGemini(
  key: string,
  system: string,
  messages: ChatMsg[],
): Promise<string | null> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents,
          generationConfig: { maxOutputTokens: 400, temperature: 0.5 },
        }),
        signal: ctrl.signal,
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const text = data.candidates?.[0]?.content?.parts
      ?.map((p) => p.text ?? "")
      .join("");
    return typeof text === "string" && text.trim() ? text.trim() : null;
  } finally {
    clearTimeout(timer);
  }
}
