// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // Allow unauthenticated access to homepage
  if (to.path === '/') return

  const session = useAuth()
  if (!session.data.value) {
    return navigateTo('/login')
  }
})