# 🤖 Google Gemini AI Setup Guide

## 🎉 Why Gemini?
- ✅ **FREE** for Gemini Pro users
- ✅ No credit card required for testing
- ✅ 60 requests per minute
- ✅ Same quality as GPT-3.5
- ✅ Better pricing than OpenAI

---

## 🚀 Step-by-Step Setup (2 Minutes!)

### Step 1: Get Your FREE API Key

1. **Go to Google AI Studio**:
   - Visit: https://makersuite.google.com/app/apikey
   - Or: https://aistudio.google.com/app/apikey

2. **Sign in with your Google account**
   - Use your personal Google account
   - If you have Gemini Pro, you'll get higher limits!

3. **Create API Key**:
   - Click **"Create API Key"**
   - Choose **"Create API key in new project"** (or select existing project)
   - Click **"Create"**

4. **Copy Your API Key**:
   ```
   AIzaSy...your-key-here...
   ```
   ⚠️ **Save it immediately!** You can view it again later.

---

### Step 2: Add to Your App

1. **Open `.env.local` file** in your project root:
   ```
   C:\Users\SUNIL\Desktop\GUMO\.env.local
   ```

2. **Add your Gemini API key**:
   ```bash
   GEMINI_API_KEY=AIzaSy...your-key-here...
   ```

3. **Save the file**

---

### Step 3: Restart Your App

```powershell
# Stop the server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

---

## ✅ Test Your Setup

### Test 1: Chat with AI
1. Go to: `http://localhost:3000/chat`
2. Type: "Plan a trip to Paris for 3 days"
3. You should get an AI response! 🎉

### Test 2: Trip Planner
1. Go to: `http://localhost:3000/dashboard`
2. Click **"Plan New Trip"**
3. Fill in destination, dates, budget
4. Click **"Generate Itinerary"**
5. AI will create a complete trip plan!

---

## 💰 Pricing & Limits

### FREE Tier (Always Free!)
- **60 requests per minute**
- **1500 requests per day**
- **1 million tokens per month**
- Perfect for development and small apps!

### Gemini Pro vs Gemini Pro Advanced

| Feature | Free (Gemini Pro) | Gemini Advanced (Paid) |
|---------|-------------------|------------------------|
| API Access | ✅ YES | ✅ YES |
| Rate Limit | 60/min | 1000/min |
| Daily Limit | 1500 | Higher |
| Cost | **FREE** | ~$7/month for 1 million tokens |
| Best For | Development, Personal Use | Production Apps |

**Your Gemini Pro subscription gives you higher limits!** 🚀

---

## 🎯 What Changed in Your App?

### Before (OpenAI):
```typescript
import OpenAI from 'openai'
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
```

### After (Gemini):
```typescript
import { GoogleGenerativeAI } from '@google/generative-ai'
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
```

### Files Updated:
1. ✅ `/app/api/chat/route.ts` - AI Chatbot
2. ✅ `/app/api/trip-planner/route.ts` - Trip Planning
3. ✅ `/components/loading-screen.tsx` - Video Background
4. ✅ `.env.local` - Environment Variables
5. ✅ `.env.example` - Template

---

## 🐛 Troubleshooting

### ❌ "API key not found"
**Solution:**
1. Check `.env.local` has `GEMINI_API_KEY=...`
2. Make sure no spaces before/after the =
3. Restart dev server: `Ctrl+C` then `npm run dev`

### ❌ "API key invalid"
**Solution:**
1. Go back to: https://makersuite.google.com/app/apikey
2. Copy the key again (make sure you got the whole key)
3. It should start with `AIzaSy`
4. Update `.env.local`
5. Restart server

### ❌ "Rate limit exceeded"
**Solution:**
- Free tier: 60 requests/minute
- Wait a minute and try again
- Or upgrade to Gemini Advanced for higher limits

### ❌ Chat returns generic responses
**Solution:**
- This is the fallback mode (API not connected)
- Double-check your API key is correct
- Check browser console (F12) for errors

---

## 🎨 Video Background Setup

### Adding Your Auth Video

1. **Get your video file** (name it `authvideo.mp4`)
2. **Put it in the `public` folder**:
   ```
   C:\Users\SUNIL\Desktop\GUMO\public\authvideo.mp4
   ```

3. **Supported formats**:
   - `.mp4` (recommended)
   - `.webm` (for better performance)
   - `.ogg` (fallback)

4. **Optimal video specs**:
   - Resolution: 1920x1080 (Full HD)
   - Duration: 10-30 seconds (will loop)
   - File size: < 5MB for fast loading
   - Frame rate: 30fps

