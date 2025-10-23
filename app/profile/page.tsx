'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { BottomNav } from '@/components/bottom-nav'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User, Mail, MapPin, Calendar, Settings, LogOut, Camera } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  
  // Check authentication status
  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) {
      setCurrentUser(session.user)
    }
  }

  const handleLogout = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      // Redirect to login page
      router.push('/auth/login')
    } catch (error: any) {
      console.error('Logout error:', error.message)
      alert('Failed to logout. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const user = {
    name: currentUser?.user_metadata?.name || 'Travel Explorer',
    email: currentUser?.email || 'demo@ghumo.com',
    avatar: currentUser?.user_metadata?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
    joinDate: currentUser ? new Date(currentUser.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'October 2025',
    preferences: ['Adventure', 'Food', 'Culture'],
    travelStyle: 'Solo',
    budgetRange: 'Moderate',
    stats: {
      tripsCompleted: 2,
      countriesVisited: 5,
      totalDistance: '12,450 km'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="max-w-5xl mx-auto">
          {/* Profile Header with Cover */}
          <div className="relative mb-8">
            {/* Cover Image */}
            <div className="h-48 md:h-64 rounded-2xl overflow-hidden bg-gradient-to-r from-violet-600 via-cyan-500 to-emerald-500 relative">
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            
            {/* Profile Card Overlay */}
            <Card className="glow-card -mt-20 mx-4 md:mx-8 backdrop-blur-xl bg-card/95 border-purple-500/20">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative -mt-16 md:-mt-20">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gradient-to-br from-violet-600 to-cyan-500 p-1">
                      <div className="w-full h-full rounded-full overflow-hidden bg-card">
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <Button 
                      size="icon"
                      className="absolute bottom-2 right-2 rounded-full bg-violet-600 hover:bg-violet-700 shadow-lg"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">{user.name}</h1>
                    <div className="flex flex-col md:flex-row gap-4 text-gray-400 mb-4">
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        <Mail className="h-4 w-4 text-cyan-400" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        <Calendar className="h-4 w-4 text-emerald-400" />
                        <span>Joined {user.joinDate}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {user.preferences.map((pref, idx) => (
                        <span 
                          key={pref}
                          className={`px-4 py-1.5 rounded-full text-sm font-medium border ${
                            idx === 0 ? 'bg-violet-500/10 border-violet-500/30 text-violet-400' :
                            idx === 1 ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' :
                            'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          }`}
                        >
                          {pref}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 border-0 shadow-lg shadow-violet-500/20">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Travel Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            <Card className="glow-card bg-gradient-to-br from-violet-500/10 to-violet-500/5 backdrop-blur-sm border-violet-500/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl"></div>
              <CardHeader className="text-center relative z-10">
                <CardTitle className="text-5xl font-bold bg-gradient-to-br from-violet-400 to-violet-600 bg-clip-text text-transparent mb-2">
                  {user.stats.tripsCompleted}
                </CardTitle>
                <CardDescription className="text-gray-400 text-base">Trips Completed</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="glow-card bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 backdrop-blur-sm border-cyan-500/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
              <CardHeader className="text-center relative z-10">
                <CardTitle className="text-5xl font-bold bg-gradient-to-br from-cyan-400 to-cyan-600 bg-clip-text text-transparent mb-2">
                  {user.stats.countriesVisited}
                </CardTitle>
                <CardDescription className="text-gray-400 text-base">Countries Visited</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="glow-card bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 backdrop-blur-sm border-emerald-500/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
              <CardHeader className="text-center relative z-10">
                <CardTitle className="text-5xl font-bold bg-gradient-to-br from-emerald-400 to-emerald-600 bg-clip-text text-transparent mb-2">
                  {user.stats.totalDistance}
                </CardTitle>
                <CardDescription className="text-gray-400 text-base">Total Distance</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="glow-card backdrop-blur-sm bg-card/80 border-violet-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-violet-400" />
                  Travel Preferences
                </CardTitle>
                <CardDescription className="text-gray-400">Your travel style and interests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg bg-violet-500/5 border border-violet-500/20">
                  <Label className="text-sm font-medium text-gray-400">Travel Style</Label>
                  <p className="text-xl font-semibold text-white mt-1">{user.travelStyle}</p>
                </div>
                <div className="p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
                  <Label className="text-sm font-medium text-gray-400">Budget Range</Label>
                  <p className="text-xl font-semibold text-white mt-1">{user.budgetRange}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-400 mb-3 block">Interests</Label>
                  <div className="flex flex-wrap gap-2">
                    {user.preferences.map((pref, idx) => (
                      <span 
                        key={pref}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          idx === 0 ? 'bg-violet-500/10 text-violet-400 border border-violet-500/30' :
                          idx === 1 ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' :
                          'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {pref}
                      </span>
                    ))}
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 border-0 shadow-lg shadow-violet-500/20">
                  Update Preferences
                </Button>
              </CardContent>
            </Card>

            <Card className="glow-card backdrop-blur-sm bg-card/80 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="h-5 w-5 text-cyan-400" />
                  Account Settings
                </CardTitle>
                <CardDescription className="text-gray-400">Manage your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                  <Input 
                    id="name" 
                    defaultValue={user.name} 
                    className="bg-secondary/50 border-gray-700 focus:border-cyan-500 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue={user.email}
                    className="bg-secondary/50 border-gray-700 focus:border-cyan-500 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">Change Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    className="bg-secondary/50 border-gray-700 focus:border-cyan-500 text-white"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 border-0 shadow-lg shadow-cyan-500/20">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card className="glow-card mb-8 backdrop-blur-sm bg-card/80 border-emerald-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                Travel Achievements
              </CardTitle>
              <CardDescription className="text-gray-400">Your travel milestones and badges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-6 rounded-xl bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/30 hover:border-violet-500/50 transition-all cursor-pointer group">
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">✈️</div>
                  <p className="font-semibold text-white mb-1">First Flight</p>
                  <p className="text-xs text-emerald-400">Completed</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/30 hover:border-cyan-500/50 transition-all cursor-pointer group">
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">🗺️</div>
                  <p className="font-semibold text-white mb-1">Explorer</p>
                  <p className="text-xs text-emerald-400">5 Countries</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-500/10 to-gray-500/5 border border-gray-500/20 opacity-60">
                  <div className="text-5xl mb-3">🌍</div>
                  <p className="font-semibold text-gray-400 mb-1">World Traveler</p>
                  <p className="text-xs text-gray-500">10 Countries</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-500/10 to-gray-500/5 border border-gray-500/20 opacity-60">
                  <div className="text-5xl mb-3">📸</div>
                  <p className="font-semibold text-gray-400 mb-1">Photographer</p>
                  <p className="text-xs text-gray-500">100 Photos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logout */}
          <Card className="glow-card backdrop-blur-sm bg-card/80 border-red-500/20">
            <CardContent className="pt-6">
              <Button 
                variant="destructive" 
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 shadow-lg shadow-red-500/20"
                onClick={handleLogout}
                disabled={loading}
              >
                <LogOut className="h-4 w-4 mr-2" />
                {loading ? 'Logging out...' : 'Log Out'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
