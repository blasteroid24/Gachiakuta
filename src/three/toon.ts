import {
  BackSide,
  Color,
  DataTexture,
  InstancedMesh,
  Mesh,
  MeshToonMaterial,
  NearestFilter,
  Object3D,
  RedFormat,
  ShaderMaterial,
  UniformsLib,
  UniformsUtils,
  type BufferGeometry,
  type ColorRepresentation,
} from 'three'

let gradient: DataTexture | null = null

/** 3-step ramp so MeshToonMaterial bands light like cel-shaded manga panels. */
export function toonGradient() {
  if (gradient) return gradient
  gradient = new DataTexture(new Uint8Array([60, 150, 255]), 3, 1, RedFormat)
  gradient.minFilter = NearestFilter
  gradient.magFilter = NearestFilter
  gradient.generateMipmaps = false
  gradient.needsUpdate = true
  return gradient
}

export function toon(color: ColorRepresentation, opts: { emissive?: ColorRepresentation; emissiveIntensity?: number; flat?: boolean } = {}) {
  const mat = new MeshToonMaterial({
    color,
    gradientMap: toonGradient(),
    emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.emissiveIntensity ?? 1,
  })
  // Not in MeshToonMaterial's typings, but the toon shader honours FLAT_SHADED like the other lit materials.
  if (opts.flat) Object.assign(mat, { flatShading: true })
  return mat
}

/** Inverted-hull ink outline: back faces pushed out along normals. Works for InstancedMesh too. */
export function outlineMaterial(thickness = 0.03, color: ColorRepresentation = 0x0a0a0a) {
  return new ShaderMaterial({
    uniforms: UniformsUtils.merge([UniformsLib.fog, { thickness: { value: thickness }, color: { value: new Color(color) } }]),
    vertexShader: /* glsl */ `
      #include <common>
      #include <fog_pars_vertex>
      uniform float thickness;
      void main() {
        vec4 p = vec4(position + normal * thickness, 1.0);
        #ifdef USE_INSTANCING
          p = instanceMatrix * p;
        #endif
        vec4 mvPosition = modelViewMatrix * p;
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }
    `,
    fragmentShader: /* glsl */ `
      #include <common>
      #include <fog_pars_fragment>
      uniform vec3 color;
      void main() {
        gl_FragColor = vec4(color, 1.0);
        #include <fog_fragment>
      }
    `,
    side: BackSide,
    fog: true,
  })
}

/** Adds an outline child to a mesh (or a twin InstancedMesh sharing the same instance matrices). */
export function withOutline<T extends Mesh | InstancedMesh>(mesh: T, thickness = 0.03, color?: ColorRepresentation): T {
  const mat = outlineMaterial(thickness, color)
  if (mesh instanceof InstancedMesh) {
    const twin = new InstancedMesh(mesh.geometry, mat, mesh.count)
    twin.instanceMatrix = mesh.instanceMatrix
    twin.frustumCulled = false
    twin.raycast = () => {}
    mesh.add(twin)
  } else {
    const hull = new Mesh(mesh.geometry, mat)
    hull.raycast = () => {}
    mesh.add(hull)
  }
  return mesh
}

/** Build a mesh with toon material + outline in one call. */
export function inked(geometry: BufferGeometry, color: ColorRepresentation, thickness = 0.03, emissive?: ColorRepresentation) {
  return withOutline(new Mesh(geometry, toon(color, { emissive })), thickness)
}

/** Dispose every geometry/material under a root. */
export function disposeTree(root: Object3D) {
  const seen = new Set<unknown>()
  root.traverse((o) => {
    const m = o as Mesh
    if (m.geometry && !seen.has(m.geometry)) {
      seen.add(m.geometry)
      m.geometry.dispose()
    }
    const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : []
    for (const mat of mats) {
      if (!seen.has(mat)) {
        seen.add(mat)
        mat.dispose()
      }
    }
  })
}

/** Small deterministic PRNG so scenes look the same on every load. */
export function rng(seed = 1) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
