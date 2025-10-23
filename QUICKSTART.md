# 🚀 GHUMO - Quick Start Guide

## ✅ Installation Complete!

Your GHUMO travel assistant application is now running at:
**http://localhost:3000**

## 📋 Next Steps

### 1. Set Up Environment Variables (REQUIRED)

Create a `.env.local` file in the root directory with the following:

```env
# Supabase (REQUIRED for authentication)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI (REQUIRED for AI features)
OPENAI_API_KEY=your_openai_api_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### How to Get Supabase Credentials:
1. Go to https://supabase.com
2. Create a new project (free tier available)
3. Go to Settings > API
4. Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
5. Copy `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### How to Get OpenAI API Key:
1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Create a new secret key
4. Copy it to `OPENAI_API_KEY`

### 2. Set Up Supabase Database

Run this SQL in your Supabase SQL Editor (Settings > SQL Editor):

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

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own data" ON users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can view own trips" ON trips FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own trips" ON trips FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 3. Enable Authentication in Supabase

1. Go to Authentication > Providers in Supabase
2. Enable **Email** provider
3. (Optional) Enable **Google** OAuth:
   - Add redirect URL: `http://localhost:3000/auth/callback`

### 4. Test the Application

1. Open http://localhost:3000
2. You should see the login page
3. Click "Sign up" to create an account
4. Complete the onboarding flow
5. Explore the dashboard!

## 🎯 Available Features

### ✅ Currently Working:
- **Authentication** - Sign up/Login with email
- **Onboarding** - Personalized preference setup
- **Dashboard** - Home screen with trending destinations
- **Navigation** - Header and mobile bottom nav

### ⚠️ Requires API Setup:
- **AI Chatbot** - Needs OpenAI API key
- **Trip Planner** - Needs OpenAI API key

### 🚧 Coming Soon:
- Flight & Hotel Booking
- Expense Tracker
- Destination Explorer
- Profile Management

## 🐛 Troubleshooting

### Issue: "Cannot connect to Supabase"
- Check your `.env.local` file has correct Supabase credentials
- Make sure file is named exactly `.env.local` (not `.env`)
- Restart the dev server after adding env variables

### Issue: "AI features not working"
- Verify your OpenAI API key is correct
- Check you have credits in your OpenAI account
- Restart the dev server

### Issue: "Can't create account"
- Make sure you've run the database setup SQL
- Check Supabase email provider is enabled
- Check browser console for errors

## 📱 Using the App

1. **Sign Up** → Complete onboarding → Dashboard
2. **Chat** → Ask AI travel questions (needs OpenAI key)
3. **Trip Planner** → Generate AI itineraries (needs OpenAI key)
4. **Explore** → Browse trending destinations

## 🛑 Stop the Server

Press `Ctrl + C` in the terminal

## 🔄 Restart the Server

```powershell
npm run dev
```

## 📚 More Help

See `README.md` for detailed documentation.

---

**Enjoy planning your travels with GHUMO! ✈️🌍**
