# 🔗 Google OAuth Setup with Supabase

## Complete Step-by-Step Guide

---

## 📋 What You'll Need
1. **Supabase Account** (already have)
2. **Google Cloud Account** (free)
3. 10 minutes of your time

---

## 🎯 Part 1: Get Your Supabase Callback URL

### Step 1: Go to Supabase Dashboard
1. Open: https://supabase.com/dashboard
2. Select your **GHUMO** project
3. Go to: **Authentication** → **Providers**

### Step 2: Find Google Provider
1. Scroll down to find **Google** in the provider list
2. Click on **Google** to expand it
3. **Copy this URL** (you'll need it soon):
   ```
   https://YOUR-PROJECT.supabase.co/auth/v1/callback
   ```
   Example: `https://abcdefghijk.supabase.co/auth/v1/callback`

> 💡 **Keep this tab open!** You'll come back here in Part 3.

---

## 🌐 Part 2: Create Google OAuth Credentials

### Step 1: Go to Google Cloud Console
1. Open: https://console.cloud.google.com
2. Sign in with your Google account

### Step 2: Create a New Project
1. Click the project dropdown (top left, near "Google Cloud")
2. Click **"New Project"**
3. Fill in:
   - **Project Name**: `GHUMO Travel App`
   - **Organization**: Leave as default (No organization)
4. Click **"Create"**
5. Wait ~30 seconds for project creation

### Step 3: Select Your New Project
1. Click the project dropdown again
2. Select **"GHUMO Travel App"**
3. Make sure it's selected (shows in top bar)

### Step 4: Enable Google+ API
1. In the search bar at top, type: `Google+ API`
2. Click **"Google+ API"** from results
3. Click **"Enable"** button
4. Wait for it to enable (~10 seconds)

> ⚠️ **Important**: Even though Google+ is deprecated, this API is still required for OAuth!

### Step 5: Configure OAuth Consent Screen
1. Go to: **Menu (☰)** → **APIs & Services** → **OAuth consent screen**
2. Choose **"External"** (unless you have Google Workspace)
3. Click **"Create"**

**Fill in the form:**

**App Information:**
- **App name**: `GHUMO Travel App`
- **User support email**: Your email address
- **App logo**: (Optional - skip for now)

**App Domain (Optional - can skip):**
- Leave blank for testing

**Developer contact information:**
- **Email addresses**: Your email address

4. Click **"Save and Continue"**

**Scopes Screen:**
1. Click **"Add or Remove Scopes"**
2. Select these scopes:
   - ✅ `.../auth/userinfo.email`
   - ✅ `.../auth/userinfo.profile`
   - ✅ `openid`
3. Click **"Update"**
4. Click **"Save and Continue"**

**Test Users (Optional):**
1. Click **"Add Users"**
2. Add your email (so you can test)
3. Click **"Save and Continue"**

**Summary:**
1. Review everything
2. Click **"Back to Dashboard"**

### Step 6: Create OAuth Credentials
1. Go to: **Menu (☰)** → **APIs & Services** → **Credentials**
2. Click **"+ Create Credentials"** (top)
3. Select **"OAuth client ID"**

**Configure OAuth Client:**
1. **Application type**: Select **"Web application"**
2. **Name**: `GHUMO Web Client`

**Authorized JavaScript origins:**
- Click **"+ Add URI"**
- Add: `http://localhost:3000` (for development)
- Click **"+ Add URI"** again  
- Add: `https://YOUR-PROJECT.supabase.co` (your Supabase URL)

**Authorized redirect URIs:**
- Click **"+ Add URI"**
- Add: `https://YOUR-PROJECT.supabase.co/auth/v1/callback`
  
  ⚠️ **Use the EXACT URL you copied from Supabase in Part 1!**

3. Click **"Create"**

### Step 7: Copy Your Credentials
A popup will appear with your credentials:

📋 **Copy these immediately:**
- **Client ID**: `123456789-abcdef.apps.googleusercontent.com`
- **Client Secret**: `GOCSPX-xxxxxxxxxxxxx`

> 💾 **Save these somewhere safe!** (Notepad, etc.)

---

## 🔧 Part 3: Configure Supabase

### Step 1: Return to Supabase Dashboard
Remember that tab from Part 1? Go back to it!
- **Authentication** → **Providers** → **Google**

### Step 2: Enable Google Provider
1. Toggle **"Enable Sign in with Google"** to **ON**
2. Paste your credentials:
   - **Client ID**: Paste from Google Cloud
   - **Client Secret**: Paste from Google Cloud
3. **Authorized Client IDs**: Leave empty (not needed for web)
4. Click **"Save"**

✅ **Google OAuth is now configured!**

---

## 🧪 Part 4: Test Google Login

### Step 1: Start Your App
```powershell
cd C:\Users\SUNIL\Desktop\GUMO
npm run dev
```

### Step 2: Test Login
1. Open: `http://localhost:3000/auth/login`
2. Click **"Continue with Google"** button
3. You'll be redirected to Google
4. **Choose your Google account**
5. Click **"Continue"** to grant permissions

### Step 3: Verify Success
✅ **You should be redirected back to your app at `/dashboard`**

### Step 4: Check Supabase Database
1. Go to Supabase Dashboard
2. **Authentication** → **Users**
3. You should see your Google account user:
   - Email from Google
   - Provider: `google`
   - Created timestamp

---

## 🐛 Common Issues & Solutions

### ❌ "Error 400: redirect_uri_mismatch"
**Problem**: The redirect URI doesn't match Google Cloud settings

**Solution:**
1. Check Supabase callback URL: `https://YOUR-PROJECT.supabase.co/auth/v1/callback`
2. Go to Google Cloud Console → Credentials
3. Edit your OAuth client
4. Make sure **Authorized redirect URIs** has the EXACT Supabase URL
5. Save and wait 5 minutes for changes to propagate

### ❌ "Error 403: access_denied"
**Problem**: OAuth consent screen not properly configured

**Solution:**
1. Go to Google Cloud Console → OAuth consent screen
2. Click **"Publish App"** (if in testing mode)
3. Or add your email to **Test users**

### ❌ "Access blocked: GHUMO Travel App has not completed verification"
**Problem**: App is in testing mode and user isn't added

**Solution:**
1. Go to OAuth consent screen
2. Click **"Add Users"** under Test users
3. Add the email you want to test with
4. Or publish the app (for public use)

### ❌ Google login button does nothing
**Problem**: Supabase keys not configured correctly

**Solution:**
1. Check `.env.local` has correct values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
2. Restart dev server: `Ctrl+C` then `npm run dev`

### ❌ "Invalid client_id"
**Problem**: Client ID copied incorrectly

**Solution:**
1. Go to Google Cloud Console → Credentials
2. Click on your OAuth client
3. Copy Client ID again (make sure no extra spaces)
4. Update in Supabase
5. Save and test again

---

## 🎨 Customize Login Button (Optional)

Your app already has a Google button in:
- `/app/auth/login/page.tsx`
- `/app/auth/signup/page.tsx`

The button uses the official Google colors and icon! 🎉

---

## 📱 Adding Production Domain (Later)

When you deploy your app to production:

### Step 1: Update Google Cloud
1. Go to Credentials → Edit OAuth client
2. **Authorized JavaScript origins**:
   - Add: `https://your-domain.com`
3. **Authorized redirect URIs**:
   - Add: `https://YOUR-PROJECT.supabase.co/auth/v1/callback`
     (same Supabase URL - it doesn't change!)
4. Save

### Step 2: Update Environment Variables
```bash
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

No changes needed in Supabase! 🎉

---

## 🔐 Security Best Practices

### ✅ Do This:
- Keep Client Secret private (never commit to Git)
- Use environment variables for keys
- Set usage limits in Google Cloud Console
- Monitor authentication logs in Supabase

### ❌ Don't Do This:
- Share your Client Secret publicly
- Commit `.env.local` to Git
- Use the same OAuth client for multiple apps
- Forget to add all redirect URIs

---

## 📊 What Happens Behind the Scenes

```
1. User clicks "Continue with Google"
   ↓
2. Redirected to Google login page
   ↓
3. User authorizes the app
   ↓
4. Google redirects to: your-project.supabase.co/auth/v1/callback
   ↓
5. Supabase creates user session
   ↓
6. Supabase redirects to: /auth/callback in your app
   ↓
7. Your app processes session and redirects to: /dashboard
```

---

## ✨ Testing Checklist

Copy and test each one:

```
□ Google+ API is enabled in Google Cloud
□ OAuth consent screen is configured
□ OAuth client created with correct redirect URI
□ Client ID and Secret copied to Supabase
□ Google provider enabled in Supabase
□ .env.local has correct Supabase keys
□ Dev server restarted after config changes
□ "Continue with Google" button appears on login page
□ Clicking button redirects to Google
□ Can choose Google account
□ Permissions screen shows up
□ After accepting, redirected back to app
□ User appears in Supabase → Authentication → Users
□ Profile created in database (check profiles table)
□ Can log out and log back in with Google
```

---

## 🎯 Quick Reference

### Google Cloud Console URLs
- **Main Dashboard**: https://console.cloud.google.com
- **OAuth Consent**: https://console.cloud.google.com/apis/credentials/consent
- **Credentials**: https://console.cloud.google.com/apis/credentials
- **API Library**: https://console.cloud.google.com/apis/library

### Your Credentials Format
```
Client ID: 123456789-xxxxxxxxxxxxxxx.apps.googleusercontent.com
Client Secret: GOCSPX-xxxxxxxxxxxxxxxxxxxxx
Redirect URI: https://YOUR-PROJECT.supabase.co/auth/v1/callback
```

---

## 🎉 You're Done!

Your users can now:
- ✅ Sign up with Google (1 click!)
- ✅ Log in with Google (no password to remember!)
- ✅ Profile auto-created from Google account
- ✅ Same security as email/password login

**Bonus**: Their name and profile picture come from Google automatically! 🖼️

---

## 📞 Need Help?

**Common Questions:**
- **Q: Do I need to pay Google?**  
  A: No! OAuth is completely free.

- **Q: How many users can use this?**  
  A: Unlimited! No restrictions.

- **Q: Can I add more OAuth providers?**  
  A: Yes! Same process for GitHub, Facebook, etc.

- **Q: What if my app is rejected by Google?**  
  A: Small personal apps don't need verification. For public apps, follow Google's verification process.

**Still stuck?** Check:
1. Browser console (F12) for error messages
2. Supabase Dashboard → Logs
3. Google Cloud Console → API logs

---

Happy authenticating! 🚀
