<template>
  <div class="add-to-cart">
    <!-- Header with title and share button -->
    <div class="add-to-cart__header">
      <h1 class="add-to-cart__title">{{ title }}</h1>
      <button class="add-to-cart__share-btn" @click="handleShare">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="18" cy="5" r="3"/>
          <circle cx="6" cy="12" r="3"/>
          <circle cx="18" cy="19" r="3"/>
          <path d="m8.59 13.51 6.83 3.98"/>
          <path d="m15.41 6.51-6.82 3.98"/>
        </svg>
        Share
      </button>
    </div>

    <!-- Price -->
    <div class="add-to-cart__price">
      ${{ price.toFixed(2) }}
    </div>

    <!-- Stock indicator -->
    <div class="add-to-cart__stock">
      <div class="stock-indicator">
        <span class="stock-indicator__dot"></span>
        <span class="stock-indicator__text">{{ stock }} in stock</span>
      </div>
    </div>

    <!-- Weight/Size selector -->
    <div class="add-to-cart__weight-section">
      <label class="add-to-cart__label">Weight: {{ selectedWeight }}</label>
      <div class="add-to-cart__weight-options">
        <button
          v-for="weight in weightOptions"
          :key="weight.value"
          class="add-to-cart__weight-btn"
          :class="{ 'add-to-cart__weight-btn--active': selectedWeight === weight.value }"
          @click="selectWeight(weight.value)"
        >
          {{ weight.label }}
        </button>
      </div>
    </div>

    <!-- Quantity selector -->
    <div class="add-to-cart__quantity-section">
      <label class="add-to-cart__label">Quantity</label>
      <div class="add-to-cart__quantity-selector">
        <button
          class="add-to-cart__quantity-btn"
          :disabled="quantity <= 1"
          @click="decreaseQuantity"
        >
          −
        </button>
        <input
          type="number"
          class="add-to-cart__quantity-input"
          v-model.number="quantity"
          min="1"
          :max="maxQuantity"
        />
        <button
          class="add-to-cart__quantity-btn"
          :disabled="quantity >= maxQuantity"
          @click="increaseQuantity"
        >
          +
        </button>
      </div>
    </div>

    <!-- Action buttons -->
    <div class="add-to-cart__actions">
      <button
        class="add-to-cart__btn add-to-cart__btn--primary"
        @click="addToCart"
      >
        Add To Cart
      </button>
      <button
        class="add-to-cart__btn add-to-cart__btn--secondary"
        @click="buyNow"
      >
        Buy It Now
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

// Props
interface Props {
  title?: string
  price?: number
  stock?: number
  weightOptions?: Array<{ label: string; value: string }>
  maxQuantity?: number
  id?: string | number
  image?: string
  slug?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Product Title',
  price: 19.00,
  stock: 48,
  weightOptions: () => [
    { label: '100gm', value: '100gm' },
    { label: '200gm', value: '200gm' }
  ],
  maxQuantity: 99
})

// Reactive state
const quantity = ref(1)
const selectedWeight = ref(props.weightOptions[0]?.value || '100gm')

// Methods
const selectWeight = (weight: string) => {
  selectedWeight.value = weight
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const increaseQuantity = () => {
  if (quantity.value < props.maxQuantity) {
    quantity.value++
  }
}

// Import cart store and flying animation composable
import { useCartStore } from '../../../stores/cart'
import { useFlyingAnimation } from '../../../composables/useFlyingAnimation'

const addToCart = async () => {
  // Get the flying animation composable
  const { animateToCart } = useFlyingAnimation()

  // Prepare cart item data
  const cartItem = {
    id: props.id || 'default-id',
    name: props.title || 'Product',
    price: props.price || 0,
    image: props.image || '',
    slug: props.slug
  }

  try {
    // Wait for flying animation to complete
    const animationResult = await animateToCart('mainproductimage', 'minicart')

    if (animationResult) {
      // This runs when animation completes
      const cartStore = useCartStore()
      cartStore.addItem(cartItem)

      // Reset quantity to 1 after adding to cart
      quantity.value = 1

      console.log('Added to cart (animation complete):', {
        title: props.title,
        price: props.price,
        weight: selectedWeight.value,
        quantity: quantity.value,
        id: props.id,
        image: props.image,
        slug: props.slug
      })
    }
  } catch (error) {
    console.error('Animation failed:', error)
  }
}

const buyNow = () => {
  // Handle buy now logic
  console.log('Buy now:', {
    title: props.title,
    price: props.price,
    weight: selectedWeight.value,
    quantity: quantity.value
  })
}

const handleShare = () => {
  // Handle share logic
  if (navigator.share) {
    navigator.share({
      title: props.title,
      text: `Check out ${props.title} for $${props.price}`,
      url: window.location.href
    })
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href)
  }
}

</script>

<style scoped>
.add-to-cart {
  max-width: 400px;
  margin: 0 auto;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.add-to-cart__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.add-to-cart__title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  flex: 1;
  line-height: 1.3;
}

.add-to-cart__share-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #666;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.add-to-cart__share-btn:hover {
  background-color: #f5f5f5;
}

.add-to-cart__price {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.add-to-cart__stock {
  margin-bottom: 1.5rem;
}

.stock-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stock-indicator__dot {
  width: 8px;
  height: 8px;
  background-color: #22c55e;
  border-radius: 50%;
}

.stock-indicator__text {
  font-size: 0.875rem;
  color: #22c55e;
  font-weight: 500;
}

.add-to-cart__label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
}

.add-to-cart__weight-options {
  display: flex;
  gap: 0.75rem;
}

.add-to-cart__weight-btn {
  padding: 0.75rem 1.25rem;
  border: 2px solid #e5e7eb;
  background: white;
  color: #374151;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.add-to-cart__weight-btn--active {
  background-color: #1a1a1a;
  color: white;
  border-color: #1a1a1a;
}

.add-to-cart__weight-btn:hover:not(.add-to-cart__weight-btn--active) {
  border-color: #d1d5db;
  background-color: #f9fafb;
}

.add-to-cart__quantity-selector {
  display: flex;
  align-items: center;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.add-to-cart__quantity-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: white;
  border: none;
  font-size: 1.25rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-to-cart__quantity-btn:hover:not(:disabled) {
  background-color: #f9fafb;
}

.add-to-cart__quantity-btn:disabled {
  color: #d1d5db;
  cursor: not-allowed;
}

.add-to-cart__quantity-input {
  width: 4rem;
  height: 3rem;
  border: none;
  border-left: 2px solid #e5e7eb;
  border-right: 2px solid #e5e7eb;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
  background: white;
}

.add-to-cart__quantity-input:focus {
  outline: none;
}

.add-to-cart__actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 2rem;
}

.add-to-cart__btn {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.add-to-cart__btn--primary {
  background-color: #166534;
  color: white;
}

.add-to-cart__btn--primary:hover {
  background-color: #15803d;
}

.add-to-cart__btn--secondary {
  background-color: white;
  color: #1a1a1a;
  border: 2px solid #e5e7eb;
}

.add-to-cart__btn--secondary:hover {
  border-color: #d1d5db;
  background-color: #f9fafb;
}

/* Responsive design */
@media (max-width: 640px) {
  .add-to-cart {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    border-top: 1px solid #e5e7eb;
  }

  .add-to-cart__actions {
    flex-direction: column;
  }

  .add-to-cart__weight-options {
    flex-wrap: wrap;
  }
}
</style>