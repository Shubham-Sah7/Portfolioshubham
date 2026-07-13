"use client"

const Plus = ({ h, v }: { h: 'left' | 'right'; v: 'top' | 'bottom' }) => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    className="absolute select-none pointer-events-none text-zinc-950 group-hover:text-white transition-colors duration-300"
    style={{
      [h]: '-6px',
      [v]: '-6px',
      zIndex: 10,
    }}
  >
    <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1" />
  </svg>
)

export default function LetsConnect() {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=sahshubham953@gmail.com', '_blank')
  }

  return (
    <a
      href="https://mail.google.com/mail/?view=cm&fs=1&to=sahshubham953@gmail.com"
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative cursor-pointer border border-zinc-950 bg-[#caf182] text-black hover:bg-black hover:text-white hover:border-black px-6 py-2.5 transition-all duration-300 flex items-center justify-center gap-2 select-none w-fit mt-3 md:mt-5"
      style={{
        fontFamily: 'FunnelDisplay, sans-serif',
        fontWeight: '400',
        fontSize: '0.875rem',
      }}
    >
      <Plus h="left" v="top" />
      <Plus h="right" v="top" />
      <Plus h="left" v="bottom" />
      <Plus h="right" v="bottom" />
      <span>Let&apos;s Connect</span>
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transform group-hover:translate-x-1 transition-transform duration-300"
      >
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    </a>
  )
}
