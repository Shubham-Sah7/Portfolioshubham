"use client"

import React from 'react'

const TinyPlus = () => (
  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" className="text-zinc-300">
    <path d="M4.5 0V9M0 4.5H9" stroke="currentColor" strokeWidth="0.75" />
  </svg>
)

export default function HeroGridBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* 1. Repeating faint grid background with radial fade */}
      <div className="absolute inset-0 bg-grid-pattern" />

      {/* 2. Structural architectural guidelines aligned to content bounds */}
      <div className="relative max-w-5xl mx-auto h-full w-full px-6 md:px-10">
        
        {/* Left vertical guideline */}
        <div className="absolute top-0 bottom-0 left-6 md:left-10 w-[1px] bg-gradient-to-b from-zinc-300/30 via-zinc-200/10 to-transparent" />
        
        {/* Right vertical guideline */}
        <div className="absolute top-0 bottom-0 right-6 md:right-10 w-[1px] bg-gradient-to-b from-zinc-300/30 via-zinc-200/10 to-transparent" />

        {/* Horizontal cross guideline 1 */}
        <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200/25 to-transparent" />

        {/* Horizontal cross guideline 2 */}
        <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200/25 to-transparent" />

        {/* 3. Grid corner markers & blueprint text details */}
        
        {/* Top-Left Corner details */}
        <div className="absolute top-12 left-8 md:left-12 flex flex-col gap-0.5 text-[8px] text-zinc-400 font-mono tracking-widest uppercase">
          <div className="flex items-center gap-1">
            <TinyPlus />
            <span>SYS_CAL_01</span>
          </div>
          <span>SCALE_1:1</span>
        </div>

        {/* Top-Right Corner details */}
        <div className="absolute top-12 right-8 md:right-12 flex flex-col items-end gap-0.5 text-[8px] text-zinc-400 font-mono tracking-widest uppercase">
          <div className="flex items-center gap-1">
            <span>HERO_INDEX_2026</span>
            <TinyPlus />
          </div>
          <span>[SHUBHAM_SAH]</span>
        </div>

        {/* Mid-Left Corner details */}
        <div className="absolute top-1/2 left-8 md:left-12 -translate-y-1/2 flex items-center gap-1.5 text-[8px] text-zinc-400 font-mono tracking-widest">
          <TinyPlus />
          <span>LAT 25.61° N</span>
        </div>

        {/* Mid-Right Corner details */}
        <div className="absolute top-1/2 right-8 md:right-12 -translate-y-1/2 flex items-center gap-1.5 text-[8px] text-zinc-400 font-mono tracking-widest">
          <span>LON 85.14° E</span>
          <TinyPlus />
        </div>

        {/* Bottom-Left Corner details */}
        <div className="absolute bottom-12 left-8 md:left-12 flex flex-col gap-0.5 text-[8px] text-zinc-400 font-mono tracking-widest uppercase">
          <span>[PRODUCT DESIGN]</span>
          <div className="flex items-center gap-1">
            <TinyPlus />
            <span>DEV_STABLE_V4</span>
          </div>
        </div>

        {/* Bottom-Right Corner details */}
        <div className="absolute bottom-12 right-8 md:right-12 flex flex-col items-end gap-0.5 text-[8px] text-zinc-400 font-mono tracking-widest uppercase">
          <span>AVAILABILITY: 100%</span>
          <div className="flex items-center gap-1">
            <span>CALIBRATION: ACTIVE</span>
            <TinyPlus />
          </div>
        </div>

      </div>
    </div>
  )
}
