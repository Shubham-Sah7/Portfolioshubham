"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function GeometryGridV2() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    // Slow scroll-driven rotation of the geometric grids
    const anim = gsap.to(grid, {
      rotation: 25,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5
      }
    })

    return () => anim.scrollTrigger?.kill()
  }, [])

  return (
    <div
      ref={gridRef}
      className="absolute inset-0 w-full h-[120vh] pointer-events-none flex items-center justify-center overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <svg
        className="w-[900px] h-[900px] md:w-[1300px] md:h-[1300px] opacity-25"
        viewBox="0 0 1000 1000"
        fill="none"
        stroke="rgba(197, 160, 89, 0.12)"
        strokeWidth="0.75"
      >
        {/* Concentric Calibration Circles */}
        <circle cx="500" cy="500" r="100" strokeDasharray="3 3" />
        <circle cx="500" cy="500" r="250" />
        <circle cx="500" cy="500" r="380" strokeDasharray="6 4" />
        <circle cx="500" cy="500" r="480" />

        {/* Crosshair Lines */}
        <line x1="500" y1="20" x2="500" y2="980" strokeDasharray="4 4" />
        <line x1="20" y1="500" x2="980" y2="500" strokeDasharray="4 4" />

        {/* Diagonal Angle Guides */}
        <line x1="160" y1="160" x2="840" y2="840" opacity="0.5" />
        <line x1="840" y1="160" x2="160" y2="840" opacity="0.5" />

        {/* Tiny Compass ticks */}
        <path d="M 500 50 L 500 65 M 500 950 L 500 935 M 50 500 L 65 500 M 950 500 L 935 500" strokeWidth="1.5" />
        
        {/* Decorative corner crosshair markers */}
        <path d="M 120 500 A 380 380 0 0 1 500 120" stroke="rgba(197, 160, 89, 0.05)" strokeWidth="3" />
        <path d="M 880 500 A 380 380 0 0 0 500 120" stroke="rgba(197, 160, 89, 0.05)" strokeWidth="3" />
      </svg>
    </div>
  )
}
