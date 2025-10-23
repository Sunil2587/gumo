# GHUMO - AI-Powered Travel Assistant

<div align="center">
  <h1>🌍 GHUMO</h1>
  <p><strong>Your All-in-One AI Travel Companion</strong></p>
  <p>Plan, Book, and Manage Your Trips with Intelligent AI Assistance</p>
</div>

## 🚀 Features

### Core Functionality
- **AI Trip Planner** - Natural language trip planning with detailed day-by-day itineraries
- **Smart Chatbot** - GPT-4 powered travel assistant for instant answers
- **User Authentication** - Secure login with email/password and Google OAuth
- **Personalized Onboarding** - Collect user preferences, travel style, and budget
- **Home Dashboard** - Personalized travel inspiration and quick actions
- **Trending Destinations** - Discover popular travel spots
- **Expense Tracking** - Monitor your travel budget (Coming Soon)
- **Booking Integration** - Search and book flights, hotels (Coming Soon)
- **Real-time Features** - Weather updates, flight status notifications (Coming Soon)

### Technology Stack
- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI GPT-4
- **APIs**: Amadeus, Google Maps, OpenWeatherMap (Integration ready)

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- npm or yarn package manager
- Supabase account
- OpenAI API key
- Git

## 🛠️ Installation & Setup

### 1. Clone the Repository

```powershell
cd C:\Users\SUNIL\Desktop\GUMO
```

### 2. Install Dependencies

```powershell
npm install
```

### 3. Environment Variables Setup

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Google APIs (Optional - for future features)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key
GOOGLE_OAUTH_CLIENT_ID=your_google_oauth_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_google_oauth_client_secret

# Amadeus API (Optional - for flight/hotel bookings)
AMADEUS_API_KEY=your_amadeus_api_key
AMADEUS_API_SECRET=your_amadeus_api_secret

# Weather API (Optional)
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Supabase Database Setup

Run these SQL commands in your Supabase SQL editor:

```sql
-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  preferences JSONB DEFAULT '[]',
  travel_style TEXT,
  budget_range TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create trips table
CREATE TABLE trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  destination TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  budget NUMERIC NOT NULL,
  status TEXT DEFAULT 'planning',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create itineraries table
CREATE TABLE itineraries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  day INTEGER NOT NULL,
  activities JSONB DEFAULT '[]',
  hotels JSONB DEFAULT '[]',
  restaurants JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create expenses table
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  receipt_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  details JSONB NOT NULL,
  confirmation_number TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create saved_destinations table
CREATE TABLE saved_destinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  destination TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create chat_history table
CREATE TABLE chat_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  messages JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own data" ON users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own trips" ON trips FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own trips" ON trips FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own trips" ON trips FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own trips" ON trips FOR DELETE USING (auth.uid() = user_id);
```

### 5. Configure Supabase Auth

In your Supabase dashboard:
1. Go to Authentication > Providers
2. Enable Email provider
3. Enable Google OAuth (optional)
   - Add your Google OAuth credentials
   - Set redirect URL: `http://localhost:3000/auth/callback`

### 6. Get API Keys

#### OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Create a new secret key
3. Add to `.env.local`

#### Supabase Keys
1. Go to your Supabase project settings
2. Copy `URL` and `anon key`
3. Add to `.env.local`

### 7. Run the Development Server

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Application Structure

```
GHUMO/
├── app/
│   ├── auth/           # Authentication pages
│   │   ├── login/
│   │   ├── signup/
│   │   └── callback/
│   ├── dashboard/      # Main dashboard
│   ├── onboarding/     # User onboarding flow
│   ├── chat/           # AI chatbot interface
│   ├── trip-planner/   # Trip planning tool
│   ├── trips/          # User trips (To be created)
│   ├── explore/        # Destination explorer (To be created)
│   ├── expenses/       # Expense tracker (To be created)
│   ├── profile/        # User profile (To be created)
│   ├── api/            # API routes
│   │   ├── chat/
│   │   └── trip-planner/
│   └── globals.css     # Global styles
├── components/
│   ├── ui/             # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── header.tsx      # App header
│   └── bottom-nav.tsx  # Mobile bottom navigation
├── lib/
│   ├── supabase.ts     # Supabase client
│   └── utils.ts        # Utility functions
├── types/
│   └── index.ts        # TypeScript type definitions
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🎯 Usage Guide

### 1. Sign Up
- Navigate to the signup page
- Create an account with email or Google
- Complete the onboarding process

### 2. Plan a Trip
- Go to "Trip Planner" from the dashboard
- Enter destination, duration, budget, and preferences
- Let AI generate a detailed itinerary
- Customize and save your trip

### 3. Chat with AI Assistant
- Click on "Chat" in the navigation
- Ask any travel-related questions
- Get instant recommendations and tips

### 4. Explore Destinations
- Browse trending destinations on the dashboard
- Save your favorite locations
- View detailed destination information

## 🔧 Configuration

### Tailwind CSS Theme
Edit `tailwind.config.ts` to customize:
- Colors
- Spacing
- Typography
- Breakpoints

### API Configuration
Update API endpoints in respective route files under `app/api/`

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy

```powershell
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables for Production
Make sure to add all environment variables in your Vercel project settings.

## 📝 Development Roadmap

### Phase 1: Core Features (Current)
- ✅ Authentication system
- ✅ User onboarding
- ✅ Dashboard
- ✅ AI chatbot
- ✅ Trip planner

### Phase 2: Booking & Integration
- ⏳ Flight search and booking
- ⏳ Hotel search and booking
- ⏳ Amadeus API integration
- ⏳ Payment processing

### Phase 3: Enhanced Features
- ⏳ Expense manager with OCR
- ⏳ Real-time weather updates
- ⏳ Google Maps integration
- ⏳ Multi-language support

### Phase 4: Social & Community
- ⏳ Travel stories feed
- ⏳ User reviews and ratings
- ⏳ Find travel companions
- ⏳ Share itineraries

### Phase 5: Advanced Features
- ⏳ VR destination previews
- ⏳ Photo enhancement
- ⏳ Voice commands
- ⏳ Offline mode

## 🛠️ Troubleshooting

### Common Issues

**Issue**: TypeScript errors about missing modules
- **Solution**: Run `npm install` again

**Issue**: Supabase connection errors
- **Solution**: Check your environment variables and Supabase URL

**Issue**: OpenAI API errors
- **Solution**: Verify your API key and check usage limits

**Issue**: Build errors
- **Solution**: Clear `.next` folder and rebuild
  ```powershell
  Remove-Item -Path .next -Recurse -Force
  npm run build
  ```

## 📚 API Documentation

### Chat API
```typescript
POST /api/chat
Body: { messages: ChatMessage[] }
Response: { message: string }
```

### Trip Planner API
```typescript
POST /api/trip-planner
Body: { 
  destination: string,
  duration: string,
  budget: string,
  travelers: string,
  preferences: string
}
Response: { itinerary: ItineraryDay[] }
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created with ❤️ by the GHUMO team

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for backend infrastructure
- OpenAI for AI capabilities
- shadcn/ui for beautiful components

## 📧 Support

For support, email support@ghumo.com or open an issue in the repository.

---

**Happy Traveling! ✈️🌍**
#   g u m o  
 