import { WebGLRenderer } from 'three'

export function createRenderer(canvas: HTMLCanvasElement, antialias: boolean) {
  return new WebGLRenderer({ canvas, antialias, alpha: true, powerPreference: 'high-performance' })
}
