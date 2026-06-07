"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';

export interface SwitchState {
  light1: boolean;
  light2: boolean;
  light3: boolean;
  light4: boolean;
  fan: boolean;
  tv: boolean;
  router: boolean;
  outdoorLight?: boolean;
}

interface SmartTouchSwitchBoardProps {
  switchState: SwitchState;
  onSwitchToggle: (switchName: keyof SwitchState) => void;
  fanSpeed: number;
  onFanSpeedChange: (newSpeed: number) => void;
}

const themes = [
  {
    id: 'black',
    swatchTop: '#a8a8a8',
    swatchBottom: '#111111',
    outerBody: 'linear-gradient(175deg, #d0d0d0 0%, #b8b8b8 8%, #383838 18%, #1a1a1a 30%, #222222 45%, #181818 55%, #2a2a2a 68%, #404040 80%, #c0c0c0 92%, #d8d8d8 100%)',
    innerPanel: 'linear-gradient(180deg, #1c1c1c 0%, #111111 40%, #0e0e0e 60%, #161616 100%)',
    activeBorder: '#1d4ed8',
    activeFanIcon: '#3b82f6',
    activeDot: '#1d4ed8',
  },
  {
    id: 'green',
    swatchTop: '#6aaa70',
    swatchBottom: '#0a2a0e',
    outerBody: 'linear-gradient(175deg, #b8d8b8 0%, #88b888 8%, #1e501e 18%, #0a1e0a 30%, #102010 45%, #0a180a 55%, #14281a 68%, #1e4020 80%, #80b880 92%, #b0d8b0 100%)',
    innerPanel: 'linear-gradient(180deg, #081808 0%, #040e04 40%, #030a03 60%, #061206 100%)',
    activeBorder: '#1d4ed8',
    activeFanIcon: '#3b82f6',
    activeDot: '#1d4ed8',
  },
  {
    id: 'navy',
    swatchTop: '#8888d8',
    swatchBottom: '#05050f',
    outerBody: 'linear-gradient(175deg, #c0c0e8 0%, #9898c8 8%, #202060 18%, #08081a 30%, #10103a 45%, #080818 55%, #181848 68%, #202070 80%, #8080c0 92%, #b0b0e8 100%)',
    innerPanel: 'linear-gradient(180deg, #08081e 0%, #04040f 40%, #030308 60%, #060618 100%)',
    activeBorder: '#7c3aed',
    activeFanIcon: '#a78bfa',
    activeDot: '#7c3aed',
  },
];

