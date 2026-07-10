"use client"

import { useEffect, useRef, useState, useCallback } from 'react'

type Tool = 'pen' | 'marker' | 'magic' | 'eraser'

const COLORS = [
  '#000000', '#ef4444', '#f97316', '#eab308',
  '#22c55e', '#06b6d4', '#3b82f6', '#6366f1', '#ec4899',
]
const SIZES = [2, 4, 8, 13]

export default function Playground() {
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

  // ── init ──────────────────────────────────────────────────────
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

  // ── coords (CSS-space — ctx already dpr-scaled) ───────────────
  const pos = (e: React.MouseEvent | React.TouchEvent) => {
    const r = canvasRef.current!.getBoundingClientRect()
    const s = 'touches' in e ? e.touches[0] : (e as React.MouseEvent)
    return { x: s.clientX - r.left, y: s.clientY - r.top }
  }
  const g = () => canvasRef.current?.getContext('2d') ?? null

  // ── history ───────────────────────────────────────────────────
  const push = useCallback(() => {
    const c = canvasRef.current, ctx = g(); if (!c || !ctx) return
    const d = ctx.getImageData(0, 0, c.width, c.height)
    setHist(h => { const n = h.slice(0, hIdx + 1); n.push(d); return n })
    setHIdx(i => i + 1)
  }, [hIdx])

  const undo = useCallback(() => {
    if (hIdx <= 0) return
    g()?.putImageData(hist[hIdx - 1], 0, 0)
    setHIdx(i => i - 1)
  }, [hist, hIdx])

  const redo = useCallback(() => {
    if (hIdx >= hist.length - 1) return
    g()?.putImageData(hist[hIdx + 1], 0, 0)
    setHIdx(i => i + 1)
  }, [hist, hIdx])

  const clear = useCallback(() => {
    const c = canvasRef.current, ctx = g(); if (!c || !ctx) return
    ctx.clearRect(0, 0, c.clientWidth, c.clientHeight)
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

  // ── keys ──────────────────────────────────────────────────────
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT') return
      if (e.key === 'p' || e.key === 'P') setTool('pen')
      if (e.key === 'm' || e.key === 'M') setTool('marker')
      if (e.key === 'r' || e.key === 'R') setTool('magic')
      if (e.key === 'e' || e.key === 'E') setTool('eraser')
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') { e.preventDefault(); undo() }
      if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) { e.preventDefault(); redo() }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [undo, redo])

  // ── draw ──────────────────────────────────────────────────────
  const style = (ctx: CanvasRenderingContext2D) => {
    ctx.globalCompositeOperation = 'source-over'
    ctx.globalAlpha  = tool === 'marker' ? 0.35 : 1
    ctx.strokeStyle  = color
    ctx.fillStyle    = color
    ctx.lineWidth    = tool === 'marker' ? size * 4 : size
    ctx.lineCap      = 'round'
    ctx.lineJoin     = 'round'
  }

  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    const ctx = g(), c = canvasRef.current!; if (!ctx) return
    drawing.current = true
    const p = pos(e)
    startPos.current = p
    snapshot.current = ctx.getImageData(0, 0, c.width, c.height)
    if (tool === 'pen' || tool === 'marker') { style(ctx); ctx.beginPath(); ctx.moveTo(p.x, p.y) }
  }

  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    if (!drawing.current) return
    const ctx = g(); if (!ctx) return
    const p = pos(e)

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.globalAlpha = 1
      ctx.beginPath()
      ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2)
      ctx.fill()
      return
    }
    if (tool === 'pen' || tool === 'marker') {
      style(ctx); ctx.lineTo(p.x, p.y); ctx.stroke(); return
    }
    if (tool === 'magic' && snapshot.current && startPos.current) {
      const c = canvasRef.current!
      ctx.putImageData(snapshot.current, 0, 0)
      style(ctx); ctx.globalAlpha = 1; ctx.lineCap = 'square'
      ctx.beginPath()
      ctx.strokeRect(startPos.current.x, startPos.current.y, p.x - startPos.current.x, p.y - startPos.current.y)
    }
  }

  const onUp = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    if (!drawing.current) return
    drawing.current = false
    const ctx = g()
    if (ctx) { ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.beginPath() }
    push()
  }

  const cursor = tool === 'eraser' ? 'cursor-cell' : 'cursor-crosshair'

  const Divider = () => <div className="w-px h-5 bg-gray-200 mx-0.5" />

  return (
    <div className="fixed inset-0 bg-white" style={{ fontFamily: 'system-ui,-apple-system,sans-serif' }}>

      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-3 pb-2 z-20 pointer-events-none">

        {/* Left — title */}
        <div className="flex items-center gap-3 pointer-events-auto shrink-0">
          <span className="font-semibold text-sm text-gray-900">Footer Playground</span>
          <span className="text-xs text-gray-400 hidden lg:block">Autosaves • ⌘Z undo • P / M / R / E tools</span>
        </div>

        {/* Right — floating toolbar */}
        <div className="pointer-events-auto">
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur border border-gray-200 shadow-md rounded-2xl px-3 py-2">

            {/* Tools — bigger icons, strokeWidth 1.75 */}
            {([
              { id: 'pen'    as Tool, title: 'Pen (P)' },
              { id: 'marker' as Tool, title: 'Marker (M)' },
              { id: 'magic'  as Tool, title: 'Rectangle (R)' },
              { id: 'eraser' as Tool, title: 'Eraser (E)' },
            ]).map(t => (
              <button key={t.id} onClick={() => setTool(t.id)} title={t.title}
                className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${tool === t.id ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}>
                {t.id === 'pen'    && <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>}
                {t.id === 'marker' && <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1 1 2.48 1.02 3.5 1.02 2.2 0 3-1.8 3-3.04 0-1.67-1.33-3.02-1.5-3.02z"/></svg>}
                {t.id === 'magic'  && <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>}
                {t.id === 'eraser' && <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>}
              </button>
            ))}

            <Divider />

            {/* Sizes */}
            {SIZES.map(s => (
              <button key={s} onClick={() => setSize(s)} title={`Size ${s}`}
                className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${size === s ? 'bg-gray-100 ring-1 ring-gray-300' : 'hover:bg-gray-50'}`}>
                <div className="rounded-full bg-gray-900 transition-all"
                  style={{ width: Math.min(s * 2.4, 18), height: Math.min(s * 2.4, 18) }} />
              </button>
            ))}

            <Divider />

            {/* Colors */}
            {COLORS.map(c => (
              <button key={c} onClick={() => setColor(c)} title={c}
                className={`rounded-full transition-all hover:scale-110 ${color === c ? 'ring-2 ring-offset-1 ring-gray-400 scale-110' : ''}`}
                style={{ width: 24, height: 24, background: c, flexShrink: 0 }} />
            ))}

            {/* Custom */}
            <label title="Custom color"
              className={`rounded-full cursor-pointer hover:scale-110 transition-all overflow-hidden shrink-0 ${!COLORS.includes(color) ? 'ring-2 ring-offset-1 ring-gray-400 scale-110' : ''}`}
              style={{ width: 24, height: 24, background: 'conic-gradient(red,yellow,green,cyan,blue,magenta,red)', flexShrink: 0 }}>
              <input type="color" className="opacity-0 absolute w-0 h-0" value={color} onChange={e => setColor(e.target.value)} />
            </label>
          </div>
        </div>

      </div>

      {/* ── Canvas ─────────────────────────────────────────────── */}
      <div className="absolute inset-0">
        {grid && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.055) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.055) 1px,transparent 1px)',
            backgroundSize: '28px 28px',
          }} />
        )}
        <canvas ref={canvasRef}
          className={`absolute inset-0 w-full h-full ${cursor}`}
          style={{ touchAction: 'none' }}
          onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
          onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
        />
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────── */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-0.5 bg-white/95 backdrop-blur border border-gray-200 shadow-md rounded-2xl px-2.5 py-2">

          {/* Grid toggle */}
          <button onClick={() => setGrid(g => !g)} title="Toggle grid"
            className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${grid ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </button>

          {/* Undo */}
          <button onClick={undo} disabled={hIdx <= 0} title="Undo ⌘Z"
            className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-25 transition-all">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>
            </svg>
          </button>

          {/* Redo */}
          <button onClick={redo} disabled={hIdx >= hist.length - 1} title="Redo"
            className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-25 transition-all">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/>
            </svg>
          </button>

          {/* Clear */}
          <button onClick={clear} title="Clear canvas"
            className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
          </button>

          {/* Download */}
          <button onClick={download} title="Download PNG"
            className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v13"/><path d="m8 12 4 4 4-4"/><path d="M4 19h16"/>
            </svg>
          </button>

        </div>
      </div>
    </div>
  )
}
