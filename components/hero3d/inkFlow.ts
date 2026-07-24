import * as THREE from "three";

/**
 * Flowing-ink shader for a plane. Domain-warped fractal noise animated over
 * time, tinted with theme colors. `uOpaque` switches between the solid sky
 * backdrop and translucent drifting mist sheets.
 */
export const inkVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const inkFragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uAspect;
  uniform float uOpaque;
  uniform float uStrength;
  uniform vec3 uBg;
  uniform vec3 uInk;
  uniform vec3 uMist;

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
    vec2 p = vec2(vUv.x * uAspect, vUv.y) * 2.4;
    float t = uTime * 0.045;

    vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3 - t)));
    vec2 r = vec2(
      fbm(p + 2.0 * q + vec2(1.7, 9.2) + 0.4 * t),
      fbm(p + 2.0 * q + vec2(8.3, 2.8) - 0.4 * t)
    );
    float f = fbm(p + 2.4 * r);
    float density = smoothstep(0.15, 0.95, f);

    if (uOpaque > 0.5) {
      vec3 base = mix(uBg, uMist, density * 0.5 * (1.0 - vUv.y * 0.35));
      base = mix(base, uInk, smoothstep(0.82, 1.0, f) * 0.08);
      gl_FragColor = vec4(base, 1.0);
    } else {
      vec3 col = mix(uMist, uInk, smoothstep(0.7, 1.0, f) * 0.5);
      gl_FragColor = vec4(col, density * uStrength);
    }
  }
`;

export function makeInkUniforms(opaque: boolean, strength = 0.5) {
  return {
    uTime: { value: 0 },
    uAspect: { value: 1 },
    uOpaque: { value: opaque ? 1 : 0 },
    uStrength: { value: strength },
    uBg: { value: new THREE.Color("#e8eaed") },
    uInk: { value: new THREE.Color("#0d0e11") },
    uMist: { value: new THREE.Color("#676c73") },
  };
}
