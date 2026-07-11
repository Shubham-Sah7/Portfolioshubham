"use client"

import { useRef } from 'react'

const CARDS = [
  { label: 'I Design',   url: '/images/life/Design.jpeg',   imgClass: 'object-bottom' },
  { label: 'I Ride',     url: '/images/life/Ride.jpeg',     imgClass: 'object-center' },
  { label: 'I Play',     url: '/images/life/Play.jpeg',     imgClass: 'object-center' },
  { label: 'I Read',     url: '/images/life/Read.jpeg',     imgClass: 'object-center' },
  { label: 'I Explore',  url: '/images/life/travel.jpeg',   imgClass: 'object-top' },
  { label: 'Weekend',    url: '/images/life/Team.jpeg',     imgClass: 'object-top' },
  { label: 'I Wander',   url: '/images/life/Bhutan.jpeg',   imgClass: 'object-top' },
  { label: 'I Meditate', url: '/images/life/Meditate.jpeg', imgClass: 'object-top' },
  { label: 'I Reflect',  url: '/images/life/Solo.jpeg',     imgClass: 'object-center' },
  { label: 'I Compete',  url: '/images/life/Sport.jpeg',    imgClass: 'object-top' },
  { label: 'I Climb',    url: '/images/life/k2.jpeg',       imgClass: 'object-center' },
  { label: 'I Lift',     url: '/images/life/Lift.jpeg',     imgClass: 'object-center' },
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
      color: '#9ca3af',
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
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em' }}>J</span>
              <span style={{ fontFamily: 'SatishSans, sans-serif' }}>ack of All Trades</span>
            </h2>
          </div>
        </div>
      </div>

      {/* ── Full bleed marquee wrapper (no borders, no background color) ──────── */}
      <div className="relative w-full py-16 overflow-hidden bg-white">

        <div className="relative overflow-visible w-full life-track-container">
          <div
            ref={trackRef}
            className="flex gap-6 md:gap-8 w-max life-track"
            style={{ animation: 'life-scroll 45s linear infinite' }}
          >
            {TRACK.map((c, i) => (
              <Polaroid key={i} label={c.label} url={c.url} imgClass={c.imgClass} />
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

function Polaroid({ label, url, imgClass }: { label: string; url: string; imgClass?: string }) {
  return (
    <div className="shrink-0 select-none group/polaroid">
      <div
        className="relative bg-white border border-zinc-300 shadow-[0_4px_12px_rgba(0,0,0,0.04)] group-hover/polaroid:shadow-[0_12px_28px_rgba(0,0,0,0.08)] group-hover/polaroid:-translate-y-3 flex flex-col transition-all duration-300 ease-out"
        style={{ width: 264, padding: '14px 14px 30px 14px' }}
      >
        {/* Corner plus markers */}
        <Plus h="left"  v="top" />
        <Plus h="right" v="top" />
        <Plus h="left"  v="bottom" />
        <Plus h="right" v="bottom" />

        {/* Square Photo Cutout */}
        <div className="w-full aspect-square overflow-hidden bg-zinc-50 border border-zinc-200">
          <img
            src={url}
            alt={label}
            className={`w-full h-full object-cover transition-all duration-500 ${imgClass || ''}`}
            loading="lazy"
          />
        </div>
        
        {/* Label below */}
        <p
          className="mt-4 text-zinc-700 group-hover/polaroid:text-black text-sm font-light text-center tracking-wide"
          style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
        >
          {label}
        </p>
      </div>
    </div>
  )
}
