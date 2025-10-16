<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <h2 class="mt-4 text-lg font-medium text-gray-900">
          Completing sign in...
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Please wait while we verify your account.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// This page handles OAuth callbacks from providers like Google
// The actual authentication logic is handled by @sidebase/nuxt-auth
// This page provides a loading state while the authentication completes

const { status, data } = useAuth()

// Watch for authentication status changes
watchEffect(() => {
  if (status.value === 'authenticated' && data.value?.user) {
    // Redirect to home page after successful authentication
    navigateTo('/')
  } else if (status.value === 'unauthenticated') {
    // Redirect to login page if authentication failed
    navigateTo('/login')
  }
})
</script>