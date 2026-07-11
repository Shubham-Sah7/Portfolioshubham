"use client"

import { useRef } from 'react'

const CARDS = [
  { label: 'I Design',  url: '/images/life/Design.jpeg', rot: '-3deg' },
  { label: 'I Ride',    url: '/images/life/Ride.jpeg',   rot: '2.5deg' },
  { label: 'I Play',    url: '/images/life/Play.jpeg',   rot: '-1.5deg' },
  { label: 'I Read',    url: '/images/life/Read.jpeg',   rot: '3deg' },
  { label: 'I Explore', url: '/images/life/travel.jpeg', rot: '-2deg' },
  { label: 'My Team',   url: '/images/life/Team.jpeg',   rot: '1.5deg' },
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
      color: '#d4d4d8',
      zIndex: 10,
    }}
  >
    <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1" />
  </svg>
)

export default function LifeCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative overflow-visible bg-white" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
      
      {/* ── Section header ──────────────────────────────────────── */}
      <div className="px-6 md:px-10 pb-8 md:pb-12 overflow-hidden max-w-5xl mx-auto">
        <div className="relative">
          <div className="absolute inset-x-0 border-t border-gray-200" style={{ top: '50%' }} />
          <div className="relative flex justify-center">
            <h2 className="relative bg-white px-4 text-2xl md:text-3xl font-light text-black shrink-0 whitespace-nowrap">
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em' }}>L</span>
              <span style={{ fontFamily: 'SatishSans, sans-serif' }}>ife &amp; Inspiration</span>
            </h2>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed max-w-md mx-auto">
          Snapshots of things I love, build, capture, and explore when I am not at my desk.
        </p>
      </div>

      {/* ── Full bleed marquee wrapper (no borders, no background color) ──────── */}
      <div className="relative w-full py-10 overflow-hidden bg-white">

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
      {/* Clean Polaroid Card Shape (no background color inside, just white card) */}
      <div
        className="bg-white border border-zinc-200 shadow-[0_4px_12px_rgba(0,0,0,0.03)] group-hover/polaroid:shadow-[0_12px_24px_rgba(0,0,0,0.08)] group-hover/polaroid:-translate-y-4 group-hover/polaroid:rotate-0 flex flex-col transition-all duration-300"
        style={{ width: 240, padding: '12px 12px 28px 12px', borderRadius: 2 }}
      >
        {/* Square Photo Cutout */}
        <div className="w-full aspect-square overflow-hidden bg-zinc-50 border border-zinc-100">
          <img
            src={url}
            alt={label}
            className="w-full h-full object-cover grayscale opacity-90 group-hover/polaroid:grayscale-0 group-hover/polaroid:opacity-100 transition-all duration-500"
            loading="lazy"
          />
        </div>
        
        {/* Label below */}
        <p
          className="mt-3 text-zinc-700 group-hover/polaroid:text-black text-xs font-light text-center tracking-wide"
          style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
        >
          {label}
        </p>
      </div>
    </div>
  )
}
