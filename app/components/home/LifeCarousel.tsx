"use client"

import { useRef } from 'react'

const CARDS = [
  { label: 'I Design',     bg: 'linear-gradient(135deg,#c8b8ff,#9b8fe8)',   rot: '-3deg'  },
  { label: 'I Play',       bg: 'linear-gradient(135deg,#ffd6a5,#f9a03f)',   rot: '2deg'   },
  { label: 'I Read',       bg: 'linear-gradient(135deg,#caffbf,#52b788)',   rot: '-1.5deg'},
  { label: 'I Travel',     bg: 'linear-gradient(135deg,#a8dadc,#457b9d)',   rot: '3deg'   },
  { label: 'I Ride',       bg: 'linear-gradient(135deg,#ffb3c6,#e63946)',   rot: '-2.5deg'},
  { label: 'I Do Arts',    bg: 'linear-gradient(135deg,#ffd6e7,#c77dff)',   rot: '1.5deg' },
  { label: 'I Make Frnds', bg: 'linear-gradient(135deg,#fdffb6,#f4a261)',   rot: '-1deg'  },
  { label: 'I Workout',    bg: 'linear-gradient(135deg,#b7e4c7,#40916c)',   rot: '2.5deg' },
]

// duplicate for seamless loop
const TRACK = [...CARDS, ...CARDS]

export default function LifeCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative overflow-hidden py-16 md:py-24"
      style={{ background: 'linear-gradient(160deg, #ddd6fe 0%, #e0e7ff 40%, #c7d2fe 100%)' }}>

      {/* ── Marquee strip ───────────────────────────────────── */}
      <div className="relative overflow-hidden">
        <div ref={trackRef}
          className="flex gap-6 md:gap-8 w-max"
          style={{ animation: 'life-scroll 38s linear infinite' }}>
          {TRACK.map((c, i) => (
            <Polaroid key={i} label={c.label} bg={c.bg} rot={c.rot} />
          ))}
        </div>
      </div>

      {/* ── Animation keyframes ─────────────────────────────── */}
      <style>{`
        @keyframes life-scroll {
          0%   { transform: translateX(0) }
          100% { transform: translateX(-50%) }
        }
        .life-card:hover {
          animation-play-state: paused;
        }
        .life-track:hover > * {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

function Polaroid({ label, bg, rot }: { label: string; bg: string; rot: string }) {
  return (
    <div
      className="shrink-0 select-none"
      style={{ transform: `rotate(${rot})`, transformOrigin: 'center bottom' }}>
      {/* Polaroid frame */}
      <div
        className="bg-white shadow-[0_8px_32px_rgba(0,0,0,0.18)] flex flex-col"
        style={{ width: 220, padding: '12px 12px 36px 12px', borderRadius: 4 }}>
        {/* Photo area */}
        <div
          className="w-full rounded-[2px] overflow-hidden"
          style={{ height: 240, background: bg }}>
          {/* placeholder shimmer overlay */}
          <div className="w-full h-full opacity-20"
            style={{ background: 'linear-gradient(120deg,transparent 30%,rgba(255,255,255,0.6) 50%,transparent 70%)' }} />
        </div>
        {/* Label */}
        <p className="mt-3 text-black text-[17px] leading-tight"
          style={{ fontFamily: 'FunnelDisplay, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}>
          {label}
        </p>
      </div>
    </div>
  )
}
