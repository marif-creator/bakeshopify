<template>
  <NuxtLink :to="`/${props.storeSlug}/${props.productSlug}`">
    <UCard class="w-48 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
    <!-- Discount Badge -->
    <div class="absolute top-2 left-2 z-10">
      <UBadge color="red" variant="solid" class="text-white font-bold">
        {{ product.discount }}%
      </UBadge>
    </div>

    <!-- Samsung Official Store Badge -->
    <div class="absolute top-2 right-2 z-10">
      <div class="bg-white px-2 py-1 rounded text-xs font-medium text-gray-700 border">
        Official Store
      </div>
    </div>

    <!-- Product Image -->
    <div class="relative pt-8 pb-4">
      <img
        v-if="!imageLoading && productImage"
        :src="productImage"
        :alt="product.title"
        class="w-full h-32 object-contain mx-auto transition-opacity duration-300"
        @load="imageLoading = false"
      />
      <div
        v-else
        class="w-full h-32 flex items-center justify-center bg-gray-100 rounded"
      >
        <UIcon
          name="i-heroicons-photo"
          class="w-8 h-8 text-gray-400"
        />
      </div>
    </div>

    <!-- Product Info -->
    <div class="space-y-2">
      <!-- Product Title -->
      <h3 class="font-medium text-sm line-clamp-2">
        Samsung Galaxy Z Fold6
      </h3>

      <!-- Price -->
      <div class="text-lg font-bold text-gray-900">
        Rp19.999.000
      </div>

      <!-- Rating and Sold Count -->
      <div class="flex items-center space-x-2">
        <div class="flex items-center">
          <UIcon name="i-heroicons-star" class="w-4 h-4 text-yellow-400 fill-current" />
          <span class="text-sm text-gray-700 ml-1">5.0</span>
        </div>
        <span class="text-sm text-gray-500">50+ terjual</span>
      </div>

      <!-- Verified Badge -->
      <div class="flex items-center space-x-1">
        <UIcon name="i-heroicons-check-badge" class="w-4 h-4 text-blue-500" />
        <span class="text-xs text-gray-600">Samsung Official Store</span>
      </div>

      <!-- Feature Icons -->
      <div class="flex items-center justify-between pt-2 border-t border-gray-100">
        <div class="flex items-center space-x-1">
          <UIcon name="i-heroicons-pencil" class="w-3 h-3 text-gray-400" />
          <span class="text-xs text-gray-500">Note Assist</span>
        </div>
        <div class="flex items-center space-x-1">
          <UIcon name="i-heroicons-camera" class="w-3 h-3 text-gray-400" />
          <span class="text-xs text-gray-500">Photo Assist</span>
        </div>
        <div class="flex items-center space-x-1">
          <UIcon name="i-heroicons-language" class="w-3 h-3 text-gray-400" />
          <span class="text-xs text-gray-500">Smart Select</span>
        </div>
      </div>
    </div>
    </UCard>
  </NuxtLink>
</template>

<script setup lang="ts">
// Define the product interface for TypeScript
interface Product {
  id: string
  title: string
  price: number
  originalPrice?: number
  discount?: number
  image?: string
  rating: number
  soldCount: number
  isOfficialStore: boolean
  brand: string
  features: string[]
}

// Define props with defaults
const props = withDefaults(defineProps<{
  product?: Product
  storeSlug?: string
  productSlug?: string
}>(), {
  product: () => ({
    id: '1',
    title: 'Samsung Galaxy Z Fold6',
    price: 19999000,
    originalPrice: 24999000,
    discount: 25,
    rating: 5.0,
    soldCount: 50,
    isOfficialStore: true,
    brand: 'Samsung',
    features: ['Note Assist', 'Photo Assist', 'Smart Select']
  }),
  storeSlug: 'default-store',
  productSlug: 'samsung-galaxy-z-fold6'
})

// Reactive state for image handling
const productImage = ref<string>('')
const imageLoading = ref<boolean>(true)

// Pexels API response interfaces
interface PexelsPhoto {
  id: number
  src: {
    medium: string
    large: string
    small: string
  }
}

interface PexelsResponse {
  photos: PexelsPhoto[]
  total_results: number
  page: number
}

// Pexels API configuration
const { $config } = useNuxtApp()
const PEXELS_API_KEY = $config.public.pexelsApiKey

// Fetch image from Pexels API
const fetchProductImage = async (query: string) => {
  try {
    imageLoading.value = true

    // Use a generic tech/phone related search term
    const searchQuery = 'smartphone mobile phone technology'

    const response = await $fetch<PexelsResponse>('https://api.pexels.com/v1/search', {
      method: 'GET',
      headers: {
        'Authorization': PEXELS_API_KEY
      },
      params: {
        query: searchQuery,
        per_page: 1,
        page: Math.floor(Math.random() * 10) + 1 // Random page for variety
      }
    })

    if (response.photos && response.photos.length > 0 && response.photos[0]) {
      productImage.value = response.photos[0].src.medium
    } else {
      // Fallback to placeholder if no images found
      productImage.value = `https://picsum.photos/300/300?random=${Date.now()}`
    }
  } catch (error) {
    console.error('Error fetching image from Pexels:', error)
    // Fallback to placeholder on error
    productImage.value = `https://picsum.photos/300/300?random=${Date.now()}`
  } finally {
    imageLoading.value = false
  }
}

// Format price in Indonesian Rupiah
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}


// Fetch image when component mounts
onMounted(() => {
  fetchProductImage(props.product.title)
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>