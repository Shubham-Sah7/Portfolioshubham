"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function LiquidGlassFilterV1() {
  const mapRef = useRef<SVGFEDisplacementMapElement>(null)
  const turbRef = useRef<SVGFETurbulenceElement>(null)

  useEffect(() => {
    const map = mapRef.current
    const turb = turbRef.current
    if (!map || !turb) return

    // Setup an infinite slow ripple base frequency animation
    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    tl.to(turb, {
      attr: { baseFrequency: "0.02 0.08" },
      duration: 8,
      ease: "sine.inOut"
    })

    // Listen to mousemove to add dynamic displacement scale
    const handleMouseMove = (e: MouseEvent) => {
      // Find the distance to center of screen
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx*dx + dy*dy)
      
      // Scale displacement based on cursor distance (higher warp when cursor is closer)
      const maxWarp = 22
      const targetScale = Math.max(0, (350 - dist) / 350) * maxWarp

      gsap.to(map, {
        attr: { scale: targetScale },
        duration: 0.4,
        ease: "power2.out"
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      tl.kill()
    }
  }, [])

  return (
    <svg className="absolute w-0 h-0 pointer-events-none select-none" style={{ visibility: "hidden" }}>
      <defs>
        <filter id="liquid-glass-lens" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            ref={turbRef}
            type="fractalNoise"
            baseFrequency="0.015 0.05"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap
            ref={mapRef}
            in="SourceGraphic"
            in2="noise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
}
