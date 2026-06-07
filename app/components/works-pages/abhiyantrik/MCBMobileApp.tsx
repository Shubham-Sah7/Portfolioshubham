"use client"

import { motion } from "framer-motion"
import Image from 'next/image'
import React from "react"

const ICONS = '/images/WorkImages/abhiyantrikImages/AppMedia'

interface MCBMobileAppProps {
  mcbState: boolean;
  toggleMCB: () => void;
  onHomeNav?: () => void;
}

export default function MCBMobileApp({ mcbState, toggleMCB, onHomeNav }: MCBMobileAppProps) {
  const mcbSound = React.useRef<HTMLAudioElement | null>(null)

  React.useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0'
    document.head.appendChild(link)
    return () => { document.head.removeChild(link) }
  }, [])

  React.useEffect(() => {
    mcbSound.current = new Audio(`${ICONS}/MCB-toggle.mp3`)
    mcbSound.current.volume = 0.8
  }, [])

  const handleToggle = () => {
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
          <div className="bg-white rounded-[38px] overflow-hidden relative flex flex-col" style={{ height: '580px' }}>

            {/* Status bar */}
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

            {/* App header */}
            <div className="px-4 py-3 shrink-0">
              <div className="flex items-center">
                <h2 className="text-xl font-semibold">Smart MCB</h2>
                <div className="ml-auto">
                  <div
                    className="w-10 h-6 bg-gray-200 rounded-full flex items-center p-1 cursor-pointer"
                    onClick={handleToggle}
                  >
                    <div className={`w-4 h-4 rounded-full transform transition-all duration-300 ${mcbState ? 'translate-x-4 bg-[#080A30]' : 'translate-x-0 bg-gray-400'}`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Device grid */}
            <div className="flex-1 overflow-y-auto pb-16">
              <div className="p-3 grid grid-cols-2 gap-2 border-t border-gray-100 rounded-3xl">
                {/* MCB tile */}
                <motion.div
                  className={`p-3 rounded-xl border h-20 flex flex-col cursor-pointer ${mcbState ? 'bg-[#080A30] text-white' : 'bg-white text-blue-900 border-gray-200'}`}
                  onClick={handleToggle}
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

                {/* Spacer tile */}
                <div className="h-20 opacity-0" />
              </div>
            </div>

            {/* Bottom navigation */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-around py-4 border-t border-gray-100 bg-white">
              <button onClick={onHomeNav}>
                <Image src={`${ICONS}/HOMEoff.svg`} alt="Home" width={18} height={18} />
              </button>
              <button>
                <Image src={`${ICONS}/MCBon.svg`} alt="MCB" width={18} height={18} />
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
