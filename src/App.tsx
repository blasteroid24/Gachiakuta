import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Nav } from '@/components/Nav'
import { ScrollManager } from '@/components/ScrollManager'
import Home from '@/pages/Home'

const Characters = lazy(() => import('@/pages/Characters'))

export default function App() {
  return (
    <>
      <ScrollManager />
      <Nav />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </>
  )
}
