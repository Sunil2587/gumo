'use client'

import React, { useState } from 'react'
import { Header } from '@/components/header'
import { BottomNav } from '@/components/bottom-nav'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DollarSign, TrendingUp, TrendingDown, Plus, Receipt } from 'lucide-react'

const sampleExpenses = [
  { id: 1, category: 'Food', amount: 45, date: '2025-10-20', description: 'Dinner at local restaurant' },
  { id: 2, category: 'Transport', amount: 30, date: '2025-10-20', description: 'Taxi to hotel' },
  { id: 3, category: 'Accommodation', amount: 120, date: '2025-10-19', description: 'Hotel booking' },
  { id: 4, category: 'Activities', amount: 60, date: '2025-10-19', description: 'Museum tickets' },
  { id: 5, category: 'Food', amount: 25, date: '2025-10-18', description: 'Breakfast' },
]

const categories = [
  { name: 'Food', color: 'bg-orange-500', total: 70 },
  { name: 'Transport', color: 'bg-blue-500', total: 30 },
  { name: 'Accommodation', color: 'bg-purple-500', total: 120 },
  { name: 'Activities', color: 'bg-green-500', total: 60 },
]

export default function ExpensesPage() {
  const [selectedTrip, setSelectedTrip] = useState('Current Trip')
  const totalSpent = sampleExpenses.reduce((sum, exp) => sum + exp.amount, 0)
  const budget = 500

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Expense Manager 💰</h1>
            <p className="text-muted-foreground">
              Track your travel spending
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${budget}</div>
              <p className="text-xs text-muted-foreground">For current trip</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <TrendingUp className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">${totalSpent}</div>
              <p className="text-xs text-muted-foreground">
                {((totalSpent / budget) * 100).toFixed(1)}% of budget
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Remaining</CardTitle>
              <TrendingDown className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">${budget - totalSpent}</div>
              <p className="text-xs text-muted-foreground">
                {(((budget - totalSpent) / budget) * 100).toFixed(1)}% left
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Budget Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Budget Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-muted rounded-full h-4 mb-4">
              <div 
                className="bg-primary h-4 rounded-full transition-all"
                style={{ width: `${(totalSpent / budget) * 100}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              You've spent ${totalSpent} out of ${budget}
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Category Breakdown */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>By Category</CardTitle>
              <CardDescription>Spending breakdown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {categories.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${category.color}`} />
                      <span>{category.name}</span>
                    </div>
                    <span className="font-semibold">${category.total}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`${category.color} h-2 rounded-full`}
                      style={{ width: `${(category.total / totalSpent) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Expenses */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Expenses</CardTitle>
                  <CardDescription>Your latest transactions</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Receipt className="h-4 w-4 mr-2" />
                  Scan Receipt
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleExpenses.map((expense) => (
                  <div 
                    key={expense.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{expense.description}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{expense.category}</span>
                        <span>{new Date(expense.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-lg font-bold">
                      ${expense.amount}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
