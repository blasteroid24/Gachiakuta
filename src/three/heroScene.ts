import {
  BoxGeometry,
  Color,
  CylinderGeometry,
  DirectionalLight,
  Fog,
  Group,
  HemisphereLight,
  IcosahedronGeometry,
  InstancedMesh,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  TorusGeometry,
  type BufferGeometry,
} from 'three'
import { disposeTree, inked, rng, toon, withOutline } from './toon'
import type { SceneFactory } from './types'

const PALETTE = ['#2b2b2b', '#3b3b3b', '#4a3a37', '#5a403c', '#8b0000', '#b8b4b2']

type Piece = { x: number; y: number; z: number; rx: number; ry: number; rz: number; vr: number; speed: number; scale: number }

/** Scrap debris tumbling down into the Pit around a slowly turning scrap-gear "Anima core". */
const createHeroScene: SceneFactory = ({ renderer, width, height, quality, reducedMotion }) => {
  const scene = new Scene()
  scene.fog = new Fog('#140e0e', 10, 30)
  renderer.setClearColor(0x000000, 0)

  const camera = new PerspectiveCamera(45, width / height, 0.1, 100)
  camera.position.set(0, 0, 15)

  scene.add(new HemisphereLight('#ffdad4', '#1a0000', 0.9))
  const key = new DirectionalLight('#ffffff', 2.2)
  key.position.set(-6, 10, 8)
  scene.add(key)
  const rim = new DirectionalLight('#ff2a1a', 3)
  rim.position.set(8, -2, -6)
  scene.add(rim)

  // ---- Debris (one InstancedMesh + outline twin per shape)
  const rand = rng(7)
  const perShape = quality === 'high' ? 34 : 14
  const shapes: BufferGeometry[] = [
    new BoxGeometry(1, 1, 1),
    new CylinderGeometry(0.35, 0.35, 1.1, 10),
    new TorusGeometry(0.5, 0.2, 8, 18),
    new IcosahedronGeometry(0.65, 0),
    new BoxGeometry(1.8, 0.18, 0.5),
  ]
  const dummy = new Object3D()
  const color = new Color()
  const fields = shapes.map((geo) => {
    const mesh = withOutline(new InstancedMesh(geo, toon('#ffffff'), perShape), 0.045)
    const pieces: Piece[] = []
    for (let i = 0; i < perShape; i++) {
      pieces.push({
        x: (rand() - 0.5) * 30,
        y: (rand() - 0.5) * 22,
        z: -16 + rand() * 15,
        rx: rand() * Math.PI * 2,
        ry: rand() * Math.PI * 2,
        rz: rand() * Math.PI * 2,
        vr: (rand() - 0.5) * 1.4,
        speed: 0.5 + rand() * 1.2,
        scale: 0.35 + rand() * 0.8,
      })
      mesh.setColorAt(i, color.set(PALETTE[Math.floor(rand() * PALETTE.length)]))
    }
    mesh.instanceColor!.needsUpdate = true
    scene.add(mesh)
    return { mesh, pieces }
  })

  // ---- Anima core: a ring of scrap teeth around a glowing red shard
  const core = new Group()
  core.position.set(0, 0.5, -9)
  const ring = new Group()
  const tooth = new BoxGeometry(0.9, 1.6, 0.9)
  const teeth = 28
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2
    const t = inked(tooth, i % 3 === 0 ? '#8b0000' : '#353535', 0.05)
    const r = 6 + (i % 2) * 0.35
    t.position.set(Math.cos(a) * r, Math.sin(a) * r, 0)
    t.rotation.z = a
    t.scale.y = 0.7 + (i % 4) * 0.25
    ring.add(t)
  }
  ring.add(inked(new TorusGeometry(6, 0.35, 8, 64), '#1f1f1f', 0.05))
  core.add(ring)

  const shard = inked(new IcosahedronGeometry(1.6, 0), '#8b0000', 0.06, '#ff1a00')
  ;(shard.material as ReturnType<typeof toon>).emissiveIntensity = 0.35
  core.add(shard)
  const cage = new Mesh(new IcosahedronGeometry(2.4, 1), new MeshBasicMaterial({ color: '#ffb4a8', wireframe: true, transparent: true, opacity: 0.18 }))
  core.add(cage)
  scene.add(core)

  const look = { x: 0, y: 0 }

  return {
    resize(w, h) {
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      // Pull back on narrow screens so the core still frames the copy.
      camera.position.z = w < 700 ? 20 : 15
    },
    update(time, delta, { pointer, scroll }) {
      const descend = Math.min(1, Math.max(0, (scroll - 0.5) * 2))
      const fall = reducedMotion ? 0 : delta * (1 + descend * 3)

      for (const { mesh, pieces } of fields) {
        for (let i = 0; i < pieces.length; i++) {
          const p = pieces[i]
          p.y -= p.speed * fall
          if (p.y < -11) p.y += 22
          p.rx += p.vr * fall
          p.ry += p.vr * 0.7 * fall
          dummy.position.set(p.x, p.y, p.z)
          dummy.rotation.set(p.rx, p.ry, p.rz)
          dummy.scale.setScalar(p.scale)
          dummy.updateMatrix()
          mesh.setMatrixAt(i, dummy.matrix)
        }
        mesh.instanceMatrix.needsUpdate = true
      }

      if (!reducedMotion) {
        ring.rotation.z = time * 0.08
        shard.rotation.set(time * 0.3, time * 0.45, 0)
        cage.rotation.set(-time * 0.1, time * 0.15, 0)
        shard.scale.setScalar(1 + Math.sin(time * 2.2) * 0.05)
      }

      // Pointer parallax, eased; scroll drops the camera "into the Pit".
      look.x += (pointer.x - look.x) * 0.05
      look.y += (pointer.y - look.y) * 0.05
      camera.position.x = look.x * 1.6
      camera.position.y = look.y * 1.0 - descend * 5
      camera.lookAt(0, -descend * 6, -6)

      renderer.render(scene, camera)
    },
    dispose() {
      disposeTree(scene)
    },
  }
}

export default createHeroScene