### If video doesn't show:
- Make sure file is named exactly: `authvideo.mp4`
- Place it in `/public/` folder (not `/public/videos/`)
- Restart the dev server
- Check browser console for errors

---

## 📊 Comparison: OpenAI vs Gemini

| Feature | OpenAI GPT-4 | OpenAI GPT-3.5 | Google Gemini Pro |
|---------|--------------|----------------|-------------------|
| Cost | $0.01/1K tokens | $0.002/1K tokens | **FREE** |
| Speed | Slower | Fast | Very Fast |
| Quality | Best | Good | Good |
| Credit Card | Required | Required | **Not Required** |
| Free Tier | $5 trial | $5 trial | **1M tokens/month** |
| Rate Limit | 3/min (free) | 3/min (free) | **60/min** |
| Best For | Complex tasks | General use | **Perfect for GHUMO!** |

**Winner for GHUMO: Gemini Pro! 🏆**

---

## 🔐 Security Tips

### ✅ DO:
- Keep API key in `.env.local` only
- Never commit `.env.local` to Git
- Use environment variables
- Monitor API usage in Google Cloud Console

### ❌ DON'T:
- Share your API key publicly
- Commit API keys to GitHub
- Use same key for multiple projects
- Forget to add `.env.local` to `.gitignore`

---

## 🚀 Next Steps

1. **✅ Get Gemini API Key** (2 minutes)
2. **✅ Add to `.env.local`**
3. **✅ Restart server**
4. **✅ Test chat feature**
5. **✅ Add `authvideo.mp4` to `/public/`**
6. **🎉 Enjoy your AI-powered travel app!**

---

## 📚 Additional Resources

### Google AI Studio
- **Dashboard**: https://makersuite.google.com
- **API Keys**: https://makersuite.google.com/app/apikey
- **Documentation**: https://ai.google.dev/docs
- **Pricing**: https://ai.google.dev/pricing

### Gemini Models
- **gemini-pro**: Text generation (what we're using)
- **gemini-pro-vision**: Image understanding
- **gemini-ultra**: Most capable (coming soon)

### Monitoring Usage
1. Go to: https://console.cloud.google.com
2. Select your project
3. Navigate to: APIs & Services → Dashboard
4. View: Generative Language API usage

---

## 🎉 Benefits of Switching to Gemini

### For Development:
- ✅ **No credit card needed**
- ✅ **Higher free limits** (60 req/min vs 3 req/min)
- ✅ **More monthly tokens** (1M vs minimal)
- ✅ **Faster responses**

### For Users:
- ✅ **Same quality AI responses**
- ✅ **Faster trip planning**
- ✅ **No API costs for you**
- ✅ **Can handle more users**

### For Production:
- ✅ **Much cheaper** than OpenAI
- ✅ **Better free tier**
- ✅ **Google's infrastructure**
- ✅ **Easy to scale**

---

## 🔄 Rollback to OpenAI (If Needed)

If you want to switch back to OpenAI:

1. **Install OpenAI SDK**:
   ```powershell
   npm install openai
   ```

2. **Restore old API routes**:
   - Check Git history for previous versions
   - Or ask me to restore them!

3. **Update `.env.local`**:
   ```bash
   OPENAI_API_KEY=sk-...your-key...
   ```

---

## 💡 Pro Tips

### Tip 1: Use Different Models
```typescript
// Faster responses
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

// Image analysis (future feature)
const visionModel = genAI.getGenerativeModel({ model: 'gemini-pro-vision' })
```

### Tip 2: Adjust Response Length
```typescript
generationConfig: {
  maxOutputTokens: 1000, // Longer responses
  temperature: 0.9,      // More creative
}
```

### Tip 3: Monitor API Usage
- Check Google Cloud Console regularly
- Set up billing alerts (even for free tier)
- Monitor rate limit warnings

---

##  Common Questions

**Q: Do I need Gemini Advanced subscription?**
A: No! Free Gemini Pro API access works great. Advanced just gives higher limits.

**Q: Will my API key expire?**
A: No, it doesn't expire. But you can revoke and create new ones anytime.

**Q: Can I use this in production?**
A: Yes! Just monitor your usage and upgrade if you hit limits.

**Q: Is it really free forever?**
A: Yes! Google offers 1M tokens/month free, forever.

**Q: What if I exceed free limits?**
A: You'll get rate limit errors. Upgrade or wait for limits to reset.

---

🎉 **You're all set! Enjoy your FREE AI-powered travel assistant!** 🌍✈️

Need help? Just ask! 😊
