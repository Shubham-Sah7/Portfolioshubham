"use client"

import { useRef } from 'react'

const CARDS = [
  { label: 'I Design',  url: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=600&auto=format&fit=crop', rot: '-3deg' },
  { label: 'I Ride',    url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=600&auto=format&fit=crop', rot: '2.5deg' },
  { label: 'I Capture', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', rot: '-1.5deg' },
  { label: 'I Coffee',  url: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=600&auto=format&fit=crop', rot: '3deg' },
  { label: 'I Read',    url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop', rot: '-2deg' },
  { label: 'I Explore', url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop', rot: '1.5deg' },
  { label: 'I Paint',   url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop', rot: '-2.5deg' },
  { label: 'I Build',   url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop', rot: '2.5deg' },
]

// Duplicate track for seamless infinite horizontal scrolling
const TRACK = [...CARDS, ...CARDS, ...CARDS]

const Plus = ({ h, v = 'bottom' }: { h: 'left' | 'right'; v?: 'top' | 'bottom' }) => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    className="absolute select-none pointer-events-none"
    style={{
      [h]: 0,
      [v]: 0,
      transform: `translate(${h === 'left' ? '-50%' : '50%'}, ${v === 'top' ? '-50%' : '50%'})`,
      color: '#d1d5db',
      zIndex: 10,
    }}
  >
    <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1" />
  </svg>
)

export default function LifeCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative overflow-visible py-16 md:py-24 bg-white" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
      
      {/* ── Section header ──────────────────────────────────────── */}
      <div className="px-6 md:px-10 pb-8 md:pb-12 overflow-hidden max-w-5xl mx-auto">
        <div className="relative">
          <div className="absolute inset-x-0 border-t border-gray-300" style={{ top: '50%' }} />
          <div className="relative flex items-baseline justify-center gap-2">
            <h2 className="relative bg-white pr-3 text-2xl md:text-3xl font-light text-black shrink-0 whitespace-nowrap">
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em' }}>L</span>
              <span style={{ fontFamily: 'SatishSans, sans-serif' }}>ife</span>
            </h2>
            <h2 className="relative bg-white pl-3 text-2xl md:text-3xl font-light text-black shrink-0 whitespace-nowrap">
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em' }}>&amp;</span>
              <span style={{ fontFamily: 'SatishSans, sans-serif' }}> Inspiration</span>
            </h2>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed max-w-md mx-auto">
          Snapshots of things I love, build, capture, and explore when I am not at my desk.
        </p>
      </div>

      {/* ── Full bleed marquee wrapper ────────────────────────── */}
      <div className="relative w-full border-y border-gray-200 py-10 overflow-hidden bg-gray-50/50">
        <Plus h="left" v="top" />
        <Plus h="right" v="top" />
        <Plus h="left" v="bottom" />
        <Plus h="right" v="bottom" />

        <div className="relative overflow-hidden w-full life-track-container">
          <div
            ref={trackRef}
            className="flex gap-6 md:gap-8 w-max life-track"
            style={{ animation: 'life-scroll 45s linear infinite' }}
          >
            {TRACK.map((c, i) => (
              <Polaroid key={i} label={c.label} url={c.url} rot={c.rot} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Styles ──────────────────────────────────────────── */}
      <style>{`
        @keyframes life-scroll {
          0%   { transform: translateX(0) }
          100% { transform: translateX(-33.3333%) }
        }
        .life-track-container:hover .life-track {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

function Polaroid({ label, url, rot }: { label: string; url: string; rot: string }) {
  return (
    <div
      className="shrink-0 select-none group/polaroid transition-all duration-500 ease-out"
      style={{
        transform: `rotate(${rot})`,
        transformOrigin: 'center bottom',
      }}
    >
      {/* Polaroid frame */}
      <div
        className="bg-white border border-gray-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.06)] group-hover/polaroid:shadow-[0_12px_32px_rgba(0,0,0,0.12)] group-hover/polaroid:-translate-y-4 group-hover/polaroid:rotate-0 flex flex-col transition-all duration-300"
        style={{ width: 200, padding: '10px 10px 24px 10px', borderRadius: 2 }}
      >
        {/* Photo container */}
        <div className="w-full aspect-[4/5] rounded-[1px] overflow-hidden bg-gray-100 relative">
          <img
            src={url}
            alt={label}
            className="w-full h-full object-cover grayscale-[20%] group-hover/polaroid:grayscale-0 transition-all duration-500"
            loading="lazy"
          />
        </div>
        {/* Label */}
        <p
          className="mt-3 text-black text-[13px] text-center font-light tracking-wide"
          style={{ fontFamily: 'SatishSans, sans-serif' }}
        >
          {label}
        </p>
      </div>
    </div>
  )
}
