<template>
  <div class="mini-cart relative">
    <!-- Cart Trigger Button -->
    <NuxtLink
      id="minicart"
      to="/cart"
      class="mini-cart__trigger flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 transition-colors"
      @mouseenter="showCartPreview"
      @mouseleave="hideCartPreview"
    >
      <Icon name="mdi:cart" size="20" class="text-gray-600" />
      <!-- Cart Counter Badge -->
      <span
        v-if="itemCount > 0"
        class="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
      >
        {{ itemCount > 99 ? '99+' : itemCount }}
      </span>
    </NuxtLink>

    <!-- Cart Preview Dropdown -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 transform translate-y-2 scale-95"
      enter-to-class="opacity-100 transform translate-y-0 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 transform translate-y-0 scale-100"
      leave-to-class="opacity-0 transform translate-y-2 scale-95"
    >
      <div
        v-if="isPreviewVisible && !cartStore.isEmpty"
        ref="cartPreview"
        class="mini-cart__preview absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
        @mouseenter="keepPreviewVisible"
        @mouseleave="hideCartPreview"
      >
        <!-- Header -->
        <div class="mini-cart__preview-header p-4 border-b border-gray-100">
          <h3 class="font-semibold text-gray-900">Shopping Cart</h3>
          <p class="text-sm text-gray-600">{{ itemCount }} item{{ itemCount !== 1 ? 's' : '' }}</p>
        </div>

        <!-- Cart Items -->
        <div class="mini-cart__preview-items max-h-64 overflow-y-auto">
          <div
            v-for="item in cartStore.items"
            :key="item.id"
            class="mini-cart__preview-item flex items-center p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors"
          >
            <!-- Product Image -->
            <div class="mini-cart__item-image w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Product Info -->
            <div class="mini-cart__item-info flex-1 ml-3">
              <h4 class="text-sm font-medium text-gray-900 line-clamp-2">{{ item.name }}</h4>
              <div class="flex items-center justify-between mt-1">
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-gray-600">Qty: {{ item.quantity }}</span>
                </div>
                <span class="text-sm font-semibold text-gray-900">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </span>
              </div>
            </div>

            <!-- Remove Button -->
            <button
              class="mini-cart__item-remove ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
              @click.stop="removeItem(item.id)"
            >
              <Icon name="mdi:close" size="16" />
            </button>
          </div>
        </div>

        <!-- Footer -->
        <div class="mini-cart__preview-footer p-4 border-t border-gray-100">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-medium text-gray-900">Total:</span>
            <span class="text-lg font-bold text-gray-900">${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>

          <div class="space-y-2">
            <UButton
              color="neutral"
              variant="outline"
              size="sm"
              class="w-full"
              @click="checkout"
            >
              Checkout
            </UButton>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Empty Cart Message -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 transform translate-y-2 scale-95"
      enter-to-class="opacity-100 transform translate-y-0 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 transform translate-y-0 scale-100"
      leave-to-class="opacity-0 transform translate-y-2 scale-95"
    >
      <div
        v-if="isPreviewVisible && cartStore.isEmpty"
        class="mini-cart__empty absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-6 text-center"
        @mouseenter="keepPreviewVisible"
        @mouseleave="hideCartPreview"
      >
        <Icon name="mdi:cart-outline" size="48" class="text-gray-300 mx-auto mb-3" />
        <p class="text-gray-500 text-sm">Your cart is empty</p>
        <p class="text-gray-400 text-xs mt-1">Add some items to get started!</p>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '../../stores/cart'
import { useCheckoutStore } from '../../stores/checkout'

// Cart stores
const cartStore = useCartStore()
const checkoutStore = useCheckoutStore()

// Reactive state
const isPreviewVisible = ref(false)
const previewTimer = ref<NodeJS.Timeout | null>(null)

// Computed properties
const itemCount = computed(() => cartStore.totalItems)

// Methods
const showCartPreview = () => {
  if (previewTimer.value) {
    clearTimeout(previewTimer.value)
  }
  isPreviewVisible.value = true
}

const hideCartPreview = () => {
  previewTimer.value = setTimeout(() => {
    isPreviewVisible.value = false
  }, 150) // Small delay to allow mouse to move between trigger and preview
}

const keepPreviewVisible = () => {
  if (previewTimer.value) {
    clearTimeout(previewTimer.value)
  }
}

const toggleCart = () => {
  cartStore.toggleCart()
  isPreviewVisible.value = false
}

const removeItem = (id: string | number) => {
  cartStore.removeItem(id)
}

const viewCart = () => {
  // Navigate to cart page or open cart modal
  cartStore.openCart()
  isPreviewVisible.value = false
  // You can add navigation logic here if you have a cart page
  // navigateTo('/cart')
}


const checkout = () => {
  // Initialize checkout from cart and navigate to checkout page
  checkoutStore.initializeFromCart()
  isPreviewVisible.value = false
  navigateTo('/checkout')
}

onUnmounted(() => {
  if (previewTimer.value) {
    clearTimeout(previewTimer.value)
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Ensure the cart preview appears above other content */
.mini-cart__preview,
.mini-cart__empty {
  z-index: 1000;
}

/* Scrollbar styling for cart items */
.mini-cart__preview-items::-webkit-scrollbar {
  width: 4px;
}

.mini-cart__preview-items::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.mini-cart__preview-items::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.mini-cart__preview-items::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>