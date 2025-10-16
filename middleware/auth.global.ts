// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // Allow unauthenticated access to public pages
  const publicPaths = ['/', '/login']
  if (publicPaths.includes(to.path)) return

  // On server-side, let the client handle authentication
  // This prevents hydration mismatches and server errors
  if (process.server) {
    return
  }

  // Client-side authentication check
  const { data: session, status } = useAuth()

  // Wait for auth to initialize and check if user is not authenticated
  if (status.value === 'unauthenticated' || !session.value?.user) {
    return navigateTo('/login')
  }
})