# ⚡ Quick Supabase Setup (5 Minutes)

## 🎯 Get Authentication Working NOW

### Step 1: Create Supabase Project (2 min)
1. Go to: https://supabase.com
2. Sign in → Click **"New Project"**
3. Fill in:
   - Name: `GHUMO`
   - Database Password: (create & save it)
   - Region: Closest to you
   - Plan: **Free**
4. Click **"Create"** → Wait 2 minutes ☕

---

### Step 2: Get Your Keys (1 min)
1. In Supabase Dashboard → **Settings** → **API**
2. Copy these TWO values:

```
📋 COPY THESE:

Project URL: https://xxxxxxxxxxxxx.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### Step 3: Create Database (1 min)
1. In Supabase → **SQL Editor** → **New Query**
2. Paste the SQL from `SUPABASE_SETUP_GUIDE.md` (Part 2)
3. Click **"Run"** → Should see "Success"

---

### Step 4: Enable Email Auth (30 sec)
1. **Authentication** → **Providers** → **Email**
2. Make sure **"Enable Email provider"** is **ON**
3. **"Confirm email"** → Turn **OFF** (for testing)
4. Click **"Save"**

---

### Step 5: Update Your App (30 sec)

Open `.env.local` and update:

```bash
# Uncomment and replace with YOUR keys:
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Keep existing:
GEMINI_API_KEY=AIzaSyDxRXNDATqv-smPXBpUbEkLboOEZlWdMhs
NEXT_PUBLIC_APP_URL=http://localhost:3002
```

---

### Step 6: Restart & Test (30 sec)

```powershell
# In terminal (Ctrl+C to stop current server):
npm run dev
```

Then:
1. Open: `http://localhost:3002`
2. Go to Signup page
3. Create account → Should work! ✅

---

## ✅ Done! Authentication is LIVE!

**What's Working:**
- ✅ Email/Password login
- ✅ User profiles
- ✅ Protected routes
- ✅ All app features

**Optional - Add Google Login:**
- Follow `GOOGLE_AUTH_SETUP.md` (adds 1-click Google login)

---

## 🐛 Quick Fixes

**"Invalid API key"**
→ Check keys copied correctly (no spaces, no quotes)

**"User already exists"**
→ Supabase → Authentication → Users → Delete & try again

**Still not working?**
→ See full guide: `SUPABASE_SETUP_GUIDE.md`

---

**Total Time: 5 minutes** ⏱️  
**Result: Fully working authentication** 🎉
