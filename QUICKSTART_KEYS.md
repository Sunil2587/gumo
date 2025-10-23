# 🎯 Quick Start - Get Your API Keys

## 📝 Summary
You need 2 API keys to enable full functionality:
1. **Supabase** (Authentication & Database) - FREE tier available
2. **OpenAI** (AI Chatbot) - Requires payment, ~$0.002 per message

---

## 🚀 Option 1: Quick Demo (No Setup Required)

The app is already configured in **DEMO MODE** and works without any API keys!

```bash
npm run dev
```

Visit: `http://localhost:3000`

**Demo Features:**
- ✅ All pages accessible
- ✅ Simulated AI chat responses
- ✅ Sample data for trips, expenses, profile
- ❌ No real authentication
- ❌ Data not saved

---

## 🔐 Option 2: Full Setup with Authentication

### Step 1: Supabase (5 minutes)

1. **Create Account**: Go to [supabase.com](https://supabase.com) → Sign up FREE

2. **Create Project**:
   - Click "New Project"
   - Name: `GHUMO`
   - Password: (create & save it!)
   - Region: Choose closest
   - Wait ~2 minutes

3. **Get Your Keys**:
   ```
   Dashboard → Settings → API
   ```
   Copy these:
   - `Project URL` → Your SUPABASE_URL
   - `anon public` → Your SUPABASE_ANON_KEY

4. **Setup Database**:
   ```
   Dashboard → SQL Editor → New Query
   ```
   Paste the SQL from `AUTHENTICATION_SETUP.md` → Run

5. **Add to .env.local**:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
   ```

### Step 2: OpenAI (3 minutes)

1. **Create Account**: Go to [platform.openai.com](https://platform.openai.com)

2. **Add Payment**: 
   ```
   Settings → Billing → Add payment method
   ```
   ⚠️ Set monthly limit: $10 to avoid surprises

3. **Create API Key**:
   ```
   API Keys → Create new secret key
   ```
   Name it: `GHUMO-App`
   **Copy immediately** (can't view again!)

4. **Add to .env.local**:
   ```bash
   OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### Step 3: Run the App

```bash
# Restart server to load new env variables
npm run dev
```

Visit: `http://localhost:3000/auth/login`

---

## 💰 Cost Breakdown

### Supabase
- **FREE tier**: 500MB database, 50,000 monthly active users
- **Pro**: $25/month (only if you need more)

### OpenAI
- **GPT-3.5-turbo**: ~$0.002 per chat message (recommended for testing)
- **GPT-4**: ~$0.01 per chat message (better quality)
- **Example**: 1000 messages = ~$2 with GPT-3.5

**Tip**: Start with GPT-3.5, set $10 monthly limit

---

## 🧪 Testing Your Setup

### Test Supabase
1. Go to `/auth/signup`
2. Create account
3. Check Supabase Dashboard → Authentication → Users
4. Should see your new user

### Test OpenAI Chat
1. Login to app
2. Go to `/chat`
3. Send: "Plan a trip to Paris"
4. Should get AI response in ~2 seconds

---

## ⚡ Quick Commands

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 🔧 Troubleshooting

### "Invalid API key"
- Double-check keys in `.env.local`
- Restart dev server: `Ctrl+C` then `npm run dev`

### "Unauthorized" errors
- Run the SQL from `AUTHENTICATION_SETUP.md`
- Check Row Level Security policies in Supabase

### "Rate limit exceeded"
- OpenAI: You've hit your usage limit
- Solution: Increase limit in OpenAI billing settings

### Chat not working
- Check `.env.local` has correct `OPENAI_API_KEY`
- Verify you have credits in OpenAI account
- Check console for errors: `F12` → Console tab

---

## 📚 Full Documentation

- **Detailed Setup**: See `AUTHENTICATION_SETUP.md`
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **OpenAI Docs**: [platform.openai.com/docs](https://platform.openai.com/docs)

---

## 🎉 You're Ready!

**With Demo Mode**: Works immediately, no setup

**With Full Setup**: 
- ✅ Real authentication
- ✅ Data persistence
- ✅ AI-powered chat
- ✅ Multi-user support

Questions? Check `AUTHENTICATION_SETUP.md` for detailed guide!
