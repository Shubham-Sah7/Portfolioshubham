"use client"

import Image from 'next/image'
import Link from 'next/link'

interface ProjectCTA {
  label: string
  href: string
  external: boolean
  variant?: 'primary' | 'secondary'
}

interface WorkItem {
  num: string
  title: string
  description: string
  image: string
  year: string
  available: boolean
  ctas: ProjectCTA[]
  primaryHref: string
  isExternalPrimary: boolean
}

const works: WorkItem[] = [
  {
    num: '01',
    title: 'Vity',
    description: 'An AI-powered shared memory layer that connects your conversations across AI tools.',
    image: '/images/projects/vity-dashboard-2x.png',
    year: '2026',
    available: true,
    primaryHref: '/works/vity',
    isExternalPrimary: false,
    ctas: [
      {
        label: 'See Prototype',
        href: 'https://vityyy.vercel.app/',
        external: true,
        variant: 'primary',
      },
      {
        label: 'Case Study',
        href: '/works/vity',
        external: false,
        variant: 'secondary',
      },
    ],
  },
  {
    num: '02',
    title: 'Design System',
    description: 'Built a scalable design system that improved consistency, accelerated product development.',
    image: '/images/New images/Design System.png',
    year: '2024',
    available: true,
    primaryHref: 'https://www.behance.net/gallery/235056425/Design-System',
    isExternalPrimary: true,
    ctas: [
      {
        label: 'View Work',
        href: 'https://www.behance.net/gallery/235056425/Design-System',
        external: true,
        variant: 'secondary',
      },
    ],
  },
  {
    num: '03',
    title: 'Zumlo',
    description: 'An all-in-one wellbeing app helping people find their safe space through mindfulness and meditation.',
    image: '/images/projects/zumlo.png',
    year: '2024',
    available: true,
    primaryHref: 'https://www.figma.com/design/GJ2YwM8zArbFeGY6Ga9p4k/Zumlo-2.0?node-id=1585-148986&t=Q2rbBLfVinoQR1Tf-1',
    isExternalPrimary: true,
    ctas: [
      {
        label: 'View Work',
        href: 'https://www.figma.com/design/GJ2YwM8zArbFeGY6Ga9p4k/Zumlo-2.0?node-id=1585-148986&t=Q2rbBLfVinoQR1Tf-1',
        external: true,
        variant: 'secondary',
      },
    ],
  },
]

/**
 * Classical Greek architectural corner ornament (Meander / Greek fretwork square)
 */
const GreekCorner = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const isTop = position.startsWith('t')
  const isLeft = position.endsWith('l')

  const rotation = {
    tl: '',
    tr: 'scale-x-[-1]',
    bl: 'scale-y-[-1]',
    br: 'scale-x-[-1] scale-y-[-1]',
  }[position]

  return (
    <div
      className={`absolute w-[20px] h-[20px] pointer-events-none select-none z-10 flex items-center justify-center bg-[#FAF8F5] ${
        isTop ? '-top-[10px]' : '-bottom-[10px]'
      } ${
        isLeft ? '-left-[10px]' : '-right-[10px]'
      }`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`text-zinc-800 ${rotation}`}
      >
        {/* Outer square border */}
        <rect x="0.5" y="0.5" width="17" height="17" stroke="currentColor" strokeWidth="1" />
        {/* Classical Greek meander spiral */}
        <path
          d="M3 15V3H15V12H6V6H12V9H9.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
    </div>
  )
}

