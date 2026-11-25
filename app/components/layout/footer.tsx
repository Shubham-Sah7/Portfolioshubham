"use client"

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import EmailCopy from '../home/EmailCopy'
import ShubhamParticleWordmark from '@/components/ui/shubham-particle-wordmark'
import RidgelineDitherScene from '@/components/ui/ridgeline-dither-scene'

const links = [
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/shubhamdesign/' },
  { label: 'Behance',   href: 'https://www.behance.net/shubhamsah2' },
  { label: 'Instagram', href: 'https://www.instagram.com/designseven07_/' },
  { label: 'Twitter',   href: 'https://x.com/Shubhammcr7_' },
  { label: 'GitHub',    href: 'https://github.com/Shubham-Sah7' },
]

export default function Footer() {
  const pathname = usePathname()
  const isUnpluggedPage = pathname?.startsWith('/unplugged/')
  const isProposalPage = pathname?.startsWith('/proposals')

  if (isProposalPage) return null
  if (pathname === '/lab/playground') return null

  return (
    <footer className={`mt-16 relative overflow-hidden bg-white w-full${isUnpluggedPage ? ' md:hidden' : ''}`}>
      <div className="max-w-5xl mx-auto px-6 md:px-10">

        {/* Big name with interactive halftone particle effect */}
        <div className="pt-20 md:pt-4 pb-8 text-center relative flex items-center justify-center gap-0">

          {/* Left branch */}
          <img
            src="/images/HomeImages/branch.svg"
            aria-hidden="true"
            className="hidden md:block shrink-0 pointer-events-none select-none z-0"
            style={{
              height: '160px', width: 'auto',
              transform: 'rotate(90deg)',
              filter: 'brightness(0) opacity(0.18)',
              marginRight: '-30px',
            }}
          />

          <div className="flex flex-col items-center w-full max-w-3xl z-10">
            <h2 className="sr-only">Shubham</h2>
            
            {/* Interactive Particle Wordmark */}
            <div className="w-full flex justify-center py-2">
              <ShubhamParticleWordmark
                dotGap={5}
                interactionRadius={90}
                inkColor="#18181b"
                warmColor="#e06226"
                className="w-full max-w-[560px] md:max-w-[720px]"
              />
            </div>

            <p
              className="mt-3 text-sm text-gray-400 select-text"
              style={{ fontFamily: 'FunnelDisplay, sans-serif', fontWeight: 300 }}
            >
              Product Designer · Builder · IIT Patna
            </p>
          </div>

          {/* Right branch - mirrored */}
          <img
            src="/images/HomeImages/branch.svg"
            aria-hidden="true"
            className="hidden md:block shrink-0 pointer-events-none select-none z-0"
            style={{
              height: '160px', width: 'auto',
              transform: 'rotate(90deg) scaleX(-1)',
              filter: 'brightness(0) opacity(0.18)',
              marginLeft: '-30px',
            }}
          />

        </div>

        <div className="border-t border-gray-100" />

        {/* Bottom row */}
        <div className="py-5 flex flex-col md:grid md:grid-cols-3 items-center gap-6 w-full relative z-10">

          {/* Logo + year */}
          <div className="flex justify-center md:justify-start items-center w-full">
            <span
              className="text-xs text-gray-400"
              style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
            >
              © {new Date().getFullYear()} Shubham Sah
            </span>
          </div>

          {/* Email button */}
          <div id="footer-email" className="flex justify-center items-center w-full">
            <EmailCopy />
          </div>

          {/* Social links */}
          <div className="flex justify-center md:justify-end items-center gap-6 w-full">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-black transition-colors duration-200"
                style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
              >
                {l.label}
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* ── Bottom Mountain Ridgeline Dither Scene with 14 Peaks ──────────────── */}
      <div className="w-full relative overflow-hidden select-none pt-6 bg-gradient-to-b from-white via-[#FAF8F5] to-[#FAF8F5] border-t border-zinc-100">
        <RidgelineDitherScene
          height="360px"
          seed={23}
          ridges={7}
          pixel={2}
          mist={0.7}
          drift={1}
          radius={140}
          interactive={true}
          altimeter={true}
          showPeaks={true}
          palette={{
            paper: "#FAF8F5",
            ink: "#18181b",
            muted: "#78716c",
            line: "#e7e5e4",
            heart: "#e5484d",
            tones: [
              "#FAF8F5",
              "#E7E4E0",
              "#CBC7C1",
              "#9E9992",
              "#6E6963",
              "#413E39",
              "#18181b"
            ],
          }}
          className="w-full"
        />
      </div>
    </footer>
  )
}
