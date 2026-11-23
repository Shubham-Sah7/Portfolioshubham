"use client"

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import EmailCopy from '../home/EmailCopy'
import HalftoneWordmarkFooter from '@/components/ui/halftone-wordmark-footer'

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
    <footer className={`relative overflow-hidden bg-white w-full pt-12 pb-0${isUnpluggedPage ? ' md:hidden' : ''}`}>

      <div className="max-w-5xl mx-auto px-6 md:px-10">

        {/* Subtitle tag */}
        <p
          className="text-center text-sm text-gray-400 mb-6"
          style={{ fontFamily: 'FunnelDisplay, sans-serif', fontWeight: 300 }}
        >
          Product Designer · Builder · IIT Patna
        </p>

        {/* Action & social links row */}
        <div className="py-2 flex flex-col md:grid md:grid-cols-3 items-center gap-6 w-full">

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

      {/* Interactive Halftone Wordmark */}
      <div className="w-full mt-2 select-none overflow-hidden">
        <HalftoneWordmarkFooter
          wordmark="Shubham"
          label=""
          meta=""
          columns={[]}
          backToTop={false}
          dotGap={6}
          radius={85}
          crop={0.12}
          grain={0.35}
          interactive={true}
          fontFamily="SatishCapsSans, SatishSans, Georgia, serif"
          height="clamp(160px, 21vw, 300px)"
          palette={{
            background: "#ffffff",
            ink: "#17150f",
            warm: "#e9762b",
          }}
          className="w-full"
        />
      </div>
    </footer>
  )
}
