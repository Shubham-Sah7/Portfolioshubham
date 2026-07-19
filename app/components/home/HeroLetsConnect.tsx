"use client"

import { useEffect, useRef, useState } from 'react'

const EMAIL = 'sahshubham953@gmail.com'

const BranchPlus = ({ h, v }: { h: 'left' | 'right'; v: 'top' | 'bottom' }) => (
  <svg
    width="11" height="11" viewBox="0 0 11 11" fill="none"
    className="absolute select-none pointer-events-none text-zinc-400 group-hover/card:text-zinc-950 transition-colors duration-500"
    style={{ [h]: '-6px', [v]: '-6px', zIndex: 10 }}
  >
    <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1" />
  </svg>
)

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#6b7280">
    <path d="M358.27-260q-28.44 0-48.35-19.92Q290-299.83 290-328.27v-455.38q0-28.44 19.92-48.36 19.91-19.91 48.35-19.91h335.38q28.44 0 48.36 19.91 19.91 19.92 19.91 48.36v455.38q0 28.44-19.91 48.35Q722.09-260 693.65-260H358.27Zm0-55.96h335.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.47-3.84-3.84-8.46-3.84H358.27q-4.62 0-8.46 3.84-3.85 3.85-3.85 8.47v455.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM226.35-128.08q-28.44 0-48.36-19.92-19.91-19.91-19.91-48.35v-511.34h55.96v511.34q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h391.34v55.96H226.35Zm119.61-187.88v-480 480Z"/>
  </svg>
)

const TickIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="white">
    <path d="M382.81-258.69 175.08-466.42l40.04-40.04 167.69 167.88 362.27-362.27 39.84 40.04-402.11 402.12Z"/>
  </svg>
)

export default function HeroLetsConnect() {
  const [hovered, setHovered] = useState(false)
  const [copied,  setCopied]  = useState(false)
  const hoveredRef = useRef(false)
  const leftRef    = useRef<HTMLDivElement>(null)
  const rightRef   = useRef<HTMLDivElement>(null)

  useEffect(() => { hoveredRef.current = hovered }, [hovered])

  useEffect(() => {
    const update = () => {
      const deg = Math.min(window.scrollY / 60, 8)
      const h = hoveredRef.current
      if (leftRef.current)  leftRef.current.style.transform = `translateX(${h ? -10 : 0}px) rotate(-${deg}deg)`
      if (rightRef.current) rightRef.current.style.transform = `translateX(${h ? 10 : 0}px) rotate(-${deg}deg)`
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    const deg = Math.min(window.scrollY / 60, 8)
    if (leftRef.current)  leftRef.current.style.transform = `translateX(${hovered ? -10 : 0}px) rotate(-${deg}deg)`
    if (rightRef.current) rightRef.current.style.transform = `translateX(${hovered ? 10 : 0}px) rotate(-${deg}deg)`
  }, [hovered])

  const handleCopy = () => {
    // Try modern clipboard API, fall back to execCommand
    if (navigator.clipboard) {
      navigator.clipboard.writeText(EMAIL).catch(() => {
        fallbackCopy()
      })
    } else {
      fallbackCopy()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const fallbackCopy = () => {
    try {
      const el = document.createElement('textarea')
      el.value = EMAIL
      el.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;'
      document.body.appendChild(el)
      el.focus()
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    } catch { /* silent */ }
  }

  return (
    <div
      className="flex justify-center items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left branch — pointer-events-none so it never intercepts clicks */}
      <div
        ref={leftRef}
        style={{
          width: '120px', height: '60px', position: 'relative', flexShrink: 0,
          marginRight: '-55px', zIndex: 1, transition: 'transform 0.6s ease',
          pointerEvents: 'none',
        }}
      >
        <img
          src="/images/HomeImages/branch.svg"
          aria-hidden="true"
          style={{
            position: 'absolute', top: '50%', left: '50%',
            height: '120px', width: 'auto',
            transform: 'translate(-50%, -50%) rotate(90deg)',
            filter: 'brightness(0) opacity(0.75)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Email copy widget — always on top, always interactive */}
      <div
        className={`relative border cursor-pointer transition-all duration-500 group/card ${copied ? 'border-zinc-950' : 'border-zinc-300 hover:border-zinc-950'}`}
        style={{
          position: 'relative',
          zIndex: 100,
          flexShrink: 0,
          fontFamily: 'FunnelDisplay, sans-serif',
          background: copied ? '#111' : 'white',
          overflow: 'visible',
          WebkitTapHighlightColor: 'transparent',
          pointerEvents: 'auto',
          boxShadow: hovered ? '0 2px 14px 0px rgba(30, 120, 60, 0.22)' : '0 2px 14px 0px rgba(30, 120, 60, 0)',
          transition: 'box-shadow 0.5s ease, border-color 0.5s, background 0.3s',
        }}
        onClick={handleCopy}
      >
        <BranchPlus h="left"  v="top" />
        <BranchPlus h="right" v="top" />
        <BranchPlus h="left"  v="bottom" />
        <BranchPlus h="right" v="bottom" />

        <div className={`flex items-center transition-opacity duration-200 ${copied ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <span className="pl-4 pr-2 py-2 text-xs text-gray-500 select-none whitespace-nowrap">{EMAIL}</span>
          <button
            type="button"
            aria-label="Copy email"
            className="pl-2 pr-4 py-2 shrink-0 flex items-center justify-center outline-none"
            onClick={(e) => { e.stopPropagation(); handleCopy() }}
          >
            <CopyIcon />
          </button>
        </div>

        <div className={`absolute inset-0 flex items-center justify-center gap-2 text-white text-xs transition-opacity duration-200 ${copied ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <TickIcon /> copieeeeeeed!!!
        </div>
      </div>

      {/* Right branch — pointer-events-none so it never intercepts clicks */}
      <div
        ref={rightRef}
        style={{
          width: '120px', height: '60px', position: 'relative', flexShrink: 0,
          marginLeft: '-55px', zIndex: 1, transition: 'transform 0.6s ease',
          pointerEvents: 'none',
        }}
      >
        <img
          src="/images/HomeImages/branch.svg"
          aria-hidden="true"
          style={{
            position: 'absolute', top: '50%', left: '50%',
            height: '120px', width: 'auto',
            transform: 'translate(-50%, -50%) rotate(90deg) scaleX(-1)',
            filter: 'brightness(0) opacity(0.75)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  )
}
