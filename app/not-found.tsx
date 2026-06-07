"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

export default function NotFound() {
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.classList.add("page-404")
    return () => document.body.classList.remove("page-404")
  }, [])

  useEffect(() => {
    const start = performance.now()
    const duration = 60 * 1000 // 1 minute
    const fromScale = 1
    const toScale = 1.3

    let raf: number
    const tick = (now: number) => {
      const elapsed = Math.min(now - start, duration)
      const progress = elapsed / duration
      const scale = fromScale + (toScale - fromScale) * progress
      if (imgRef.current) {
        imgRef.current.style.transform = `scale(${scale})`
      }
      if (elapsed < duration) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
    <style>{`body { background: black !important; } footer { background: black !important; color: white !important; } footer a, footer span, footer p, footer h2 { color: white !important; } footer .border-t { border-color: #333 !important; } footer img { filter: invert(1) !important; } nav a, nav button, nav span { color: white !important; } nav img { filter: invert(1) !important; }`}</style>
    <div className="h-screen bg-black overflow-hidden relative">
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ zIndex: 1 }}>
        <div className="flex flex-col items-center" style={{ fontFamily: 'SatishSans, sans-serif', fontSize: '8vw', lineHeight: '0.8' }}>
          <span className="glitch" data-text="4">4</span>
          <span className="glitch" data-text="0">0</span>
          <span className="glitch" data-text="4">4</span>
        </div>
      </div>
      <div ref={imgRef} className="absolute inset-0" style={{ zIndex: 2, transformOrigin: 'center center' }}>
        <Image
          src="/images/404-asset.png"
          alt="404"
          fill
          className="object-cover"
        />
      </div>
    </div>
    </>
  )
}
