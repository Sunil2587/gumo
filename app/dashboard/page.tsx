'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { BottomNav } from '@/components/bottom-nav'
import { LoadingScreen } from '@/components/loading-screen'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plane, MapPin, Calendar, MessageCircle, TrendingUp, Clock, DollarSign } from 'lucide-react'

const quickActions = [
  {
    title: 'Plan Trip',
    description: 'Let AI plan your perfect journey',
    icon: MapPin,
    href: '/trip-planner',
    gradient: 'from-violet-500 to-violet-700',
    shadow: 'shadow-violet-500/50'
  },
  {
    title: 'Explore',
    description: 'Discover new destinations',
    icon: Plane,
    href: '/explore',
    gradient: 'from-cyan-500 to-cyan-700',
    shadow: 'shadow-cyan-500/50'
  },
  {
    title: 'My Trips',
    description: 'View your itineraries',
    icon: Calendar,
    href: '/trips',
    gradient: 'from-emerald-500 to-emerald-700',
    shadow: 'shadow-emerald-500/50'
  },
  {
    title: 'Chat Assistant',
    description: 'Ask anything about travel',
    icon: MessageCircle,
    href: '/chat',
    gradient: 'from-blue-500 to-blue-700',
    shadow: 'shadow-blue-500/50'
  },
]

const trendingDestinations = [
  {
    id: 1,
    name: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    price: '$1,200',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    price: '$1,500',
    rating: 4.9
  },
  {
    id: 3,
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    price: '$800',
    rating: 4.7
  },
  {
    id: 4,
    name: 'Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    price: '$1,800',
    rating: 4.6
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate user for demo purposes
    const demoUser = {
      id: 'demo-user',
      name: 'Travel Explorer',
      email: 'demo@ghumo.com',
      preferences: ['adventure', 'food', 'culture'],
      travel_style: 'solo',
      budget_range: 'moderate'
    }
    
    setUser(demoUser)
    setLoading(false)
  }, [router])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header />
      
      <main className="container mx-auto px-4 pt-4 pb-24 md:pb-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-400">
            Ready to plan your next adventure?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Card 
                key={action.title}
                className="glow-card cursor-pointer bg-gradient-card backdrop-blur-sm border-violet-500/20 hover:border-violet-500/40 transition-all duration-300"
                onClick={() => router.push(action.href)}
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 shadow-lg ${action.shadow}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1 text-white">{action.title}</h3>
                  <p className="text-sm text-gray-400">{action.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="glow-card bg-gradient-to-br from-violet-500/10 to-violet-500/5 backdrop-blur-sm border-violet-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Trips</CardTitle>
              <Calendar className="h-4 w-4 text-violet-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0</div>
              <p className="text-xs text-gray-400">No trips yet</p>
            </CardContent>
          </Card>

          <Card className="glow-card bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 backdrop-blur-sm border-cyan-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$0</div>
              <p className="text-xs text-gray-400">Start tracking expenses</p>
            </CardContent>
          </Card>

          <Card className="glow-card bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 backdrop-blur-sm border-emerald-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Countries Visited</CardTitle>
              <MapPin className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0</div>
              <p className="text-xs text-gray-400">Time to explore!</p>
            </CardContent>
          </Card>
        </div>

        {/* Trending Destinations */}
        <Card className="glow-card mb-8 bg-gradient-card backdrop-blur-sm border-violet-500/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Trending Destinations</CardTitle>
                <CardDescription className="text-gray-400">Popular places travelers are visiting this season</CardDescription>
              </div>
              <Button variant="ghost" onClick={() => router.push('/explore')} className="text-violet-400 hover:text-violet-300 hover:bg-violet-500/10">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {trendingDestinations.map((destination) => (
                <div 
                  key={destination.id}
                  className="neon-border group cursor-pointer rounded-xl overflow-hidden border border-violet-500/30 hover:border-violet-500/60 transition-all duration-300 hover:scale-105"
                  onClick={() => router.push(`/destination/${destination.id}`)}
                >
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${destination.image})` }}
                  >
                    <div className="h-full bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-4">
                      <div className="text-white">
                        <h3 className="font-semibold text-lg">{destination.name}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm">From {destination.price}</span>
                          <span className="text-sm">⭐ {destination.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Travel Tips */}
        <Card className="glow-card bg-gradient-card backdrop-blur-sm border-violet-500/20">
          <CardHeader>
            <CardTitle className="text-white">Travel Tips for You</CardTitle>
            <CardDescription className="text-gray-400">Based on your preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-violet-500/5 border border-violet-500/20 hover:border-violet-500/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0 border border-violet-500/30">
                  <TrendingUp className="h-5 w-5 text-violet-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-white">Best Time to Book Flights</h4>
                  <p className="text-sm text-gray-400">
                    Book 2-3 months in advance for the best deals on international flights.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0 border border-cyan-500/30">
                  <Clock className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-white">Travel During Off-Peak</h4>
                  <p className="text-sm text-gray-400">
                    Save up to 40% by traveling during shoulder seasons (April-May, Sept-Oct).
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  )
}
