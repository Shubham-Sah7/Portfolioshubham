"use client"

import Link from 'next/link'
import Image from 'next/image'

const proposals = [
  /*
  {
    num: '001',
    title: 'HealthTech Patient Experience',
    description: "Redesigned patient-facing flows for a Health-Tech product. Simplified onboarding, reduced drop-off, improved care plan adherence.",
    href: 'https://www.behance.net/gallery/180887605/MedEase-App',
    photo: null,
    external: true,
  },
  */
  {
    num: '002',
    title: 'Brand Identity & Visual Systems',
    description: "Visual identity, brand systems, and design language built for startups across multiple sectors.",
    href: 'https://www.behance.net/gallery/195327435/Brand-Strategy-Case-Study',
    photo: null,
    external: true,
  },
  /*
  {
    num: '003',
    title: 'Design Community Platform',
    description: "Behance for vibe coders and AI product builders.",
    href: 'https://www.productgallery.in/',
    photo: null,
    external: true,
  },
  */
  {
    num: '004',
    title: 'Gen Z AI Personal Finance',
    description: "Smart, visual, playful financial assistant designed for Gen Z.",
    href: 'https://juspayfinance.vercel.app/',
    photo: null,
    external: true,
  },
  /*
  {
    num: '005',
    title: '2D to 3D Engineering AI',
    description: "AI platform that converts 2D engineering drawings into accurate 3D models.",
    href: 'https://hanomi-zeta.vercel.app/',
    photo: null,
    external: true,
  },
  {
    num: '006',
    title: 'Sports Analytics Dashboard',
    description: "Cricket intelligence dashboard for player performance, match analytics, and insights.",
    href: 'https://stancebeam.vercel.app/',
    photo: null,
    external: true,
  },
  */
]

// Corner plus marker
const Plus = ({ h, v = 'bottom' }: { h: 'left' | 'right'; v?: 'top' | 'bottom' }) => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    className="absolute select-none pointer-events-none text-zinc-400 group-hover/card:text-zinc-950 transition-colors duration-500"
    style={{
      [h]: '-6px',
      [v]: '-6px',
      zIndex: 10,
    }}
  >
    <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1" />
  </svg>
)

export default function ProposalsGallery() {
  return (
    <div>

      {/* Section header */}
      <div className="pb-8 md:pb-12 overflow-hidden">
        <div className="relative flex items-center justify-center">
          <div
            className="absolute inset-x-0 border-t border-gray-300"
            style={{ top: '50%' }}
          />
          <h2 className="relative bg-white px-4 text-2xl md:text-3xl font-light text-black shrink-0 whitespace-nowrap flex items-baseline gap-2">
            <span>
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em' }}>D</span><span style={{ fontFamily: 'SatishSans, sans-serif' }}>esign</span>
            </span>
            <span>
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em' }}>P</span><span style={{ fontFamily: 'SatishSans, sans-serif' }}>roposals</span>
            </span>
          </h2>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 md:gap-x-12 md:gap-y-8">
        {proposals.map((item) => (
          <div
            key={item.num}
            className="group relative border border-gray-200 bg-white hover:border-gray-400 transition-colors duration-300 h-full"
          >
            <Plus h="left" v="top" />
            <Plus h="right" v="top" />
            <Plus h="left" v="bottom" />
            <Plus h="right" v="bottom" />

            {/* Clickable background overlay */}
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-0"
                aria-label={item.title}
              />
            ) : (
              <Link
                href={item.href}
                className="absolute inset-0 z-0"
                aria-label={item.title}
              />
            )}

            <div className="relative z-10 flex flex-row items-center h-full min-h-[90px] md:min-h-[100px] pointer-events-none">
              {item.photo && (
                <div className="relative shrink-0 overflow-hidden pointer-events-auto" style={{ width: 72, height: 80 }}>
                  <Image
                    src={item.photo}
                    alt={item.title}
                    fill
                    sizes="72px"
                    className="object-cover object-top"
                  />
                </div>
              )}

              {/* Meta */}
              <div className="flex flex-1 items-center justify-between px-4 md:px-8 py-4 md:py-6 gap-4 md:gap-6">
                <div className="flex flex-col gap-1 min-w-0 pointer-events-auto select-text">
                  <h3
                    className="text-sm md:text-lg font-light text-black leading-tight select-text cursor-text"
                    style={{ fontFamily: 'SatishSans, sans-serif', userSelect: 'text', WebkitUserSelect: 'text' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-xs text-gray-400 leading-snug line-clamp-2 select-text cursor-text"
                    style={{ fontFamily: 'FunnelDisplay, sans-serif', fontWeight: 300, userSelect: 'text', WebkitUserSelect: 'text' }}
                  >
                    {item.description}
                  </p>
                </div>
                <div className="pointer-events-auto shrink-0">
                  <span
                    className="text-xs text-black group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1 pointer-events-none"
                    style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
                  >
                    View
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
