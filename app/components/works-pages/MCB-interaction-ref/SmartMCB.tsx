"use client";

import React, { useEffect, useRef } from 'react';

export interface MCBState {
  mcb: boolean;
}

interface SmartMCBProps {
  mcbState: MCBState;
  onMCBToggle: () => void;
}

const SmartMCB: React.FC<SmartMCBProps> = ({
  mcbState,
  onMCBToggle
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frames = 15; // Number of frames in your video
  
  // Handle video playback based on MCB state changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    if (mcbState.mcb) {
      // Turn ON: Play forward from the beginning
      video.currentTime = 0;
      video.playbackRate = 1.0;
      
      // Using a promise to handle potential play() failure
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Video playback failed:", error);
        });
      }
    } else {
      // Turn OFF: Play backward frame by frame
      video.pause();
      
      // Start from end of video
      video.currentTime = video.duration || 1;
      
      // Use a timer to step backwards through frames
      let currentFrame = frames; // Start from the last frame
      
      const reverseInterval = setInterval(() => {
        currentFrame--;
        
        // Calculate time position based on frame number
        const timePosition = (currentFrame / frames) * (video.duration || 1);
        if (video) video.currentTime = timePosition;
        
        // Stop when we reach the beginning
        if (currentFrame <= 0) {
          clearInterval(reverseInterval);
        }
      }, 66); // Approximately 15 frames per second (1000ms / 15 ≈ 66ms)
      
      // Cleanup interval on component unmount or state change
      return () => clearInterval(reverseInterval);
    }
  }, [mcbState.mcb]);

  return (
    <div className="flex flex-col items-center w-full mx-auto px-2 sm:px-4" style={{ backgroundColor: 'transparent' }}>
      <div className="relative w-full overflow-hidden" style={{ maxWidth: "700px", backgroundColor: 'transparent' }}>
        {/* Horizontal gradient lines */}
        <div className="absolute w-full top-2/5 left-0 transform -translate-y-1/2 flex items-center justify-center gap-6 pointer-events-none z-0">
          {/* Left gradient line */}
          <div className="h-2 w-full">
            <div className={`h-full w-full ${mcbState.mcb 
              ? 'bg-gradient-to-r from-transparent via-green-400 to-green-500' 
              : 'bg-gradient-to-r from-transparent via-red-400 to-red-500'}`}></div>
          </div>
          
          {/* Right gradient line */}
          <div className="h-2 w-full">
            <div className={`h-full w-full ${mcbState.mcb 
              ? 'bg-gradient-to-l from-transparent via-green-400 to-green-500' 
              : 'bg-gradient-to-l from-transparent via-gray-400 to-gray-300'}`}></div>
          </div>
        </div>
        
        {/* Video Container */}
        <div className="w-full flex justify-center relative z-10" style={{ backgroundColor: 'transparent' }}>
          <div 
            className="relative w-full aspect-video flex items-center justify-center cursor-pointer"
            onClick={onMCBToggle}
            style={{ backgroundColor: 'transparent' }}
          >
            <video 
              ref={videoRef}
              className="w-full max-h-[500px] object-contain rounded-xl "
              muted
              playsInline
              autoPlay={mcbState.mcb}
              style={{ 
                backgroundColor: 'transparent',
                mixBlendMode: 'screen',
                WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden'
              }}
            >

              {/* changes */}
              {/* MOV with alpha for Safari */}
              <source src="/MCB/MCBvid_alpha-1.mov" type="video/quicktime" />
              {/* WebM for Chrome/Firefox/Edge with alpha channel */}
              <source src="/MCB/MCBvid.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        
       {/* Status indicator below video */}
        <div className="mt-4 flex justify-center">
          {mcbState.mcb ? (
            <div className="px-8 py-3 flex items-center">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-green-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-green-600 font-bold text-lg tracking-wider">POWER ON</span>
              </div>
            </div>
          ) : (
            <div className="px-8 py-3 flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-red-600 font-bold text-lg tracking-wider">POWER OFF</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-2 text-center text-xs sm:text-sm text-gray-400">
        Click on the MCB to toggle power
      </div>
    </div>
  );
};

export default SmartMCB;