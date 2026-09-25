"use client"

import { useState } from 'react'

const EMAIL = 'sahshubham953@gmail.com'

const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="16px"
    viewBox="0 -960 960 960"
    width="16px"
    fill="currentColor"
    className="pointer-events-none transition-colors"
  >
    <path d="M358.27-260q-28.44 0-48.35-19.92Q290-299.83 290-328.27v-455.38q0-28.44 19.92-48.36 19.91-19.91 48.35-19.91h335.38q28.44 0 48.36 19.91 19.91 19.92 19.91 48.36v455.38q0 28.44-19.91 48.35Q722.09-260 693.65-260H358.27Zm0-55.96h335.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.47-3.84-3.84-8.46-3.84H358.27q-4.62 0-8.46 3.84-3.85 3.85-3.85 8.47v455.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM226.35-128.08q-28.44 0-48.36-19.92-19.91-19.91-19.91-48.35v-511.34h55.96v511.34q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h391.34v55.96H226.35Zm119.61-187.88v-480 480Z"/>
  </svg>
)

const TickIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="white">
    <path d="M382.81-258.69 175.08-466.42l40.04-40.04 167.69 167.88 362.27-362.27 39.84 40.04-402.11 402.12Z"/>
  </svg>
)

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

export default function EmailCopy() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    // 1. Synchronously execute textarea copy while user click event is fresh in the browser event loop
    let copiedSuccess = false
    try {
      const el = document.createElement('textarea')
      el.value = EMAIL
      el.style.position = 'fixed'
      el.style.top = '0'
      el.style.left = '0'
      el.style.width = '1px'
      el.style.height = '1px'
      el.style.padding = '0'
      el.style.border = 'none'
      el.style.outline = 'none'
      el.style.boxShadow = 'none'
      el.style.background = 'transparent'
      document.body.appendChild(el)
      el.focus({ preventScroll: true })
      el.select()
      el.setSelectionRange(0, EMAIL.length)
      copiedSuccess = document.execCommand('copy')
      document.body.removeChild(el)
    } catch {
      copiedSuccess = false
    }

    // 2. Also execute modern Clipboard API
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(EMAIL)
        copiedSuccess = true
      } catch {
        // execCommand already handled it
      }
    }

    return copiedSuccess
  }

  const handleCopy = async (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
    }
    await copyToClipboard()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={`relative border cursor-pointer transition-all duration-500 group/card ${copied ? 'border-zinc-950' : 'border-zinc-300 hover:border-zinc-950'}`}
      style={{
        fontFamily: 'FunnelDisplay, sans-serif',
        background: copied ? '#111' : 'white',
        overflow: 'visible',
        WebkitTapHighlightColor: 'transparent',
      }}
      onClick={handleCopy}
      title="Click to copy email"
    >
      <Plus h="left"  v="top" />
      <Plus h="right" v="top" />
      <Plus h="left"  v="bottom" />
      <Plus h="right" v="bottom" />

      <div className={`flex items-center transition-opacity duration-200 ${copied ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <span className="pl-4 pr-2 py-2 text-xs text-gray-500 select-all cursor-pointer hover:text-zinc-900 transition-colors">
          {EMAIL}
        </span>
        <button
          type="button"
          aria-label="Copy email"
          onClick={handleCopy}
          title="Copy email to clipboard"
          className="pl-2 pr-4 py-2 shrink-0 flex items-center justify-center outline-none cursor-pointer text-gray-400 hover:text-zinc-950 active:scale-90 transition-all"
        >
          <CopyIcon />
        </button>
      </div>

      <div className={`absolute inset-0 flex items-center justify-center gap-2 text-white text-xs font-medium tracking-wide transition-opacity duration-200 ${copied ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <TickIcon /> Copied!
      </div>
    </div>
  )
}
