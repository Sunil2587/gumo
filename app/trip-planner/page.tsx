'use client'

import React, { useState } from 'react'
import { Header } from '@/components/header'
import { BottomNav } from '@/components/bottom-nav'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Calendar, MapPin, DollarSign, Users, Loader2, Download, Share2 } from 'lucide-react'

interface ItineraryDay {
  day: number
  activities: Array<{
    time: string
    title: string
    description: string
    location: string
    cost: number
  }>
}

export default function TripPlannerPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    destination: '',
    duration: '',
    budget: '',
    travelers: '',
    preferences: ''
  })
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([])

  const handleGenerate = async () => {
    setLoading(true)
    try {
      // Demo mode - generate sample itinerary
      await new Promise(resolve => setTimeout(resolve, 2000))

      const days = parseInt(formData.duration) || 3
      const sampleItinerary: ItineraryDay[] = Array.from({ length: days }, (_, i) => ({
        day: i + 1,
        activities: [
          {
            time: '9:00 AM',
            title: 'Morning Exploration',
            description: `Start your day ${i + 1} exploring the local culture and main attractions in ${formData.destination}`,
            location: 'City Center',
            cost: 30
          },
          {
            time: '12:30 PM',
            title: 'Local Cuisine Lunch',
            description: 'Enjoy authentic local dishes at a highly-rated restaurant',
            location: 'Restaurant District',
            cost: 25
          },
          {
            time: '2:30 PM',
            title: 'Afternoon Sightseeing',
            description: 'Visit museums, galleries, or take a guided tour of historical sites',
            location: 'Main Attractions',
            cost: 40
          },
          {
            time: '6:00 PM',
            title: 'Sunset View',
            description: 'Catch beautiful sunset views from a scenic viewpoint',
            location: 'Viewpoint',
            cost: 10
          },
          {
            time: '8:00 PM',
            title: 'Dinner & Evening Activities',
            description: 'Experience the nightlife and local dining scene',
            location: 'Entertainment District',
            cost: 35
          }
        ]
      }))

      setItinerary(sampleItinerary)
    } catch (error) {
      console.error('Error generating itinerary:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">AI Trip Planner ✈️</h1>
          <p className="text-muted-foreground">
            Tell us what you want, and we'll create the perfect itinerary
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Form */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Trip Details</CardTitle>
              <CardDescription>Provide information about your trip</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="destination">
                  <MapPin className="h-4 w-4 inline mr-2" />
                  Destination
                </Label>
                <Input
                  id="destination"
                  placeholder="e.g., Tokyo, Japan"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Duration (days)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="7"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">
                  <DollarSign className="h-4 w-4 inline mr-2" />
                  Budget (USD)
                </Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="2000"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="travelers">
                  <Users className="h-4 w-4 inline mr-2" />
                  Number of Travelers
                </Label>
                <Input
                  id="travelers"
                  type="number"
                  placeholder="2"
                  value={formData.travelers}
                  onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferences">Preferences & Interests</Label>
                <Textarea
                  id="preferences"
                  placeholder="e.g., love food tours, interested in historical sites, prefer budget accommodations"
                  value={formData.preferences}
                  onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                  rows={4}
                />
              </div>

              <Button 
                className="w-full"
                onClick={handleGenerate}
                disabled={loading || !formData.destination || !formData.duration}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Itinerary'
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Itinerary Display */}
          <div className="lg:col-span-2 space-y-4">
            {itinerary.length === 0 && !loading ? (
              <Card className="h-full flex items-center justify-center p-12">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <h3 className="text-xl font-semibold mb-2">Your itinerary will appear here</h3>
                  <p className="text-muted-foreground">
                    Fill in the trip details and click "Generate Itinerary"
                  </p>
                </div>
              </Card>
            ) : loading ? (
              <Card className="h-full flex items-center justify-center p-12">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Creating your perfect trip...</h3>
                  <p className="text-muted-foreground">
                    This may take a moment
                  </p>
                </div>
              </Card>
            ) : (
              <>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>

                {itinerary.map((day) => (
                  <Card key={day.day}>
                    <CardHeader>
                      <CardTitle>Day {day.day}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {day.activities.map((activity, idx) => (
                        <div key={idx} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                          <div className="flex-shrink-0 w-20 text-sm font-medium text-primary">
                            {activity.time}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{activity.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {activity.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {activity.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                ${activity.cost}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
