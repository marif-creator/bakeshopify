<template>
  <div class="relative">
    <UCard class="product-card w-48 h-full hover:shadow-lg transition-shadow duration-200">

      <!-- Badges and Product Image -->
      <div class="relative -m-2">
        <!-- Discount Badge -->
        <div class="absolute -top-1 -left-1 z-10">
          <UBadge color="error" variant="solid" class="text-white font-bold shadow-lg">
            {{ product.discount }}%
          </UBadge>
        </div>

        <!-- Official Store Badge -->
        <div class="absolute -top-1 -right-1 z-10">
          <div class="bg-white px-2 py-1 rounded text-xs font-medium text-gray-700 border shadow-sm">
            Official Store
          </div>
        </div>

        <!-- Product Image (Clickable for Navigation) -->
        <div class="pt-8 pb-4" :id="`product-image-${props.product.id}`">
          <NuxtLink :to="`/${props.storeSlug}/${props.productSlug}`">
            <img v-if="props.product.image" :src="props.product.image" :alt="props.product.title"
              class="w-full h-32 object-contain mx-auto transition-opacity duration-300 hover:opacity-80 cursor-pointer" />
            <div v-else
              class="w-full h-32 flex items-center justify-center bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition-colors">
              <UIcon name="i-heroicons-photo" class="w-8 h-8 text-gray-400" />
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Product Info -->
      <div class="space-y-2 flex flex-col flex-1 justify-between">
        <!-- Product Title -->
        <h3 class="font-medium text-sm line-clamp-2">
          {{ props.product.title }}
        </h3>
        <div>
          <!-- Price -->
          <div class="text-lg font-bold text-gray-900">
            {{ Number(props.product.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
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


          <!-- Add to Cart Button -->
          <div class="flex justify-center pt-3">
            <button
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200 flex items-center space-x-2 w-full max-w-[140px]"
              @click.stop="addToCart" :disabled="isAddingToCart">
              <Icon name="mdi:cart-plus" size="16" class="transition-transform duration-200"
                :class="{ 'scale-110': isAddingToCart }" />
              <span class="text-sm">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </UCard>
  </div>
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

// Reactive state
const isAddingToCart = ref<boolean>(false)

// Import cart store and flying animation composable
import { useCartStore } from '../../stores/cart'
import { useFlyingAnimation } from '../../composables/useFlyingAnimation'

// Add to cart functionality with flying animation
const addToCart = async () => {
  const { animateToCart } = useFlyingAnimation()

  // Set loading state
  isAddingToCart.value = true

  // Prepare cart item data
  const cartItem = {
    id: props.product.id,
    name: props.product.title,
    price: props.product.price,
    image: props.product.image || `https://picsum.photos/300/300?random=${Date.now()}`,
    slug: props.productSlug
  }

  try {
    // Wait for flying animation to complete
    const animationResult = await animateToCart(`product-image-${props.product.id}`, 'minicart')

    if (animationResult) {
      // Add item to cart when animation completes
      const cartStore = useCartStore()
      cartStore.addItem(cartItem)
    }

    // Reset loading state after animation
    isAddingToCart.value = false
  } catch (error) {
    console.error('Animation failed:', error)
    isAddingToCart.value = false
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Target the first child div inside UCard root element */
:deep(.w-48.h-full > div:first-child) {
  height: 100%;
}

/* Alternative approach - target any div that is a direct child of UCard */
:deep(.product-card > div:first-child) {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>