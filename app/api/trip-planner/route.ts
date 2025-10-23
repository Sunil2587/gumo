import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(req: NextRequest) {
  try {
    const { destination, duration, budget, travelers, preferences } = await req.json()

    const prompt = `Create a detailed ${duration}-day travel itinerary for ${destination} for ${travelers} traveler(s) with a budget of $${budget}.

Preferences: ${preferences || 'General sightseeing and local experiences'}

Please provide a day-by-day itinerary in the following JSON format:
{
  "itinerary": [
    {
      "day": 1,
      "activities": [
        {
          "time": "9:00 AM",
          "title": "Activity name",
          "description": "Brief description",
          "location": "Specific location",
          "cost": 50
        }
      ]
    }
  ]
}

Include breakfast, lunch, dinner, and activities. Make sure the total daily cost aligns with the budget. Include estimated costs for each activity.`

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    
    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: `You are an expert travel planner. Create detailed, realistic itineraries with accurate pricing and practical timing. Always respond with valid JSON.\n\n${prompt}`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2000,
      },
    })

    const response = await result.response
    const content = response.text()
    const jsonMatch = content?.match(/\{[\s\S]*\}/)
    
    if (jsonMatch) {
      const parsedData = JSON.parse(jsonMatch[0])
      return NextResponse.json(parsedData)
    }

    // Fallback if JSON parsing fails
    return NextResponse.json({
      itinerary: generateFallbackItinerary(parseInt(duration))
    })
  } catch (error) {
    console.error('Trip planner API error:', error)
    return NextResponse.json({
      itinerary: generateFallbackItinerary(3)
    })
  }
}

function generateFallbackItinerary(days: number) {
  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    activities: [
      {
        time: '9:00 AM',
        title: 'Morning Activity',
        description: 'Start your day with local exploration',
        location: 'City Center',
        cost: 30
      },
      {
        time: '12:00 PM',
        title: 'Lunch',
        description: 'Try local cuisine',
        location: 'Local Restaurant',
        cost: 20
      },
      {
        time: '2:00 PM',
        title: 'Afternoon Sightseeing',
        description: 'Visit popular attractions',
        location: 'Main Attractions',
        cost: 40
      },
      {
        time: '7:00 PM',
        title: 'Dinner',
        description: 'Enjoy evening meal',
        location: 'Restaurant District',
        cost: 25
      }
    ]
  }))
}
