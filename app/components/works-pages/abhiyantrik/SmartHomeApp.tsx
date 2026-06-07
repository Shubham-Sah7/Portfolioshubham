"use client"

import { motion } from "framer-motion"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface MobileAppProps {
  devices: {
    fan: boolean
    tv: boolean
    router: boolean
    light1: boolean
    light2: boolean
    light3: boolean
    light4: boolean
    [key: string]: boolean
  }
  toggleDevice: (deviceId: string) => void
  fanSpeed?: number
  toggleAllDevices?: (state: boolean) => void
  onMCBNav?: () => void
}

export default function MobileApp({ devices, toggleDevice, fanSpeed = 0, toggleAllDevices, onMCBNav }: MobileAppProps) {
  const [mainToggleOn, setMainToggleOn] = useState(false)
  const allOnOffSound = React.useRef<HTMLAudioElement | null>(null)
  const clickSound = React.useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const anyDeviceOn = Object.values(devices).some(state => state === true)
    setMainToggleOn(anyDeviceOn)
  }, [devices])

  useEffect(() => {
    allOnOffSound.current = new Audio('/images/WorkImages/abhiyantrikImages/AppMedia/All-on-off.mp3')
    allOnOffSound.current.volume = 0.7
    clickSound.current = new Audio('/images/WorkImages/abhiyantrikImages/AppMedia/touch-click.mp3')
    clickSound.current.volume = 0.7
  }, [])

  const playClick = () => {
    if (clickSound.current) { clickSound.current.currentTime = 0; clickSound.current.play().catch(() => {}) }
  }

  const handleMainToggle = () => {
    if (allOnOffSound.current) { allOnOffSound.current.currentTime = 0; allOnOffSound.current.play().catch(() => {}); }
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

  // Load Material Symbols font
  React.useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0'
    document.head.appendChild(link)
    return () => { document.head.removeChild(link) }
  }, [])

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
        <div className="bg-white rounded-[38px] overflow-hidden relative flex flex-col" style={{ height: '580px' }}>

          {/* Status bar */}
          <div className="flex justify-center items-center h-10 bg-white shrink-0">
            <div className="flex w-full justify-between items-center px-5">
              <div className="text-black text-[12px] font-semibold opacity-75">9:41</div>
              <div className="w-[90px] h-[22px] bg-black rounded-full flex justify-center items-center ml-9">
                <div className="flex items-center justify-between w-[40px]">
                  <div className="w-1 h-1 rounded-full bg-orange-500"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/images/WorkImages/abhiyantrikImages/AppMedia/MobileSignalIcon.svg" alt="Signal" width={16} height={16} className="h-2 w-auto" />
                <Image src="/images/WorkImages/abhiyantrikImages/AppMedia/WifiIcon.svg" alt="WiFi" width={16} height={16} className="h-2 w-auto" />
                <Image src="/images/WorkImages/abhiyantrikImages/AppMedia/BatteryIcon.svg" alt="Battery" width={20} height={16} className="h-2 w-auto" />
              </div>
            </div>
          </div>

          {/* App header */}
          <div className="px-4 py-3 shrink-0">
            <div className="flex items-center">
              <button className="text-gray-800">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18L9 12L15 6" />
                </svg>
              </button>
              <h2 className="text-xl font-semibold ml-2">Living room</h2>
              <div className="ml-auto">
                <div
                  className="w-10 h-6 bg-gray-200 rounded-full flex items-center p-1 cursor-pointer"
                  onClick={handleMainToggle}
                >
                  <div className={`w-4 h-4 rounded-full transform transition-all duration-300 ${mainToggleOn ? 'translate-x-4 bg-[#080A30]' : 'translate-x-0 bg-gray-400'}`} />
                </div>
              </div>
            </div>
            {/* Room tabs */}
            <div className="flex gap-2 mt-3 overflow-x-hidden">
              <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md whitespace-nowrap text-[10px]">Living room</div>
              <div className="px-2 py-1 text-gray-500 whitespace-nowrap text-[10px]">Bedroom 1</div>
              <div className="px-2 py-1 text-gray-500 whitespace-nowrap text-[10px]">Bedroom 2</div>
              <div className="px-2 py-1 text-gray-500 whitespace-nowrap text-[10px]">Kitchen</div>
              <div className="px-2 py-1 text-gray-500 whitespace-nowrap text-[10px]">Bath</div>
            </div>
          </div>

          {/* Device grid — scrollable, leaves room for bottom nav */}
          <div className="flex-1 overflow-y-auto pb-16">
            <div className="p-3 grid grid-cols-2 gap-2 border-t border-gray-100 rounded-3xl">

              {/* Lights 1–4 */}
              {(['light1', 'light2', 'light3', 'light4'] as const).map((key, i) => (
                <motion.div
                  key={key}
                  className={`p-3 rounded-xl border h-20 flex flex-col cursor-pointer ${devices[key] ? 'bg-[#080A30] text-white' : 'bg-white text-blue-900 border-gray-200'}`}
                  onClick={() => { playClick(); toggleDevice(key); }}
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
                onClick={() => { playClick(); toggleDevice('fan'); }}
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
                        e.stopPropagation()
                        playClick()
                        if (fanSpeed > 0) {
                          const newSpeed = Math.max(0, fanSpeed - 1)
                          if (newSpeed === 0) {
                            toggleDevice('fan')
                          } else {
                            window.dispatchEvent(new CustomEvent('fanSpeedChange', { detail: { speed: newSpeed } }))
                          }
                        }
                      }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>expand_more</span>
                    </button>
                    <div className="text-lg font-medium mx-2">{fanSpeed}</div>
                    <button
                      className={`w-6 h-6 rounded-full ${devices.fan ? 'bg-[#080A30] text-white' : 'bg-gray-300'} flex items-center justify-center text-xs ml-auto`}
                      onClick={(e) => {
                        e.stopPropagation()
                        playClick()
                        if (!devices.fan) toggleDevice('fan')
                        if (fanSpeed < 5) {
                          window.dispatchEvent(new CustomEvent('fanSpeedChange', { detail: { speed: Math.min(5, fanSpeed + 1) } }))
                        }
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
                onClick={() => { playClick(); toggleDevice('tv'); }}
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
                onClick={() => { playClick(); toggleDevice('router'); }}
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

          {/* Bottom navigation — pinned to bottom */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-around py-4 border-t border-gray-100 bg-white">
            <button><Image src="/images/WorkImages/abhiyantrikImages/AppMedia/HomeIcon.svg" alt="Home" width={18} height={18} /></button>
            <button onClick={onMCBNav}><Image src="/images/WorkImages/abhiyantrikImages/AppMedia/MCBIcon.svg" alt="MCB" width={18} height={18} /></button>
            <button><Image src="/images/WorkImages/abhiyantrikImages/AppMedia/ScheduleIcon.svg" alt="Schedule" width={16} height={16} /></button>
            <button><Image src="/images/WorkImages/abhiyantrikImages/AppMedia/ProfileIcon.svg" alt="Profile" width={18} height={18} /></button>
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