const SmartTouchSwitchBoard: React.FC<SmartTouchSwitchBoardProps> = ({
  switchState,
  onSwitchToggle,
  fanSpeed,
  onFanSpeedChange
}) => {
  const [themeId, setThemeId] = useState('black');
  const theme = themes.find(t => t.id === themeId) ?? themes[0];

  const clickSound = useRef<HTMLAudioElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  React.useEffect(() => {
    clickSound.current = new Audio('/images/WorkImages/abhiyantrikImages/AppMedia/touch-click.mp3');
    clickSound.current.volume = 0.7;
  }, []);
  const playClick = () => {
    if (!hasInteracted) setHasInteracted(true);
    if (clickSound.current) { clickSound.current.currentTime = 0; clickSound.current.play().catch(() => {}); }
  };

  const increaseFanSpeed = () => {
    if (fanSpeed < 5) {
      onFanSpeedChange(fanSpeed + 1);
      if (!switchState.fan) onSwitchToggle('fan');
    }
  };

  const decreaseFanSpeed = () => {
    if (fanSpeed > 0) {
      onFanSpeedChange(fanSpeed - 1);
      if (fanSpeed === 1) onSwitchToggle('fan');
    }
  };

  interface FanSpeedChangeEvent extends CustomEvent {
    detail: { speed: number };
  }

  React.useEffect(() => {
    const handleFanSpeedChange = (event: FanSpeedChangeEvent) => {
      onFanSpeedChange(event.detail.speed);
    };
    window.addEventListener('fanSpeedChange', handleFanSpeedChange as EventListener);
    return () => {
      window.removeEventListener('fanSpeedChange', handleFanSpeedChange as EventListener);
    };
  }, [onFanSpeedChange]);

  return (
    <div className="flex flex-col items-center w-full mx-auto px-2 sm:px-4">
      <div className="relative w-full" style={{ maxWidth: '900px' }}>
        {!hasInteracted && (
          <>
            <div className="absolute inset-0 rounded-sm pointer-events-none z-10 animate-ring-1" />
            <div className="absolute inset-0 rounded-sm pointer-events-none z-10 animate-ring-2" />
          </>
        )}
      <div className="relative w-full overflow-hidden rounded-sm" style={{
        boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 8px 20px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
      }}>
        {/* Outer brushed aluminum body */}
        <div className="relative w-full rounded-sm overflow-hidden" style={{
          aspectRatio: '3/1',
          background: theme.outerBody,
        transition: 'background 0.4s ease',
          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.12), inset 0 -2px 4px rgba(0,0,0,0.5)',
        }}>
          {/* Horizontal brushed lines overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 3px)',
            mixBlendMode: 'overlay',
          }} />
          {/* Top edge highlight */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5) 20%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.5) 80%, transparent)' }} />
          {/* Bottom edge shadow */}
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'rgba(0,0,0,0.6)' }} />
          {/* Left edge chamfer */}
          <div className="absolute top-0 bottom-0 left-0 w-1" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.2), transparent)' }} />
          {/* Right edge chamfer */}
          <div className="absolute top-0 bottom-0 right-0 w-1" style={{ background: 'linear-gradient(270deg, rgba(255,255,255,0.15), transparent)' }} />

          {/* Glossy frame — gradient border via padding trick */}
          <div className="absolute inset-0 mx-3 my-2 sm:mx-6 sm:my-3 md:mx-10 md:my-5" style={{
            background: 'linear-gradient(145deg, #ffffff 0%, #a0a0a0 30%, #e8e8e8 50%, #707070 70%, #d0d0d0 85%, #ffffff 100%)',
            borderRadius: '2px',
            padding: '2px',
          }}>
            <div className="w-full h-full rounded-sm flex overflow-hidden" style={{
              background: theme.innerPanel,
              transition: 'background 0.4s ease',
            }}>

              {/* SmartNation logo panel */}
              <div className="flex items-center justify-center border-r border-gray-800" style={{ width: '14.285%' }}>
                <div className="p-1 sm:p-2 md:p-4 flex flex-col items-center">
                  <Image
                    src="/images/WorkImages/abhiyantrikImages/smart_nation_logo.svg"
                    alt="SmartNation Logo"
                    width={60}
                    height={25}
                    className="w-6 h-auto sm:w-10 md:w-12 lg:w-16"
                  />
                </div>
              </div>

              {/* Main switches */}
              <div className="flex flex-1">

                {/* Light switches 2×2 grid */}
                <div className="w-1/3 grid grid-cols-2 grid-rows-2 border-r border-gray-800">
                  {(['light1', 'light2', 'light3', 'light4'] as const).map((key) => (
                    <div
                      key={key}
                      className="relative flex items-center justify-center p-1 sm:p-2 md:p-4 cursor-pointer"
                      onClick={() => { playClick(); onSwitchToggle(key); }}
                    >
                      <div className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-sm lg:rounded-lg border sm:border-2 transition-all duration-300" style={{ borderColor: switchState[key] ? theme.activeBorder : 'white' }} />
                      {key === 'light1' && !hasInteracted && (
                        <>
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-sm lg:rounded-lg border sm:border-2 border-white animate-ping opacity-40" />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-sm lg:rounded-lg border sm:border-2 border-white animate-ping opacity-20" style={{ animationDelay: '0.4s' }} />
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Fan control */}
                <div className="w-1/3 aspect-square flex items-center justify-between border-r border-gray-800 relative gap-1 sm:gap-2 md:gap-3 px-2 sm:px-4 md:px-6">
                  {/* Fan icon */}
                  <div className="cursor-pointer" onClick={() => { playClick(); onSwitchToggle('fan'); }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 28 29"
                      className="lg:w-8 lg:h-8 w-4 h-4 transition-colors duration-300"
                      style={{ color: switchState.fan ? theme.activeFanIcon : 'white' }}
                    >
                      <rect width="3.598" height="11.805" rx="1.799" transform="matrix(0.796219 0.605009 -0.602206 0.798341 24.785 0)" className="fill-current" />
                      <rect width="3.606" height="3.594" rx="1.797" transform="matrix(0.264158 0.964479 -0.963984 0.265958 17.523 11.273)" className="fill-current" />
                      <rect width="3.607" height="11.778" rx="1.803" transform="matrix(-0.131078 0.991372 -0.991247 -0.132023 12.148 10.923)" className="fill-current" />
                      <rect width="3.595" height="11.814" rx="1.798" transform="matrix(-0.929151 0.369701 0.367374 0.930073 19.91 16.645)" className="fill-current" />
                    </svg>
                  </div>

                  {/* Up / Down arrows */}
                  <div className="flex flex-col justify-center space-y-4 sm:space-y-8 md:space-y-12">
                    <div className="cursor-pointer" onClick={() => { playClick(); increaseFanSpeed(); }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8">
                        <path d="M18 15l-6-6-6 6" />
                      </svg>
                    </div>
                    <div className="cursor-pointer" onClick={() => { playClick(); decreaseFanSpeed(); }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </div>

                  {/* Speed level dots */}
                  <div className="h-full flex flex-col justify-center">
                    <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                      {[5, 4, 3, 2, 1].map((level) => (
                        <div
                          key={`level-${level}`}
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-sm transition-all duration-300"
                          style={{ backgroundColor: level <= fanSpeed && switchState.fan ? theme.activeDot : 'white', opacity: level <= fanSpeed && switchState.fan ? 1 : 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* TV / Router switches */}
                <div className="w-1/3 grid grid-cols-2 grid-rows-1 aspect-square">
                  {(['tv', 'router'] as const).map((key) => (
                    <div
                      key={key}
                      className="flex items-center justify-center p-1 sm:p-2 md:p-4 cursor-pointer"
                      onClick={() => { playClick(); onSwitchToggle(key); }}
                    >
                      <div className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-sm lg:rounded-xl border sm:border-2 transition-all duration-300" style={{ borderColor: switchState[key] ? theme.activeBorder : 'white' }} />
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Color theme swatches */}
      <div className="flex items-center justify-center gap-4 mt-10">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setThemeId(t.id)}
            className="relative rounded-full overflow-hidden cursor-pointer focus:outline-none"
            style={{
              width: '28px',
              height: '28px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
              transform: themeId === t.id ? 'rotate(90deg) scale(1.12)' : 'rotate(0deg) scale(1)',
              transition: 'transform 0.3s ease',
            }}
          >
            <div style={{ height: '50%', background: t.swatchTop }} />
            <div style={{ height: '50%', background: t.swatchBottom }} />
          </button>
        ))}
      </div>

    </div>
  );
};

export default SmartTouchSwitchBoard;
