"use client";

import { useEffect, useRef } from "react";

/**
 * A living ink-wash landscape rendered on the GPU. Domain-warped fractal noise
 * billows and flows like ink diffusing in water, forming drifting mist and soft
 * mountain ridges that never quite hold still. Colors are read from the theme
 * tokens and updated when the theme flips.
 *
 * Degrades safely: if WebGL is unavailable it renders nothing (the CSS/SVG
 * atmosphere behind it shows through); under reduced motion it paints a single
 * still frame instead of animating. Pauses when off-screen or the tab is hidden.
 */
export default function InkFlowCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl =
      canvas.getContext("webgl", { antialias: false, alpha: true }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const vertSrc = `
      attribute vec2 a_pos;
      void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
    `;

    const fragSrc = `
      precision highp float;
      uniform vec2 u_res;
      uniform float u_time;
      uniform vec3 u_bg;
      uniform vec3 u_ink;
      uniform vec3 u_mist;

      float hash(vec2 p){
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }
      float noise(vec2 p){
        vec2 i = floor(p), f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
      }
      float fbm(vec2 p){
        float v = 0.0, a = 0.5;
        for (int i = 0; i < 6; i++){
          v += a * noise(p);
          p = p * 2.0 + vec2(37.1, 17.3);
          a *= 0.5;
        }
        return v;
      }

      void main(){
        vec2 uv = gl_FragCoord.xy / u_res.xy;
        vec2 asp = vec2(u_res.x / u_res.y, 1.0);
        vec2 p = uv * asp * 2.4;
        float t = u_time * 0.045;

        // Domain warp — ink diffusing.
        vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3 - t)));
        vec2 r = vec2(
          fbm(p + 2.0 * q + vec2(1.7, 9.2) + 0.4 * t),
          fbm(p + 2.0 * q + vec2(8.3, 2.8) - 0.4 * t)
        );
        float f = fbm(p + 2.4 * r);

        vec3 col = u_bg;

        // Flowing mist, denser low and toward the warp crests.
        float mist = smoothstep(0.15, 0.95, f);
        col = mix(col, u_mist, mist * 0.55 * (1.0 - uv.y * 0.35));

        // Layered mountain ridges, edges softened by the same flow.
        for (int k = 0; k < 3; k++){
          float fk = float(k);
          float base = 0.30 + fk * 0.14;
          float ridge = base
            + 0.10 * fbm(vec2(uv.x * (2.0 + fk) + fk * 12.0, 3.0))
            + 0.03 * r.x;
          float edge = 0.018 + 0.03 * fk;
          float m = smoothstep(ridge + edge, ridge - edge, uv.y);
          float depth = 0.18 + fk * 0.14;
          vec3 mtnCol = mix(u_mist, u_ink, 0.25 + fk * 0.2);
          col = mix(col, mtnCol, m * depth * (0.7 + 0.3 * fbm(p * 0.6 + fk)));
        }

        // Dark ink wisps in the densest folds.
        col = mix(col, u_ink, smoothstep(0.78, 1.0, f) * 0.10);

        // Gentle top-down light so the sky reads open.
        col = mix(col, u_bg, smoothstep(0.55, 1.0, uv.y) * 0.25);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn("ink shader:", gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, vertSrc);
    const fs = compile(gl.FRAGMENT_SHADER, fragSrc);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn("ink program:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uBg = gl.getUniformLocation(prog, "u_bg");
    const uInk = gl.getUniformLocation(prog, "u_ink");
    const uMist = gl.getUniformLocation(prog, "u_mist");

    const hexToRgb = (hex: string): [number, number, number] => {
      const h = hex.trim().replace("#", "");
      const full =
        h.length === 3
          ? h.split("").map((c) => c + c).join("")
          : h.padEnd(6, "0").slice(0, 6);
      const n = parseInt(full, 16);
      return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
    };
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      gl.uniform3fv(uBg, hexToRgb(cs.getPropertyValue("--bg") || "#e8eaed"));
      gl.uniform3fv(uInk, hexToRgb(cs.getPropertyValue("--fg") || "#0d0e11"));
      gl.uniform3fv(uMist, hexToRgb(cs.getPropertyValue("--mist") || "#676c73"));
    };
    readColors();

    const parent = canvas.parentElement!;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();

    let raf = 0;
    let running = false;
    const start = performance.now();

    const frame = (now: number) => {
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (running) raf = requestAnimationFrame(frame);
    };
    const play = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // First paint (also the only paint under reduced motion).
    gl.uniform1f(uTime, reduced ? 8.0 : 0.0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    play();

    const ro = new ResizeObserver(() => {
      resize();
      if (!running) gl.drawArrays(gl.TRIANGLES, 0, 3);
    });
    ro.observe(parent);

    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? play() : stop()),
      { threshold: 0 },
    );
    io.observe(parent);

    const onVis = () => (document.hidden ? stop() : play());
    document.addEventListener("visibilitychange", onVis);

    const mo = new MutationObserver(() => {
      readColors();
      if (!running) gl.drawArrays(gl.TRIANGLES, 0, 3);
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
