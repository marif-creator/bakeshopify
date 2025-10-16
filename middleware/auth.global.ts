// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // Allow unauthenticated access to homepage
  if (to.path === '/' || to.path === '/login') return

  const session = useAuth()
  if (!session.data.value) {
    return navigateTo('/login')
  }
})