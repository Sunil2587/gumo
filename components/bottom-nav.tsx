'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, Calendar, MessageCircle, User, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Explore', href: '/explore', icon: Compass },
  { name: 'My Trips', href: '/trips', icon: Calendar },
  { name: 'Chat', href: '/chat', icon: MessageCircle },
  { name: 'Expenses', href: '/expenses', icon: Wallet },
  { name: 'Profile', href: '/profile', icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Backdrop blur layer */}
      <div className="absolute inset-0 bg-[#0a0d1a]/90 backdrop-blur-2xl border-t border-violet-500/10"></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-violet-600/5 via-transparent to-transparent pointer-events-none"></div>
      
      {/* Navigation content */}
      <div className="relative flex items-center justify-around h-20 px-4">
        {navigation.map((item, index) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center min-w-[60px] h-14 space-y-1 transition-all duration-300 rounded-2xl relative group',
                isActive ? 'scale-110' : 'scale-100 hover:scale-105'
              )}
            >
              {/* Active indicator - top bar */}
              {isActive && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-violet-500 via-cyan-500 to-violet-500 rounded-full shadow-lg shadow-violet-500/50 animate-pulse"></div>
              )}
              
              {/* Background glow */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-violet-600/20 to-cyan-600/10 rounded-2xl blur-sm"></div>
              )}
              
              {/* Icon container */}
              <div className={cn(
                "relative z-10 flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300",
                isActive 
                  ? "bg-gradient-to-br from-violet-600 to-violet-700 shadow-lg shadow-violet-500/30" 
                  : "bg-transparent group-hover:bg-white/5"
              )}>
                <Icon className={cn(
                  "h-5 w-5 transition-all duration-300",
                  isActive 
                    ? "text-white" 
                    : "text-gray-500 group-hover:text-gray-300"
                )} />
                
                {/* Icon glow effect */}
                {isActive && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 opacity-30 blur-md"></div>
                )}
              </div>
              
              {/* Label */}
              <span className={cn(
                "text-[10px] font-semibold relative z-10 transition-all duration-300 tracking-wide",
                isActive 
                  ? "text-white" 
                  : "text-gray-500 group-hover:text-gray-300"
              )}>
                {item.name}
              </span>
              
              {/* Subtle pulse animation for active item */}
              {isActive && (
                <div className="absolute inset-0 rounded-2xl border border-violet-500/20 animate-pulse"></div>
              )}
            </Link>
          )
        })}
      </div>
      
      {/* Bottom safe area for iOS devices */}
      <div className="h-safe-bottom bg-[#0a0d1a]/90"></div>
    </nav>
  )
}
