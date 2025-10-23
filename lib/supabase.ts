import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Check if Supabase is configured
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a mock client for demo mode
const createMockClient = () => ({
  auth: {
    signInWithPassword: async () => ({ data: null, error: { message: 'Demo mode - Supabase not configured' } }),
    signUp: async () => ({ data: null, error: { message: 'Demo mode - Supabase not configured' } }),
    signOut: async () => ({ error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithOAuth: async () => ({ data: null, error: { message: 'Demo mode - Supabase not configured' } }),
  },
  from: () => ({
    select: () => ({ data: [], error: null }),
    insert: () => ({ data: null, error: null }),
    update: () => ({ data: null, error: null }),
    delete: () => ({ data: null, error: null }),
  }),
})

export const supabase = (supabaseUrl && supabaseKey) 
  ? createClientComponentClient()
  : createMockClient() as any

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          avatar_url: string | null
          preferences: any
          travel_style: string
          budget_range: string
          created_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          avatar_url?: string | null
          preferences?: any
          travel_style?: string
          budget_range?: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          avatar_url?: string | null
          preferences?: any
          travel_style?: string
          budget_range?: string
          created_at?: string
        }
      }
      trips: {
        Row: {
          id: string
          user_id: string
          destination: string
          start_date: string
          end_date: string
          budget: number
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          destination: string
          start_date: string
          end_date: string
          budget: number
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          destination?: string
          start_date?: string
          end_date?: string
          budget?: number
          status?: string
          created_at?: string
        }
      }
      itineraries: {
        Row: {
          id: string
          trip_id: string
          day: number
          activities: any
          hotels: any
          restaurants: any
          created_at: string
        }
      }
      expenses: {
        Row: {
          id: string
          trip_id: string
          amount: number
          category: string
          date: string
          receipt_url: string | null
          created_at: string
        }
      }
      bookings: {
        Row: {
          id: string
          trip_id: string
          type: string
          details: any
          confirmation_number: string
          created_at: string
        }
      }
      saved_destinations: {
        Row: {
          id: string
          user_id: string
          destination: string
          notes: string | null
          created_at: string
        }
      }
      chat_history: {
        Row: {
          id: string
          user_id: string
          trip_id: string | null
          messages: any
          created_at: string
        }
      }
    }
  }
}
