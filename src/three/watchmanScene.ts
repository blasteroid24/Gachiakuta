import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  DirectionalLight,
  DoubleSide,
  Group,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  RingGeometry,
  Scene,
} from 'three'
import type { WatchmanKind } from '@/data/watchman'
import { buildModel, type Model } from './watchmanModels'
import { disposeTree, rng } from './toon'
import type { SceneFactory } from './types'

const easeOutBack = (x: number) => 1 + 2.2 * Math.pow(x - 1, 3) + 1.2 * Math.pow(x - 1, 2)
const easeInCubic = (x: number) => x * x * x

/** Turntable viewer for the Watchman Series: drag to spin, swaps models with a scale/spin transition. */
const createWatchmanScene: SceneFactory = ({ renderer, canvas, width, height, reducedMotion }) => {
  const scene = new Scene()
  renderer.setClearColor(0x000000, 0)

  const camera = new PerspectiveCamera(35, width / height, 0.1, 50)
  camera.position.set(0, 0.4, 9)

  scene.add(new HemisphereLight('#ffffff', '#2a0000', 1.1))
  const key = new DirectionalLight('#ffffff', 2.4)
  key.position.set(-4, 6, 6)
  scene.add(key)
  const rim = new DirectionalLight('#ff2a1a', 3.5)
  rim.position.set(5, 1, -5)
  scene.add(rim)

  // Scanner rings + dust
  const scanner = new Group()
  scanner.position.y = -2.3
  const ringMat = new MeshBasicMaterial({ color: '#ff3b2a', transparent: true, opacity: 0.55, side: DoubleSide })
  const ring = new Mesh(new RingGeometry(1.9, 2, 64), ringMat)
  ring.rotation.x = -Math.PI / 2
  const ring2 = new Mesh(new RingGeometry(2.4, 2.43, 64), new MeshBasicMaterial({ color: '#ffb4a8', transparent: true, opacity: 0.25, side: DoubleSide }))
  ring2.rotation.x = -Math.PI / 2
  scanner.add(ring, ring2)
  scene.add(scanner)

  const rand = rng(3)
  const dustCount = 160
  const dust = new Float32Array(dustCount * 3)
  for (let i = 0; i < dustCount; i++) {
    const a = rand() * Math.PI * 2
    const r = 1.5 + rand() * 2.5
    dust[i * 3] = Math.cos(a) * r
    dust[i * 3 + 1] = -2.3 + rand() * 5
    dust[i * 3 + 2] = Math.sin(a) * r
  }
  const dustGeo = new BufferGeometry()
  dustGeo.setAttribute('position', new BufferAttribute(dust, 3))
  const dustPts = new Points(dustGeo, new PointsMaterial({ color: '#ff5a3c', size: 0.05, transparent: true, opacity: 0.8, blending: AdditiveBlending, depthWrite: false }))
  scene.add(dustPts)

  // Turntable
  const turntable = new Group()
  scene.add(turntable)
  const cache = new Map<WatchmanKind, Model>()
  const getModel = (k: WatchmanKind) => {
    let m = cache.get(k)
    if (!m) {
      m = buildModel[k]()
      cache.set(k, m)
    }
    return m
  }

  let current: Model | null = null
  let pending: WatchmanKind | null = null
  let phase: 'idle' | 'out' | 'in' = 'idle'
  let phaseT = 0

  // Drag to rotate with inertia. touch-action: pan-y keeps vertical page scrolling on phones.
  canvas.style.touchAction = 'pan-y'
  canvas.style.cursor = 'grab'
  let dragging = false
  let lastX = 0
  let lastY = 0
  let velY = 0
  let tiltX = 0
  const onDown = (e: PointerEvent) => {
    dragging = true
    lastX = e.clientX
    lastY = e.clientY
    canvas.setPointerCapture(e.pointerId)
    canvas.style.cursor = 'grabbing'
  }
  const onMove = (e: PointerEvent) => {
    if (!dragging) return
    velY = (e.clientX - lastX) * 0.01
    turntable.rotation.y += velY
    tiltX = Math.max(-0.5, Math.min(0.5, tiltX + (e.clientY - lastY) * 0.005))
    lastX = e.clientX
    lastY = e.clientY
  }
  const onUp = () => {
    dragging = false
    canvas.style.cursor = 'grab'
  }
  canvas.addEventListener('pointerdown', onDown)
  canvas.addEventListener('pointermove', onMove)
  canvas.addEventListener('pointerup', onUp)
  canvas.addEventListener('pointercancel', onUp)

  return {
    resize(w, h) {
      camera.aspect = w / h
      camera.position.z = w / h < 1 ? 11 : 9
      camera.updateProjectionMatrix()
    },
    setProp(key, value) {
      if (key !== 'kind') return
      const kind = value as WatchmanKind
      if (!current) {
        current = getModel(kind)
        turntable.add(current.group)
        phase = reducedMotion ? 'idle' : 'in'
        phaseT = 0
        return
      }
      pending = kind
      if (phase !== 'out') {
        phase = reducedMotion ? 'idle' : 'out'
        phaseT = 0
      }
      if (reducedMotion) {
        turntable.remove(current.group)
        current = getModel(kind)
        turntable.add(current.group)
        pending = null
      }
    },
    update(time, delta) {
      // Swap transition
      if (phase === 'out' && current) {
        phaseT = Math.min(1, phaseT + delta / 0.3)
        current.group.scale.setScalar(1 - easeInCubic(phaseT))
        turntable.rotation.y += delta * 12
        if (phaseT === 1 && pending) {
          turntable.remove(current.group)
          current.group.scale.setScalar(1)
          current = getModel(pending)
          pending = null
          turntable.add(current.group)
          phase = 'in'
          phaseT = 0
        }
      } else if (phase === 'in' && current) {
        phaseT = Math.min(1, phaseT + delta / 0.7)
        current.group.scale.setScalar(Math.max(0.001, easeOutBack(phaseT)))
        if (phaseT === 1) phase = 'idle'
      }

      if (!dragging && !reducedMotion) {
        velY *= 0.95
        turntable.rotation.y += velY + delta * 0.35
        tiltX *= 0.96
      }
      turntable.rotation.x = tiltX
      turntable.position.y = reducedMotion ? 0 : Math.sin(time * 1.2) * 0.12
      current?.tick?.(reducedMotion ? 0 : time)

      if (!reducedMotion) {
        ring.scale.setScalar(1 + Math.sin(time * 2) * 0.04)
        ringMat.opacity = 0.35 + Math.sin(time * 2) * 0.2
        ring2.rotation.z = time * 0.3
        dustPts.rotation.y = time * 0.1
      }

      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
    },
    dispose() {
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointercancel', onUp)
      for (const m of cache.values()) disposeTree(m.group)
      disposeTree(scene)
    },
  }
}

export default createWatchmanScene
