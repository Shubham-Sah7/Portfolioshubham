"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  baseAlpha: number
}

export default function MouseParticlesV1() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    const particleCount = 60

    const initCanvas = () => {
      const parent = canvas.parentElement
      canvas.width = parent ? parent.clientWidth : window.innerWidth
      canvas.height = parent ? parent.clientHeight : window.innerHeight
    }

    const initParticles = () => {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 1.5 + 0.8
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4 - 0.1, // Slight upward drift
          radius,
          alpha: Math.random() * 0.4 + 0.1,
          baseAlpha: Math.random() * 0.4 + 0.1
        })
      }
    }

    initCanvas()
    initParticles()

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    const handleResize = () => {
      initCanvas()
      initParticles()
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mouse = mouseRef.current

      particles.forEach((p) => {
        // Drift
        p.x += p.vx
        p.y += p.vy

        // Wrap around screen
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Repulsion from cursor
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const repelDist = 120

        if (dist < repelDist) {
          const force = (repelDist - dist) / repelDist
          const angle = Math.atan2(dy, dx)
          // Smoothly push particle away
          p.x += Math.cos(angle) * force * 3
          p.y += Math.sin(angle) * force * 3
          // Slightly brighten particle when near cursor
          p.alpha = Math.min(p.baseAlpha + force * 0.4, 0.8)
        } else {
          // Fade back to base alpha
          p.alpha += (p.baseAlpha - p.alpha) * 0.05
        }

        // Draw particle (Warm gold colour)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(197, 160, 89, ${p.alpha})`
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
