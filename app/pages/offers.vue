<template>
  <div class="offers-page">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center mb-8 text-red-600">Special Offers</h1>

      <!-- Featured Offers Banner -->
      <div class="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-8 mb-12 text-white">
        <div class="text-center">
          <h2 class="text-3xl font-bold mb-4">Weekend Flash Sale</h2>
          <p class="text-xl mb-6">Up to 50% off on selected items</p>
          <div class="flex justify-center items-center space-x-4">
            <div class="text-2xl font-bold">⏰</div>
            <div>
              <div class="text-sm opacity-90">Limited Time Offer</div>
              <div class="text-lg">Ends in: 2 days 14 hours</div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <!-- Offer Cards -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="bg-red-100 p-4">
            <div class="flex items-center justify-between">
              <span class="text-2xl">🔥</span>
              <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">50% OFF</span>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-lg font-semibold mb-2">Premium Spices Collection</h3>
            <p class="text-gray-600 mb-4">Authentic Asian spices and seasoning</p>
            <div class="flex items-center justify-between">
              <div>
                <span class="text-gray-500 line-through">$29.99</span>
                <span class="text-red-600 font-bold ml-2">$14.99</span>
              </div>
              <button class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Claim Deal
              </button>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="bg-green-100 p-4">
            <div class="flex items-center justify-between">
              <span class="text-2xl">💚</span>
              <span class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">BUY 1 GET 1</span>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-lg font-semibold mb-2">Organic Tea Selection</h3>
            <p class="text-gray-600 mb-4">Premium organic teas from sustainable farms</p>
            <div class="flex items-center justify-between">
              <div>
                <span class="text-gray-500 line-through">$19.99</span>
                <span class="text-green-600 font-bold ml-2">$9.99</span>
              </div>
              <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Claim Deal
              </button>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="bg-blue-100 p-4">
            <div class="flex items-center justify-between">
              <span class="text-2xl">🛒</span>
              <span class="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">BUNDLE DEAL</span>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-lg font-semibold mb-2">Noodle Variety Pack</h3>
            <p class="text-gray-600 mb-4">Assorted noodles for every occasion</p>
            <div class="flex items-center justify-between">
              <div>
                <span class="text-gray-500 line-through">$34.99</span>
                <span class="text-blue-600 font-bold ml-2">$24.99</span>
              </div>
              <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Claim Deal
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Newsletter Signup -->
      <div class="bg-gray-100 rounded-lg p-8 text-center">
        <h2 class="text-2xl font-bold mb-4">Never Miss a Deal</h2>
        <p class="text-gray-600 mb-6">Subscribe to get exclusive offers and early access to sales</p>
        <div class="flex max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
          <button class="bg-red-600 text-white px-6 py-2 rounded-r-lg hover:bg-red-700">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page meta
useHead({
  title: 'Special Offers & Deals - Save Big Today',
  meta: [
    {
      name: 'description',
      content: 'Browse our latest special offers and deals. Save up to 50% on premium spices, organic teas, and noodle variety packs.'
    }
  ]
})
</script>

<style scoped>
.offers-page {
  min-height: 100vh;
  background: #f8f9fa;
}
</style>