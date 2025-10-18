<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p class="text-gray-600">Complete your order by filling in the details below</p>
      </div>

      <!-- Empty Cart Check -->
      <div v-if="cartStore.isEmpty" class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <svg class="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5h13M12 18a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
        <p class="text-gray-600 mb-6">Add some delicious items to your cart before checkout</p>
        <UButton @click="$router.push('/')" color="primary" size="lg">
          Continue Shopping
        </UButton>
      </div>

      <!-- Checkout Form -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Column - Forms -->
        <div class="space-y-6">
          <!-- Delivery Service Selection -->
          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold text-gray-900">Delivery Options</h2>
            </template>
            <div class="space-y-4">
              <UFormGroup label="Delivery Service" name="deliveryService">
                <URadioGroup v-model="checkoutStore.delivery.service" :options="deliveryOptions" />
              </UFormGroup>

              <!-- Delivery Time Selection -->
              <UFormGroup label="Preferred Delivery Time" name="deliveryTime">
                <USelect v-model="checkoutStore.delivery.time" :options="deliveryTimeOptions" />
              </UFormGroup>

              <!-- Special Instructions -->
              <UFormGroup label="Special Instructions (Optional)" name="instructions">
                <UTextarea
                  v-model="checkoutStore.delivery.instructions"
                  placeholder="Any special delivery instructions..."
                  :rows="3"
                />
              </UFormGroup>
            </div>
          </UCard>

          <!-- Address Information -->
          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold text-gray-900">Delivery Address</h2>
            </template>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormGroup label="Full Name" name="fullName" class="md:col-span-2">
                <UInput v-model="checkoutStore.address.fullName" placeholder="Enter your full name" />
              </UFormGroup>

              <UFormGroup label="Phone Number" name="phone">
                <UInput v-model="checkoutStore.address.phone" placeholder="Enter your phone number" />
              </UFormGroup>

              <UFormGroup label="Email" name="email">
                <UInput v-model="checkoutStore.address.email" placeholder="Enter your email" />
              </UFormGroup>

              <UFormGroup label="Street Address" name="street" class="md:col-span-2">
                <UInput v-model="checkoutStore.address.street" placeholder="Enter your street address" />
              </UFormGroup>

              <UFormGroup label="City" name="city">
                <UInput v-model="checkoutStore.address.city" placeholder="Enter your city" />
              </UFormGroup>

              <UFormGroup label="State/Province" name="state">
                <UInput v-model="checkoutStore.address.state" placeholder="Enter your state/province" />
              </UFormGroup>

              <UFormGroup label="Postal Code" name="postalCode">
                <UInput v-model="checkoutStore.address.postalCode" placeholder="Enter your postal code" />
              </UFormGroup>

              <UFormGroup label="Country" name="country">
                <USelect v-model="checkoutStore.address.country" :options="countryOptions" />
              </UFormGroup>
            </div>
          </UCard>

          <!-- Payment Information -->
          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold text-gray-900">Payment Method</h2>
            </template>
            <div class="space-y-4">
              <UFormGroup label="Payment Method" name="paymentMethod">
                <URadioGroup v-model="checkoutStore.payment.type" :options="paymentOptions" />
              </UFormGroup>

              <!-- Card Details (shown when card is selected) -->
              <div v-if="checkoutStore.payment.type === 'card'" class="space-y-4">
                <UFormGroup label="Card Number" name="cardNumber">
                  <UInput v-model="checkoutStore.payment.cardDetails!.cardNumber" placeholder="1234 5678 9012 3456" />
                </UFormGroup>

                <div class="grid grid-cols-2 gap-4">
                  <UFormGroup label="Expiry Date" name="expiryDate">
                    <UInput v-model="checkoutStore.payment.cardDetails!.expiryDate" placeholder="MM/YY" />
                  </UFormGroup>

                  <UFormGroup label="CVV" name="cvv">
                    <UInput v-model="checkoutStore.payment.cardDetails!.cvv" placeholder="123" />
                  </UFormGroup>
                </div>

                <UFormGroup label="Cardholder Name" name="cardholderName">
                  <UInput v-model="checkoutStore.payment.cardDetails!.cardholderName" placeholder="Enter cardholder name" />
                </UFormGroup>
              </div>

              <!-- Cash on Delivery note -->
              <div v-if="checkoutStore.payment.type === 'cod'" class="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p class="text-sm text-green-800">
                  You can pay with cash when your order is delivered to your address.
                </p>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Right Column - Order Summary -->
        <div class="lg:sticky lg:top-8">
          <UCard class="h-fit">
            <template #header>
              <h2 class="text-xl font-semibold text-gray-900">Order Summary</h2>
            </template>

            <!-- Cart Items -->
            <div class="space-y-4 mb-6">
              <div v-for="item in cartStore.items" :key="item.id" class="flex items-center space-x-4">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-16 h-16 object-cover rounded-lg"
                />
                <div class="flex-1">
                  <h3 class="font-medium text-gray-900">{{ item.name }}</h3>
                  <p class="text-sm text-gray-600">Quantity: {{ item.quantity }}</p>
                </div>
                <div class="text-right">
                  <p class="font-semibold text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</p>
                  <p class="text-sm text-gray-600">${{ item.price.toFixed(2) }} each</p>
                </div>
              </div>
            </div>

            <!-- Order Totals -->
            <div class="border-t pt-4 space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-medium">${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>

              <div class="flex justify-between">
                <span class="text-gray-600">Delivery Fee</span>
                <span class="font-medium">${{ deliveryFee.toFixed(2) }}</span>
              </div>

              <div class="flex justify-between">
                <span class="text-gray-600">Tax</span>
                <span class="font-medium">${{ tax.toFixed(2) }}</span>
              </div>

              <div class="border-t pt-2">
                <div class="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span class="text-green-600">${{ total.toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <!-- Place Order Button -->
            <UButton
              @click="placeOrder"
              :loading="isSubmitting"
              :disabled="!isFormValid || isSubmitting"
              color="primary"
              size="lg"
              class="w-full mt-6"
              :class="{ 'opacity-50 cursor-not-allowed': !isFormValid }"
            >
              {{ isSubmitting ? 'Processing Order...' : `Place Order - $${total.toFixed(2)}` }}
            </UButton>

            <!-- Terms and Conditions -->
            <p class="text-xs text-gray-500 mt-4 text-center">
              By placing your order, you agree to our
              <UButton variant="link" class="text-xs p-0 h-auto text-green-600">Terms of Service</UButton>
              and
              <UButton variant="link" class="text-xs p-0 h-auto text-green-600">Privacy Policy</UButton>
            </p>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../../stores/cart'
import { useCheckoutStore } from '../../stores/checkout'

// Import stores
const cartStore = useCartStore()
const checkoutStore = useCheckoutStore()

// Load saved checkout state on mount
onMounted(() => {
  checkoutStore.loadFromStorage()
  checkoutStore.initializeFromCart()
})

// Form state
const isSubmitting = ref(false)

// Delivery options
const deliveryOptions = [
  { label: 'Standard Delivery (1-2 days)', value: 'standard', description: '$5.00' },
  { label: 'Express Delivery (2-4 hours)', value: 'express', description: '$10.00' },
  { label: 'Same Day Delivery', value: 'same-day', description: '$15.00' }
]

// Delivery time options
const deliveryTimeOptions = [
  { label: 'As soon as possible', value: 'asap' },
  { label: 'Today (2-4 PM)', value: 'today-afternoon' },
  { label: 'Today (6-8 PM)', value: 'today-evening' },
  { label: 'Tomorrow morning', value: 'tomorrow-morning' },
  { label: 'Tomorrow afternoon', value: 'tomorrow-afternoon' }
]

// Payment options
const paymentOptions = [
  { label: 'Credit/Debit Card', value: 'card' },
  { label: 'Cash on Delivery', value: 'cod' },
  { label: 'Bank Transfer', value: 'bank-transfer' }
]

// Country options
const countryOptions = [
  'Indonesia',
  'Malaysia',
  'Singapore',
  'Thailand',
  'Vietnam',
  'Philippines'
]

// Computed values
const subtotal = computed(() => cartStore.totalPrice)
const deliveryFee = computed(() => checkoutStore.deliveryFee)
const tax = computed(() => checkoutStore.orderSummary.tax)
const total = computed(() => checkoutStore.orderSummary.total)

// Form validation
const isFormValid = computed(() => checkoutStore.isFormValid)

// Place order function
const placeOrder = async () => {
  if (!isFormValid.value) return

  isSubmitting.value = true

  try {
    // Place order using checkout store
    await checkoutStore.placeOrder()

    // Show success message and redirect
    alert('Order placed successfully! You will receive a confirmation email shortly.')
    await navigateTo('/')

  } catch (error) {
    console.error('Error placing order:', error)
    alert('Failed to place order. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

// Auto-save checkout state when it changes
watch(() => checkoutStore.delivery, () => {
  checkoutStore.saveToStorage()
}, { deep: true })

watch(() => checkoutStore.address, () => {
  checkoutStore.saveToStorage()
}, { deep: true })

watch(() => checkoutStore.payment, () => {
  checkoutStore.saveToStorage()
}, { deep: true })
</script>

<style scoped>
/* Additional custom styles if needed */
</style>