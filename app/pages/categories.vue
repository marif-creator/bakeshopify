<template>
  <div class="categories-page">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center mb-8 text-green-600">Product Categories</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Sauces & Spreads -->
        <NuxtLink to="/category/sauces-spreads" class="category-card">
          <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div class="text-center">
              <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">Sauces & Spreads</h3>
              <p class="text-gray-600 text-sm">Dried Soup, Noodles, Spreads</p>
            </div>
          </div>
        </NuxtLink>

        <!-- Daily Use -->
        <NuxtLink to="/category/daily-use" class="category-card">
          <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">Daily Use</h3>
              <p class="text-gray-600 text-sm">Dairy Products, Flour & Panko</p>
            </div>
          </div>
        </NuxtLink>

        <!-- Flour & Panko -->
        <NuxtLink to="/category/flour-panko" class="category-card">
          <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div class="text-center">
              <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">Flour & Panko</h3>
              <p class="text-gray-600 text-sm">Soup, Snacks, Flour</p>
            </div>
          </div>
        </NuxtLink>

        <!-- Seafood -->
        <NuxtLink to="/category/seafood" class="category-card">
          <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div class="text-center">
              <div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">Seafood</h3>
              <p class="text-gray-600 text-sm">Noodles, Beverages</p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page meta
useHead({
  title: 'Product Categories - Browse All Categories',
  meta: [
    {
      name: 'description',
      content: 'Explore our comprehensive product categories including sauces, daily essentials, flour products, and seafood items.'
    }
  ]
})
</script>

<style scoped>
.categories-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.category-card {
  text-decoration: none;
  color: inherit;
  display: block;
}

.category-card:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
}
</style>