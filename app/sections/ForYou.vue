<template>
  <section class="py-8 px-4 sm:px-6 lg:px-8">
    <!-- Section Header -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">For You</h2>
      <p class="text-gray-600">Discover products tailored just for you</p>
    </div>

    <!-- Loading State -->
    <div v-if="productStore.loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      <span class="ml-3 text-gray-600">Loading products...</span>
    </div>

    <!-- Product Grid -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 grid-equal-heights">
      <ProductThumbnail
        v-for="product in products"
        :key="product.id"
        :product="product"
        :store-slug="product.brand.toLowerCase().replace(/\s+/g, '-')"
        :product-slug="product.title.toLowerCase().replace(/\s+/g, '-')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProductStore } from '~~/stores/products'

// Initialize product store
const productStore = useProductStore()

// Fetch products when component mounts
await productStore.fetchProducts()

// Transform product store data to match ProductThumbnail expected format
const products = computed(() => {
  return productStore.getAllProducts.map((product: any) => ({
    id: product.id,
    title: product.title,
    price: product.price,
    originalPrice: product.originalPrice,
    discount: product.discount,
    rating: product.rating,
    soldCount: product.reviewCount, // Map reviewCount to soldCount
    isOfficialStore: product.isOfficialStore,
    brand: product.brand,
    features: product.features.slice(0, 3), // Limit to first 3 features
    image: product.images[0] // Use first image as primary
  }))
})
</script>

<style scoped>
/* Mobile-first responsive grid */
.grid {
  display: grid;
}

/* Auto rows for equal height in grid */
.auto-rows-max {
  grid-auto-rows: max-content;
}

/* CSS Grid with equal height items */
.grid-equal-heights {
  display: grid;
}

.grid-equal-heights > * {
  /* Ensure all direct children have equal height */
  height: 100%;
  /* Prevent content from overflowing */
  overflow: hidden;
}

/* 2 columns on mobile */
.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

/* 3 columns on small screens */
@media (min-width: 640px) {
  .sm\:grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 4 columns on medium screens */
@media (min-width: 768px) {
  .md\:grid-cols-4 {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* 5 columns on large screens */
@media (min-width: 1024px) {
  .lg\:grid-cols-5 {
    grid-template-columns: repeat(5, 1fr);
  }
}

/* 6 columns on extra large screens */
@media (min-width: 1280px) {
  .xl\:grid-cols-6 {
    grid-template-columns: repeat(6, 1fr);
  }
}

/* Gap spacing */
.gap-4 {
  gap: 1rem;
}

/* Responsive padding */
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .sm\:px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .lg\:px-8 {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

/* Section spacing */
.py-8 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}
</style>