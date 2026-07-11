"use client"

import { useEffect, useRef, useState, useCallback } from 'react'

export default function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false)
  const ctxRef    = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const oscRefs   = useRef<AudioNode[]>([])
  const bellTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Tanpura drone — fundamental + harmonics with slow LFO swell ──
  const buildDrone = useCallback((ctx: AudioContext, master: GainNode) => {
    const Sa   = 65.41  // C2 — deep, warm fundamental
    const harms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const amps  = [0.26, 0.20, 0.15, 0.11, 0.08, 0.06, 0.045, 0.03, 0.02, 0.015]
    const nodes: AudioNode[] = []

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 2000
    filter.Q.value = 0.4
    filter.connect(master)

    harms.forEach((h, i) => {
      const osc  = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = Sa * h
      osc.detune.value = (Math.random() - 0.5) * 4   // micro-detune for warmth
      gain.gain.value = amps[i]

      // Slow swell per partial — gives the characteristic tanpura pulse
      const lfo     = ctx.createOscillator()
      const lfoGain = ctx.createGain()
      lfo.type = 'sine'
      lfo.frequency.value = 0.065 + i * 0.009
      lfoGain.gain.value  = amps[i] * 0.38
      lfo.connect(lfoGain)
      lfoGain.connect(gain.gain)

      osc.connect(gain)
      gain.connect(filter)
      osc.start()
      lfo.start()
      nodes.push(osc, lfo)
    })

    return nodes
  }, [])

  // ── Temple bell — inharmonic partials, long exponential decay ──
  const ringBell = useCallback((ctx: AudioContext, master: GainNode) => {
    const partials = [440, 1213, 1946, 3044, 1212.16]
    const weights  = [0.055, 0.032, 0.020, 0.010, 0.018]
    const now = ctx.currentTime

    partials.forEach((freq, i) => {
      const osc  = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(weights[i], now + 0.004)   // instant strike
      gain.gain.exponentialRampToValueAtTime(0.00001, now + 5.5)   // long resonant decay
      osc.connect(gain)
      gain.connect(master)
      osc.start(now)
      osc.stop(now + 6)
    })
  }, [])

  // Schedule recurring bell pings (every 45–75 s, randomised)
  const scheduleBell = useCallback((ctx: AudioContext, master: GainNode) => {
    const wait = 45000 + Math.random() * 30000
    bellTimer.current = setTimeout(() => {
      ringBell(ctx, master)
      scheduleBell(ctx, master)
    }, wait)
  }, [ringBell])

  const start = useCallback(async () => {
    const AudioCtx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new AudioCtx()
    ctxRef.current = ctx

    const master = ctx.createGain()
    master.gain.setValueAtTime(0, ctx.currentTime)
    master.gain.linearRampToValueAtTime(0.20, ctx.currentTime + 3.5)  // 3.5 s fade in
    master.connect(ctx.destination)
    masterRef.current = master

    oscRefs.current = buildDrone(ctx, master)

    // First bell after 10–18 s, then recurring
    bellTimer.current = setTimeout(() => {
      ringBell(ctx, master)
      scheduleBell(ctx, master)
    }, 10000 + Math.random() * 8000)

    setIsPlaying(true)
  }, [buildDrone, ringBell, scheduleBell])

  const stop = useCallback(() => {
    if (bellTimer.current) clearTimeout(bellTimer.current)

    if (masterRef.current && ctxRef.current) {
      const now = ctxRef.current.currentTime
      masterRef.current.gain.linearRampToValueAtTime(0, now + 1.8)
      setTimeout(() => {
        oscRefs.current.forEach(n => { try { (n as OscillatorNode).stop() } catch (_) {} })
        ctxRef.current?.close()
        ctxRef.current  = null
        masterRef.current = null
        oscRefs.current = []
      }, 2000)
    }

    setIsPlaying(false)
  }, [])

  useEffect(() => () => {
    if (bellTimer.current) clearTimeout(bellTimer.current)
    oscRefs.current.forEach(n => { try { (n as OscillatorNode).stop() } catch (_) {} })
    ctxRef.current?.close()
  }, [])

  return (
    <button
      onClick={isPlaying ? stop : start}
      title={isPlaying ? 'Mute ambient sound' : 'Play ambient sound — tanpura & temple bells'}
      className="fixed bottom-6 right-6 z-[10000] flex items-center justify-center w-8 h-8 transition-all duration-300 hover:scale-110 select-none"
      style={{
        background:    isPlaying ? 'rgba(19,18,16,0.90)' : 'rgba(247,244,239,0.90)',
        border:        isPlaying ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.12)',
        backdropFilter: 'blur(10px)',
        boxShadow:     isPlaying
          ? '0 4px 20px rgba(0,0,0,0.35)'
          : '0 4px 16px rgba(0,0,0,0.08)',
      }}
    >
      {isPlaying ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="rgba(255,255,255,0.85)" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"
            fill="rgba(255,255,255,0.15)" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="rgba(0,0,0,0.45)" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"
            fill="rgba(0,0,0,0.06)" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}

      {/* Subtle breathing ring when playing */}
      {isPlaying && (
        <span
          className="absolute inset-0 animate-ping pointer-events-none"
          style={{ background: 'rgba(196,165,94,0.18)', animationDuration: '2.4s' }}
        />
      )}
    </button>
  )
}
