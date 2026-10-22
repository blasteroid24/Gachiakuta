import type { WebGLRenderer } from 'three'

export type Quality = 'high' | 'low'

export type SceneContext = {
  renderer: WebGLRenderer
  canvas: HTMLCanvasElement
  width: number
  height: number
  quality: Quality
  reducedMotion: boolean
}

export type FrameInput = {
  /** Pointer position over the window, -1..1 on each axis (y up). */
  pointer: { x: number; y: number }
  /** How far the canvas has travelled through the viewport: 0 entering at the bottom, 1 leaving at the top. */
  scroll: number
}

export type SceneInstance = {
  resize(width: number, height: number): void
  update(time: number, delta: number, input: FrameInput): void
  setProp?(key: string, value: unknown): void
  dispose(): void
}

export type SceneFactory = (ctx: SceneContext) => SceneInstance
