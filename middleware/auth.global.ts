// middleware/auth.global.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  // Allow unauthenticated access to public pages
  const publicPaths = ['/', '/login']
  if (publicPaths.includes(to.path)) return

  // On server-side, let the client handle authentication
  if (process.server) return

  try {
    // Check NextAuth.js session
    const response = await $fetch('/api/auth/session')
    if (!response?.user) {
      return navigateTo('/login')
    }
  } catch (error) {
    // Not authenticated, redirect to login
    return navigateTo('/login')
  }
})