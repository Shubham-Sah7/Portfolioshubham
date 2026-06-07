import Image from 'next/image'
import Link from 'next/link'
import { Plus, PlusAt } from '../ui/Markers'

export default function Unplugged() {
  return (
    <div className="relative overflow-visible">

      {/* ── Section header ─────────────────────────────────── */}
      <div className="relative overflow-visible px-6 md:px-10 py-6 border-b border-gray-200 flex items-baseline gap-4">
        <span
          className="text-[10px] uppercase tracking-widest text-gray-400"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          03
        </span>
        <h2
          className="text-2xl md:text-3xl font-light text-black"
          style={{ fontFamily: 'Garamond, Georgia, serif' }}
        >
          Unplugged
        </h2>
        <Plus h="left" />
        <Plus h="right" />
        <PlusAt x="50%" desktop />
      </div>

      {/* ── Content ────────────────────────────────────────── */}
      <div className="relative overflow-visible grid grid-cols-1 md:grid-cols-2">
        <PlusAt x="50%" desktop />

        {/* Text */}
        <div className="px-6 md:px-10 py-10 md:py-14 flex flex-col justify-center md:border-r border-gray-200 order-2 md:order-1">
          <p
            className="text-[10px] uppercase tracking-widest text-gray-400 mb-3"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Beyond the screen
          </p>
          <p
            className="text-sm text-gray-500 leading-relaxed mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Creative explorations in craftsmanship and personal expression.
            The work that happens away from pixels.
          </p>
          <Link
            href="/unplugged/table"
            className="inline-flex items-center gap-2 text-xs text-black border border-gray-200 px-4 py-2 hover:bg-gray-50 transition-colors w-fit"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            The Corner Table ↗
          </Link>
        </div>

        {/* Image */}
        <Link href="/unplugged/table" className="block overflow-hidden group order-1 md:order-2 border-b md:border-b-0 border-gray-200">
          <Image
            src="/images/Unplugged/table/thumbnail.png"
            alt="The Corner Table"
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ minHeight: '240px' }}
          />
        </Link>

        <Plus h="left" />
        <Plus h="right" />
      </div>
    </div>
  )
}
