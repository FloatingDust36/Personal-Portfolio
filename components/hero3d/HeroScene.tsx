"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import {
  inkVertexShader,
  inkFragmentShader,
  makeInkUniforms,
} from "./inkFlow";
import { makeMountainTexture, figureDataUri } from "./assets";

type Palette = { bg: string; ink: string; mist: string };

function readPalette(): Palette {
  const cs = getComputedStyle(document.documentElement);
  const get = (v: string, f: string) => (cs.getPropertyValue(v).trim() || f);
  return {
    bg: get("--bg", "#e8eaed"),
    ink: get("--fg", "#0d0e11"),
    mist: get("--mist", "#676c73"),
  };
}

/** A plane running the flowing-ink shader. */
function InkPlane({
  opaque,
  strength = 0.5,
  size,
  position,
  palette,
}: {
  opaque: boolean;
  strength?: number;
  size: [number, number];
  position: [number, number, number];
  palette: Palette;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => makeInkUniforms(opaque, strength), [opaque, strength]);

  useEffect(() => {
    uniforms.uAspect.value = size[0] / size[1];
    uniforms.uBg.value.set(palette.bg);
    uniforms.uInk.value.set(palette.ink);
    uniforms.uMist.value.set(palette.mist);
  }, [palette, size, uniforms]);

  useFrame((_, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += delta;
  });

  return (
    <mesh position={position}>
      <planeGeometry args={[size[0], size[1]]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={inkVertexShader}
        fragmentShader={inkFragmentShader}
        uniforms={uniforms}
        transparent={!opaque}
        depthWrite={opaque}
        fog={false}
      />
    </mesh>
  );
}

/** An ink mountain ridge at depth, tinted and fogged. */
function Mountain({
  seed,
  crest,
  tone,
  size,
  position,
}: {
  seed: number;
  crest: number;
  tone: string;
  size: [number, number];
  position: [number, number, number];
}) {
  const texture = useMemo(() => makeMountainTexture(seed, crest), [seed, crest]);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <mesh position={position}>
      <planeGeometry args={[size[0], size[1]]} />
      <meshBasicMaterial
        map={texture}
        color={tone}
        transparent
        depthWrite={false}
        fog
      />
    </mesh>
  );
}

/** The lone figure as a fogged billboard. */
function Figure({ tone }: { tone: string }) {
  const uri = useMemo(() => figureDataUri(), []);
  const texture = useLoader(THREE.TextureLoader, uri);
  texture.colorSpace = THREE.SRGBColorSpace;
  return (
    <mesh position={[6.4, -3.4, -15]}>
      <planeGeometry args={[7, 12.6]} />
      <meshBasicMaterial
        map={texture}
        color={tone}
        transparent
        depthWrite={false}
        fog
      />
    </mesh>
  );
}

/** Mouse + scroll driven camera parallax. */
function Rig({ reduced }: { reduced: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => {
      scroll.current = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  useFrame((state) => {
    if (reduced) return;
    const cam = state.camera;
    const tx = pointer.current.x * 1.5;
    const ty = pointer.current.y * 0.9;
    cam.position.x += (tx - cam.position.x) * 0.04;
    cam.position.y += (ty - cam.position.y) * 0.04;
    cam.position.z += (6 - scroll.current * 4 - cam.position.z) * 0.05;
    cam.lookAt(0, -2, -30);
  });
  return null;
}

export default function HeroScene() {
  const [palette, setPalette] = useState<Palette>({
    bg: "#e8eaed",
    ink: "#0d0e11",
    mist: "#676c73",
  });
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPalette(readPalette());
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const mo = new MutationObserver(() => setPalette(readPalette()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Mountain tones derived from the palette.
  const tones = useMemo(() => {
    const bg = new THREE.Color(palette.bg);
    const ink = new THREE.Color(palette.ink);
    const mist = new THREE.Color(palette.mist);
    const far = mist.clone().lerp(bg, 0.55);
    const mid = mist.clone().lerp(ink, 0.12);
    const near = mist.clone().lerp(ink, 0.5);
    return {
      far: `#${far.getHexString()}`,
      mid: `#${mid.getHexString()}`,
      near: `#${near.getHexString()}`,
      figure: `#${ink.clone().lerp(mist, 0.06).getHexString()}`,
    };
  }, [palette]);

  const frameloop = reduced || !inView ? "demand" : "always";

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        frameloop={frameloop}
        dpr={[1, 1.5]}
        camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 6] }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={[palette.bg]} />
        <fog attach="fog" args={[palette.bg, 32, 82]} />

        {/* Sky / flowing ink backdrop */}
        <InkPlane opaque size={[170, 92]} position={[0, 0, -48]} palette={palette} />

        {/* Receding ink mountains */}
        <Mountain seed={7} crest={1.05} tone={tones.far} size={[175, 74]} position={[0, 3, -38]} />
        <Mountain seed={21} crest={0.82} tone={tones.mid} size={[135, 60]} position={[-7, -3, -26]} />
        <Mountain seed={44} crest={0.64} tone={tones.near} size={[100, 50]} position={[10, -7, -15]} />

        {/* Drifting mist sheets between the ridges */}
        <InkPlane opaque={false} strength={0.42} size={[150, 64]} position={[0, 3, -32]} palette={palette} />
        <InkPlane opaque={false} strength={0.34} size={[100, 46]} position={[5, -1, -19]} palette={palette} />
        <InkPlane opaque={false} strength={0.28} size={[64, 34]} position={[-4, -3, -9]} palette={palette} />

        <Suspense fallback={null}>
          <Figure tone={tones.figure} />
        </Suspense>

        <Rig reduced={reduced} />
      </Canvas>
    </div>
  );
}
