# 🔐 Complete Supabase Authentication Setup Guide

## 📋 What You'll Get
- ✅ Email/Password authentication
- ✅ Google OAuth login (1-click login)
- ✅ User profile management
- ✅ Session management
- ✅ Secure database for trips, expenses, bookings

**Time Required**: 15-20 minutes

---

## 🎯 Part 1: Create Supabase Project (5 minutes)

### Step 1: Sign Up / Login to Supabase
1. Go to: https://supabase.com
2. Click **"Start your project"** or **"Sign In"**
3. Sign in with GitHub (recommended) or Email

### Step 2: Create New Project
1. Click **"New Project"**
2. Select your organization (or create new one)
3. Fill in project details:
   - **Name**: `GHUMO` or `ghumo-travel-app`
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you (e.g., `Southeast Asia (Singapore)`)
   - **Pricing Plan**: Select **Free** (perfect for getting started)
4. Click **"Create new project"**
5. Wait 2-3 minutes for setup to complete ☕

### Step 3: Get Your Project Keys
Once project is ready:

1. Go to: **Settings** (gear icon) → **API**
2. You'll see:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **Project API keys**:
     - `anon` `public` key (this is what we need)
     - `service_role` key (keep this secret!)

📋 **Copy these TWO values:**
```
Project URL: https://xxxxxxxxxxxxx.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey....(very long string)
```

> 💾 **Save these in Notepad** - you'll need them in a moment!

---

## 🗄️ Part 2: Create Database Tables (5 minutes)

### Step 1: Open SQL Editor
1. In Supabase Dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New Query"**

### Step 2: Run Database Setup Script
Copy and paste this ENTIRE script, then click **"Run"**:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}',
  travel_style TEXT DEFAULT 'balanced',
  budget_range TEXT DEFAULT 'medium',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create trips table
CREATE TABLE IF NOT EXISTS public.trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  destination TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  budget NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'planning',
  itinerary JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create expenses table
CREATE TABLE IF NOT EXISTS public.expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  receipt_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL, -- 'flight', 'hotel', 'activity', etc.
  details JSONB NOT NULL,
  confirmation_number TEXT,
  booking_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create saved_destinations table
CREATE TABLE IF NOT EXISTS public.saved_destinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  destination TEXT NOT NULL,
  notes TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create chat_history table
CREATE TABLE IF NOT EXISTS public.chat_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE,
  messages JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Profiles: Users can only see and edit their own profile
CREATE POLICY "Users can view own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Trips: Users can only see and manage their own trips
CREATE POLICY "Users can view own trips" 
  ON public.trips FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own trips" 
  ON public.trips FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own trips" 
  ON public.trips FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own trips" 
  ON public.trips FOR DELETE 
  USING (auth.uid() = user_id);

-- Expenses: Users can only see and manage their own expenses
CREATE POLICY "Users can view own expenses" 
  ON public.expenses FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own expenses" 
  ON public.expenses FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own expenses" 
  ON public.expenses FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own expenses" 
  ON public.expenses FOR DELETE 
  USING (auth.uid() = user_id);

-- Bookings: Users can only see and manage their own bookings
CREATE POLICY "Users can view own bookings" 
  ON public.bookings FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookings" 
  ON public.bookings FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings" 
  ON public.bookings FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookings" 
  ON public.bookings FOR DELETE 
  USING (auth.uid() = user_id);

-- Saved Destinations: Users can only see and manage their own saved destinations
CREATE POLICY "Users can view own saved destinations" 
  ON public.saved_destinations FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own saved destinations" 
  ON public.saved_destinations FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own saved destinations" 
  ON public.saved_destinations FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved destinations" 
  ON public.saved_destinations FOR DELETE 
  USING (auth.uid() = user_id);

-- Chat History: Users can only see and manage their own chat history
CREATE POLICY "Users can view own chat history" 
  ON public.chat_history FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own chat history" 
  ON public.chat_history FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own chat history" 
  ON public.chat_history FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own chat history" 
  ON public.chat_history FOR DELETE 
  USING (auth.uid() = user_id);

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_trips_updated_at
  BEFORE UPDATE ON public.trips
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_chat_history_updated_at
  BEFORE UPDATE ON public.chat_history
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
```

✅ **Success!** You should see: "Success. No rows returned"

---

## 🔧 Part 3: Enable Email Authentication (2 minutes)

### Step 1: Configure Email Settings
1. Go to: **Authentication** → **Providers** → **Email**
2. Make sure **"Enable Email provider"** is **ON** ✅
3. **Confirm email**: Toggle **ON** (recommended for production)
   - For testing, you can keep it **OFF**
4. Click **"Save"**

---

## 🌐 Part 4: Enable Google OAuth (5 minutes)

> 📖 **Detailed guide available**: See `GOOGLE_AUTH_SETUP.md` in your project

### Quick Steps:

1. **In Supabase Dashboard:**
   - Go to: **Authentication** → **Providers** → **Google**
   - Find your **Callback URL**: `https://xxxxx.supabase.co/auth/v1/callback`
   - Keep this tab open!

