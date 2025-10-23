'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [showVideo, setShowVideo] = useState(true)
  const [videoError, setVideoError] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    // Show video for 5 seconds then redirect to login
    const timer = setTimeout(() => {
      setShowVideo(false)
      router.push('/auth/login')
    }, 5000) // 5 seconds

    return () => clearTimeout(timer)
  }, [router])

  const handleVideoError = () => {
    console.log('Video failed to load, using fallback')
    setVideoError(true)
    setVideoLoaded(true) // Consider it "loaded" even with error
  }

  const handleVideoLoaded = () => {
    setVideoLoaded(true)
  }

  if (!showVideo) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video - Full Screen */}
      {!videoError && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoadedData={handleVideoLoaded}
          onError={handleVideoError}
        >
          <source src="/authvideo.mp4" type="video/mp4" />
          <source src="/authvideo.webm" type="video/webm" />
        </video>
      )}

      {/* Fallback Gradient Background */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-[#0a0d1a] via-[#1a1333] to-[#0d1b2a] transition-opacity duration-1000 ${
          videoError || !videoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-cyan-900/20"></div>

      {/* Center Logo/Text */}
      <div className="relative z-10 text-center">
        <h1 className="text-6xl md:text-8xl font-black gradient-text mb-4 drop-shadow-2xl animate-fade-in">
          GHUMO
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 font-medium drop-shadow-lg animate-fade-in-delay">
          Your AI Travel Companion
        </p>
        
        {/* Loading indicator */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="w-3 h-3 bg-violet-400 rounded-full animate-bounce shadow-lg shadow-violet-400/50"></div>
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-100 shadow-lg shadow-cyan-400/50"></div>
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce delay-200 shadow-lg shadow-emerald-400/50"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s backwards;
        }

        .delay-100 {
          animation-delay: 100ms;
        }
        
        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </div>
  )
}
