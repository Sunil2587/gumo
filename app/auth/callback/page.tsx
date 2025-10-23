'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Error during auth callback:', error)
        router.push('/auth/login')
        return
      }

      if (data.session) {
        // Check if user profile exists
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.session.user.id)
          .single()

        if (!profile) {
          router.push('/onboarding')
        } else {
          router.push('/dashboard')
        }
      } else {
        router.push('/auth/login')
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-travel">
      <div className="text-center">
        <h1 className="text-4xl font-bold gradient-text mb-4">GHUMO</h1>
        <p className="text-white">Authenticating...</p>
      </div>
    </div>
  )
}
