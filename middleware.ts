import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Skip auth check if Supabase is not configured (demo mode)
  const hasSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!hasSupabase) {
    // Allow all routes in demo mode
    return res
  }

  // Only import and use Supabase if configured
  try {
    const { createMiddlewareClient } = await import('@supabase/auth-helpers-nextjs')
    const supabase = createMiddlewareClient({ req, res })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Protected routes that require authentication
    const protectedRoutes = ['/dashboard', '/profile', '/chat', '/trips', '/expenses']
    const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))

    // Auth routes that should redirect to dashboard if already logged in
    const authRoutes = ['/auth/login', '/auth/signup']
    const isAuthRoute = authRoutes.some(route => req.nextUrl.pathname.startsWith(route))

    // If user is not logged in and trying to access protected route
    if (isProtectedRoute && !session) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/auth/login'
      redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // If user is logged in and trying to access auth routes
    if (isAuthRoute && session) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/dashboard'
      return NextResponse.redirect(redirectUrl)
    }
  } catch (error) {
    // If Supabase packages are not installed, allow all routes
    console.log('Supabase middleware skipped - package not installed or not configured')
  }

  return res
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/chat/:path*',
    '/trips/:path*',
    '/expenses/:path*',
    '/auth/login',
    '/auth/signup',
  ],
}
