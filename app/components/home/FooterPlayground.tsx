"use client"

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'

type Tool = 'pen' | 'marker' | 'rect' | 'eraser'

const COLORS = [
  '#000000', '#ef4444', '#f97316', '#eab308',
  '#22c55e', '#06b6d4', '#3b82f6', '#6366f1', '#ec4899',
]
const SIZES = [2, 4, 8, 13]

const Divider = () => <div className="w-px h-5 bg-gray-200 mx-0.5 shrink-0" />

export default function FooterPlayground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing   = useRef(false)
  const startPos  = useRef<{ x: number; y: number } | null>(null)
  const snapshot  = useRef<ImageData | null>(null)

  const [tool,  setTool]  = useState<Tool>('pen')
  const [color, setColor] = useState('#000000')
  const [size,  setSize]  = useState(4)
  const [grid,  setGrid]  = useState(true)
  const [hist,  setHist]  = useState<ImageData[]>([])
  const [hIdx,  setHIdx]  = useState(-1)

  // ── Canvas init ───────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current!
    const dpr    = window.devicePixelRatio || 1
    const init   = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight
      if (!w || !h) { requestAnimationFrame(init); return }
      canvas.width  = w * dpr
      canvas.height = h * dpr
      const g = canvas.getContext('2d')!
      g.scale(dpr, dpr)
      setHist([g.getImageData(0, 0, canvas.width, canvas.height)])
      setHIdx(0)
    }
    requestAnimationFrame(init)
  }, [])

  const pos = (e: React.MouseEvent | React.TouchEvent) => {
    const r = canvasRef.current!.getBoundingClientRect()
    const s = 'touches' in e ? e.touches[0] : (e as React.MouseEvent)
    return { x: s.clientX - r.left, y: s.clientY - r.top }
  }
  const ctx = () => canvasRef.current?.getContext('2d') ?? null

  // ── History ────────────────────────────────────────────────────
  const push = useCallback(() => {
    const c = canvasRef.current, g = ctx(); if (!c || !g) return
    const d = g.getImageData(0, 0, c.width, c.height)
    setHist(h => { const n = h.slice(0, hIdx + 1); n.push(d); return n })
    setHIdx(i => i + 1)
  }, [hIdx])

  const undo = useCallback(() => {
    if (hIdx <= 0) return
    ctx()?.putImageData(hist[hIdx - 1], 0, 0)
    setHIdx(i => i - 1)
  }, [hist, hIdx])

  const redo = useCallback(() => {
    if (hIdx >= hist.length - 1) return
    ctx()?.putImageData(hist[hIdx + 1], 0, 0)
    setHIdx(i => i + 1)
  }, [hist, hIdx])

  const clear = useCallback(() => {
    const c = canvasRef.current, g = ctx(); if (!c || !g) return
    g.clearRect(0, 0, c.clientWidth, c.clientHeight)
    push()
  }, [push])

  const download = () => {
    const c = canvasRef.current; if (!c) return
    const t = document.createElement('canvas')
    t.width = c.width; t.height = c.height
    const x = t.getContext('2d')!
    x.fillStyle = '#fff'; x.fillRect(0, 0, t.width, t.height)
    x.drawImage(c, 0, 0)
    Object.assign(document.createElement('a'), { download: 'playground.png', href: t.toDataURL() }).click()
  }

  // ── Keys ──────────────────────────────────────────────────────
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT') return
      if (e.key === 'p' || e.key === 'P') setTool('pen')
      if (e.key === 'm' || e.key === 'M') setTool('marker')
      if (e.key === 'r' || e.key === 'R') setTool('rect')
      if (e.key === 'e' || e.key === 'E') setTool('eraser')
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') { e.preventDefault(); undo() }
      if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) { e.preventDefault(); redo() }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [undo, redo])

  // ── Draw ──────────────────────────────────────────────────────
  const applyStyle = (g: CanvasRenderingContext2D) => {
    g.globalCompositeOperation = 'source-over'
    g.globalAlpha  = tool === 'marker' ? 0.35 : 1
    g.strokeStyle  = color
    g.fillStyle    = color
    g.lineWidth    = tool === 'marker' ? size * 4 : size
    g.lineCap      = 'round'
    g.lineJoin     = 'round'
  }

  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    const g = ctx(), c = canvasRef.current!; if (!g) return
    drawing.current = true
    const p = pos(e)
    startPos.current = p
    snapshot.current = g.getImageData(0, 0, c.width, c.height)
    if (tool === 'pen' || tool === 'marker') { applyStyle(g); g.beginPath(); g.moveTo(p.x, p.y) }
  }

  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    if (!drawing.current) return
    const g = ctx(); if (!g) return
    const p = pos(e)
    if (tool === 'eraser') {
      g.globalCompositeOperation = 'destination-out'
      g.globalAlpha = 1
      g.beginPath(); g.arc(p.x, p.y, size * 3, 0, Math.PI * 2); g.fill()
      return
    }
    if (tool === 'pen' || tool === 'marker') {
      applyStyle(g); g.lineTo(p.x, p.y); g.stroke(); return
    }
    if (tool === 'rect' && snapshot.current && startPos.current) {
      const c = canvasRef.current!
      g.putImageData(snapshot.current, 0, 0)
      applyStyle(g); g.globalAlpha = 1; g.lineCap = 'square'
      g.beginPath()
      g.strokeRect(startPos.current.x, startPos.current.y, p.x - startPos.current.x, p.y - startPos.current.y)
    }
  }

  const onUp = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    if (!drawing.current) return
    drawing.current = false
    const g = ctx()
    if (g) { g.globalAlpha = 1; g.globalCompositeOperation = 'source-over'; g.beginPath() }
    push()
  }

  const cursor = tool === 'eraser' ? 'cursor-cell' : 'cursor-crosshair'

  return (
    <div style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>

      {/* ── Section header (matches workGallery / proposalsGallery style) */}
      <div className="px-6 md:px-10 pb-8 md:pb-10 overflow-hidden max-w-5xl mx-auto">
        <div className="relative">
          <div className="absolute inset-x-0 border-t border-gray-300" style={{ top: '50%' }} />
          <div className="relative flex items-baseline justify-center gap-2">
            <h2 className="relative bg-white pr-3 text-2xl md:text-3xl font-light text-black shrink-0 whitespace-nowrap">
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em' }}>F</span>
              <span style={{ fontFamily: 'SatishSans, sans-serif' }}>ooter </span>
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em' }}>P</span>
              <span style={{ fontFamily: 'SatishSans, sans-serif' }}>layground</span>
            </h2>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <p className="text-xs text-gray-400" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
            <span className="hidden md:inline">Draw, sketch, mess around — P / M / R / E tools · ⌘Z undo</span>
            <span className="md:hidden">Draw freely on the canvas</span>
          </p>
          <Link href="/lab/playground"
            className="text-xs text-gray-400 hover:text-gray-800 transition-colors duration-200 flex items-center gap-1 shrink-0"
            style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
            Open full draw
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* ── Canvas container — full bleed ────────────────────────── */}
      <div className="relative border-t border-gray-200 w-full" style={{ height: 560 }}>

        {/* Toolbar — full-width scrollable on mobile, right-anchored on desktop */}
        <div className="absolute top-3 left-2 right-2 md:left-auto md:right-3 z-10">
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur border border-gray-200 shadow-md rounded-2xl px-2 md:px-2.5 py-1.5 md:py-2 overflow-x-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

            {/* Tools */}
            {(['pen', 'marker', 'rect', 'eraser'] as Tool[]).map(t => (
              <button key={t} onClick={() => setTool(t)} title={t}
                className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all shrink-0 ${tool === t ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}>
                {t === 'pen'    && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>}
                {t === 'marker' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1 1 2.48 1.02 3.5 1.02 2.2 0 3-1.8 3-3.04 0-1.67-1.33-3.02-1.5-3.02z"/></svg>}
                {t === 'rect'   && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>}
                {t === 'eraser' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>}
              </button>
            ))}

            <Divider />

            {/* Sizes */}
            {SIZES.map(s => (
              <button key={s} onClick={() => setSize(s)}
                className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all shrink-0 ${size === s ? 'bg-gray-100 ring-1 ring-gray-300' : 'hover:bg-gray-50'}`}>
                <div className="rounded-full bg-gray-900" style={{ width: Math.min(s * 2.4, 18), height: Math.min(s * 2.4, 18) }} />
              </button>
            ))}

            <Divider />

            {/* Colors */}
            {COLORS.map(c => (
              <button key={c} onClick={() => setColor(c)}
                className={`rounded-full transition-all hover:scale-110 shrink-0 ${color === c ? 'ring-2 ring-offset-1 ring-gray-400 scale-110' : ''}`}
                style={{ width: 22, height: 22, background: c }} />
            ))}
            <label className={`rounded-full cursor-pointer hover:scale-110 transition-all overflow-hidden shrink-0 ${!COLORS.includes(color) ? 'ring-2 ring-offset-1 ring-gray-400 scale-110' : ''}`}
              style={{ width: 22, height: 22, background: 'conic-gradient(red,yellow,green,cyan,blue,magenta,red)' }}>
              <input type="color" className="opacity-0 absolute w-0 h-0" value={color} onChange={e => setColor(e.target.value)} />
            </label>
          </div>
        </div>

        {/* Grid */}
        {grid && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.05) 1px,transparent 1px)',
            backgroundSize: '28px 28px',
          }} />
        )}

        {/* Canvas */}
        <canvas ref={canvasRef}
          className={`absolute inset-0 w-full h-full ${cursor}`}
          style={{ touchAction: 'none' }}
          onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
          onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
        />

        {/* Bottom controls */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
          <div className="flex items-center gap-0.5 bg-white/95 backdrop-blur border border-gray-200 shadow-md rounded-2xl px-2.5 py-2">
            <button onClick={() => setGrid(g => !g)} title="Toggle grid"
              className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all ${grid ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            </button>
            <button onClick={undo} disabled={hIdx <= 0} title="Undo ⌘Z"
              className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-25 transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>
              </svg>
            </button>
            <button onClick={redo} disabled={hIdx >= hist.length - 1} title="Redo"
              className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-25 transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/>
              </svg>
            </button>
            <button onClick={clear} title="Clear"
              className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
              </svg>
            </button>
            <button onClick={download} title="Download PNG"
              className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v13"/><path d="m8 12 4 4 4-4"/><path d="M4 19h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
