import { redirect } from 'next/navigation'

export default function Lab() {
  redirect('/lab/playground')
}

/*
 * Original lab grid — commented out, restore when needed.
 *
import Link from 'next/link'
import LabHeader from './LabHeader'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'

const ArrowBtn = ({ light = false }: { light?: boolean }) => (
  <div style={{
    width: 30, height: 30, borderRadius: '50%',
    background: light ? 'rgba(255,255,255,0.15)' : '#efefef',
    border: light ? '1px solid rgba(255,255,255,0.2)' : 'none',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: light ? 'none' : 'inset 2px 2px 4px rgba(0,0,0,0.18), inset -1px -1px 3px rgba(255,255,255,0.9)',
  }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke={light ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)'}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  </div>
)

export default function Lab() {
  return (
    <div className="bg-white min-h-screen px-8 pt-28 md:pt-36 pb-16 max-w-5xl mx-auto"
      style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
      ...grid of Color Memo / YT Walkman / QR Device / Playground cards...
    </div>
  )
}
*/
