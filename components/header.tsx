'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Home, Compass, Calendar, MessageCircle, User, Wallet, Menu, Bell } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Explore', href: '/explore', icon: Compass },
  { name: 'My Trips', href: '/trips', icon: Calendar },
  { name: 'Chat', href: '/chat', icon: MessageCircle },
  { name: 'Expenses', href: '/expenses', icon: Wallet },
  { name: 'Profile', href: '/profile', icon: User },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-6 mb-8">
      {/* Main Navigation Container */}
      <div className="relative group w-full max-w-6xl">
        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 via-cyan-500 to-violet-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 animate-pulse transition duration-1000"></div>
        
        {/* Glass Container */}
        <div className="relative bg-[#0a0d1a]/40 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-transparent to-cyan-600/10"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <div className="relative flex items-center justify-between px-6 py-3">
            {/* Logo Section */}
            <Link href="/dashboard" className="flex items-center gap-3 group/logo">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-full blur-md opacity-40 group-hover/logo:opacity-70 transition duration-500"></div>
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-violet-600/30 to-cyan-600/30 p-0.5">
                  <div className="w-full h-full rounded-full bg-[#0a0d1a] flex items-center justify-center">
                    <Image 
                      src="/logo.png" 
                      alt="GHUMO" 
                      width={40} 
                      height={40} 
                      className="transition-transform duration-500 group-hover/logo:scale-110 group-hover/logo:rotate-12"
                    />
                  </div>
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-black gradient-text tracking-tight">GHUMO</span>
                <p className="text-[10px] text-gray-500 -mt-1">AI Travel Assistant</p>
              </div>
            </Link>

            {/* Center Navigation */}
            <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-1 bg-white/5 backdrop-blur-xl rounded-2xl p-1 border border-white/10">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300',
                        isActive 
                          ? 'text-white' 
                          : 'text-gray-400 hover:text-white'
                      )}
                    >
                      {/* Active Background */}
                      {isActive && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl blur-md opacity-50"></div>
                        </>
                      )}
                      
                      {/* Icon */}
                      <Icon className={cn(
                        "h-4 w-4 relative z-10 transition-all duration-300",
                        isActive && "drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                      )} />
                      
                      {/* Text */}
                      <span className="relative z-10">{item.name}</span>
                      
                      {/* Hover Effect */}
                      {!isActive && (
                        <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                      )}
                    </Link>
                  )
                })}
              </div>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button className="relative group/bell p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300">
                <Bell className="h-5 w-5 text-gray-400 group-hover/bell:text-cyan-400 transition-colors" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-gradient-to-br from-cyan-400 to-violet-600 rounded-full animate-pulse shadow-lg shadow-cyan-500/50"></span>
              </button>
              
              <button className="md:hidden p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300">
                <Menu className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