2. **Create Google OAuth Credentials:**
   - Go to: https://console.cloud.google.com
   - Create new project: `GHUMO Travel App`
   - Enable **Google+ API**
   - Configure **OAuth consent screen**
   - Create **OAuth 2.0 Client ID** (Web application)
   - Add authorized redirect URI: `https://xxxxx.supabase.co/auth/v1/callback`
   - Copy **Client ID** and **Client Secret**

3. **Back in Supabase:**
   - Paste **Client ID** and **Client Secret**
   - Enable **"Sign in with Google"**
   - Click **"Save"**

---

## ⚙️ Part 5: Configure Your App (2 minutes)

### Step 1: Update Environment Variables

Open your `.env.local` file and **uncomment** + update these lines:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-very-long-anon-key-here

# Google Gemini AI (already configured)
GEMINI_API_KEY=AIzaSyDxRXNDATqv-smPXBpUbEkLboOEZlWdMhs

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3002
```

**Replace:**
- `xxxxxxxxxxxxx.supabase.co` → Your actual Supabase Project URL
- `your-very-long-anon-key-here` → Your actual Supabase Anon Key

### Step 2: Restart Your Dev Server

In your terminal:
```powershell
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

✅ **Authentication is now LIVE!** 🎉

---

## 🧪 Part 6: Test Authentication (5 minutes)

### Test 1: Email/Password Signup
1. Open: `http://localhost:3002`
2. Watch the video splash screen (5 seconds)
3. Click **"Sign up"** link
4. Enter:
   - Email: `test@example.com`
   - Password: `Test123456!`
   - Full Name: `Test User`
5. Click **"Sign Up"**
6. ✅ You should be redirected to `/dashboard`

### Test 2: Check Database
1. Go to Supabase Dashboard
2. **Authentication** → **Users**
3. ✅ You should see your new user!
4. **Table Editor** → **profiles**
5. ✅ Profile should be auto-created!

### Test 3: Logout and Login
1. Click your profile picture → **"Logout"**
2. Go to Login page
3. Enter same credentials
4. ✅ Should log you back in!

### Test 4: Google Login
1. Logout
2. Click **"Continue with Google"**
3. Choose your Google account
4. ✅ Should log you in with Google!
5. Check Supabase → Users → Provider should be `google`

---

## 🎯 What's Working Now?

### ✅ Authentication Features
- Email/Password signup & login
- Google OAuth (1-click login)
- Automatic profile creation
- Session management
- Logout functionality
- Protected routes (middleware)

### ✅ Database Features
- User profiles with preferences
- Trips with itineraries
- Expense tracking
- Booking management
- Saved destinations
- Chat history
- Row Level Security (users can only see their own data)

### ✅ App Features Now Working
- All dashboard features
- Trip planning
- Expense tracking
- AI chat (with your trips context)
- Profile management
- And more!

---

## 🔒 Security Features Enabled

### What's Protecting Your Data:

1. **Row Level Security (RLS)**
   - Users can ONLY see/edit their own data
   - Database-level protection
   - Can't be bypassed by API

2. **JWT Authentication**
   - Secure session tokens
   - Auto-expiring sessions
   - HTTP-only cookies

3. **Rate Limiting**
   - 20 API requests per minute
   - Prevents abuse

4. **Environment Variables**
   - Sensitive keys not in code
   - Different settings for dev/prod

5. **HTTPS in Production**
   - Encrypted connections
   - Secure data transfer

---

## 📊 Understanding Your Supabase Dashboard

### Key Sections:

**1. Authentication → Users**
- See all registered users
- View login methods (email/Google)
- Manage user sessions
- Ban/delete users if needed

**2. Table Editor**
- View all your data
- Edit records manually
- Export data
- Monitor database

