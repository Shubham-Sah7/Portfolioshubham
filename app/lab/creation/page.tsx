"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { gsap } from "gsap"

export default function CreationOfAdam() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftHandRef = useRef<HTMLDivElement>(null)
  const rightHandRef = useRef<HTMLDivElement>(null)
  const annotationsRef = useRef<SVGSVGElement>(null)
  const sparkRef = useRef<HTMLDivElement>(null)

  const [progress, setProgress] = useState(0) // 0 (far apart) to 1 (touching)
  const [isSparked, setIsSparked] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Clean up body background style on unmount so it does not leak to other pages
  useEffect(() => {
    document.body.style.backgroundColor = "#dfd3bf"
    return () => {
      document.body.style.backgroundColor = ""
    }
  }, [])

  // Web Audio Synth Spark sound
  const playSparkSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      
      // Main oscillator for the zap zip
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      
      osc.type = "sawtooth"
      osc.frequency.setValueAtTime(100, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.12)
      
      // Noise filter node for crackle texture
      const bufferSize = ctx.sampleRate * 0.1
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1
      }
      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      
      const noiseFilter = ctx.createBiquadFilter()
      noiseFilter.type = "bandpass"
      noiseFilter.frequency.value = 1000
      
      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0.08, ctx.currentTime)
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
      
      gain.gain.setValueAtTime(0.18, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16)
      
      // Connections
      osc.connect(gain)
      gain.connect(ctx.destination)
      
      noise.connect(noiseFilter)
      noiseFilter.connect(noiseGain)
      noiseGain.connect(ctx.destination)
      
      osc.start()
      noise.start()
      osc.stop(ctx.currentTime + 0.2)
      noise.stop(ctx.currentTime + 0.2)
    } catch (e) {
      console.warn("Audio Context blocked or not supported: ", e)
    }
  }

  // Pointer movement tracking
  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      setHasInteracted(true)
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
      const width = window.innerWidth
      const centerX = width / 2

      // Calculate progress based on distance to center
      // Max distance is half-screen. Progress reaches 1 at the center.
      const dist = Math.abs(clientX - centerX)
      const maxDist = width / 2
      const computedProgress = Math.max(0, Math.min(1, 1 - dist / (maxDist * 0.75)))
      
      setProgress(computedProgress)
    }

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("touchmove", handleMove, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("touchmove", handleMove)
    }
  }, [])

  // Spark state detection & trigger
  useEffect(() => {
    if (progress > 0.95) {
      if (!isSparked) {
        setIsSparked(true)
        playSparkSound()
        
        // Trigger subtle screen shake
        if (containerRef.current) {
          gsap.fromTo(containerRef.current, 
            { x: -3, y: -3 },
            { x: 0, y: 0, duration: 0.15, ease: "rough({strength: 3, points: 8})", repeat: 2 }
          )
        }

        // Trigger flash effect
        if (sparkRef.current) {
          gsap.fromTo(sparkRef.current,
            { opacity: 1, scale: 0.8 },
            { opacity: 0, scale: 2.2, duration: 0.5, ease: "power2.out" }
          )
        }
      }
    } else {
      if (isSparked) {
        setIsSparked(false)
      }
    }
  }, [progress, isSparked])

  // Translate progress into positions
  const maxGodTranslate = 95 // px to move God's hand right
  const maxAdamTranslate = 100 // px to move Adam's hand left

  const godX = progress * maxGodTranslate
  const adamX = -progress * maxAdamTranslate

  // Subtle vertical drift
  const godY = progress * 8
  const adamY = -progress * 6

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden select-none flex flex-col justify-between p-6"
      style={{
        backgroundColor: "#dfd3bf",
        backgroundImage: `
          linear-gradient(rgba(94, 139, 117, 0.11) 1px, transparent 1px),
          linear-gradient(90deg, rgba(94, 139, 117, 0.11) 1px, transparent 1px)
        `,
        backgroundSize: "24px 24px",
      }}
    >
      {/* ── Top Header Bar ────────────────────────────────────────── */}
      <header className="relative w-full max-w-5xl mx-auto flex items-center justify-between z-50">
        <Link 
          href="/" 
          className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800/80 hover:text-emerald-950 uppercase tracking-widest transition-colors duration-300"
          style={{ fontFamily: "FunnelDisplay, sans-serif" }}
        >
          ← Back to Portfolio
        </Link>
        <span 
          className="text-[10px] text-emerald-800/60 font-mono tracking-wider"
        >
          LAB EXP. 07 // CREATION OF ADAM
        </span>
      </header>

      {/* ── Main Canvas Stage ────────────────────────────────────── */}
      <main className="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center overflow-visible">
        
        {/* Interactive Instruction Banner */}
        {!hasInteracted && (
          <div 
            className="absolute top-1/6 text-center animate-bounce z-40 bg-[#dfd3bf] px-4 py-1.5 border border-emerald-800/20 text-emerald-800/60 text-xs tracking-widest uppercase font-light"
            style={{ fontFamily: "FunnelDisplay, sans-serif" }}
          >
            Move Cursor or Drag horizontally to align fingers
          </div>
        )}

        {/* Dynamic Schematic Lines (SVG Overlay) */}
        <svg
          ref={annotationsRef}
          className="absolute inset-0 w-full h-full pointer-events-none select-none z-10 text-emerald-800/40"
          style={{ mixBlendMode: "multiply" }}
        >
          {/* Main Top Dimension Line */}
          <line x1="20%" y1="28%" x2="80%" y2="28%" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 20% 28% l 8 -4 v 8 z" fill="currentColor" />
          <path d="M 80% 28% l -8 -4 v 8 z" fill="currentColor" />
          <text 
            x="50%" 
            y="26%" 
            textAnchor="middle" 
            className="text-[9px] font-mono tracking-widest fill-emerald-800/70"
          >
            SPAN: 12.5 IN // DISTANCE: {((1 - progress) * 12.5).toFixed(1)} IN
          </text>

          {/* Left Angle Arc and annotation */}
          <path 
            d="M 25% 42% A 40 40 0 0 1 29% 49%" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1" 
          />
          <text 
            x="30%" 
            y="43%" 
            className="text-[8px] font-mono fill-emerald-800/60"
          >
            25° ANGLE
          </text>

          {/* Vertical Fingertip Distance Marker */}
          <g className={`transition-opacity duration-300 ${progress > 0.6 ? "opacity-100" : "opacity-30"}`}>
            <line x1="50%" y1="38%" x2="50%" y2="58%" stroke="currentColor" strokeWidth="1" />
            <path d="M 50% 38% l -4 8 h 8 z" fill="currentColor" />
            <path d="M 50% 58% l -4 -8 h 8 z" fill="currentColor" />
            <text 
              x="53%" 
              y="49%" 
              className="text-[8px] font-mono fill-emerald-800/60"
            >
              8.2 IN (GAP)
            </text>
          </g>

          {/* Spark Life Header Text Overlay */}
          <text
            x="50%"
            y="76%"
            textAnchor="middle"
            className={`text-sm tracking-[0.2em] font-semibold transition-all duration-300 ${
              isSparked ? "fill-emerald-950 font-bold" : "fill-emerald-800/40"
            }`}
            style={{ fontFamily: "FunnelDisplay, sans-serif" }}
          >
            {isSparked ? "⚡ SPARK LIFE ⚡" : "SPARK LIFE"}
          </text>
        </svg>

        {/* ── Left Hand: God ── */}
        <div
          ref={leftHandRef}
          className="absolute left-0 w-2/5 max-w-[380px] aspect-square transition-transform duration-200 ease-out z-20 flex items-center justify-end"
          style={{
            transform: `translateX(${godX}px) translateY(${godY}px)`,
          }}
        >
          <div className="relative w-full h-full flex items-center justify-end overflow-visible">
            {/* The cloud graphic anchor */}
            <span className="absolute left-4 text-[9px] font-mono text-emerald-800/50 tracking-widest transform -rotate-90">
              DIVINE POWER
            </span>
            <Image
              src="/images/lab/hand_god_sketch.png"
              alt="Hand of God Sketch"
              width={400}
              height={400}
              className="object-contain w-full h-auto block select-none pointer-events-none"
              style={{ mixBlendMode: "multiply" }}
              priority
            />
          </div>
        </div>

        {/* ── Center Spark Burst Effect ── */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex items-center justify-center overflow-visible"
          style={{ width: 60, height: 60 }}
        >
          {/* Constant faint pulse */}
          <div className={`absolute w-4 h-4 rounded-full bg-emerald-600/10 blur-[4px] animate-ping duration-1000 ${isSparked ? "hidden" : "block"}`} />
          
          {/* Active lightning spark flash */}
          <div
            ref={sparkRef}
            className="absolute rounded-full bg-amber-200 blur-[8px] opacity-0"
            style={{
              width: 50,
              height: 50,
              boxShadow: "0 0 20px 10px rgba(52, 211, 153, 0.6), 0 0 40px 20px rgba(251, 243, 219, 0.4)",
            }}
          />

          {/* Spark star shape */}
          <div className={`transition-all duration-300 ${isSparked ? "scale-100 opacity-100 rotate-45" : "scale-0 opacity-0"}`}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-emerald-700">
              <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10Z" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* ── Right Hand: Adam ── */}
        <div
          ref={rightHandRef}
          className="absolute right-0 w-2/5 max-w-[380px] aspect-square transition-transform duration-200 ease-out z-20 flex items-center justify-start"
          style={{
            transform: `translateX(${adamX}px) translateY(${adamY}px)`,
          }}
        >
          <div className="relative w-full h-full flex items-center justify-start overflow-visible">
            <span className="absolute right-4 text-[9px] font-mono text-emerald-800/50 tracking-widest transform rotate-90">
              HUMANITY
            </span>
            <Image
              src="/images/lab/hand_adam_sketch.png"
              alt="Hand of Adam Sketch"
              width={400}
              height={400}
              className="object-contain w-full h-auto block select-none pointer-events-none"
              style={{ mixBlendMode: "multiply" }}
              priority
            />
          </div>
        </div>

      </main>

      {/* ── Footer Info ── */}
      <footer className="relative w-full max-w-5xl mx-auto flex items-center justify-between text-[9px] font-mono text-emerald-800/50 z-50">
        <span>© {new Date().getFullYear()} SHUBHAM SAH</span>
        <span>TOUCH/DRAG HORIZONTALLY TO SPARK LIFE</span>
      </footer>
    </div>
  )
}
