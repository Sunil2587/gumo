'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Mountain, Utensils, Palmtree, Camera, ShoppingBag, Building2 } from 'lucide-react'

const preferences = [
  { id: 'adventure', name: 'Adventure', icon: Mountain },
  { id: 'food', name: 'Food & Dining', icon: Utensils },
  { id: 'relaxation', name: 'Relaxation', icon: Palmtree },
  { id: 'culture', name: 'Culture', icon: Camera },
  { id: 'shopping', name: 'Shopping', icon: ShoppingBag },
  { id: 'nature', name: 'Nature', icon: Building2 },
]

const travelStyles = [
  { id: 'solo', name: 'Solo Travel', desc: 'Exploring on my own' },
  { id: 'couple', name: 'Couple', desc: 'Romantic getaways' },
  { id: 'family', name: 'Family', desc: 'With kids and relatives' },
  { id: 'group', name: 'Group', desc: 'With friends' },
]

const budgetRanges = [
  { id: 'budget', name: 'Budget', desc: 'Under $1000/trip', icon: '💰' },
  { id: 'moderate', name: 'Moderate', desc: '$1000 - $3000/trip', icon: '💵' },
  { id: 'luxury', name: 'Luxury', desc: 'Above $3000/trip', icon: '💎' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    preferences: [] as string[],
    travelStyle: '',
    budgetRange: '',
  })

  const handlePreferenceToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(id)
        ? prev.preferences.filter(p => p !== id)
        : [...prev.preferences, id]
    }))
  }

  const handleComplete = async () => {
    setLoading(true)
    // Simulate saving for demo
    setTimeout(() => {
      router.push('/dashboard')
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-travel p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold gradient-text">GHUMO</h1>
            <span className="text-sm text-muted-foreground">Step {step} of 4</span>
          </div>
          <CardTitle>
            {step === 1 && "Welcome! What's your name?"}
            {step === 2 && "What are your travel interests?"}
            {step === 3 && "How do you prefer to travel?"}
            {step === 4 && "What's your typical budget?"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Let's personalize your travel experience"}
            {step === 2 && "Select all that apply"}
            {step === 3 && "Choose your travel style"}
            {step === 4 && "Help us suggest the perfect trips"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={() => setStep(2)}
                disabled={!formData.name}
              >
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {preferences.map((pref) => {
                  const Icon = pref.icon
                  const isSelected = formData.preferences.includes(pref.id)
                  return (
                    <button
                      key={pref.id}
                      onClick={() => handlePreferenceToggle(pref.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isSelected 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Icon className={`h-8 w-8 mx-auto mb-2 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                      <p className="text-sm font-medium">{pref.name}</p>
                    </button>
                  )
                })}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={() => setStep(3)} 
                  className="flex-1"
                  disabled={formData.preferences.length === 0}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {travelStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setFormData({ ...formData, travelStyle: style.id })}
                    className={`p-6 rounded-lg border-2 text-left transition-all ${
                      formData.travelStyle === style.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <h3 className="font-semibold text-lg mb-1">{style.name}</h3>
                    <p className="text-sm text-muted-foreground">{style.desc}</p>
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={() => setStep(4)} 
                  className="flex-1"
                  disabled={!formData.travelStyle}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {budgetRanges.map((budget) => (
                  <button
                    key={budget.id}
                    onClick={() => setFormData({ ...formData, budgetRange: budget.id })}
                    className={`p-6 rounded-lg border-2 text-left transition-all ${
                      formData.budgetRange === budget.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{budget.icon}</span>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{budget.name}</h3>
                        <p className="text-sm text-muted-foreground">{budget.desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(3)} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={handleComplete} 
                  className="flex-1"
                  disabled={!formData.budgetRange || loading}
                >
                  {loading ? 'Setting up...' : 'Complete Setup'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
