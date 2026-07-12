"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function MultiColorBloomV2() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const blob1Ref = useRef<HTMLDivElement>(null)
  const blob2Ref = useRef<HTMLDivElement>(null)
  const blob3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const b1 = blob1Ref.current
    const b2 = blob2Ref.current
    const b3 = blob3Ref.current
    if (!b1 || !b2 || !b3) return

    // Position setters with different spring-like delays for organic movement
    const setB1X = gsap.quickTo(b1, "x", { duration: 0.7, ease: "power2.out" })
    const setB1Y = gsap.quickTo(b1, "y", { duration: 0.7, ease: "power2.out" })

    const setB2X = gsap.quickTo(b2, "x", { duration: 1.1, ease: "power3.out" })
    const setB2Y = gsap.quickTo(b2, "y", { duration: 1.1, ease: "power3.out" })

    const setB3X = gsap.quickTo(b3, "x", { duration: 1.5, ease: "power4.out" })
    const setB3Y = gsap.quickTo(b3, "y", { duration: 1.5, ease: "power4.out" })

    const handleMouseMove = (e: MouseEvent) => {
      // Center the blobs on the cursor
      setB1X(e.clientX - 150)
      setB1Y(e.clientY - 150)

      setB2X(e.clientX - 175)
      setB2Y(e.clientY - 175)

      setB3X(e.clientX - 200)
      setB3Y(e.clientY - 200)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none select-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Blob 1: Rose Gold */}
      <div
        ref={blob1Ref}
        className="absolute rounded-full filter blur-[70px] opacity-40 mix-blend-screen"
        style={{
          width: 300,
          height: 300,
          background: "radial-gradient(circle, rgba(224, 169, 109, 0.8) 0%, rgba(224, 169, 109, 0) 70%)",
          left: 0,
          top: 0
        }}
      />
      {/* Blob 2: Warm Amber */}
      <div
        ref={blob2Ref}
        className="absolute rounded-full filter blur-[90px] opacity-40 mix-blend-screen"
        style={{
          width: 350,
          height: 350,
          background: "radial-gradient(circle, rgba(244, 215, 144, 0.8) 0%, rgba(244, 215, 144, 0) 70%)",
          left: 0,
          top: 0
        }}
      />
      {/* Blob 3: Soft Amethyst Violet */}
      <div
        ref={blob3Ref}
        className="absolute rounded-full filter blur-[100px] opacity-35 mix-blend-screen"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(178, 144, 244, 0.6) 0%, rgba(178, 144, 244, 0) 70%)",
          left: 0,
          top: 0
        }}
      />
    </div>
  )
}
