# 🔐 Authentication & API Setup Guide

## 📋 Prerequisites
Before setting up authentication, you'll need accounts with:
1. **Supabase** (for authentication & database)
2. **OpenAI** (for AI chatbot)

---

## 🚀 Step 1: Supabase Setup

### 1. Create a Supabase Account
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign In"
3. Sign up with GitHub, Google, or email

### 2. Create a New Project
1. Click "New Project"
2. Fill in:
   - **Project Name**: `GHUMO` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
3. Click "Create new project" (takes ~2 minutes)

### 3. Get Your Supabase Keys
Once your project is ready:
1. Go to **Settings** (gear icon in sidebar)
2. Click **API** in the left menu
3. Copy these values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Set Up Authentication
1. Go to **Authentication** in the sidebar
2. Click **Providers**
3. Enable **Email** provider (default)
4. Optional: Enable **Google**, **GitHub**, etc.

### 5. Create Database Tables
Go to **SQL Editor** and run this:

```sql
-- Users Profile Table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  preferences JSONB DEFAULT '[]'::jsonb,
  travel_style TEXT,
  budget_range TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Trips Table
CREATE TABLE public.trips (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  destination TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  budget DECIMAL,
  status TEXT DEFAULT 'planned',
  itinerary JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Expenses Table
CREATE TABLE public.expenses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  trip_id UUID REFERENCES public.trips ON DELETE CASCADE,
  amount DECIMAL NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Trips Policies
CREATE POLICY "Users can view their own trips" 
  ON public.trips FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own trips" 
  ON public.trips FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own trips" 
  ON public.trips FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own trips" 
  ON public.trips FOR DELETE 
  USING (auth.uid() = user_id);

-- Expenses Policies
CREATE POLICY "Users can view their own expenses" 
  ON public.expenses FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own expenses" 
  ON public.expenses FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own expenses" 
  ON public.expenses FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own expenses" 
  ON public.expenses FOR DELETE 
  USING (auth.uid() = user_id);

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## 🤖 Step 2: OpenAI Setup

### 1. Create OpenAI Account
1. Go to [https://platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. You'll need to add payment method (charges apply)

### 2. Get API Key
1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Click "Create new secret key"
3. Give it a name: `GHUMO-Travel-App`
4. Copy the key immediately (can't view again!)
5. This is your `OPENAI_API_KEY`

### 3. Set Usage Limits (Important!)
1. Go to [Settings > Billing > Usage limits](https://platform.openai.com/account/limits)
2. Set a monthly budget (e.g., $10) to avoid surprises
3. Enable email alerts

### 4. Pricing Info
- GPT-4 Turbo: ~$0.01 per 1K input tokens
- GPT-3.5 Turbo: ~$0.0015 per 1K input tokens
- Start with GPT-3.5 for testing (cheaper)

---

## ⚙️ Step 3: Configure Your App

### 1. Create .env.local File
In your project root, create `.env.local`:

```bash
# Copy from .env.example
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
OPENAI_API_KEY=sk-your-openai-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Never Commit .env.local
It's already in `.gitignore`, but double-check:
```bash
# .gitignore should include:
.env*.local
.env
```

---

## 🧪 Step 4: Test Your Setup

### 1. Test Supabase Connection
Run the dev server:
```bash
npm run dev
```

Visit: `http://localhost:3000/auth/login`

### 2. Test Sign Up
1. Create a new account
2. Check Supabase Dashboard → Authentication → Users
3. Should see your new user
4. Check Database → Tables → profiles (should have entry)

### 3. Test AI Chat
1. Log in to your app
2. Go to Chat page
3. Send a message
4. Should get AI response

---

## 🔧 Troubleshooting

### Supabase Issues
- **"Invalid API key"**: Double-check `.env.local` keys
- **"User not found"**: Check if profile was created in database
- **"Unauthorized"**: Verify Row Level Security policies

### OpenAI Issues
- **"Invalid API key"**: Verify key copied correctly
- **"Rate limit"**: You've hit usage limits
- **"Insufficient quota"**: Add payment method to OpenAI account

### General
- **Changes not working**: Restart dev server after `.env.local` changes
- **Database errors**: Check SQL in Supabase SQL Editor
- **Auth errors**: Clear browser cache/cookies

---

## 📚 Additional Resources

### Supabase
- [Docs](https://supabase.com/docs)
- [Auth Guide](https://supabase.com/docs/guides/auth)
- [Database Guide](https://supabase.com/docs/guides/database)

### OpenAI
- [API Docs](https://platform.openai.com/docs)
- [Pricing](https://openai.com/pricing)
- [Best Practices](https://platform.openai.com/docs/guides/production-best-practices)

---

## 🎉 You're All Set!

Your GHUMO travel app now has:
- ✅ User authentication (signup/login/logout)
- ✅ Secure database with user data
- ✅ AI-powered chatbot
- ✅ Protected routes and data

**Next Steps:**
1. Test all features thoroughly
2. Customize AI responses in `/app/api/chat/route.ts`
3. Add more features as needed
4. Deploy to production when ready

Need help? Check the troubleshooting section or create an issue!
