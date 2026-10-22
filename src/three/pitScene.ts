import {
  AdditiveBlending,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Color,
  ConeGeometry,
  CylinderGeometry,
  DirectionalLight,
  Fog,
  HemisphereLight,
  IcosahedronGeometry,
  InstancedMesh,
  Mesh,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  Scene,
  TorusGeometry,
} from 'three'
import { disposeTree, rng, toon, withOutline } from './toon'
import type { SceneFactory } from './types'

function height(x: number, z: number) {
  return (
    Math.sin(x * 0.45) * 0.6 +
    Math.cos(z * 0.6 + x * 0.2) * 0.5 +
    Math.sin(x * 1.3 + z * 0.9) * 0.18 +
    Math.max(0, 2.2 - Math.hypot(x + 3, z + 2) * 0.6) * 1.2 + // a big heap
    Math.max(0, 1.6 - Math.hypot(x - 5, z + 4) * 0.5)
  )
}

/** The Pit: a cel-shaded wasteland of trash heaps under falling embers, the Sphere hanging overhead. */
const createPitScene: SceneFactory = ({ renderer, width, height: h, quality, reducedMotion }) => {
  const scene = new Scene()
  scene.fog = new Fog('#0b0505', 6, 22)
  renderer.setClearColor(0x000000, 0)

  const camera = new PerspectiveCamera(42, width / h, 0.1, 60)

  scene.add(new HemisphereLight('#ffb4a8', '#000000', 0.5))
  const sun = new DirectionalLight('#ffdad4', 1.4)
  sun.position.set(-4, 10, 3)
  scene.add(sun)
  const glow = new DirectionalLight('#ff2a00', 2.4)
  glow.position.set(6, 1, -8)
  scene.add(glow)

  // Terrain
  const seg = quality === 'high' ? 70 : 40
  const groundGeo = new PlaneGeometry(36, 24, seg, Math.round(seg * 0.66))
  groundGeo.rotateX(-Math.PI / 2)
  const pos = groundGeo.attributes.position as BufferAttribute
  for (let i = 0; i < pos.count; i++) pos.setY(i, height(pos.getX(i), pos.getZ(i)))
  groundGeo.computeVertexNormals()
  scene.add(new Mesh(groundGeo, toon('#2c2120', { flat: true })))

  // Trash scattered over the terrain
  const rand = rng(99)
  const dummy = new Object3D()
  const color = new Color()
  const junk = [
    new BoxGeometry(0.6, 0.6, 0.6),
    new CylinderGeometry(0.22, 0.22, 0.7, 8),
    new TorusGeometry(0.35, 0.14, 6, 12),
    new IcosahedronGeometry(0.45, 0),
  ]
  const perShape = quality === 'high' ? 70 : 32
  const tones = ['#3a3a3a', '#4a3a37', '#5a403c', '#8b0000', '#6b6b6b']
  for (const geo of junk) {
    const mesh = withOutline(new InstancedMesh(geo, toon('#ffffff', { flat: true }), perShape), 0.03)
    for (let i = 0; i < perShape; i++) {
      // Bias toward the heaps
      const heap = rand() < 0.5
      const x = heap ? -3 + (rand() - 0.5) * 6 : (rand() - 0.5) * 30
      const z = heap ? -2 + (rand() - 0.5) * 5 : -10 + rand() * 14
      dummy.position.set(x, height(x, z) + 0.1, z)
      dummy.rotation.set(rand() * 6, rand() * 6, rand() * 6)
      dummy.scale.setScalar(0.5 + rand() * 0.9)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
      mesh.setColorAt(i, color.set(tones[Math.floor(rand() * tones.length)]))
    }
    mesh.instanceColor!.needsUpdate = true
    scene.add(mesh)
  }

  // Rusted pillars/pipes sticking out of the heaps
  for (let i = 0; i < 6; i++) {
    const x = (rand() - 0.5) * 18
    const z = -8 + rand() * 8
    const pipe = withOutline(new Mesh(new CylinderGeometry(0.2, 0.25, 3 + rand() * 3, 8), toon('#5a403c', { flat: true })), 0.04)
    pipe.position.set(x, height(x, z) + 1.2, z)
    pipe.rotation.set((rand() - 0.5) * 0.8, 0, (rand() - 0.5) * 0.8)
    scene.add(pipe)
  }

  // The Sphere, far overhead
  const sphere = withOutline(new Mesh(new ConeGeometry(2.4, 2, 8), toon('#e2e2e2', { flat: true })), 0.05)
  sphere.rotation.x = Math.PI
  sphere.position.set(4, 11, -16)
  // Exempt from fog so it reads as a pale silhouette in the sky.
  sphere.traverse((o) => {
    const m = (o as Mesh).material as { fog?: boolean } | undefined
    if (m) m.fog = false
  })
  scene.add(sphere)

  // Embers
  const emberCount = quality === 'high' ? 600 : 220
  const emberPos = new Float32Array(emberCount * 3)
  for (let i = 0; i < emberCount; i++) {
    emberPos[i * 3] = (rand() - 0.5) * 30
    emberPos[i * 3 + 1] = rand() * 10
    emberPos[i * 3 + 2] = -12 + rand() * 16
  }
  const emberGeo = new BufferGeometry()
  emberGeo.setAttribute('position', new BufferAttribute(emberPos, 3))
  const embers = new Points(
    emberGeo,
    new PointsMaterial({ color: '#ff5a3c', size: 0.07, transparent: true, opacity: 0.85, blending: AdditiveBlending, depthWrite: false }),
  )
  scene.add(embers)

  const look = { x: 0, y: 0 }

  return {
    resize(w, hh) {
      camera.aspect = w / hh
      camera.updateProjectionMatrix()
    },
    update(time, delta, { pointer, scroll }) {
      const t = reducedMotion ? 0 : time
      if (!reducedMotion) {
        const p = emberGeo.attributes.position as BufferAttribute
        for (let i = 0; i < emberCount; i++) {
          let y = p.getY(i) + delta * (0.25 + (i % 7) * 0.05)
          if (y > 10) y = 0
          p.setY(i, y)
          p.setX(i, p.getX(i) + Math.sin(t + i) * delta * 0.1)
        }
        p.needsUpdate = true
      }

      look.x += (pointer.x - look.x) * 0.04
      look.y += (pointer.y - look.y) * 0.04
      const orbit = t * 0.05 + look.x * 0.25
      const dist = 11 - scroll * 3
      camera.position.set(Math.sin(orbit) * dist, 3.2 + look.y * 0.6 + (1 - scroll) * 1.5, Math.cos(orbit) * dist)
      camera.lookAt(0, 1.4 + scroll * 1.5, -3)

      renderer.render(scene, camera)
    },
    dispose() {
      disposeTree(scene)
    },
  }
}

export default createPitScene
