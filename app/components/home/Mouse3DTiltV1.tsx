"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Mouse3DTiltV1({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const wrapper = wrapperRef.current
    if (!container || !wrapper) return

    // Quick setters for smooth dampened animations
    const setRotateX = gsap.quickTo(wrapper, "rotateX", { duration: 0.6, ease: "power2.out" })
    const setRotateY = gsap.quickTo(wrapper, "rotateY", { duration: 0.6, ease: "power2.out" })
    const setX = gsap.quickTo(wrapper, "x", { duration: 0.6, ease: "power2.out" })
    const setY = gsap.quickTo(wrapper, "y", { duration: 0.6, ease: "power2.out" })

    const handleMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth
      const h = window.innerHeight
      
      // Normalized coords from -1 to 1
      const nx = (e.clientX / w) - 0.5
      const ny = (e.clientY / h) - 0.5

      // Tilt angles: max 8 degrees rotation
      setRotateX(-ny * 8)
      setRotateY(nx * 8)

      // Slight translational shift: max 15px drift
      setX(nx * 15)
      setY(ny * 15)
    }

    const handleMouseLeave = () => {
      // Reset smoothly when cursor leaves window
      setRotateX(0)
      setRotateY(0)
      setX(0)
      setY(0)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative"
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d"
      }}
    >
      <div
        ref={wrapperRef}
        className="w-full h-full relative flex flex-col justify-center items-center"
        style={{
          transformStyle: "preserve-3d"
        }}
      >
        {children}
      </div>
    </div>
  )
}
