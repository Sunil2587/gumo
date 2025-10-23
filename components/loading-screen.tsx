'use client'

import React from 'react'
import Image from 'next/image'

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/authvideo.mp4" type="video/mp4" />
        <source src="/authvideo.webm" type="video/webm" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-transparent to-cyan-900/30"></div>

      <div className="relative flex flex-col items-center gap-8 z-10">
        {/* Globe Container */}
        <div className="relative w-64 h-64">
          {/* Rotating Globe */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-48 h-48">
              {/* Globe Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600/40 to-cyan-600/40 blur-2xl animate-pulse"></div>
              
              {/* Globe Circle */}
              <div className="absolute inset-0 rounded-full border-4 border-violet-400/40 bg-gradient-to-br from-violet-600/20 to-cyan-600/20 backdrop-blur-md shadow-2xl shadow-violet-500/20">
                {/* Globe Grid Lines */}
                <svg className="absolute inset-0 w-full h-full animate-spin-slow" style={{ animationDuration: '20s' }}>
                  {/* Vertical Lines */}
                  <ellipse cx="50%" cy="50%" rx="45%" ry="45%" fill="none" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1.5"/>
                  <ellipse cx="50%" cy="50%" rx="35%" ry="45%" fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1"/>
                  <ellipse cx="50%" cy="50%" rx="25%" ry="45%" fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1"/>
                  <ellipse cx="50%" cy="50%" rx="15%" ry="45%" fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1"/>
                  
                  {/* Horizontal Lines */}
                  <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="1.5"/>
                  <ellipse cx="50%" cy="50%" rx="45%" ry="15%" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1"/>
                  <ellipse cx="50%" cy="50%" rx="45%" ry="25%" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1"/>
                  <ellipse cx="50%" cy="50%" rx="45%" ry="35%" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1"/>
                </svg>

                {/* Continents Dots */}
                <div className="absolute inset-0">
                  <div className="absolute top-[30%] left-[40%] w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping shadow-lg shadow-cyan-400/50"></div>
                  <div className="absolute top-[60%] left-[60%] w-2.5 h-2.5 bg-violet-400 rounded-full animate-ping delay-300 shadow-lg shadow-violet-400/50"></div>
                  <div className="absolute top-[45%] right-[30%] w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping delay-500 shadow-lg shadow-emerald-400/50"></div>
                </div>
              </div>

              {/* Center Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 p-0.5 shadow-xl shadow-violet-500/30">
                  <div className="w-full h-full rounded-full bg-[#0a0d1a] flex items-center justify-center">
                    <Image 
                      src="/logo.png" 
                      alt="GHUMO" 
                      width={48} 
                      height={48} 
                      className="animate-pulse"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Walking Person - Orbiting Animation */}
          <div className="absolute inset-0 flex items-center justify-center animate-spin-slow" style={{ animationDuration: '8s' }}>
            <div className="relative w-full h-full">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
                <div className="relative">
                  {/* Person Icon */}
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center shadow-xl shadow-cyan-500/50 animate-bounce-subtle">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  {/* Travel Trail */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-10 bg-gradient-to-b from-cyan-400/60 to-transparent blur-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="relative z-10 text-center">
          <h2 className="text-4xl font-black gradient-text mb-3 drop-shadow-2xl">GHUMO</h2>
          <p className="text-gray-200 text-sm mb-4 font-medium drop-shadow-lg">AI Travel Assistant</p>
          
          {/* Loading Dots */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-2.5 h-2.5 bg-violet-400 rounded-full animate-bounce shadow-lg shadow-violet-400/50"></div>
            <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce delay-100 shadow-lg shadow-cyan-400/50"></div>
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce delay-200 shadow-lg shadow-emerald-400/50"></div>
          </div>
          
          <p className="text-gray-300 text-xs mt-4 drop-shadow-lg">Preparing your journey...</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        .delay-100 {
          animation-delay: 100ms;
        }
        
        .delay-200 {
          animation-delay: 200ms;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
        
        .delay-500 {
          animation-delay: 500ms;
        }
        
        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </div>
  )
}
