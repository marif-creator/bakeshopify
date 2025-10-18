<template>
  <div class="cart-page min-h-screen bg-gray-50">
    <div class="cart-container max-w-7xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="cart-header mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p class="text-gray-600">{{ cartStore.totalItems }} item{{ cartStore.totalItems !== 1 ? 's' : '' }} in your cart</p>
      </div>

      <!-- Empty Cart State -->
      <div v-if="cartStore.isEmpty" class="empty-cart text-center py-16">
        <div class="empty-cart-icon mb-6">
          <Icon name="mdi:cart-outline" size="80" class="text-gray-300 mx-auto" />
        </div>
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
        </p>
        <UButton
          color="primary"
          size="lg"
          @click="continueShopping"
        >
          Continue Shopping
        </UButton>
      </div>

      <!-- Cart Content -->
      <div v-else class="cart-content grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="cart-items lg:col-span-2">
          <div class="cart-items-container bg-white rounded-lg shadow-sm">
            <div class="cart-items-header p-6 border-b border-gray-200">
              <h2 class="text-xl font-semibold text-gray-900">Cart Items</h2>
            </div>

            <div class="cart-items-list">
              <div
                v-for="item in cartStore.items"
                :key="item.uniqueId"
                class="cart-item p-6 border-b border-gray-100 last:border-b-0"
              >
                <div class="cart-item-content flex items-center space-x-4">
                  <!-- Product Image -->
                  <div class="cart-item-image w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      :src="item.image"
                      :alt="item.name"
                      class="w-full h-full object-cover"
                    />
                  </div>

                  <!-- Product Details -->
                  <div class="cart-item-details flex-1 min-w-0">
                    <!-- Clickable Product Title -->
                    <NuxtLink
                      :to="getProductUrl(item)"
                      class="text-lg font-medium text-gray-900 mb-1 truncate hover:text-blue-600 transition-colors cursor-pointer block"
                    >
                      {{ item.name }}
                    </NuxtLink>
                    <p class="text-sm text-gray-500 mb-2">Product ID: {{ item.id }}</p>

                    <!-- Selected Options -->
                    <div v-if="item.selectedOptions" class="selected-options mb-3">
                      <div v-for="(value, type) in item.selectedOptions" :key="type" class="option-badge">
                        <span class="option-type">{{ type }}:</span>
                        <span class="option-value">{{ value }}</span>
                      </div>
                    </div>

                    <!-- Quantity Controls -->
                    <div class="quantity-controls flex items-center space-x-3">
                      <button
                        class="quantity-btn w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                        @click="decreaseQuantity(item.uniqueId || item.id)"
                        :disabled="item.quantity <= 1"
                      >
                        <Icon name="mdi:minus" size="16" />
                      </button>

                      <span class="quantity-display w-12 text-center font-medium">{{ item.quantity }}</span>

                      <button
                        class="quantity-btn w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                        @click="increaseQuantity(item.uniqueId || item.id)"
                      >
                        <Icon name="mdi:plus" size="16" />
                      </button>
                    </div>
                  </div>

                  <!-- Price and Actions -->
                  <div class="cart-item-actions text-right">
                    <div class="cart-item-price mb-3">
                      <div class="text-lg font-bold text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</div>
                      <div class="text-sm text-gray-500">${{ item.price.toFixed(2) }} each</div>
                    </div>

                    <button
                      class="remove-btn text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                      @click="removeItem(item.uniqueId || item.id)"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="order-summary lg:col-span-1">
          <div class="order-summary-card bg-white rounded-lg shadow-sm p-6 sticky top-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>

            <!-- Price Breakdown -->
            <div class="price-breakdown space-y-4 mb-6">
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Subtotal ({{ cartStore.totalItems }} items)</span>
                <span class="font-medium">${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>

              <div class="flex justify-between items-center">
                <span class="text-gray-600">Shipping</span>
                <span class="text-green-600 font-medium">FREE</span>
              </div>

              <div class="flex justify-between items-center">
                <span class="text-gray-600">Tax</span>
                <span class="font-medium">${{ (cartStore.totalPrice * 0.1).toFixed(2) }}</span>
              </div>

              <div class="border-t border-gray-200 pt-4">
                <div class="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span>${{ (cartStore.totalPrice * 1.1).toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <!-- Promo Code -->
            <div class="promo-code mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Promo Code</label>
              <div class="flex space-x-2">
                <UInput
                  v-model="promoCode"
                  placeholder="Enter promo code"
                  class="flex-1"
                />
                <UButton
                  color="neutral"
                  variant="outline"
                  @click="applyPromoCode"
                >
                  Apply
                </UButton>
              </div>
            </div>

            <!-- Checkout Buttons -->
            <div class="checkout-actions space-y-3">
              <UButton
                color="primary"
                size="lg"
                class="w-full"
                @click="proceedToCheckout"
              >
                Proceed to Checkout
              </UButton>

              <UButton
                color="neutral"
                variant="outline"
                size="lg"
                class="w-full"
                @click="continueShopping"
              >
                Continue Shopping
              </UButton>
            </div>

            <!-- Security Badges -->
            <div class="security-badges mt-6 pt-6 border-t border-gray-200">
              <div class="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div class="flex items-center space-x-1">
                  <Icon name="mdi:lock" size="16" />
                  <span>Secure Checkout</span>
                </div>
                <div class="flex items-center space-x-1">
                  <Icon name="mdi:truck" size="16" />
                  <span>Free Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  auth: false
})

