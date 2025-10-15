<template>
  <div class="healthy-food-page">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center mb-8 text-green-600">Healthy Food</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <!-- Featured Healthy Products -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold mb-3">Organic Vegetables</h3>
          <p class="text-gray-600 mb-4">Fresh, organic produce sourced from local farms</p>
          <div class="flex items-center justify-between">
            <span class="text-green-600 font-bold">From $2.99</span>
            <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Shop Now
            </button>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold mb-3">Natural Supplements</h3>
          <p class="text-gray-600 mb-4">Vitamins and supplements for optimal health</p>
          <div class="flex items-center justify-between">
            <span class="text-green-600 font-bold">From $15.99</span>
            <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Shop Now
            </button>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold mb-3">Gluten-Free Options</h3>
          <p class="text-gray-600 mb-4">Delicious alternatives for dietary restrictions</p>
          <div class="flex items-center justify-between">
            <span class="text-green-600 font-bold">From $4.99</span>
            <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      <!-- Health Tips Section -->
      <div class="bg-green-50 rounded-lg p-8 mb-12">
        <h2 class="text-2xl font-bold mb-6 text-center">Health & Nutrition Tips</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-3">Balanced Diet</h3>
            <p class="text-gray-700">Learn how to maintain a balanced diet with our comprehensive nutrition guide.</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-3">Meal Planning</h3>
            <p class="text-gray-700">Discover effective meal planning strategies for a healthier lifestyle.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page meta
useHead({
  title: 'Healthy Food - Fresh & Nutritious Options',
  meta: [
    {
      name: 'description',
      content: 'Discover our range of healthy food options including organic vegetables, natural supplements, and gluten-free products for a balanced lifestyle.'
    }
  ]
})
</script>

<style scoped>
.healthy-food-page {
  min-height: 100vh;
  background: #f8f9fa;
}
</style>