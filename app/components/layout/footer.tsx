"use client"

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/shubhamdesign/' },
  { label: 'Instagram', href: 'https://www.instagram.com/designseven07_/' },
  { label: 'Twitter',   href: 'https://x.com/Shubhammcr7_' },
  { label: 'GitHub',    href: 'https://github.com/Shubham-Sah7' },
]

import EmailCopy from '../home/EmailCopy'

export default function Footer() {
  const pathname = usePathname()
  const isUnpluggedPage = pathname?.startsWith('/unplugged/')
  const isProposalPage = pathname?.startsWith('/proposals')

  if (isProposalPage) return null
  if (pathname === '/lab/playground') return null

  return (
    <footer className={`mt-16 relative overflow-visible${isUnpluggedPage ? ' md:hidden' : ''}`}>

<div className="max-w-5xl mx-auto px-6 md:px-10">

        {/* Big name */}
        <div className="pt-4 pb-8 text-center relative flex items-center justify-center gap-0">

          {/* Left branch */}
          <img
            src="/images/HomeImages/branch.svg"
            aria-hidden="true"
            className="hidden md:block shrink-0 pointer-events-none select-none"
            style={{
              height: '160px', width: 'auto',
              transform: 'rotate(90deg)',
              filter: 'brightness(0) opacity(0.18)',
              marginRight: '-30px',
            }}
          />

          <div className="flex flex-col items-center">
          <h2
            className="text-[clamp(3rem,12vw,9rem)] leading-none tracking-tight text-black select-none"
            aria-hidden="true"
          >
            <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.4em' }}>S</span>
            <span style={{ fontFamily: 'SatishSans, sans-serif', marginLeft: '6px' }}>hubham</span>
          </h2>
          <p
            className="mt-4 text-sm text-gray-400"
            style={{ fontFamily: 'FunnelDisplay, sans-serif', fontWeight: 300 }}
          >
            Product Designer · Builder · IIT Patna
          </p>
          </div>

          {/* Right branch - mirrored */}
          <img
            src="/images/HomeImages/branch.svg"
            aria-hidden="true"
            className="hidden md:block shrink-0 pointer-events-none select-none"
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
        <div className="py-5 flex flex-col md:grid md:grid-cols-3 items-center gap-6 w-full">

          {/* Logo + year */}
          <div className="flex justify-center md:justify-start items-center w-full">
            <span
              className="text-xs text-gray-400"
              style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
            >
              © 2026 Shubham Sah
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
    </footer>
  )
}