// Import stores
import { useCartStore } from '../../stores/cart'
import { useCheckoutStore } from '../../stores/checkout'

const cartStore = useCartStore()
const checkoutStore = useCheckoutStore()

// Reactive state
const promoCode = ref('')

// Methods
const decreaseQuantity = (id: string | number) => {
  cartStore.decrementQuantity(id)
}

const increaseQuantity = (id: string | number) => {
  cartStore.incrementQuantity(id)
}

const removeItem = (id: string | number) => {
  cartStore.removeItem(id)
}

const applyPromoCode = () => {
  if (promoCode.value.trim()) {
    // Handle promo code logic
    console.log('Applying promo code:', promoCode.value)
    // You can add promo code validation logic here
  }
}

const proceedToCheckout = () => {
  // Initialize checkout from cart
  checkoutStore.initializeFromCart()

  // Navigate to checkout page
  navigateTo('/checkout')
}

const continueShopping = () => {
  // Navigate back to shopping
  navigateTo('/')
}

// Method to generate product URL with options
const getProductUrl = (item: any) => {
  if (!item.slug) {
    console.warn('Product slug not available for cart item:', item.name)
    return '/' // Fallback to home page
  }

  // Use store slug from cart item, fallback to default if not available
  const storeSlug = item.storeSlug || 'default-store'

  return `/${storeSlug}/${item.slug}`
}

// Page meta
useHead({
  title: `Shopping Cart (${cartStore.totalItems} items) - BakeShopify`,
  meta: [
    {
      name: 'description',
      content: `Review and manage ${cartStore.totalItems} items in your shopping cart`
    }
  ]
})
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
}

.empty-cart-icon {
  opacity: 0.5;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-display {
  min-width: 3rem;
}

.selected-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.option-badge {
  display: inline-flex;
  align-items: center;
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.option-badge::before {
  content: "•";
  color: #166534;
  font-weight: bold;
  margin-right: 0.25rem;
}

.option-type {
  font-weight: 600;
  color: #374151;
  margin-right: 0.25rem;
}

.option-value {
  color: #6b7280;
}

/* Enhanced visual separation for different option combinations */
.cart-item {
  position: relative;
}

.cart-item:not(:last-child)::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 1.5rem;
  right: 1.5rem;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, #e5e7eb 20%, #e5e7eb 80%, transparent 100%);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .cart-container {
    padding: 1rem;
  }

  .cart-content {
    grid-template-columns: 1fr;
  }

  .order-summary {
    order: -1;
  }

  .order-summary-card {
    position: static;
  }
}
</style>