import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { rateLimit } from '@/lib/rate-limit'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const identifier = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'anonymous'
    const rateLimitResult = await rateLimit(identifier, {
      interval: 60 * 1000, // 1 minute
      uniqueTokenPerInterval: 20, // 20 requests per minute
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please try again later.',
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
          }
        }
      )
    }

    const { messages } = await req.json()

    // Validate input
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: messages array is required' },
        { status: 400 }
      )
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        message: "Hi! I'm GHUMO, your AI travel assistant. I'm here to help you plan amazing trips! However, the API is not configured yet. Ask me about destinations, budgets, itineraries, or any travel advice you need. 🌍✈️" 
      })
    }

    const systemPrompt = `You are GHUMO, an expert AI travel assistant. Your role is to:
    - Help users plan personalized trips based on their preferences and budget
    - Suggest destinations, activities, restaurants, and accommodations
    - Provide travel tips, cultural insights, and safety information
    - Answer questions about visa requirements, weather, and best times to visit
    - Help with itinerary planning and optimization
    - Offer budget-friendly alternatives and money-saving tips
    - Provide real-time travel advice and local recommendations
    
    Be friendly, helpful, and concise. Always consider the user's budget and preferences.
    If you don't have specific information, acknowledge it and provide general guidance.`

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    // Format conversation history for Gemini
    const chatHistory = messages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }))

    // Start chat with history
    const chat = model.startChat({
      history: chatHistory.slice(0, -1), // All messages except the last one
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    })

    // Send the latest message with system prompt prepended
    const lastMessage = messages[messages.length - 1]
    const prompt = messages.length === 1 
      ? `${systemPrompt}\n\nUser: ${lastMessage.content}` 
      : lastMessage.content

    const result = await chat.sendMessage(prompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ 
      message: text 
    }, {
      headers: {
        'X-RateLimit-Limit': rateLimitResult.limit.toString(),
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
      }
    })
  } catch (error: any) {
    console.error('Gemini API error:', error)
    
    // Handle specific errors
    if (error.message?.includes('quota')) {
      return NextResponse.json({ 
        error: 'API quota exceeded. Please try again later.',
        message: "I'm currently experiencing high demand. Please try again in a few moments. 😊"
      }, { status: 429 })
    }

    if (error.message?.includes('invalid')) {
      return NextResponse.json({ 
        error: 'Invalid API configuration',
        message: "There's a configuration issue. Please contact support."
      }, { status: 500 })
    }
    
    // Fallback demo response if API fails
    return NextResponse.json({ 
      message: "Hi! I'm GHUMO, your AI travel assistant. I'm here to help you plan amazing trips! Ask me about destinations, budgets, itineraries, or any travel advice you need. 🌍✈️" 
    })
  }
}
