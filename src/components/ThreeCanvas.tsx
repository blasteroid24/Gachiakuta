import { useEffect, useRef, useState, type ReactNode } from 'react'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import type { FrameInput, Quality, SceneFactory, SceneInstance } from '@/three/types'

type Props = {
  /** Dynamic import of a scene module, so three.js stays out of the main bundle. */
  load: () => Promise<{ default: SceneFactory }>
  className?: string
  /** Shown until the scene is ready, and kept if WebGL is unavailable. */
  fallback?: ReactNode
  /** Forwarded to scene.setProp whenever a value changes. */
  props?: Record<string, string | number | boolean>
  /** Start loading right after first paint instead of waiting until the canvas nears the viewport. */
  eager?: boolean
}

function detectQuality(): Quality {
  const nav = navigator as Navigator & { deviceMemory?: number }
  if ((nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4 || window.innerWidth < 768) return 'low'
  return 'high'
}

const whenIdle = () =>
  new Promise<void>((resolve) => {
    if ('requestIdleCallback' in window) window.requestIdleCallback(() => resolve(), { timeout: 1200 })
    else setTimeout(resolve, 200)
  })

export function ThreeCanvas({ load, className, fallback, props, eager = false }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<SceneInstance | null>(null)
  const propsRef = useRef(props)
  const loadRef = useRef(load)
  const [status, setStatus] = useState<'idle' | 'ready' | 'failed'>('idle')

  const propsKey = JSON.stringify(props ?? {})
  useEffect(() => {
    propsRef.current = props
    const scene = sceneRef.current
    if (scene?.setProp && props) for (const [k, v] of Object.entries(props)) scene.setProp(k, v)
    // propsKey captures value changes without requiring callers to memoize the object.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propsKey])

  useEffect(() => {
    const wrap = wrapRef.current!
    const canvas = canvasRef.current!
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const quality = detectQuality()
    const input: FrameInput = { pointer: { x: 0, y: 0 }, scroll: 0 }

    let disposed = false
    let started = false
    let visible = false
    const cleanup: { fn: (() => void) | null } = { fn: null }

    const start = async () => {
      started = true
      if (!eager) await whenIdle()
      else await new Promise((r) => requestAnimationFrame(r))
      if (disposed) return

      let createRenderer: typeof import('@/three/renderer').createRenderer
      let factory: SceneFactory
      try {
        const [r, mod] = await Promise.all([import('@/three/renderer'), loadRef.current()])
        createRenderer = r.createRenderer
        factory = mod.default
      } catch {
        if (!disposed) setStatus('failed')
        return
      }
      if (disposed) return

      let renderer: import('three').WebGLRenderer
      try {
        renderer = createRenderer(canvas, quality === 'high')
      } catch {
        setStatus('failed')
        return
      }

      let dpr = Math.min(window.devicePixelRatio || 1, quality === 'high' ? 1.5 : 1)
      renderer.setPixelRatio(dpr)
      const { width, height } = wrap.getBoundingClientRect()
      renderer.setSize(width, height, false)

      const scene = factory({ renderer, canvas, width, height, quality, reducedMotion })
      sceneRef.current = scene
      if (propsRef.current && scene.setProp) for (const [k, v] of Object.entries(propsRef.current)) scene.setProp(k, v)

      const ro = new ResizeObserver(([entry]) => {
        const { width: w, height: h } = entry.contentRect
        if (!w || !h) return
        renderer.setSize(w, h, false)
        scene.resize(w, h)
      })
      ro.observe(wrap)

      const onPointer = (e: PointerEvent) => {
        input.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
        input.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
      }
      window.addEventListener('pointermove', onPointer, { passive: true })

      // Adaptive resolution: if the first ~90 visible frames average under ~45fps, drop to 1x DPR.
      let sampled = 0
      let sampledTime = 0
      let last = performance.now()
      const t0 = last

      const tick = () => {
        const now = performance.now()
        const delta = Math.min((now - last) / 1000, 0.1)
        last = now
        if (!visible || document.hidden) return

        const r = wrap.getBoundingClientRect()
        const vh = window.innerHeight
        input.scroll = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)))
        scene.update((now - t0) / 1000, delta, input)

        if (sampled < 90 && dpr > 1) {
          sampled++
          sampledTime += delta
          if (sampled === 90 && sampledTime / 90 > 0.022) {
            dpr = 1
            renderer.setPixelRatio(1)
            renderer.setSize(r.width, r.height, false)
          }
        }
      }
      gsap.ticker.add(tick)
      setStatus('ready')

      cleanup.fn = () => {
        gsap.ticker.remove(tick)
        ro.disconnect()
        window.removeEventListener('pointermove', onPointer)
        scene.dispose()
        renderer.dispose()
        sceneRef.current = null
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !started) void start()
      },
      { rootMargin: '150px 0px' },
    )
    io.observe(wrap)

    return () => {
      disposed = true
      io.disconnect()
      cleanup.fn?.()
    }
  }, [eager])

  return (
    <div ref={wrapRef} className={cn('relative overflow-hidden', className)}>
      {fallback && (
        <div className={cn('absolute inset-0 transition-opacity duration-1000', status === 'ready' ? 'opacity-0' : 'opacity-100')}>{fallback}</div>
      )}
      <canvas
        ref={canvasRef}
        aria-hidden
        className={cn('absolute inset-0 h-full w-full transition-opacity duration-1000', status === 'ready' ? 'opacity-100' : 'opacity-0')}
      />
    </div>
  )
}
