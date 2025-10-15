<template>
  <div class="blogs-page">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center mb-8 text-green-600">Our Blog</h1>

      <!-- Featured Post -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
        <div class="md:flex">
          <div class="md:w-1/2">
            <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop" alt="Asian cuisine" class="w-full h-64 md:h-full object-cover">
          </div>
          <div class="md:w-1/2 p-8">
            <div class="mb-4">
              <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Featured</span>
              <span class="text-gray-500 ml-2">March 15, 2024</span>
            </div>
            <h2 class="text-2xl font-bold mb-4">The Art of Asian Cooking: Traditional Techniques</h2>
            <p class="text-gray-600 mb-6">Discover the rich culinary traditions of Asia and learn authentic cooking techniques passed down through generations.</p>
            <NuxtLink to="/blog/asian-cooking-techniques" class="inline-flex items-center text-green-600 hover:text-green-800 font-semibold">
              Read More
              <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Blog Posts -->
        <article class="bg-white rounded-lg shadow-md overflow-hidden">
          <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop" alt="Healthy eating" class="w-full h-48 object-cover">
          <div class="p-6">
            <div class="mb-3">
              <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Nutrition</span>
              <span class="text-gray-500 ml-2 text-sm">March 12, 2024</span>
            </div>
            <h3 class="text-lg font-semibold mb-3">5 Superfoods for Better Health</h3>
            <p class="text-gray-600 text-sm mb-4">Discover nutrient-rich foods that can boost your energy and improve overall wellness.</p>
            <NuxtLink to="/blog/superfoods-guide" class="text-green-600 hover:text-green-800 text-sm font-semibold">Read More →</NuxtLink>
          </div>
        </article>

        <article class="bg-white rounded-lg shadow-md overflow-hidden">
          <img src="https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=250&fit=crop" alt="Recipe" class="w-full h-48 object-cover">
          <div class="p-6">
            <div class="mb-3">
              <span class="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Recipes</span>
              <span class="text-gray-500 ml-2 text-sm">March 10, 2024</span>
            </div>
            <h3 class="text-lg font-semibold mb-3">Quick & Easy Weeknight Dinners</h3>
            <p class="text-gray-600 text-sm mb-4">Simple recipes that take 30 minutes or less to prepare for busy weeknights.</p>
            <NuxtLink to="/blog/quick-dinners" class="text-green-600 hover:text-green-800 text-sm font-semibold">Read More →</NuxtLink>
          </div>
        </article>

        <article class="bg-white rounded-lg shadow-md overflow-hidden">
          <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop" alt="Sustainability" class="w-full h-48 object-cover">
          <div class="p-6">
            <div class="mb-3">
              <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Sustainability</span>
              <span class="text-gray-500 ml-2 text-sm">March 8, 2024</span>
            </div>
            <h3 class="text-lg font-semibold mb-3">Sustainable Shopping Guide</h3>
            <p class="text-gray-600 text-sm mb-4">Learn how to make environmentally conscious choices when grocery shopping.</p>
            <NuxtLink to="/blog/sustainable-shopping" class="text-green-600 hover:text-green-800 text-sm font-semibold">Read More →</NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page meta
useHead({
  title: 'Blog - Food Tips, Recipes & Nutrition Advice',
  meta: [
    {
      name: 'description',
      content: 'Read our latest blog posts about cooking techniques, nutrition tips, recipes, and sustainable food practices.'
    }
  ]
})
</script>

<style scoped>
.blogs-page {
  min-height: 100vh;
  background: #f8f9fa;
}
</style>