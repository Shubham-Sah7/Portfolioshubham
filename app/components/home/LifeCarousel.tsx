"use client"

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  { label: 'I Design',   url: '/images/life/Design.jpeg',   rot: '-3deg', imgClass: 'scale-[1.35] origin-bottom' },
  { label: 'I Ride',     url: '/images/life/Ride.jpeg',     rot: '2.5deg', imgClass: 'scale-[1.3] origin-center' },
  { label: 'I Play',     url: '/images/life/Play.jpeg',     rot: '-1.5deg' },
  { label: 'I Read',     url: '/images/life/Read.jpeg',     rot: '3deg' },
  { label: 'I Explore',  url: '/images/life/travel.jpeg',   rot: '-2deg' },
  { label: 'My Team',    url: '/images/life/Team.jpeg',     rot: '1.5deg' },
  { label: 'I Wander',   url: '/images/life/Bhutan.jpeg',   rot: '-2.5deg' },
  { label: 'I Meditate', url: '/images/life/Meditate.jpeg', rot: '2deg', imgClass: 'object-top' },
  { label: 'I Reflect',  url: '/images/life/Solo.jpeg',     rot: '-1deg' },
  { label: 'I Compete',  url: '/images/life/Sport.jpeg',    rot: '3deg' },
  { label: 'I Climb',    url: '/images/life/k2.jpeg',       rot: '-2deg' },
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
  const sectionRef = useRef<HTMLDivElement>(null)
  const handRef = useRef<HTMLDivElement>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !handRef.current || !bubbleRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      }
    })

    // 1. Slide down hand and fade in
    tl.to(handRef.current, {
      top: '25px',
      opacity: 0.22, // Faint, matches page decorations
      duration: 0.8,
      ease: 'back.out(1.2)'
    })

    // 2. Fade in speech bubble
    tl.to(bubbleRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, '-=0.2')

    // 3. Subtle tap/point animation (pointing downwards)
    tl.to(handRef.current, {
      y: 12,
      duration: 0.35,
      yoyo: true,
      repeat: 3,
      ease: 'power1.inOut'
    })

    // 4. Hold
    tl.to({}, { duration: 1.5 })

    // 5. Fade out bubble and slide up hand
    tl.to(bubbleRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      ease: 'power2.in'
    })
    tl.to(handRef.current, {
      top: '-150px',
      opacity: 0,
      duration: 0.8,
      ease: 'power2.in'
    }, '-=0.1')

  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-visible bg-white" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
      
      {/* Floating Pointer Hand (Easter Egg) */}
      <div 
        ref={handRef}
        className="absolute pointer-events-none select-none hidden md:block"
        style={{
          top: '-150px',
          left: '50%',
          transform: 'translateX(-50%) rotate(180deg)',
          zIndex: 50,
          width: '140px',
          height: '140px',
          opacity: 0,
        }}
      >
        <img 
          src="/images/HomeImages/HandC.svg" 
          alt="" 
          className="w-full h-full object-contain"
          style={{ filter: 'brightness(0) opacity(0.7)' }}
        />
        
        {/* Tooltip / Speech Bubble next to the hand */}
        <div 
          ref={bubbleRef}
          className="absolute bg-black text-white text-[11px] font-light px-3 py-1.5 whitespace-nowrap rounded shadow-lg opacity-0"
          style={{
            top: '145px',
            left: '50%',
            transform: 'translateX(-50%) rotate(180deg)', // Un-rotate speech bubble so text reads normally
            fontFamily: 'FunnelDisplay, sans-serif',
          }}
        >
          Hover to add color!
          {/* Small Speech Bubble Arrow pointing up */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45" />
        </div>
      </div>
      
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
          Generally a Jack of all trades, also master of some. Snapshots of things I love, build, capture, and explore when I am not at my desk.
        </p>
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
              <Polaroid key={i} label={c.label} url={c.url} rot={c.rot} imgClass={c.imgClass} />
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

function Polaroid({ label, url, rot, imgClass }: { label: string; url: string; rot: string; imgClass?: string }) {
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
        className="relative bg-white border border-zinc-300 shadow-[0_4px_12px_rgba(0,0,0,0.02)] group-hover/polaroid:shadow-[0_12px_24px_rgba(0,0,0,0.06)] group-hover/polaroid:-translate-y-4 group-hover/polaroid:rotate-0 flex flex-col transition-all duration-300"
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
            className={`w-full h-full object-cover grayscale opacity-90 group-hover/polaroid:grayscale-0 group-hover/polaroid:opacity-100 transition-all duration-500 ${imgClass || ''}`}
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
