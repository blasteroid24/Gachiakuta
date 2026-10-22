import { gsap } from '@/lib/gsap'

/**
 * Pointer-driven 3D tilt for every `selector` inside `root`, using event delegation.
 * Call inside a fine-pointer matchMedia branch; returns a cleanup function.
 */
export function attachTilt(root: HTMLElement, selector: string, maxDeg = 8) {
  let current: HTMLElement | null = null
  let rx: gsap.QuickToFunc
  let ry: gsap.QuickToFunc

  const reset = () => {
    if (!current) return
    gsap.to(current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' })
    current = null
  }

  const onMove = (e: PointerEvent) => {
    const el = (e.target as Element).closest<HTMLElement>(selector)
    if (el !== current) {
      reset()
      if (el) {
        current = el
        gsap.set(el, { transformPerspective: 900 })
        rx = gsap.quickTo(el, 'rotateX', { duration: 0.4, ease: 'power3' })
        ry = gsap.quickTo(el, 'rotateY', { duration: 0.4, ease: 'power3' })
      }
    }
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry(px * maxDeg * 2)
    rx(-py * maxDeg * 2)
  }

  root.addEventListener('pointermove', onMove, { passive: true })
  root.addEventListener('pointerleave', reset)
  return () => {
    root.removeEventListener('pointermove', onMove)
    root.removeEventListener('pointerleave', reset)
    reset()
  }
}
