import {
  BoxGeometry,
  ConeGeometry,
  CylinderGeometry,
  DirectionalLight,
  Fog,
  Group,
  HemisphereLight,
  IcosahedronGeometry,
  InstancedMesh,
  Mesh,
  Object3D,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
} from 'three'
import { disposeTree, rng, toon, withOutline } from './toon'
import type { SceneFactory } from './types'

const ink = <T extends Mesh>(m: T, t = 0.025) => withOutline(m, t)

/** The Sphere: a pristine floating city that keeps dropping its trash off the edge. */
const createSkyScene: SceneFactory = ({ renderer, width, height, quality, reducedMotion }) => {
  const scene = new Scene()
  scene.fog = new Fog('#e9ecef', 12, 26)
  renderer.setClearColor(0x000000, 0)

  const camera = new PerspectiveCamera(35, width / height, 0.1, 60)
  camera.position.set(0, 2.5, 14.5)

  scene.add(new HemisphereLight('#ffffff', '#9aa3ab', 1.4))
  const sun = new DirectionalLight('#ffffff', 2)
  sun.position.set(5, 8, 6)
  scene.add(sun)

  const rand = rng(21)
  const island = new Group()

  // Rock underside + paved top
  const rock = ink(new Mesh(new ConeGeometry(3.2, 4.2, 8, 3), toon('#b9c0c6', { flat: true })), 0.035)
  rock.rotation.x = Math.PI
  rock.position.y = -2.1
  island.add(rock)
  island.add(ink(new Mesh(new CylinderGeometry(3.2, 3.2, 0.35, 8), toon('#f8f9fa', { flat: true })), 0.03))

  // Buildings
  const tower = toon('#ffffff', { flat: true })
  const accent = toon('#ffb4a8', { flat: true })
  const blockGeo = new BoxGeometry(1, 1, 1)
  for (let i = 0; i < (quality === 'high' ? 22 : 14); i++) {
    const a = rand() * Math.PI * 2
    const r = 0.6 + rand() * 2.1
    const h = 0.4 + rand() * 1.8
    const b = ink(new Mesh(blockGeo, rand() < 0.15 ? accent : tower))
    b.scale.set(0.35 + rand() * 0.4, h, 0.35 + rand() * 0.4)
    b.position.set(Math.cos(a) * r, 0.17 + h / 2, Math.sin(a) * r)
    b.rotation.y = rand() * Math.PI
    island.add(b)
    if (rand() < 0.3) {
      const spire = ink(new Mesh(new ConeGeometry(0.18, 0.7, 6), tower))
      spire.position.set(b.position.x, 0.17 + h + 0.35, b.position.z)
      island.add(spire)
    }
  }
  const spireTower = ink(new Mesh(new CylinderGeometry(0.35, 0.5, 3.4, 8), tower))
  spireTower.position.y = 1.85
  island.add(spireTower)
  const dome = ink(new Mesh(new SphereGeometry(0.55, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), accent))
  dome.position.y = 3.55
  island.add(dome)
  scene.add(island)

  // Clouds
  const cloudGeo = new IcosahedronGeometry(1, 1)
  const cloudMat = toon('#ffffff', { flat: true })
  const clouds: Group[] = []
  for (let i = 0; i < 5; i++) {
    const c = new Group()
    for (let j = 0; j < 4; j++) {
      const puff = ink(new Mesh(cloudGeo, cloudMat), 0.03)
      puff.position.set(j * 0.7 - 1, rand() * 0.3, rand() * 0.4)
      puff.scale.setScalar(0.45 + rand() * 0.35)
      c.add(puff)
    }
    c.position.set(-9 + i * 4.5, -1.5 + rand() * 4, -3 - rand() * 4)
    clouds.push(c)
    scene.add(c)
  }

  // Trash raining off the edge
  const dropCount = quality === 'high' ? 24 : 12
  const drops = withOutline(new InstancedMesh(new BoxGeometry(0.22, 0.22, 0.22), toon('#3b3b3b'), dropCount), 0.03)
  const dropState = Array.from({ length: dropCount }, () => ({ a: rand() * Math.PI * 2, y: -rand() * 8, v: 1 + rand() * 1.5, r: rand() * 6 }))
  scene.add(drops)
  const dummy = new Object3D()

  return {
    resize(w, h) {
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    },
    update(time, delta, { pointer, scroll }) {
      const t = reducedMotion ? 0 : time
      island.rotation.y = t * 0.15 + pointer.x * 0.3
      island.rotation.x = pointer.y * -0.08
      island.position.y = Math.sin(t * 0.8) * 0.15 + (scroll - 0.5) * 1.2

      for (const c of clouds) {
        if (!reducedMotion) c.position.x += delta * 0.35
        if (c.position.x > 11) c.position.x = -11
      }

      dropState.forEach((d, i) => {
        if (!reducedMotion) d.y -= d.v * delta
        if (d.y < -9) d.y = -0.2
        const edge = 2.9
        dummy.position.set(Math.cos(d.a + island.rotation.y) * edge, island.position.y + d.y, Math.sin(d.a + island.rotation.y) * edge)
        dummy.rotation.set(d.r + d.y, d.r - d.y, 0)
        dummy.scale.setScalar(d.y > -0.6 ? 0.001 : 1)
        dummy.updateMatrix()
        drops.setMatrixAt(i, dummy.matrix)
      })
      drops.instanceMatrix.needsUpdate = true

      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
    },
    dispose() {
      disposeTree(scene)
    },
  }
}

export default createSkyScene
