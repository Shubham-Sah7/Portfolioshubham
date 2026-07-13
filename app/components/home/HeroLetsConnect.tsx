"use client"

import { useState, useEffect, useRef } from 'react'

const Plus = ({ h, v }: { h: 'left' | 'right'; v: 'top' | 'bottom' }) => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    className="absolute select-none pointer-events-none text-zinc-400 group-hover/card:text-zinc-950 transition-colors duration-500"
    style={{
      [h]: '-6px', [v]: '-6px',
      zIndex: 10,
    }}
  >
    <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1" />
  </svg>
)

const MailIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    height="15px" 
    viewBox="0 -960 960 960" 
    width="15px" 
    fill="#6b7280" 
    className="group-hover/card:fill-zinc-950 transition-colors duration-500 shrink-0"
  >
    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/>
  </svg>
)

export default function HeroLetsConnect() {
  const [hovered, setHovered] = useState(false)
  const hoveredRef = useRef(false)
  const leftRef  = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => { hoveredRef.current = hovered }, [hovered])

  useEffect(() => {
    const update = () => {
      const deg = Math.min(window.scrollY / 60, 8)
      const isHovered = hoveredRef.current
      if (leftRef.current)
        leftRef.current.style.transform = `translateX(${isHovered ? -10 : 0}px) rotate(-${deg}deg)`
      if (rightRef.current)
        rightRef.current.style.transform = `translateX(${isHovered ? 10 : 0}px) rotate(-${deg}deg)`
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    const deg = Math.min(window.scrollY / 60, 8)
    if (leftRef.current)
      leftRef.current.style.transform = `translateX(${hovered ? -10 : 0}px) rotate(-${deg}deg)`
    if (rightRef.current)
      rightRef.current.style.transform = `translateX(${hovered ? 10 : 0}px) rotate(-${deg}deg)`
  }, [hovered])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=sahshubham953@gmail.com', '_blank')
  }

  return (
    <div
      className="flex justify-center items-center select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left branch */}
      <div
        ref={leftRef}
        style={{
          width: '120px', height: '60px', position: 'relative', flexShrink: 0,
          marginRight: '-55px', zIndex: 1,
          transition: 'transform 0.6s ease',
        }}
      >
        <img
          src="/images/HomeImages/branch.svg"
          aria-hidden="true"
          style={{
            position: 'absolute', top: '50%', left: '50%',
            height: '120px', width: 'auto',
            transform: 'translate(-50%, -50%) rotate(90deg)',
            filter: 'brightness(0) opacity(0.75)',
          }}
        />
      </div>

      {/* Email button */}
      <div style={{
        position: 'relative', zIndex: 2, flexShrink: 0,
        boxShadow: hovered ? '0 2px 14px 0px rgba(30, 120, 60, 0.22)' : '0 2px 14px 0px rgba(30, 120, 60, 0)',
        transition: 'box-shadow 0.5s ease',
      }}>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=sahshubham953@gmail.com"
          onClick={handleClick}
          target="_blank"
          rel="noopener noreferrer"
          className="relative border cursor-pointer transition-all duration-500 group/card border-zinc-300 hover:border-zinc-950 bg-white flex items-center overflow-visible outline-none py-2.5 px-8 text-sm text-gray-500 hover:text-zinc-950 font-light"
          style={{
            fontFamily: 'FunnelDisplay, sans-serif',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <Plus h="left"  v="top" />
          <Plus h="right" v="top" />
          <Plus h="left"  v="bottom" />
          <Plus h="right" v="bottom" />

          <span className="select-none">Let&apos;s Connect</span>
        </a>
      </div>

      {/* Right branch - mirrored */}
      <div
        ref={rightRef}
        style={{
          width: '120px', height: '60px', position: 'relative', flexShrink: 0,
          marginLeft: '-55px', zIndex: 1,
          transition: 'transform 0.6s ease',
        }}
      >
        <img
          src="/images/HomeImages/branch.svg"
          aria-hidden="true"
          style={{
            position: 'absolute', top: '50%', left: '50%',
            height: '120px', width: 'auto',
            transform: 'translate(-50%, -50%) rotate(90deg) scaleX(-1)',
            filter: 'brightness(0) opacity(0.75)',
          }}
        />
      </div>
    </div>
  )
}
