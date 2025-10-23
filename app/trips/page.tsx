'use client'

import React from 'react'
import { Header } from '@/components/header'
import { BottomNav } from '@/components/bottom-nav'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Clock, Plus } from 'lucide-react'

const sampleTrips = [
  {
    id: 1,
    destination: 'Tokyo, Japan',
    startDate: '2025-12-15',
    endDate: '2025-12-22',
    budget: 2000,
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400'
  },
  {
    id: 2,
    destination: 'Paris, France',
    startDate: '2025-09-10',
    endDate: '2025-09-17',
    budget: 2500,
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400'
  }
]

export default function TripsPage() {
  const upcomingTrips = sampleTrips.filter(t => t.status === 'upcoming')
  const pastTrips = sampleTrips.filter(t => t.status === 'completed')

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const calculateDays = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">My Trips ✈️</h1>
            <p className="text-muted-foreground">
              Manage your travel plans and memories
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Trip
          </Button>
        </div>

        {/* Upcoming Trips */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Trips</h2>
          {upcomingTrips.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-xl font-semibold mb-2">No upcoming trips</h3>
                <p className="text-muted-foreground mb-4">Start planning your next adventure!</p>
                <Button>Plan a Trip</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingTrips.map((trip) => (
                <Card key={trip.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${trip.image})` }}
                  >
                    <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <div className="text-white">
                        <h3 className="font-semibold text-xl">{trip.destination}</h3>
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{calculateDays(trip.startDate, trip.endDate)} days</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-semibold">Budget:</span>
                        <span>${trip.budget}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Past Trips */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Past Trips</h2>
          {pastTrips.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No past trips yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastTrips.map((trip) => (
                <Card key={trip.id} className="overflow-hidden hover:shadow-lg transition-shadow opacity-80">
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${trip.image})` }}
                  >
                    <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <div className="text-white">
                        <h3 className="font-semibold text-xl">{trip.destination}</h3>
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{calculateDays(trip.startDate, trip.endDate)} days</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">View Memories</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
