"use client"

import { motion } from "framer-motion"
import Image from 'next/image'
import React from "react";
// import React, { useEffect, useState } from 'react'

interface MCBMobileAppProps {
  mcbState: boolean;
  toggleMCB: () => void;
}

export default function MCBMobileApp({ mcbState, toggleMCB }: MCBMobileAppProps) {
  // Add Material Icons font
  React.useEffect(() => {
    // Add the Google Material Icons font
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0';
    document.head.appendChild(link);
    
    return () => {
      // Clean up
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="relative mt-8">
      {/* Phone frame */}
      <motion.div
        className="relative bg-black rounded-[50px] p-2.5 shadow-2xl shadow-slate-600 w-full max-w-[290px] border-2 border-blue-400"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Screen */}
        <div className="bg-white rounded-[38px] overflow-hidden h-[580px] relative">
          {/* Single status bar with all elements in one line */}
          <div className="flex justify-center items-center h-10 bg-white">
            {/* All elements in one centered div */}
            <div className="flex w-full justify-between items-center px-5">
              <div className="text-black text-[12px] font-semibold opacity-75">9:41</div>
              
              {/* Dynamic Island notch */}
              <div className="w-[90px] h-[22px] bg-black rounded-full flex justify-center items-center ml-9">
                <div className="flex items-center justify-between w-[40px]">
                  <div className="w-1 h-1 rounded-full bg-orange-500"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                </div>
              </div>
              
              {/* Status icons */}
              <div className="flex items-center gap-2">
                <Image 
                  src="/AppMedia/MobileSignalIcon.svg" 
                  alt="Mobile Signal" 
                  width={16} 
                  height={16} 
                  className="h-2 w-auto"
                />
                <Image 
                  src="/AppMedia/WifiIcon.svg" 
                  alt="WiFi" 
                  width={16} 
                  height={16} 
                  className="h-2 w-auto"
                />
                <Image 
                  src="/AppMedia/BatteryIcon.svg" 
                  alt="Battery" 
                  width={20} 
                  height={16} 
                  className="h-2 w-auto"
                />
              </div>
            </div>
          </div>

          {/* App header */}
          <div className="px-4 py-3">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold">Smart MCB</h2>
              <div className="ml-auto">
                {/* Master toggle switch */}
                <div 
                  className="w-10 h-6 bg-gray-200 rounded-full flex items-center p-1 cursor-pointer transition-colors"
                  onClick={toggleMCB}
                >
                  <div 
                    className={`w-4 h-4 rounded-full transform transition-all duration-300 ${
                      mcbState
                        ? "translate-x-4 bg-[#080A30]" 
                        : "translate-x-0 bg-gray-400"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 grid grid-cols-2 gap-2 border-t rounded-3xl">
            {/* MCB Tile - Using same size as touch switch tiles */}
            <motion.div
              className={`p-3 rounded-xl border h-20 flex flex-col ${mcbState ? "bg-[#080A30] text-white" : "bg-white text-blue-900 border-gray-200"}`}
              onClick={toggleMCB}
              whileTap={{ scale: 0.95 }}
            >
              {/* Status indicator in top right */}
              <div className="flex justify-end">
                <div className={`w-2 h-2 rounded-full ${mcbState ? "bg-green-400" : "bg-gray-300"}`}></div>
              </div>
              
              {/* Centered icon and text */}
              <div className="flex items-center justify-center flex-grow">
                <span className="material-symbols-outlined mr-2" style={{ fontSize: '20px' }}>electrical_services</span>
                <div className="font-medium text-sm">Main MCB</div>
              </div>
              
              {/* Empty space at bottom for balance */}
              <div className="h-2"></div>
            </motion.div>
            
            {/* Hidden tile - Invisible but keeps the grid structure */}
            <div className="h-20 opacity-0"></div>
          </div>

          {/* Bottom navigation - with background to appear in front */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-around py-4 border-t bg-white">
            <button className="text-gray-400">
              <Image 
                src="/AppMedia/HOMEoff.svg" 
                alt="Home" 
                width={18} 
                height={18} 
              />
            </button>
            <button className="text-blue-900">
              <Image 
                src="/AppMedia/MCBon.svg" 
                alt="MCB" 
                width={18} 
                height={18} 
              />
            </button>
            <button className="text-gray-400">
              <Image 
                src="/AppMedia/ScheduleIcon.svg" 
                alt="Schedule" 
                width={16} 
                height={16} 
              />
            </button>
            <button className="text-gray-400">
              <Image 
                src="/AppMedia/ProfileIcon.svg" 
                alt="Profile" 
                width={18} 
                height={18} 
              />
            </button>
          </div>
          
          {/* Home indicator line (iPhone style) */}
          <div className="absolute bottom-1 left-0 right-0 flex justify-center">
            <div className="w-24 h-1 bg-black rounded-full opacity-30"></div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}