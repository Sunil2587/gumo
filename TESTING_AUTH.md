# 🧪 Authentication Testing Guide

## 🎯 Quick Test Steps

### **Step 1: Start the Development Server**
```powershell
npm run dev
```
Open: `http://localhost:3000`

---

## ✅ Testing Authentication

### **Test 1: Sign Up (Create New Account)**

1. **Go to Sign Up Page**: `http://localhost:3000/auth/signup`
2. **Fill in the form**:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `Test123456!`
3. **Click "Sign Up"**
4. **Expected Result**:
   - ✅ Redirected to `/dashboard`
   - ✅ See "Welcome back" message
   - ✅ Can see user's name in header

### **Test 2: Check Database**

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Navigate to**: Authentication → Users
3. **Expected Result**:
   - ✅ See your new user: `test@example.com`
   - ✅ User has an ID
   - ✅ Created timestamp is recent

4. **Check Profile Table**:
   - Go to: Table Editor → `profiles`
   - ✅ Should see a profile row with same ID
   - ✅ Email matches: `test@example.com`
   - ✅ Name is: `Test User`

### **Test 3: Log Out**

1. **While logged in, go to**: `http://localhost:3000/profile`
2. **Scroll to bottom**
3. **Click "Log Out" button**
4. **Expected Result**:
   - ✅ Button shows "Logging out..."
   - ✅ Redirected to `/auth/login`
   - ✅ Can't access `/dashboard` anymore without login

### **Test 4: Log In Again**

1. **Go to**: `http://localhost:3000/auth/login`
2. **Enter credentials**:
   - Email: `test@example.com`
   - Password: `Test123456!`
3. **Click "Sign In"**
4. **Expected Result**:
   - ✅ Redirected to `/dashboard`
   - ✅ See your data and trips
   - ✅ Profile shows correct name/email

### **Test 5: Protected Routes**

Try accessing these URLs **without logging in**:
- `http://localhost:3000/dashboard`
- `http://localhost:3000/profile`
- `http://localhost:3000/chat`

**Expected Result**:
- ✅ All redirect to `/auth/login`
- ✅ Can't access without authentication

---

## 🔍 Current Authentication Status

### ✅ **Working Features**
- Email/Password Sign Up
- Email/Password Login
- User Profile Creation
- Session Management
- **Logout Functionality** ✨ (Now Working!)

### 🚧 **What Needs Supabase Keys**
- Database storage of user data
- Profile persistence
- Trip/Expense storage
- Real authentication (not demo mode)

### 💡 **Demo Mode (No Keys Needed)**
Without Supabase keys, you'll get:
- Mock user data
- Static profile information
- No persistent login
- Logout will clear session but redirect works

---

## 🐛 Common Issues & Solutions

### **Issue 1: "Invalid API key"**
**Solution:**
1. Check `.env.local` has correct keys
2. Restart dev server: `Ctrl+C` then `npm run dev`
3. Keys must start with:
   - `NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...`

### **Issue 2: "Can't logout" / Logout button doesn't work**
**Solution:** ✅ **FIXED!**
- Updated `/app/profile/page.tsx`
- Added `handleLogout` function
- Logout button now:
  - Calls `supabase.auth.signOut()`
  - Redirects to `/auth/login`
  - Shows loading state

### **Issue 3: User stays logged in after logout**
**Solution:**
1. Open Dev Tools (F12)
2. Application → Storage → Clear site data
3. Or use Incognito mode for testing

### **Issue 4: "Profile not found" after signup**
**Solution:**
1. Check Supabase SQL Editor
2. Verify trigger exists:
```sql
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
```
3. If missing, run SQL from `AUTHENTICATION_SETUP.md`

### **Issue 5: Can access dashboard without login**
**Solution:**
- Middleware not yet active (needs package install)
- For now, check manually in components:
```typescript
useEffect(() => {
  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) router.push('/auth/login')
  }
  checkAuth()
}, [])
```

---

## 📊 Test Checklist

Copy this checklist and mark as you test:

```
Authentication Tests:
□ Sign up with new email
□ Check user appears in Supabase dashboard
□ Check profile created in database
□ Log out successfully (button works!)
□ Redirected to login page after logout
□ Can't access /dashboard without login
□ Log in with same credentials
□ Session persists on page refresh
□ Profile page shows correct user data
□ Logout button shows loading state

Database Tests:
□ Profile table has correct user data
□ Trips table is empty for new user
□ Expenses table is empty for new user
□ Row Level Security prevents viewing other users' data

UI Tests:
□ Login form validates email format
□ Signup form requires password min length
□ Error messages show for wrong password
□ Loading states show during auth operations
□ Success redirects happen automatically
```

---

## 🎮 Manual Testing Commands

### **Check Current User (Browser Console)**
```javascript
// Open browser console (F12)
const { data } = await (await fetch('/api/auth/session')).json()
console.log('Current user:', data)
```

### **Test Supabase Connection**
```javascript
// In browser console
const { data, error } = await supabase.auth.getSession()
console.log('Session:', data.session)
console.log('User:', data.session?.user)
```

### **Force Logout (Browser Console)**
```javascript
await supabase.auth.signOut()
window.location.href = '/auth/login'
```

---

## 🚀 Next Steps After Testing

1. **✅ Authentication Working?**
   - Proceed to test trip planning
   - Try AI chat functionality
   - Test expense tracking

2. **❌ Issues Found?**
   - Check error messages in console (F12)
   - Verify `.env.local` configuration
   - Review Supabase dashboard for errors
   - Check SQL queries ran successfully

3. **🎨 Want to Customize?**
   - Update profile fields in `/app/profile/page.tsx`
   - Modify login UI in `/app/auth/login/page.tsx`
   - Add more user preferences

---

## 📱 Test on Different Devices

- **Desktop Browser**: Chrome, Firefox, Edge
- **Mobile View**: Dev Tools → Toggle device toolbar (Ctrl+Shift+M)
- **Incognito Mode**: For clean session testing
- **Different Accounts**: Test multi-user scenarios

---

## 🔐 Security Test (Important!)

### **Test Row Level Security**
1. Create 2 test accounts
2. Log in as User A → Create a trip
3. Log out → Log in as User B
4. Try to view User A's trip
5. **Expected**: Can't see User A's data ✅

### **Test API Endpoints**
```powershell
# Try accessing API without auth
curl http://localhost:3000/api/trips

# Expected: Unauthorized or empty response
```

---

## ✨ What's New in This Update

### **Logout Functionality** 🎉
- ✅ Added `handleLogout` function in profile page
- ✅ Button now calls `supabase.auth.signOut()`
- ✅ Automatic redirect to `/auth/login`
- ✅ Loading state while logging out
- ✅ Error handling for failed logout

### **Code Changes**
```typescript
// Before: Button with no action
<Button variant="destructive" className="...">
  <LogOut /> Log Out
</Button>

// After: Button with full functionality
<Button 
  onClick={handleLogout}
  disabled={loading}
>
  <LogOut /> {loading ? 'Logging out...' : 'Log Out'}
</Button>
```

---

Need help? Check the `AUTHENTICATION_SETUP.md` for detailed Supabase setup!
