<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">
          {{ product ? 'Edit Product' : 'Add New Product' }}
        </h1>
        <p class="text-gray-600 mt-1">
          {{ product ? 'Update product information' : 'Create a new product for your store' }}
        </p>
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
          :disabled="!canPreview"
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
import { ref, reactive } from 'vue'
import { useProductStore } from '~~/stores/products'
import ProductForm from '~/components/seller/ProductForm.vue'

// Props
const props = defineProps<{
  product?: any
}>()

// Route
const route = useRoute()
const router = useRouter()

// Store
const productStore = useProductStore()

// Reactive state
const loading = ref(false)
const canPreview = ref(false)

// Computed
const product = computed(() => {
  if (route.params.productId) {
    return productStore.getProductById(route.params.productId as string)
  }
  return null
})

// Methods
const goBack = () => {
  router.push('/seller/dashboard/product')
}

const previewProduct = () => {
  // In a real app, this would open a product preview modal or navigate to preview page
  console.log('Preview product:', product.value)
}

const handleProductSubmit = async (productData: any) => {
  loading.value = true

  try {
    if (product.value) {
      // Update existing product
      await productStore.updateProduct(product.value.id, productData)
      // Show success message
      console.log('Product updated successfully')
    } else {
      // Create new product
      const newProduct = {
        ...productData,
        id: `prod_${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      await productStore.addProduct(newProduct)
      // Show success message
      console.log('Product created successfully')
    }

    // Navigate back to products page
    await router.push('/seller/dashboard?tab=products')
  } catch (error) {
    console.error('Error saving product:', error)
    // Show error message
  } finally {
    loading.value = false
  }
}

// Watch for form changes to enable preview
watch(() => product, (newProduct) => {
  canPreview.value = !!newProduct
}, { deep: true })

// Page meta
definePageMeta({
  auth: true,
  layout: 'seller'
})
</script>