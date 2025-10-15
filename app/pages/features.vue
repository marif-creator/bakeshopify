<template>
  <div class="features-page">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center mb-8 text-green-600">Our Features</h1>

      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-12 mb-16 text-white text-center">
        <h2 class="text-3xl font-bold mb-4">Why Choose Mochi?</h2>
        <p class="text-xl mb-6">Discover the features that make us your perfect culinary partner</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <!-- Feature Cards -->
        <div class="bg-white rounded-lg shadow-lg p-8 text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-4">Premium Quality</h3>
          <p class="text-gray-600">Sourced from trusted suppliers with rigorous quality control standards</p>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-8 text-center">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-4">Fast Delivery</h3>
          <p class="text-gray-600">Quick and reliable delivery to your doorstep with real-time tracking</p>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-8 text-center">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-4">Customer Love</h3>
          <p class="text-gray-600">24/7 customer support with satisfaction guarantee on all products</p>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-8 text-center">
          <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-4">Wide Selection</h3>
          <p class="text-gray-600">Thousands of authentic Asian products from trusted brands worldwide</p>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-8 text-center">
          <div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-4">Fresh Guarantee</h3>
          <p class="text-gray-600">100% freshness guarantee with quality assurance on all perishables</p>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-8 text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-4">Best Prices</h3>
          <p class="text-gray-600">Competitive pricing with regular promotions and bulk discounts</p>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="bg-gray-100 rounded-lg p-8 text-center">
        <h2 class="text-2xl font-bold mb-4">Ready to Experience the Difference?</h2>
        <p class="text-gray-600 mb-6">Join thousands of satisfied customers and discover why Mochi is the preferred choice</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/categories"
            class="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Browse Products
          </NuxtLink>
          <NuxtLink
            to="/offers"
            class="bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition-colors font-semibold"
          >
            View Offers
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page meta
useHead({
  title: 'Our Features - Why Choose Mochi',
  meta: [
    {
      name: 'description',
      content: 'Discover why Mochi is your perfect culinary partner with premium quality products, fast delivery, and exceptional customer service.'
    }
  ]
})
</script>

<style scoped>
.features-page {
  min-height: 100vh;
  background: #f8f9fa;
}
</style>