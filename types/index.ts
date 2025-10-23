export type TravelPreference = 'adventure' | 'relaxation' | 'culture' | 'food' | 'nature' | 'shopping'
export type TravelStyle = 'solo' | 'family' | 'couple' | 'group'
export type BudgetRange = 'budget' | 'moderate' | 'luxury'
export type TripStatus = 'planning' | 'upcoming' | 'active' | 'completed'

export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  preferences: TravelPreference[]
  travel_style: TravelStyle
  budget_range: BudgetRange
  created_at: string
}

export interface Trip {
  id: string
  user_id: string
  destination: string
  start_date: string
  end_date: string
  budget: number
  status: TripStatus
  created_at: string
  itinerary?: Itinerary[]
  expenses?: Expense[]
  bookings?: Booking[]
}

export interface Itinerary {
  id: string
  trip_id: string
  day: number
  activities: Activity[]
  hotels: Hotel[]
  restaurants: Restaurant[]
  created_at: string
}

export interface Activity {
  id: string
  name: string
  description: string
  location: string
  time: string
  duration: number
  cost: number
  category: string
}

export interface Hotel {
  id: string
  name: string
  address: string
  price_per_night: number
  rating: number
  amenities: string[]
  check_in: string
  check_out: string
}

export interface Restaurant {
  id: string
  name: string
  cuisine: string
  address: string
  price_range: string
  rating: number
}

export interface Expense {
  id: string
  trip_id: string
  amount: number
  category: string
  date: string
  receipt_url?: string
  description?: string
  created_at: string
}

export interface Booking {
  id: string
  trip_id: string
  type: 'flight' | 'hotel' | 'activity' | 'transport'
  details: any
  confirmation_number: string
  created_at: string
}

export interface Destination {
  id: string
  name: string
  country: string
  description: string
  image_url: string
  best_season: string
  average_cost: number
  rating: number
  activities: string[]
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface Flight {
  id: string
  airline: string
  flight_number: string
  departure: {
    airport: string
    time: string
  }
  arrival: {
    airport: string
    time: string
  }
  price: number
  duration: string
  stops: number
}
