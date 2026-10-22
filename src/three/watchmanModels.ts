import {
  BoxGeometry,
  CapsuleGeometry,
  CylinderGeometry,
  DoubleSide,
  Group,
  LatheGeometry,
  Mesh,
  SphereGeometry,
  TorusGeometry,
  Vector2,
  type BufferGeometry,
  type ColorRepresentation,
} from 'three'
import type { WatchmanKind } from '@/data/watchman'
import { toon, withOutline } from './toon'

export type Model = { group: Group; tick?: (time: number) => void }

const C = {
  leather: '#2b2b2b',
  dark: '#1b1b1b',
  metal: '#c8c6c6',
  red: '#8b0000',
  pink: '#ffb4a8',
  paper: '#f2efe9',
}

function part(geo: BufferGeometry, color: ColorRepresentation, opts: { outline?: number; emissive?: ColorRepresentation; doubleSide?: boolean } = {}) {
  const mat = toon(color, { emissive: opts.emissive, emissiveIntensity: opts.emissive ? 0.5 : 1 })
  if (opts.doubleSide) mat.side = DoubleSide
  const m = new Mesh(geo, mat)
  return opts.outline === 0 ? m : withOutline(m, opts.outline ?? 0.03)
}

function at<T extends Mesh | Group>(o: T, x: number, y: number, z: number, rx = 0, ry = 0, rz = 0): T {
  o.position.set(x, y, z)
  o.rotation.set(rx, ry, rz)
  return o
}

// ---- 3R: Rudo's gloves
function gloves(): Model {
  const g = new Group()
  const palm = at(part(new BoxGeometry(1.5, 1.7, 0.6), C.leather), 0, 0.2, 0)
  g.add(palm)
  const fingerGeo = new CapsuleGeometry(0.16, 0.75, 4, 10)
  ;[-0.54, -0.18, 0.18, 0.54].forEach((x, i) => {
    const f = at(part(fingerGeo, C.leather), x, 1.45 + (i === 1 || i === 2 ? 0.08 : 0), 0.05, -0.25, 0, (x * -0.15))
    g.add(f)
    g.add(at(part(new CylinderGeometry(0.19, 0.19, 0.16, 10), C.metal), x, 1.08, 0.05, -0.25))
  })
  g.add(at(part(new CapsuleGeometry(0.18, 0.7, 4, 10), C.leather), 0.92, 0.25, 0.15, 0.2, 0, -0.9))
  // Knuckle plate + emblem
  g.add(at(part(new BoxGeometry(1.6, 0.3, 0.2), C.metal), 0, 0.9, 0.36))
  g.add(at(part(new TorusGeometry(0.32, 0.08, 8, 24), C.red, { emissive: '#ff1a00' }), 0, 0.25, 0.33))
  g.add(at(part(new SphereGeometry(0.12, 10, 8), C.pink, { emissive: '#ff5a3c' }), 0, 0.25, 0.36))
  // Cuff
  const cuff = at(part(new CylinderGeometry(0.9, 0.82, 1, 16), C.dark), 0, -1.05, 0)
  cuff.scale.z = 0.55
  g.add(cuff)
  const band = at(part(new TorusGeometry(0.9, 0.07, 6, 32), C.red), 0, -0.75, 0, Math.PI / 2)
  band.scale.y = 0.55
  g.add(band)
  ;[-0.5, 0, 0.5].forEach((x) => g.add(at(part(new SphereGeometry(0.07, 8, 6), C.metal, { outline: 0.015 }), x, -1.2, 0.48)))
  g.position.y = -0.2
  return { group: g }
}

// ---- Amo's boots
function boots(): Model {
  const g = new Group()
  g.add(at(part(new CylinderGeometry(0.55, 0.62, 2.1, 16), C.leather), 0, 0.55, 0))
  g.add(at(part(new CapsuleGeometry(0.55, 1.3, 6, 14), C.leather), 0.55, -0.7, 0, 0, 0, Math.PI / 2))
  g.add(at(part(new BoxGeometry(2.6, 0.22, 1.15), C.dark), 0.55, -1.3, 0))
  g.add(at(part(new BoxGeometry(0.5, 0.45, 1.1), C.dark), -0.45, -1.0, 0))
  g.add(at(part(new TorusGeometry(0.6, 0.08, 6, 28), C.red, { emissive: '#ff1a00' }), 0, 1.55, 0, Math.PI / 2))
  for (let i = 0; i < 5; i++) {
    g.add(at(part(new TorusGeometry(0.12, 0.035, 6, 12), C.metal, { outline: 0.012 }), 0.58, 1.2 - i * 0.32, 0, 0, Math.PI / 2))
  }
  g.add(at(part(new BoxGeometry(0.06, 1.6, 0.25), C.pink, { outline: 0.015 }), 0.6, 0.55, 0))
  g.position.x = -0.3
  g.rotation.y = -0.4
  return { group: g }
}

