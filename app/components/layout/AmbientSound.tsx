"use client"

import { useEffect, useRef, useState, useCallback } from 'react'

export default function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false)

  const ctxRef      = useRef<AudioContext | null>(null)
  const masterRef   = useRef<GainNode | null>(null)
  const oscRefs     = useRef<AudioNode[]>([])
  const bellTimer   = useRef<ReturnType<typeof setTimeout> | null>(null)
  const droneActive = useRef(false)   // prevents double-start

  // ── Tanpura drone — Sa fundamental + harmonics with LFO swell ───
  const buildDrone = useCallback((ctx: AudioContext, master: GainNode) => {
    const Sa    = 65.41
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

  // ── Temple bell — inharmonic partials, long decay ────────────────
  const ringBell = useCallback((ctx: AudioContext, master: GainNode) => {
    const partials = [440, 1213, 1946, 3044, 1212.16]
    const weights  = [0.06, 0.036, 0.022, 0.012, 0.020]
    const now = ctx.currentTime
    partials.forEach((freq, i) => {
      const osc  = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(weights[i], now + 0.004)
      gain.gain.exponentialRampToValueAtTime(0.00001, now + 6)
      osc.connect(gain)
      gain.connect(master)
      osc.start(now)
      osc.stop(now + 6.5)
    })
  }, [])

  // ── Recurring bell schedule (manual play mode only) ───────────────
  const scheduleBell = useCallback((ctx: AudioContext, master: GainNode) => {
    bellTimer.current = setTimeout(() => {
      ringBell(ctx, master)
      scheduleBell(ctx, master)
    }, 45000 + Math.random() * 30000)
  }, [ringBell])

  // ── Fully tear down audio ─────────────────────────────────────────
  const stopAudio = useCallback((fadeTime = 1.5) => {
    if (bellTimer.current) clearTimeout(bellTimer.current)
    droneActive.current = false

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

  // ── Start drone (called from gesture or manual button) ────────────
  const startDrone = useCallback(async () => {
    if (droneActive.current) return
    droneActive.current = true

    try {
      const AudioCtx = window.AudioContext
        ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      await ctx.resume()

      ctxRef.current = ctx
      const master = ctx.createGain()
      master.gain.setValueAtTime(0, ctx.currentTime)
      master.gain.linearRampToValueAtTime(0.20, ctx.currentTime + 1.5)  // 1.5 s fade in
      master.connect(ctx.destination)
      masterRef.current = master

      oscRefs.current = buildDrone(ctx, master)
      setIsPlaying(true)
    } catch (_) {
      droneActive.current = false
    }
  }, [buildDrone])

  // ── Manual start (infinite, with recurring bells) ─────────────────
  const startManual = useCallback(async () => {
    await startDrone()
    // Schedule bells for manual play
    if (ctxRef.current && masterRef.current) {
      const ctx    = ctxRef.current
      const master = masterRef.current
      bellTimer.current = setTimeout(() => {
        ringBell(ctx, master)
        scheduleBell(ctx, master)
      }, 12000 + Math.random() * 6000)
    }
  }, [startDrone, ringBell, scheduleBell])

  // ── Wire up loader events ─────────────────────────────────────────
  useEffect(() => {
    // 'ambient-start' fires on first tap/click anywhere on the loader screen
    const onStart = () => { startDrone() }

    // 'loader-exit' fires when progress hits 100% and loader begins sliding away
    const onLoaderExit = () => {
      if (!ctxRef.current || !masterRef.current) return
      const ctx    = ctxRef.current
      const master = masterRef.current

      // Ring the completion bell immediately
      ringBell(ctx, master)

      // Fade the drone out after the bell has time to ring (~3 s)
      setTimeout(() => stopAudio(2), 3000)
    }

    window.addEventListener('ambient-start', onStart)
    window.addEventListener('loader-exit',   onLoaderExit)

    return () => {
      window.removeEventListener('ambient-start', onStart)
      window.removeEventListener('loader-exit',   onLoaderExit)
    }
  }, [startDrone, ringBell, stopAudio])

  // ── Cleanup on unmount ────────────────────────────────────────────
  useEffect(() => () => {
    if (bellTimer.current) clearTimeout(bellTimer.current)
    oscRefs.current.forEach(n => { try { (n as OscillatorNode).stop() } catch (_) {} })
    ctxRef.current?.close()
  }, [])

  // ── Button toggle (after loading, for manual on/off) ─────────────
  const toggle = useCallback(() => {
    if (isPlaying) stopAudio()
    else startManual()
  }, [isPlaying, stopAudio, startManual])

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
