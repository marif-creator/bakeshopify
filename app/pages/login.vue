<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to BakeShop
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Discover delicious baked goods and fresh products
        </p>
      </div>

      <div class="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
        <div class="text-center space-y-6">
          <div>
            <UButton
              @click="$router.push('/')"
              block
              size="lg"
              class="w-full flex items-center justify-center gap-3 py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              🛍️ Start Shopping
            </UButton>
          </div>

          <div class="text-center">
            <p class="text-sm text-gray-600">
              Explore our wide range of:
            </p>
            <ul class="mt-2 text-sm text-gray-600 space-y-1">
              <li>• Fresh baked goods</li>
              <li>• Daily essentials</li>
              <li>• Healthy food options</li>
              <li>• Special offers and deals</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No authentication logic needed
// This page now serves as a welcome page that redirects to the main shopping page
</script>