<template>
  <div class="product-page">
    <div class="product-page__container flex flex-row">
      

      <!-- Product Preview Component -->
      <ProductPreview
        :images="productImages"
        :alt-text="productName"
      />

      <!-- Add to Cart Component -->
      <AddToChart
        :title="productName"
        :price="19.00"
        :stock="48"
        :weight-options="weightOptions"
      />

      
    </div>
  </div>
</template>

<script setup lang="ts">
// Import components
import ProductPreview from '~/components/ProductPreview.vue'
import AddToChart from '~/components/ProductPage/AddToChart.vue'
import { onMounted } from 'vue'

// Route parameters
const route = useRoute()
const storeSlug = route.params['store-slug']
const productSlug = route.params['product-slug']

// Sample product data (in a real app, this would come from an API or database)
const productName = `Dried Aonori Seaweed`
const productImages = [
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', // Dried seaweed flakes
  'https://images.pexels.com/photos/128402/pexels-photo-128402.jpeg',  // Seaweed in bowl
  'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg'   // Natural seaweed texture
]

// Weight options for the AddToChart component
const weightOptions = [
  { label: '100gm', value: '100gm' },
  { label: '200gm', value: '200gm' }
]

// Scroll to top when component mounts
onMounted(() => {
  window.scrollTo(0, 0)
})

// Page meta
useHead({
  title: `${productName} - ${storeSlug}`,
  meta: [
    {
      name: 'description',
      content: `View details for ${productName} from ${storeSlug}`
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