// ---- Zodyl's coat, Mishra
function coat(): Model {
  const g = new Group()
  const profile = [
    [0.35, 1.9], [0.75, 1.75], [0.95, 1.5], [0.9, 0.6], [0.85, -0.2], [1.05, -1.2], [1.3, -2.0],
  ].map(([x, y]) => new Vector2(x, y))
  const body = part(new LatheGeometry(profile, 20, 0.35, Math.PI * 2 - 0.7), C.leather, { doubleSide: true })
  g.add(body)
  const lining = new Mesh(new LatheGeometry(profile.map((p) => new Vector2(p.x - 0.03, p.y)), 20, 0.35, Math.PI * 2 - 0.7), toon(C.red))
  lining.material.side = DoubleSide
  g.add(lining)
  const sleeveGeo = new CylinderGeometry(0.28, 0.36, 2.1, 12, 1, true)
  const left = at(part(sleeveGeo, C.leather, { doubleSide: true }), -1.15, 0.6, 0, 0, 0, -0.35)
  const right = at(part(sleeveGeo, C.leather, { doubleSide: true }), 1.15, 0.6, 0, 0, 0, 0.35)
  g.add(left, right)
  g.add(at(part(new TorusGeometry(0.4, 0.12, 8, 24, Math.PI * 1.5), C.dark), 0, 1.95, 0, Math.PI / 2, 0, Math.PI * 0.75))
  g.add(at(part(new TorusGeometry(0.88, 0.09, 6, 28), C.red), 0, 0.15, 0, Math.PI / 2))
  ;[0.9, 0.4, -0.4, -1.0].forEach((y) => g.add(at(part(new SphereGeometry(0.07, 8, 6), C.metal, { outline: 0.012 }), 0.2, y, 0.86)))
  g.add(at(part(new TorusGeometry(0.22, 0.05, 6, 6), C.pink, { emissive: '#ff5a3c' }), -0.45, 0.9, 0.85))
  g.rotation.y = 0.35
  return { group: g }
}

// ---- Tamsy's book
function book(): Model {
  const g = new Group()
  const cover = new BoxGeometry(2, 2.7, 0.12)
  g.add(at(part(cover, C.red), 0, 0, 0.3))
  g.add(at(part(cover, C.red), 0, 0, -0.3))
  g.add(at(part(new BoxGeometry(1.85, 2.55, 0.5), C.paper, { outline: 0.015 }), 0.05, 0, 0))
  g.add(at(part(new BoxGeometry(0.16, 2.7, 0.72), C.dark), -1, 0, 0))
  // Eye emblem (sight)
  const eye = at(part(new TorusGeometry(0.42, 0.06, 8, 32), C.metal), 0.05, 0.25, 0.38)
  eye.scale.y = 0.55
  g.add(eye)
  g.add(at(part(new SphereGeometry(0.16, 12, 10), C.dark, { emissive: '#ff1a00', outline: 0.02 }), 0.05, 0.25, 0.38))
  g.add(at(part(new BoxGeometry(1.2, 0.06, 0.04), C.metal, { outline: 0.01 }), 0.05, -0.65, 0.38))
  g.add(at(part(new BoxGeometry(1.2, 0.06, 0.04), C.metal, { outline: 0.01 }), 0.05, -0.85, 0.38))
  // Clasp
  g.add(at(part(new BoxGeometry(0.35, 0.5, 0.8), C.metal), 1.02, 0, 0))
  g.rotation.set(0.15, -0.5, 0.05)
  return { group: g }
}

