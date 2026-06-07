"use client";

import React, { useEffect, useRef } from 'react';

export interface MCBState {
  mcb: boolean;
}

interface SmartMCBProps {
  mcbState: MCBState;
  onMCBToggle: () => void;
}

const SmartMCB: React.FC<SmartMCBProps> = ({ mcbState, onMCBToggle }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mcbSound = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    mcbSound.current = new Audio('/images/WorkImages/abhiyantrikImages/AppMedia/MCB-toggle.mp3');
    mcbSound.current.volume = 0.8;
  }, []);

  const playMCBSound = () => {
    if (mcbSound.current) { mcbSound.current.currentTime = 0; mcbSound.current.play().catch(() => {}); }
  };

  const handleToggle = () => { playMCBSound(); onMCBToggle(); };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Cancel any running reverse animation
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (mcbState.mcb) {
      video.playbackRate = 1.0;
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
      const startVideoTime = video.currentTime > 0 ? video.currentTime : (video.duration || 1);
      // Reverse at same real-time speed as forward playback
      const reverseDuration = startVideoTime * 1000;
      const startWallTime = performance.now();
      const SEEK_INTERVAL = 1000 / 24; // cap seeks at 24fps — smooth but not CPU-heavy on mobile
      let lastSeek = -1;

      const tick = (now: number) => {
        const elapsed = now - startWallTime;
        const progress = Math.min(elapsed / reverseDuration, 1);
        if (now - lastSeek >= SEEK_INTERVAL) {
          video.currentTime = startVideoTime * (1 - progress);
          lastSeek = now;
        }
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          video.currentTime = 0;
          rafRef.current = null;
        }
      };

      rafRef.current = requestAnimationFrame(tick);
      return () => {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      };
    }
  }, [mcbState.mcb]);

  return (
    <div className="flex flex-col items-center w-full mx-auto px-2 sm:px-4" style={{ backgroundColor: 'transparent' }}>
      <div className="relative w-full overflow-hidden" style={{ maxWidth: '700px', backgroundColor: 'transparent' }}>

        {/* Horizontal gradient lines */}
        <div className="absolute w-full top-2/5 left-0 transform -translate-y-1/2 flex items-center justify-center gap-6 pointer-events-none z-0">
          <div className="h-2 w-full">
            <div className={`h-full w-full ${mcbState.mcb
              ? 'bg-gradient-to-r from-transparent via-green-400 to-green-500'
              : 'bg-gradient-to-r from-transparent via-red-400 to-red-500'}`} />
          </div>
          <div className="h-2 w-full">
            <div className={`h-full w-full ${mcbState.mcb
              ? 'bg-gradient-to-l from-transparent via-green-400 to-green-500'
              : 'bg-gradient-to-l from-transparent via-gray-400 to-gray-300'}`} />
          </div>
        </div>

        {/* Video */}
        <div className="w-full flex justify-center relative z-10" style={{ backgroundColor: 'transparent' }}>
          <div
            className="relative w-full aspect-video flex items-center justify-center cursor-pointer"
            onClick={handleToggle}
            style={{ backgroundColor: 'transparent' }}
          >
            <video
              ref={videoRef}
              className="w-full max-h-[500px] object-contain rounded-xl"
              muted
              playsInline
              autoPlay={mcbState.mcb}
              style={{
                backgroundColor: 'transparent',
                mixBlendMode: 'screen',
                WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
              }}
            >
              <source src="/images/WorkImages/abhiyantrikImages/MCB/MCBvid_alpha-1.mov" type="video/quicktime" />
              <source src="/images/WorkImages/abhiyantrikImages/MCB/MCBvid.webm" type="video/webm" />
            </video>
          </div>
        </div>

        {/* Status indicator */}
        <div className="mt-4 flex justify-center">
          {mcbState.mcb ? (
            <div className="px-8 py-3 flex items-center gap-3">
              <div className="relative">
                <div className="w-4 h-4 bg-green-500 rounded-full" />
                <div className="absolute inset-0 w-4 h-4 bg-green-500 rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-green-600 font-bold text-lg tracking-wider">POWER ON</span>
            </div>
          ) : (
            <div className="px-8 py-3 flex items-center gap-3">
              <div className="w-4 h-4 bg-red-500 rounded-full" />
              <span className="text-red-600 font-bold text-lg tracking-wider">POWER OFF</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default SmartMCB;
