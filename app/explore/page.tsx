'use client'

import React, { useState } from 'react'
import { Header } from '@/components/header'
import { BottomNav } from '@/components/bottom-nav'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, MapPin, Star, DollarSign } from 'lucide-react'

const destinations = [
  {
    id: 1,
    name: 'Tokyo, Japan',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    description: 'Experience the perfect blend of ancient traditions and cutting-edge technology',
    price: 1200,
    rating: 4.8,
    category: 'Culture'
  },
  {
    id: 2,
    name: 'Paris, France',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    description: 'The city of love, art, and exquisite cuisine',
    price: 1500,
    rating: 4.9,
    category: 'Culture'
  },
  {
    id: 3,
    name: 'Bali, Indonesia',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    description: 'Tropical paradise with beautiful beaches and rich culture',
    price: 800,
    rating: 4.7,
    category: 'Relaxation'
  },
  {
    id: 4,
    name: 'Dubai, UAE',
    country: 'United Arab Emirates',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    description: 'Luxury shopping, ultramodern architecture, and desert adventures',
    price: 1800,
    rating: 4.6,
    category: 'Luxury'
  },
  {
    id: 5,
    name: 'New York City, USA',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    description: 'The city that never sleeps - culture, food, and entertainment',
    price: 1400,
    rating: 4.7,
    category: 'Adventure'
  },
  {
    id: 6,
    name: 'Santorini, Greece',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
    description: 'Stunning sunsets, white-washed buildings, and crystal blue waters',
    price: 1100,
    rating: 4.9,
    category: 'Relaxation'
  },
  {
    id: 7,
    name: 'Machu Picchu, Peru',
    country: 'Peru',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800',
    description: 'Ancient Incan citadel set high in the Andes Mountains',
    price: 900,
    rating: 4.8,
    category: 'Adventure'
  },
  {
    id: 8,
    name: 'Bangkok, Thailand',
    country: 'Thailand',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800',
    description: 'Vibrant street life, ornate temples, and amazing food',
    price: 700,
    rating: 4.6,
    category: 'Food'
  }
]

const categories = ['All', 'Adventure', 'Relaxation', 'Culture', 'Food', 'Luxury']

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dest.country.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Explore Destinations 🌍</h1>
          <p className="text-muted-foreground">
            Discover amazing places for your next adventure
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <div 
                className="h-48 bg-cover bg-center transition-transform group-hover:scale-105"
                style={{ backgroundImage: `url(${destination.image})` }}
              />
              <CardHeader>
                <CardTitle className="text-lg">{destination.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {destination.country}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {destination.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span className="font-semibold">From ${destination.price}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                  </div>
                </div>
                <Button className="w-full mt-4" size="sm">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No destinations found. Try adjusting your search.</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
