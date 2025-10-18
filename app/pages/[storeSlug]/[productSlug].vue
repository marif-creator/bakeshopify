<template>
  <div class="product-page">
    <div class="product-page__container flex flex-row">
      

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span class="ml-3 text-gray-600">Loading product...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <h3 class="text-lg font-semibold text-red-800 mb-2">Product Not Found</h3>
        <p class="text-red-600">{{ error }}</p>
      </div>

      <!-- Product Components -->
      <div v-else class="flex flex-row">
        <!-- Product Preview Component -->
        <ProductPreview
          :images="productImages"
          :alt-text="productName"
        />

        <!-- Add to Cart Component -->
        <AddToCart
          :title="productName"
          :price="productPrice"
          :stock="productStock"
          :id="productId"
          :image="productImages[0]"
          :slug="productSlug"
          :store-slug="storeSlug"
          :options="currentProduct?.options || []"
        />
      </div>

      
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: false
})

// Import components
import ProductPreview from '~/components/ProductPreview.vue'
import AddToCart from '~/components/ProductPage/AddToCart.vue'
import { onMounted, computed } from 'vue'

// Import product store
import { useProductStore } from '~~/stores/products'

// Route parameters
const route = useRoute()
const storeSlug = route.params.storeSlug as string
const productSlug = route.params.productSlug as string

// Initialize product store
const productStore = useProductStore()

// Computed properties for reactive data
const currentProduct = computed(() => productStore.currentProduct)
const productName = computed(() => currentProduct.value?.title || 'Product Not Found')
const productId = computed(() => currentProduct.value?.id || `prod_${productSlug}`)
const productImages = computed(() => currentProduct.value?.images || [])
const productPrice = computed(() => currentProduct.value?.price || 0)
const productStock = computed(() => currentProduct.value?.stock || 0)
const isLoading = computed(() => productStore.loading)
const error = computed(() => productStore.error)


// Fetch product data when component mounts
onMounted(() => {
  window.scrollTo(0, 0)

  // Get product by slug using the store getter
  const product = productStore.getProductBySlug(productSlug)

  if (product) {
    // Product found in store, set it as current product
    productStore.setCurrentProduct(product)
  } else {
    // Product not found, you could handle error here
    console.warn(`Product with slug "${productSlug}" not found`)
  }
})

// Page meta (reactive)
useHead({
  title: computed(() => `${productName.value} - ${storeSlug}`),
  meta: [
    {
      name: 'description',
      content: computed(() => `View details for ${productName.value} from ${storeSlug}`)
    }
  ]
})
</script>

<style scoped>
.product-page {
  min-height: 100vh;
  padding: 2rem 0;
  background: #f8f9fa;
}

.product-page__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.product-page__title {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3rem;
  color: #2c3e50;
}

.product-page__info {
  margin-top: 2rem;
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.product-page__info h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.product-page__store,
.product-page__slug {
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-page__container {
    padding: 0 1rem;
  }

  .product-page__title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .product-page__info h2 {
    font-size: 1.5rem;
  }
}
</style>