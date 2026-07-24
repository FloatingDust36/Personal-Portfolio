"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING =
  "I'm Dusk. Ask me about John Peter's work — his projects, his stack, or what he's looking for.";

const SUGGESTIONS = [
  "What has he built with RAG?",
  "Explain the BuckedUp AI agent.",
  "Is he open to work?",
];

export default function DuskPanel() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/dusk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await res.json()) as { reply?: string };
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply ?? `Dusk is unavailable. Email ${profile.email}.` },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: `Dusk is unavailable right now. You can email John Peter at ${profile.email}.` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[26rem] flex-col rounded-sm border border-line bg-surface/40">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-line px-5 py-3">
        <span className="h-1.5 w-1.5 rounded-full bg-seal" aria-hidden="true" />
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-fg-muted">
          Dusk
        </span>
        <span className="ml-auto font-mono text-[0.6rem] uppercase tracking-[0.16em] text-fg-subtle">
          Speaks about John Peter
        </span>
      </div>

      {/* Transcript */}
      <div
        ref={listRef}
        className="flex-1 space-y-4 overflow-y-auto px-5 py-5"
        aria-live="polite"
      >
        {messages.length === 0 ? (
          <div>
            <p className="max-w-sm leading-relaxed text-fg-muted">{GREETING}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-line px-3 py-1.5 text-left font-mono text-[0.62rem] uppercase tracking-[0.1em] text-fg-subtle transition-colors hover:text-fg"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          messages.map((m, i) =>
            m.role === "user" ? (
              <p
                key={i}
                className="ml-auto max-w-[85%] rounded-sm bg-surface px-3.5 py-2 text-right text-sm leading-relaxed text-fg"
              >
                {m.content}
              </p>
            ) : (
              <div key={i} className="max-w-[92%]">
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-fg-subtle">
                  Dusk
                </span>
                <p className="mt-1 leading-relaxed text-fg-muted">{m.content}</p>
              </div>
            ),
          )
        )}
        {loading && (
          <div className="max-w-[92%]">
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-fg-subtle">
              Dusk
            </span>
            <p className="mt-1 text-fg-subtle">
              <span className="inline-flex gap-1">
                <Dot /> <Dot delay="150ms" /> <Dot delay="300ms" />
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-line px-3 py-3"
      >
        <label htmlFor="dusk-input" className="sr-only">
          Ask Dusk about John Peter
        </label>
        <input
          id="dusk-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={600}
          placeholder="Ask about his work…"
          autoComplete="off"
          className="flex-1 bg-transparent px-2 py-1.5 text-sm text-fg placeholder:text-fg-subtle focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-full px-4 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-fg-muted transition-colors hover:text-fg disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </div>
  );
}

function Dot({ delay = "0ms" }: { delay?: string }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-fg-subtle"
      style={{ animationDelay: delay }}
    />
  );
}
