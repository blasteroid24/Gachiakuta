import { useRef } from 'react'
import { Hero } from '@/sections/Hero'
import { Divide } from '@/sections/Divide'
import { Cast } from '@/sections/Cast'
import { Watchman } from '@/sections/Watchman'
import { Jinki } from '@/sections/Jinki'
import { Footer } from '@/components/Footer'
import { ThreeCanvas } from '@/components/ThreeCanvas'
import { watchmanImage, type WatchmanItem } from '@/data/watchman'
import { useHomeAnimations } from './useHomeAnimations'

const loadSky = () => import('@/three/skyScene')
const loadPit = () => import('@/three/pitScene')
const loadWatchman = () => import('@/three/watchmanScene')

const renderWatchmanViewer = (item: WatchmanItem) => (
  <ThreeCanvas
    load={loadWatchman}
    props={{ kind: item.kind }}
    className="absolute inset-0"
    fallback={
      <img
        src={watchmanImage(item.kind, 960)}
        srcSet={`${watchmanImage(item.kind, 480)} 480w, ${watchmanImage(item.kind, 960)} 960w`}
        sizes="(min-width: 1024px) 60vw, 100vw"
        alt={item.name}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
    }
  />
)

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  useHomeAnimations(containerRef)

  return (
    <div ref={containerRef} className="bg-background text-on-background font-body-md overflow-x-clip trash-texture relative">
      <div className="grime-layer" />
      <div aria-hidden className="graffiti-accent text-8xl -top-10 -left-10 rotate-12">TRASH</div>

      <Hero />
      <Divide
        skyVisual={<ThreeCanvas load={loadSky} className="absolute inset-0" />}
        pitVisual={<ThreeCanvas load={loadPit} className="absolute inset-0" />}
      />
      <Cast />
      <Watchman renderViewer={renderWatchmanViewer} />
      <Jinki />
      <Footer />
    </div>
  )
}
