"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const ICONS = '/images/WorkImages/abhiyantrikImages/AppMedia'

interface PhoneShellProps {
  activeScreen: 'switch' | 'mcb'
  onNavigateTo: (screen: 'switch' | 'mcb') => void
  devices: {
    fan: boolean; tv: boolean; router: boolean
    light1: boolean; light2: boolean; light3: boolean; light4: boolean
    [key: string]: boolean
  }
  toggleDevice: (deviceId: string) => void
  fanSpeed?: number
  toggleAllDevices?: (state: boolean) => void
  mcbState: boolean
  toggleMCB: () => void
}

export default function PhoneShell({
  activeScreen, onNavigateTo,
  devices, toggleDevice, fanSpeed = 0, toggleAllDevices,
  mcbState, toggleMCB,
}: PhoneShellProps) {

  const [mainToggleOn, setMainToggleOn] = useState(false)
  const allOnOffSound = useRef<HTMLAudioElement | null>(null)
  const clickSound = useRef<HTMLAudioElement | null>(null)
  const mcbSound = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    setMainToggleOn(Object.values(devices).some(v => v === true))
  }, [devices])

  useEffect(() => {
    allOnOffSound.current = new Audio(`${ICONS}/All-on-off.mp3`)
    allOnOffSound.current.volume = 0.7
    clickSound.current = new Audio(`${ICONS}/touch-click.mp3`)
    clickSound.current.volume = 0.7
    mcbSound.current = new Audio(`${ICONS}/MCB-toggle.mp3`)
    mcbSound.current.volume = 0.8
  }, [])

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0'
    document.head.appendChild(link)
    return () => { if (document.head.contains(link)) document.head.removeChild(link) }
  }, [])

  const playClick = () => {
    if (clickSound.current) { clickSound.current.currentTime = 0; clickSound.current.play().catch(() => {}) }
  }

  const handleMainToggle = () => {
    if (allOnOffSound.current) { allOnOffSound.current.currentTime = 0; allOnOffSound.current.play().catch(() => {}) }
    const newState = !mainToggleOn
    if (toggleAllDevices) {
      toggleAllDevices(newState)
    } else {
      Object.keys(devices).forEach(device => {
        if (devices[device] !== newState) toggleDevice(device)
      })
    }
    setMainToggleOn(newState)
  }

  const handleMCBToggle = () => {
    if (mcbSound.current) { mcbSound.current.currentTime = 0; mcbSound.current.play().catch(() => {}) }
    toggleMCB()
  }

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className="relative shadow-2xl shadow-slate-600 w-full max-w-[290px] rounded-[50px]"
        style={{
          background: 'linear-gradient(145deg, #ffffff 0%, #b0b0b0 25%, #e8e8e8 50%, #808080 75%, #d0d0d0 90%, #ffffff 100%)',
          padding: '2px',
        }}
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="relative bg-black rounded-[50px] p-2.5 w-full">
          {/* Screen */}
          <div className="bg-white rounded-[38px] overflow-hidden flex flex-col" style={{ height: '580px' }}>

            {/* ── FIXED: Status bar — never moves ── */}
            <div className="flex justify-center items-center h-10 bg-white shrink-0">
              <div className="flex w-full justify-between items-center px-5">
                <div className="text-black text-[12px] font-semibold opacity-75">9:41</div>
                <div className="w-[90px] h-[22px] bg-black rounded-full flex justify-center items-center ml-9">
                  <div className="flex items-center justify-between w-[40px]">
                    <div className="w-1 h-1 rounded-full bg-orange-500" />
                    <div className="w-3 h-3 rounded-full bg-gray-900" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Image src={`${ICONS}/MobileSignalIcon.svg`} alt="Signal" width={16} height={16} className="h-2 w-auto" />
                  <Image src={`${ICONS}/WifiIcon.svg`} alt="WiFi" width={16} height={16} className="h-2 w-auto" />
                  <Image src={`${ICONS}/BatteryIcon.svg`} alt="Battery" width={20} height={16} className="h-2 w-auto" />
                </div>
              </div>
            </div>

            {/* ── SLIDING: Middle content area only ── */}
            <div className="flex-1 relative overflow-hidden">
              <div
                className="flex h-full"
                style={{
                  width: '200%',
                  transform: activeScreen === 'switch' ? 'translateX(0%)' : 'translateX(-50%)',
                  transition: 'transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  willChange: 'transform',
                }}
              >

                {/* ── HOME / SWITCH SCREEN content ── */}
                <div className="flex flex-col overflow-hidden" style={{ width: '50%', height: '100%' }}>
                  {/* App header */}
                  <div className="px-4 py-3 shrink-0 bg-white">
                    <div className="flex items-center">
                      <button className="text-gray-800">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M15 18L9 12L15 6" />
                        </svg>
                      </button>
                      <h2 className="text-xl font-semibold ml-2">Living room</h2>
                      <div className="ml-auto">
                        <div className="w-10 h-6 bg-gray-200 rounded-full flex items-center p-1 cursor-pointer" onClick={handleMainToggle}>
                          <div className={`w-4 h-4 rounded-full transform transition-all duration-300 ${mainToggleOn ? 'translate-x-4 bg-[#080A30]' : 'translate-x-0 bg-gray-400'}`} />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3 overflow-x-hidden">
                      <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md whitespace-nowrap text-[10px]">Living room</div>
                      <div className="px-2 py-1 text-gray-500 whitespace-nowrap text-[10px]">Bedroom 1</div>
                      <div className="px-2 py-1 text-gray-500 whitespace-nowrap text-[10px]">Bedroom 2</div>
                      <div className="px-2 py-1 text-gray-500 whitespace-nowrap text-[10px]">Kitchen</div>
                      <div className="px-2 py-1 text-gray-500 whitespace-nowrap text-[10px]">Bath</div>
                    </div>
                  </div>

                  {/* Device grid */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="p-3 grid grid-cols-2 gap-2 border-t border-gray-100 rounded-3xl">

                      {(['light1', 'light2', 'light3', 'light4'] as const).map((key, i) => (
                        <motion.div
                          key={key}
                          className={`p-3 rounded-xl border h-20 flex flex-col cursor-pointer ${devices[key] ? 'bg-[#080A30] text-white' : 'bg-white text-blue-900 border-gray-200'}`}
                          onClick={() => { playClick(); toggleDevice(key) }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="flex justify-end">
                            <div className={`w-2 h-2 rounded-full ${devices[key] ? 'bg-green-400' : 'bg-gray-300'}`} />
                          </div>
                          <div className="flex items-center justify-center flex-grow">
                            <span className="material-symbols-outlined mr-2" style={{ fontSize: '20px' }}>lightbulb</span>
                            <div className="font-medium text-sm">Light {i + 1}</div>
                          </div>
                          <div className="h-2" />
                        </motion.div>
                      ))}

                      {/* Fan */}
                      <motion.div
                        className={`p-3 rounded-xl border h-20 cursor-pointer ${devices.fan ? 'bg-[#080A30] text-white' : 'bg-white text-blue-900 border-gray-200'}`}
                        onClick={() => { playClick(); toggleDevice('fan') }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>mode_fan</span>
                            <div className="ml-2 font-medium text-sm">Fan</div>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${devices.fan ? 'bg-green-400' : 'bg-gray-300'}`} />
                        </div>
                        <div className="mt-2 flex justify-center">
                          <div className="bg-gray-100 text-[#080A30] rounded-full flex items-center w-full py-0.5 px-1.5">
                            <button
                              className={`w-6 h-6 rounded-full ${devices.fan ? 'bg-[#080A30] text-white' : 'bg-gray-300'} flex items-center justify-center text-xs mr-auto`}
                              onClick={(e) => {
                                e.stopPropagation(); playClick()
                                if (fanSpeed > 0) {
                                  const s = Math.max(0, fanSpeed - 1)
                                  if (s === 0) toggleDevice('fan')
                                  else window.dispatchEvent(new CustomEvent('fanSpeedChange', { detail: { speed: s } }))
                                }
                              }}
                            >
                              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>expand_more</span>
                            </button>
                            <div className="text-lg font-medium mx-2">{fanSpeed}</div>
                            <button
                              className={`w-6 h-6 rounded-full ${devices.fan ? 'bg-[#080A30] text-white' : 'bg-gray-300'} flex items-center justify-center text-xs ml-auto`}
                              onClick={(e) => {
                                e.stopPropagation(); playClick()
                                if (!devices.fan) toggleDevice('fan')
                                if (fanSpeed < 5) window.dispatchEvent(new CustomEvent('fanSpeedChange', { detail: { speed: Math.min(5, fanSpeed + 1) } }))
                              }}
                            >
                              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>expand_less</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>

                      {/* TV */}
                      <motion.div
                        className={`p-3 rounded-xl border h-20 flex flex-col cursor-pointer ${devices.tv ? 'bg-[#080A30] text-white' : 'bg-white text-blue-900 border-gray-200'}`}
                        onClick={() => { playClick(); toggleDevice('tv') }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="flex justify-end"><div className={`w-2 h-2 rounded-full ${devices.tv ? 'bg-green-400' : 'bg-gray-300'}`} /></div>
                        <div className="flex items-center justify-center flex-grow">
                          <span className="material-symbols-outlined mr-2" style={{ fontSize: '20px' }}>tv</span>
                          <div className="font-medium text-sm">TV</div>
                        </div>
                        <div className="h-2" />
                      </motion.div>

                      {/* Router */}
                      <motion.div
                        className={`p-3 rounded-xl border h-20 flex flex-col cursor-pointer ${devices.router ? 'bg-[#080A30] text-white' : 'bg-white text-blue-900 border-gray-200'}`}
                        onClick={() => { playClick(); toggleDevice('router') }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="flex justify-end"><div className={`w-2 h-2 rounded-full ${devices.router ? 'bg-green-400' : 'bg-gray-300'}`} /></div>
                        <div className="flex items-center justify-center flex-grow">
                          <span className="material-symbols-outlined mr-2" style={{ fontSize: '20px' }}>router</span>
                          <div className="font-medium text-sm">Router</div>
                        </div>
                        <div className="h-2" />
                      </motion.div>

                    </div>
                  </div>
                </div>

                {/* ── MCB SCREEN content ── */}
                <div className="flex flex-col overflow-hidden" style={{ width: '50%', height: '100%' }}>
                  {/* App header */}
                  <div className="px-4 py-3 shrink-0 bg-white">
                    <div className="flex items-center">
                      <h2 className="text-xl font-semibold">Smart MCB</h2>
                      <div className="ml-auto">
                        <div className="w-10 h-6 bg-gray-200 rounded-full flex items-center p-1 cursor-pointer" onClick={handleMCBToggle}>
                          <div className={`w-4 h-4 rounded-full transform transition-all duration-300 ${mcbState ? 'translate-x-4 bg-[#080A30]' : 'translate-x-0 bg-gray-400'}`} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* MCB tile */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="p-3 grid grid-cols-2 gap-2 border-t border-gray-100 rounded-3xl">
                      <motion.div
                        className={`p-3 rounded-xl border h-20 flex flex-col cursor-pointer ${mcbState ? 'bg-[#080A30] text-white' : 'bg-white text-blue-900 border-gray-200'}`}
                        onClick={handleMCBToggle}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="flex justify-end">
                          <div className={`w-2 h-2 rounded-full ${mcbState ? 'bg-green-400' : 'bg-gray-300'}`} />
                        </div>
                        <div className="flex items-center justify-center flex-grow">
                          <span className="material-symbols-outlined mr-2" style={{ fontSize: '20px' }}>electrical_services</span>
                          <div className="font-medium text-sm">Main MCB</div>
                        </div>
                        <div className="h-2" />
                      </motion.div>
                      <div className="h-20 opacity-0" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ── FIXED: Bottom nav — stays put, only icons change ── */}
            <div className="flex justify-around py-4 border-t border-gray-100 bg-white shrink-0">
              <button onClick={() => onNavigateTo('switch')}>
                <Image
                  src={activeScreen === 'switch' ? `${ICONS}/HomeIcon.svg` : `${ICONS}/HOMEoff.svg`}
                  alt="Home" width={18} height={18}
                />
              </button>
              <button onClick={() => onNavigateTo('mcb')}>
                <Image
                  src={activeScreen === 'mcb' ? `${ICONS}/MCBon.svg` : `${ICONS}/MCBIcon.svg`}
                  alt="MCB" width={18} height={18}
                />
              </button>
              <button>
                <Image src={`${ICONS}/ScheduleIcon.svg`} alt="Schedule" width={16} height={16} />
              </button>
              <button>
                <Image src={`${ICONS}/ProfileIcon.svg`} alt="Profile" width={18} height={18} />
              </button>
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-1 left-0 right-0 flex justify-center pointer-events-none">
              <div className="w-24 h-1 bg-black rounded-full opacity-20" />
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  )
}