// ---- Gountess's necklace, Connect
function necklace(): Model {
  const g = new Group()
  const pendant = new Group()
  pendant.add(at(part(new CylinderGeometry(1, 1, 0.18, 40), C.dark), 0, 0, 0, Math.PI / 2))
  pendant.add(at(part(new TorusGeometry(1, 0.12, 10, 48), C.metal), 0, 0, 0))
  // Triangle of three rings
  const tri: [number, number][] = [[0, 0.42], [-0.38, -0.24], [0.38, -0.24]]
  tri.forEach(([x, y]) => pendant.add(at(part(new TorusGeometry(0.17, 0.045, 8, 20), C.metal, { outline: 0.012 }), x, y, 0.1)))
  for (let i = 0; i < 3; i++) {
    const [ax, ay] = tri[i]
    const [bx, by] = tri[(i + 1) % 3]
    const len = Math.hypot(bx - ax, by - ay) + 0.35
    const bar = at(part(new BoxGeometry(len, 0.05, 0.04), C.metal, { outline: 0.01 }), (ax + bx) / 2, (ay + by) / 2, 0.1, 0, 0, Math.atan2(by - ay, bx - ax))
    pendant.add(bar)
  }
  pendant.add(at(part(new TorusGeometry(0.2, 0.06, 8, 16), C.metal), 0, 1.15, 0, 0, Math.PI / 2))
  g.add(pendant)
  // Chain
  const linkGeo = new TorusGeometry(0.1, 0.03, 6, 12)
  const links = 22
  for (let i = 0; i <= links; i++) {
    const a = Math.PI * (0.1 + 0.8 * (i / links))
    const link = at(part(linkGeo, C.metal, { outline: 0.008 }), Math.cos(a) * 1.5, 1.3 + Math.sin(a) * 1.6 - 0.05, 0, 0, i % 2 ? Math.PI / 2 : 0, a)
    g.add(link)
  }
  g.position.y = -0.5
  return { group: g, tick: (t) => (pendant.rotation.z = Math.sin(t * 1.4) * 0.08) }
}

// ---- Enjin's wristwatch
function watch(): Model {
  const g = new Group()
  g.add(at(part(new CylinderGeometry(1, 1, 0.4, 40), C.metal), 0, 0, 0, Math.PI / 2))
  g.add(at(part(new TorusGeometry(1, 0.1, 10, 48), C.dark), 0, 0, 0.18))
  g.add(at(part(new CylinderGeometry(0.88, 0.88, 0.05, 40), C.paper, { outline: 0 }), 0, 0, 0.21, Math.PI / 2))
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2
    const big = i % 3 === 0
    g.add(at(part(new BoxGeometry(big ? 0.07 : 0.04, big ? 0.2 : 0.12, 0.02), C.dark, { outline: 0 }), Math.sin(a) * 0.72, Math.cos(a) * 0.72, 0.25, 0, 0, -a))
  }
  const hand = (len: number, w: number, color: string, z: number) => {
    const pivot = new Group()
    pivot.position.z = z
    pivot.add(at(part(new BoxGeometry(w, len, 0.02), color, { outline: 0 }), 0, len / 2 - 0.08, 0))
    g.add(pivot)
    return pivot
  }
  const hour = hand(0.45, 0.07, C.dark, 0.26)
  const minute = hand(0.65, 0.05, C.dark, 0.27)
  const second = hand(0.72, 0.02, C.red, 0.28)
  g.add(at(part(new CylinderGeometry(0.06, 0.06, 0.05, 12), C.red, { outline: 0 }), 0, 0, 0.29, Math.PI / 2))
  g.add(at(part(new CylinderGeometry(0.1, 0.1, 0.25, 12), C.metal), 1.12, 0, 0, 0, 0, Math.PI / 2))
  // Caseback: engraved rings + the Surebrec emblem
  g.add(at(part(new TorusGeometry(0.75, 0.04, 6, 40), C.dark, { outline: 0 }), 0, 0, -0.2))
  g.add(at(part(new TorusGeometry(0.5, 0.025, 6, 32), C.dark, { outline: 0 }), 0, 0, -0.2))
  g.add(at(part(new CylinderGeometry(0.22, 0.22, 0.06, 6), C.red, { emissive: '#ff1a00', outline: 0.015 }), 0, 0, -0.21, Math.PI / 2))
  // Straps
  const strapGeo = new BoxGeometry(0.95, 1.3, 0.16)
  g.add(at(part(strapGeo, C.leather), 0, 1.55, -0.12, -0.35))
  g.add(at(part(strapGeo, C.leather), 0, -1.55, -0.12, 0.35))
  g.add(at(part(new BoxGeometry(1.05, 0.14, 0.24), C.metal), 0, -1.95, -0.25, 0.35))
  return {
    group: g,
    tick: (t) => {
      // Runs at "Enjin speed": a full minute every 6 seconds.
      second.rotation.z = -t * Math.PI * 2 * (60 / 6) / 60
      minute.rotation.z = -t * 0.12
      hour.rotation.z = -t * 0.01 - 1.2
    },
  }
}

export const buildModel: Record<WatchmanKind, () => Model> = { gloves, boots, coat, book, necklace, watch }