export default function WorkGallery() {
  return (
    <div className="w-full">

      {/* ── Section header: Brand typography (SatishCapsSans swash capitals + SatishSans) with horizontal dividing lines ── */}
      <div className="pb-8 md:pb-12 overflow-hidden">
        <div className="relative flex items-center justify-center">
          <div
            className="absolute inset-x-0 border-t border-gray-300"
            style={{ top: '50%' }}
          />
          <h2 className="relative bg-white px-4 text-2xl md:text-3xl font-light text-black shrink-0 whitespace-nowrap flex items-baseline gap-2 select-text cursor-text">
            <span>
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em' }}>S</span><span style={{ fontFamily: 'SatishSans, sans-serif' }}>elected</span>
            </span>
            <span>
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em' }}>W</span><span style={{ fontFamily: 'SatishSans, sans-serif' }}>orks</span>
            </span>
          </h2>
        </div>
      </div>

      {/* ── Works list: Greek-inspired editorial cards ── */}
      <div className="flex flex-col gap-8 md:gap-10">
        {works.map((work) => (
          <div key={work.num} className="w-full">
            <div className="relative border border-zinc-400/80 bg-[#FAF8F5] p-5 sm:p-7 md:p-8 lg:p-9 shadow-[0_1px_3px_rgba(0,0,0,0.03)] group transition-all duration-300">

              {/* Inner double hairline border */}
              <div className="absolute inset-[4px] border border-zinc-300/60 pointer-events-none" />

              {/* Greek architectural corner ornaments */}
              <GreekCorner position="tl" />
              <GreekCorner position="tr" />
              <GreekCorner position="bl" />
              <GreekCorner position="br" />

              {/* Editorial 3-zone layout: Title | Divider | Description & CTAs | Large Screenshot */}
              <div className="relative z-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

                {/* Left Area: Project Number + Large Serif Title */}
                <div className="lg:col-span-2 flex flex-col justify-center select-text">
                  <span
                    className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase block mb-1 select-text cursor-text"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {work.num}
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl lg:text-4xl text-zinc-950 font-light tracking-tight leading-tight select-text cursor-text"
                    style={{ fontFamily: 'SatishSans, sans-serif' }}
                  >
                    {work.title}
                  </h3>
                </div>

                {/* Middle Area: Description + Year + Minimal CTAs (with vertical divider on left) */}
                <div className="lg:col-span-4 flex flex-col justify-between lg:border-l lg:border-zinc-200/90 lg:pl-6 select-text">
                  <div>
                    <p
                      className="text-xs sm:text-[13px] text-zinc-600 leading-relaxed font-light block select-text cursor-text"
                      style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
                    >
                      {work.description}
                    </p>
                    <span
                      className="text-xs text-zinc-400 font-medium block mt-2 sm:mt-2.5 mb-4 select-text cursor-text"
                      style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
                    >
                      {work.year}
                    </span>
                  </div>

                  {/* Action buttons */}
                  {work.available && (
                    <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                      {work.ctas.map((cta) => {
                        const isPrimary = cta.variant === 'primary'
                        const buttonClasses = isPrimary
                          ? 'px-4 py-2 bg-zinc-900 text-white hover:bg-black border border-zinc-900 text-xs font-normal tracking-wide transition-colors duration-200 shrink-0 flex items-center gap-1.5'
                          : 'px-4 py-2 bg-white text-zinc-900 hover:bg-zinc-100 border border-zinc-900 text-xs font-normal tracking-wide transition-colors duration-200 shrink-0 flex items-center gap-1.5'

                        return cta.external ? (
                          <a
                            key={cta.label}
                            href={cta.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={buttonClasses}
                            style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
                          >
                            <span>{cta.label}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px" fill="currentColor">
                              <path d="M251.77-254.23 210-296l393.62-394H245.77v-60h460v460h-60v-357.85l-394 393.62Z"/>
                            </svg>
                          </a>
                        ) : (
                          <Link
                            key={cta.label}
                            href={cta.href}
                            className={buttonClasses}
                            style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
                          >
                            <span>{cta.label}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px" fill="currentColor">
                              <path d="M251.77-254.23 210-296l393.62-394H245.77v-60h460v460h-60v-357.85l-394 393.62Z"/>
                            </svg>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Right Area: Large High-Dominance Screenshot Showcase */}
                <div className="lg:col-span-6 w-full">
                  <div className="relative w-full h-[220px] sm:h-[260px] lg:h-[280px] rounded-lg overflow-hidden border border-zinc-200/90 bg-zinc-100/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] group/img">
                    {work.isExternalPrimary ? (
                      <a
                        href={work.primaryHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 block"
                        aria-label={`View ${work.title}`}
                      >
                        <Image
                          src={work.image}
                          alt={work.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className={
                            work.title === 'Zumlo'
                              ? 'object-contain object-center p-3 sm:p-4 transition-transform duration-500 group-hover/img:scale-[1.02]'
                              : 'object-cover object-left-top transition-transform duration-500 group-hover/img:scale-[1.02]'
                          }
                          priority={work.num === '01'}
                        />
                      </a>
                    ) : (
                      <Link
                        href={work.primaryHref}
                        className="absolute inset-0 block"
                        aria-label={`View ${work.title}`}
                      >
                        <Image
                          src={work.image}
                          alt={work.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover object-left-top transition-transform duration-500 group-hover/img:scale-[1.02]"
                          priority={work.num === '01'}
                        />
                      </Link>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
