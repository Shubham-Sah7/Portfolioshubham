"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  size: number
}

export default function LightningStrikeV2() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000, lastMoveTime: 0 })
  const sparksRef = useRef<Spark[]>([])
  
  // Flash overlay state
  const [flashOpacity, setFlashOpacity] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Midpoint Displacement Jagged Line Generator
    const getLightningPath = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      displace: number
    ): { x: number; y: number }[] => {
      const points = [{ x: x1, y: y1 }, { x: x2, y: y2 }]
      let iterations = 5

      for (let i = 0; i < iterations; i++) {
        let len = points.length
        for (let j = len - 1; j > 0; j--) {
          const p1 = points[j]
          const p2 = points[j - 1]
          const midX = (p1.x + p2.x) / 2
          const midY = (p1.y + p2.y) / 2

          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const normalX = -dy
          const normalY = dx
          const normalLength = Math.sqrt(normalX * normalX + normalY * normalY)

          const nx = normalX / normalLength
          const ny = normalY / normalLength

          const offset = (Math.random() - 0.5) * displace
          const newPt = {
            x: midX + nx * offset,
            y: midY + ny * offset
          }

          points.splice(j, 0, newPt)
        }
        displace *= 0.5
      }

      return points
    }

    const drawBolt = (
      context: CanvasRenderingContext2D,
      path: { x: number; y: number }[],
      color: string,
      glowColor: string,
      width: number
    ) => {
      context.beginPath()
      context.moveTo(path[0].x, path[0].y)
      for (let i = 1; i < path.length; i++) {
        context.lineTo(path[i].x, path[i].y)
      }
      context.strokeStyle = glowColor
      context.lineWidth = width * 4.5
      context.shadowBlur = 15
      context.shadowColor = glowColor
      context.stroke()

      context.beginPath()
      context.moveTo(path[0].x, path[0].y)
      for (let i = 1; i < path.length; i++) {
        context.lineTo(path[i].x, path[i].y)
      }
      context.strokeStyle = color
      context.lineWidth = width
      context.shadowBlur = 0
      context.stroke()
    }

    const triggerClickSparks = (x: number, y: number) => {
      // Spawn a burst of 35 gravity-affected sparks on click
      for (let i = 0; i < 35; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 5 + 2
        sparksRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2, // shoot upwards initially
          alpha: 1.0,
          size: Math.random() * 2.5 + 1.2
        })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        lastMoveTime: Date.now()
      }

      // 10% chance to spawn a few sparks on move
      if (Math.random() < 0.3) {
        sparksRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3 - 1,
          alpha: 1.0,
          size: Math.random() * 2 + 1
        })
      }
    }

    const handleClick = (e: MouseEvent) => {
      triggerClickSparks(e.clientX, e.clientY)

      // Trigger full screen flash overlay
      setFlashOpacity(0.12)
      gsap.to({ val: 0.12 }, {
        val: 0,
        duration: 0.25,
        onUpdate: function() {
          setFlashOpacity(this.targets()[0].val)
        }
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const leftFinger = document.getElementById("left-fingertip")
      const rightFinger = document.getElementById("right-fingertip")
      const mouse = mouseRef.current

      // Check if mouse is active (moved in the last 1.2 seconds)
      const isMouseActive = Date.now() - mouse.lastMoveTime < 1200

      if (leftFinger && rightFinger && mouse.x > 0 && isMouseActive) {
        const r1 = leftFinger.getBoundingClientRect()
        const r2 = rightFinger.getBoundingClientRect()

        const fx1 = r1.left + r1.width / 2
        const fy1 = r1.top + r1.height / 2
        const fx2 = r2.left + r2.width / 2
        const fy2 = r2.top + r2.height / 2

        // Draw lightning bolts striking the cursor
        if (Math.random() < 0.65) {
          const pathLeft = getLightningPath(fx1, fy1, mouse.x, mouse.y, 45)
          drawBolt(ctx, pathLeft, "#ffffff", "rgba(168, 85, 247, 0.55)", 1.6) // Purple glow

          const pathRight = getLightningPath(fx2, fy2, mouse.x, mouse.y, 45)
          drawBolt(ctx, pathRight, "#ffffff", "rgba(59, 130, 246, 0.55)", 1.6) // Blue glow
        }

        // Draw glowing point at cursor
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 1, mouse.x, mouse.y, 12)
        grad.addColorStop(0, "rgba(255, 255, 255, 1)")
        grad.addColorStop(0.4, "rgba(168, 85, 247, 0.8)")
        grad.addColorStop(1, "rgba(168, 85, 247, 0)")
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 12, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }

      // Update and Draw Sparks with Gravity
      const sparks = sparksRef.current
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.x += s.vx
        s.y += s.vy
        s.vy += 0.16 // Gravity pull down
        s.alpha -= 0.025 // Fade

        if (s.alpha <= 0 || s.y > canvas.height) {
          sparks.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(244, 215, 144, ${s.alpha})` // Gold sparks cascading
        ctx.fill()
      }

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <>
      {/* Full-screen Flash Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none transition-opacity select-none"
        style={{ 
          zIndex: 12, 
          backgroundColor: "#ffffff", 
          opacity: flashOpacity,
          mixBlendMode: "screen"
        }}
      />
      {/* Dynamic Lightning Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-screen h-screen pointer-events-none"
        style={{ zIndex: 11 }}
      />
    </>
  )
}
