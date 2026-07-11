"use client"

import { useEffect, useRef, useState, useCallback } from 'react'

export default function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false)

  const ctxRef       = useRef<AudioContext | null>(null)
  const masterRef    = useRef<GainNode | null>(null)
  const oscRefs      = useRef<AudioNode[]>([])
  const bellTimer    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const introTimer   = useRef<ReturnType<typeof setTimeout> | null>(null)
  const introStarted = useRef(false)  // prevents double-start from timer + gesture race

  // ── Tanpura drone ────────────────────────────────────────────────
  const buildDrone = useCallback((ctx: AudioContext, master: GainNode) => {
    const Sa    = 65.41  // C2 fundamental
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
      osc.detune.value = (Math.random() - 0.5) * 4
      gain.gain.value = amps[i]

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

  // ── Temple bell ──────────────────────────────────────────────────
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
      gain.gain.linearRampToValueAtTime(weights[i], now + 0.004)
      gain.gain.exponentialRampToValueAtTime(0.00001, now + 5.5)
      osc.connect(gain)
      gain.connect(master)
      osc.start(now)
      osc.stop(now + 6)
    })
  }, [])

  // ── Recurring bell schedule (manual play mode) ───────────────────
  const scheduleBell = useCallback((ctx: AudioContext, master: GainNode) => {
    bellTimer.current = setTimeout(() => {
      ringBell(ctx, master)
      scheduleBell(ctx, master)
    }, 45000 + Math.random() * 30000)
  }, [ringBell])

  // ── Hard stop ────────────────────────────────────────────────────
  const stopAudio = useCallback((fadeTime = 1.5) => {
    if (bellTimer.current)  clearTimeout(bellTimer.current)
    if (introTimer.current) clearTimeout(introTimer.current)

    if (masterRef.current && ctxRef.current) {
      const now = ctxRef.current.currentTime
      masterRef.current.gain.linearRampToValueAtTime(0, now + fadeTime)
      const ctx = ctxRef.current
      setTimeout(() => {
        oscRefs.current.forEach(n => { try { (n as OscillatorNode).stop() } catch (_) {} })
        ctx.close()
        ctxRef.current  = null
        masterRef.current = null
        oscRefs.current = []
      }, (fadeTime + 0.3) * 1000)
    }

    setIsPlaying(false)
  }, [])

  // ── 5-second intro (auto on load) ───────────────────────────────
  const startIntro = useCallback(async () => {
    if (introStarted.current) return
    introStarted.current = true

    try {
      const AudioCtx = window.AudioContext
        ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      await ctx.resume()

      if (ctx.state !== 'running') {
        // Browser blocked autoplay — release so gesture fallback can try
        await ctx.close()
        introStarted.current = false
        return
      }

      ctxRef.current = ctx
      const master = ctx.createGain()
      master.gain.setValueAtTime(0, ctx.currentTime)
      master.gain.linearRampToValueAtTime(0.20, ctx.currentTime + 1.2)  // 1.2 s fade in
      master.connect(ctx.destination)
      masterRef.current = master

      oscRefs.current = buildDrone(ctx, master)
      setIsPlaying(true)

      // Bell at ~1.5 s into the intro
      setTimeout(() => {
        if (ctxRef.current && masterRef.current) ringBell(ctx, master)
      }, 1500)

      // Auto-stop after 5 s (fade out over 1.2 s before the 5 s mark)
      introTimer.current = setTimeout(() => stopAudio(1.2), 5000)

    } catch (_) {
      introStarted.current = false
    }
  }, [buildDrone, ringBell, stopAudio])

  // ── Manual start (infinite, with recurring bells) ────────────────
  const startManual = useCallback(async () => {
    try {
      const AudioCtx = window.AudioContext
        ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      await ctx.resume()
      ctxRef.current = ctx

      const master = ctx.createGain()
      master.gain.setValueAtTime(0, ctx.currentTime)
      master.gain.linearRampToValueAtTime(0.20, ctx.currentTime + 2)
      master.connect(ctx.destination)
      masterRef.current = master

      oscRefs.current = buildDrone(ctx, master)
      setIsPlaying(true)

      // First bell after 12–18 s, then recurring
      bellTimer.current = setTimeout(() => {
        ringBell(ctx, master)
        scheduleBell(ctx, master)
      }, 12000 + Math.random() * 6000)
    } catch (_) {}
  }, [buildDrone, ringBell, scheduleBell])

  // ── Button toggle ────────────────────────────────────────────────
  const toggle = useCallback(() => {
    if (isPlaying) stopAudio()
    else startManual()
  }, [isPlaying, stopAudio, startManual])

  // ── On mount: try autoplay, then gesture fallback ────────────────
  useEffect(() => {
    // Fire ~1.8 s after mount (loader exits at ~1.3 s, +0.5 s buffer)
    const autoTimer = setTimeout(startIntro, 1800)

    // If browser blocks autoplay, play on first user interaction instead
    const onGesture = () => startIntro()
    window.addEventListener('scroll',     onGesture, { once: true })
    window.addEventListener('click',      onGesture, { once: true })
    window.addEventListener('touchstart', onGesture, { once: true })

    return () => {
      clearTimeout(autoTimer)
      window.removeEventListener('scroll',     onGesture)
      window.removeEventListener('click',      onGesture)
      window.removeEventListener('touchstart', onGesture)
    }
  }, [startIntro])

  // ── Cleanup on unmount ───────────────────────────────────────────
  useEffect(() => () => {
    if (bellTimer.current)  clearTimeout(bellTimer.current)
    if (introTimer.current) clearTimeout(introTimer.current)
    oscRefs.current.forEach(n => { try { (n as OscillatorNode).stop() } catch (_) {} })
    ctxRef.current?.close()
  }, [])

  return (
    <button
      onClick={toggle}
      title={isPlaying ? 'Mute ambient sound' : 'Play ambient sound — tanpura & temple bells'}
      className="fixed bottom-6 right-6 z-[10000] flex items-center justify-center w-8 h-8 transition-all duration-300 hover:scale-110 select-none"
      style={{
        background:     isPlaying ? 'rgba(19,18,16,0.90)' : 'rgba(247,244,239,0.90)',
        border:         isPlaying ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.12)',
        backdropFilter: 'blur(10px)',
        boxShadow:      isPlaying ? '0 4px 20px rgba(0,0,0,0.35)' : '0 4px 16px rgba(0,0,0,0.08)',
      }}
    >
      {isPlaying ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="rgba(255,255,255,0.85)" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="rgba(255,255,255,0.15)" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="rgba(0,0,0,0.45)" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="rgba(0,0,0,0.06)" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}

      {isPlaying && (
        <span
          className="absolute inset-0 animate-ping pointer-events-none"
          style={{ background: 'rgba(196,165,94,0.18)', animationDuration: '2.4s' }}
        />
      )}
    </button>
  )
}