**3. SQL Editor**
- Run custom queries
- Create new tables
- Modify database structure

**4. Database → Policies**
- View Row Level Security rules
- Ensure data is protected
- Add custom policies

**5. Logs**
- Monitor API requests
- Debug authentication issues
- Track errors

---

## 🚀 Production Deployment Checklist

Before deploying to production:

### ✅ Supabase Settings
```
□ Enable email confirmation
□ Set up custom SMTP (for emails)
□ Configure password reset email
□ Add production domain to allowed URLs
□ Enable 2FA for your Supabase account
□ Set up database backups (automatic on paid plans)
```

### ✅ Google OAuth Settings
```
□ Add production domain to Google Cloud Console
□ Add production callback URL
□ Verify OAuth consent screen
□ Remove test mode (if needed)
```

### ✅ Environment Variables
```
□ Update NEXT_PUBLIC_APP_URL to production domain
□ Keep same Supabase URL and keys (don't change!)
□ Secure environment variables in hosting platform
```

---

## 💰 Costs & Limits

### Free Tier (Perfect for Starting):
- **Users**: Up to 50,000 monthly active users
- **Database**: 500 MB storage
- **API**: Unlimited requests (with rate limits)
- **Bandwidth**: 2 GB egress per month
- **Cost**: $0/month 💚

### Pro Tier ($25/month):
- **Users**: 100,000 monthly active users
- **Database**: 8 GB storage
- **API**: Unlimited requests
- **Bandwidth**: 50 GB egress
- **Daily backups**: Included

### When to Upgrade:
- 500+ active users
- 100,000+ API calls/month
- Need daily backups
- Want custom domain for emails

---

## 🐛 Troubleshooting

### ❌ "Invalid API key"
**Solution:**
1. Check `.env.local` has correct keys
2. No spaces around `=` sign
3. Keys are NOT wrapped in quotes
4. Restart dev server after changes

### ❌ "User already registered"
**Solution:**
1. Go to Supabase → Authentication → Users
2. Delete the test user
3. Try signing up again

### ❌ "Auth session missing"
**Solution:**
1. Clear browser cookies
2. Logout completely
3. Login again

### ❌ Google login shows "Error 400"
**Solution:**
1. Check Google Cloud Console redirect URIs
2. Must match EXACTLY: `https://xxxxx.supabase.co/auth/v1/callback`
3. Wait 5 minutes for changes to propagate

### ❌ "Failed to fetch"
**Solution:**
1. Check internet connection
2. Verify Supabase project is active (not paused)
3. Check Supabase status: https://status.supabase.com

### ❌ Tables not created
**Solution:**
1. Go to SQL Editor
2. Run the database script again
3. Check for error messages
4. Make sure you selected the correct project

---

## 📞 Need Help?

### Useful Links:
- **Supabase Docs**: https://supabase.com/docs
- **Supabase Discord**: https://discord.supabase.com
- **Your Project Dashboard**: https://supabase.com/dashboard/project/YOUR_PROJECT_ID

### Quick Checks:
1. Check Supabase Dashboard → Logs for errors
2. Check browser console (F12) for client errors
3. Verify all environment variables are set
4. Make sure dev server restarted after config changes

---

## 🎉 You're All Set!

Your app now has:
- ✅ Professional authentication system
- ✅ Secure database with RLS
- ✅ Google OAuth integration
- ✅ User profile management
- ✅ Production-ready security
- ✅ All features unlocked

**Next Steps:**
1. Test all features thoroughly
2. Invite friends to test
3. Deploy to production (see `PRODUCTION_DEPLOYMENT.md`)
4. Monitor usage in Supabase Dashboard
5. Enjoy your fully functional travel app! ✈️

---

## 🎨 Customization Options

### Email Templates:
1. Go to: **Authentication** → **Email Templates**
2. Customize:
   - Confirmation email
   - Password reset email
   - Invitation email
   - Magic link email

### Authentication Settings:
1. **Site URL**: Set your production domain
2. **Redirect URLs**: Add allowed redirect URLs
3. **JWT expiry**: Default is 3600 seconds (1 hour)
4. **Refresh token expiry**: Default is 2592000 seconds (30 days)

### Security Settings:
1. **Enable CAPTCHA**: Prevent bot signups
2. **Enable MFA**: Add two-factor authentication
3. **Password requirements**: Set minimum length, complexity
4. **Rate limiting**: Adjust limits per endpoint

---

**Happy Authenticating! 🚀**
