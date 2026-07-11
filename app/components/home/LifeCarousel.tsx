"use client"

import { useRef } from 'react'

const CARDS = [
  { label: 'I Design',  url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop', rot: '-3deg' },
  { label: 'I Ride',    url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600&auto=format&fit=crop', rot: '2.5deg' },
  { label: 'I Capture', url: 'https://images.unsplash.com/photo-1608958416738-9580b0bb1120?q=80&w=600&auto=format&fit=crop', rot: '-1.5deg' },
  { label: 'I Coffee',  url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop', rot: '3deg' },
  { label: 'I Read',    url: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=600&auto=format&fit=crop', rot: '-2deg' },
  { label: 'I Explore', url: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600&auto=format&fit=crop', rot: '1.5deg' },
  { label: 'I Paint',   url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop', rot: '-2.5deg' },
  { label: 'I Build',   url: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=600&auto=format&fit=crop', rot: '2.5deg' },
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
      color: '#c2b9a7',
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
          <div className="absolute inset-x-0 border-t border-[#d5cebf]" style={{ top: '50%' }} />
          <div className="relative flex items-baseline justify-center gap-2">
            <h2 className="relative bg-white pr-3 text-2xl md:text-3xl font-light text-[#5c4d37] shrink-0 whitespace-nowrap">
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em' }}>L</span>
              <span style={{ fontFamily: 'SatishSans, sans-serif' }}>ife</span>
            </h2>
            <h2 className="relative bg-white pl-3 text-2xl md:text-3xl font-light text-[#5c4d37] shrink-0 whitespace-nowrap">
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
      <div className="relative w-full border-y border-[#eae5da] py-10 overflow-hidden bg-[#faf9f5]">
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
      {/* Stone / Manuscript Frame */}
      <div
        className="bg-[#faf7f0] border border-[#dcd6c5] shadow-[0_4px_20px_rgba(40,30,20,0.06)] group-hover/polaroid:shadow-[0_12px_36px_rgba(40,30,20,0.12)] group-hover/polaroid:-translate-y-4 group-hover/polaroid:rotate-0 flex flex-col transition-all duration-300 relative"
        style={{ width: 210, padding: '12px 12px 28px 12px', borderRadius: 4 }}
      >
        {/* Inner manuscript border lining */}
        <div className="absolute inset-2 border border-[#eae3d2] pointer-events-none rounded-[3px]" />
        
        {/* Corner manuscript accents */}
        <span className="absolute top-3.5 left-3.5 text-[8px] text-[#b5a687] select-none">✦</span>
        <span className="absolute top-3.5 right-3.5 text-[8px] text-[#b5a687] select-none">✦</span>
        
        {/* Photo container - Temple Arch shape! */}
        <div 
          className="w-full aspect-[4/5] rounded-t-[99px] rounded-b-[4px] overflow-hidden bg-[#f0ede4] relative border border-[#e4decb]"
          style={{ zIndex: 1 }}
        >
          <img
            src={url}
            alt={label}
            className="w-full h-full object-cover sepia-[15%] contrast-[105%] group-hover/polaroid:sepia-0 transition-all duration-500"
            loading="lazy"
          />
          {/* Inner shadow overlay in the arch */}
          <div className="absolute inset-0 shadow-[inset_0_4px_12px_rgba(0,0,0,0.06)] pointer-events-none rounded-t-[99px]" />
        </div>
        
        {/* Label & Ornate ornament */}
        <div className="mt-4 text-center relative z-10 flex flex-col items-center">
          <p
            className="text-[#5c4d37] text-[13px] font-medium tracking-wide"
            style={{ fontFamily: 'SatishSans, sans-serif' }}
          >
            {label}
          </p>
          {/* Classical Indian floral-like divider ornament */}
          <div className="flex items-center gap-1.5 mt-1.5 w-full justify-center opacity-70">
            <div className="h-[0.5px] w-8 bg-[#b5a687]" />
            <svg width="5" height="5" viewBox="0 0 24 24" fill="#b5a687" className="rotate-45 shrink-0">
              <rect width="24" height="24" />
            </svg>
            <div className="h-[0.5px] w-8 bg-[#b5a687]" />
          </div>
        </div>
      </div>
    </div>
  )
}
