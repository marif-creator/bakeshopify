<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Edit Product</h1>
        <p class="text-gray-600 mt-1">Update product information</p>
      </div>
      <div class="flex items-center gap-3">
        <UButton
          variant="outline"
          icon="i-heroicons-arrow-left"
          @click="goBack"
        >
          Back to Products
        </UButton>
        <UButton
          variant="outline"
          icon="i-heroicons-eye"
          @click="previewProduct"
          :disabled="!product"
        >
          Preview
        </UButton>
      </div>
    </div>

    <!-- Product Form -->
    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold">Product Information</h2>
      </template>

      <div class="max-w-4xl">
        <ProductForm
          :product="product"
          @submit="handleProductSubmit"
          @cancel="goBack"
        />
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Imports
import { useProductStore } from '~~/stores/products'

// Route
const route = useRoute()
const router = useRouter()

// Store
const productStore = useProductStore()

// Computed
const product = computed(() => {
  const productId = route.params.id as string
  return productStore.getProductById(productId)
})

// Methods
const goBack = () => {
  router.push('/seller/dashboard?tab=products')
}

const previewProduct = () => {
  if (product.value) {
    // In a real app, this would open a product preview modal or navigate to preview page
    console.log('Preview product:', product.value)
  }
}

const handleProductSubmit = async (productData: any) => {
  if (product.value) {
    try {
      // Update existing product
      await productStore.updateProduct(product.value.id, productData)
      // Show success message
      console.log('Product updated successfully')

      // Navigate back to products page
      await router.push('/seller/dashboard?tab=products')
    } catch (error) {
      console.error('Error updating product:', error)
      // Show error message
    }
  }
}

// Redirect if product not found
watchEffect(() => {
  if (route.params.id && !product.value) {
    // Product not found, redirect to products page
    router.push('/seller/dashboard?tab=products')
  }
})

// Page meta
definePageMeta({
  auth: true,
  layout: 'seller'
})
</script>