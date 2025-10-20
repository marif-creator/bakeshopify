<template>
  <div v-if="product" class="space-y-6">
    <!-- Product Header -->
    <div class="flex items-start gap-6">
      <img
        :src="product.images[0]"
        :alt="product.title"
        class="w-24 h-24 rounded-lg object-cover"
      />
      <div class="flex-1">
        <h3 class="text-xl font-semibold text-gray-900">{{ product.title }}</h3>
        <p class="text-gray-600">{{ product.brand }}</p>
        <div class="flex items-center gap-4 mt-2">
          <UBadge :color="product.isAvailable ? 'success' : 'error'" variant="subtle">
            {{ product.isAvailable ? 'Available' : 'Out of Stock' }}
          </UBadge>
          <span class="text-sm text-gray-600">{{ product.category }}</span>
        </div>
      </div>
    </div>

    <!-- Product Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-gray-50 p-4 rounded-lg">
        <p class="text-sm text-gray-600">Price</p>
        <p class="text-lg font-semibold">{{ formatCurrency(product.price) }}</p>
      </div>
      <div class="bg-gray-50 p-4 rounded-lg">
        <p class="text-sm text-gray-600">Stock</p>
        <p class="text-lg font-semibold">{{ product.stock }} units</p>
      </div>
      <div class="bg-gray-50 p-4 rounded-lg">
        <p class="text-sm text-gray-600">Rating</p>
        <p class="text-lg font-semibold">{{ product.rating }}/5 ⭐</p>
      </div>
      <div class="bg-gray-50 p-4 rounded-lg">
        <p class="text-sm text-gray-600">Reviews</p>
        <p class="text-lg font-semibold">{{ product.reviewCount }}</p>
      </div>
    </div>

    <!-- Product Information -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h4 class="font-medium text-gray-900 mb-3">Description</h4>
        <p class="text-gray-700">{{ product.description }}</p>
      </div>

      <div>
        <h4 class="font-medium text-gray-900 mb-3">Specifications</h4>
        <div class="space-y-2">
          <div v-for="(value, key) in product.specifications" :key="key" class="flex justify-between">
            <span class="text-gray-600">{{ key }}:</span>
            <span class="font-medium">{{ value }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Features -->
    <div v-if="product.features && product.features.length > 0">
      <h4 class="font-medium text-gray-900 mb-3">Features</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div v-for="feature in product.features" :key="feature" class="flex items-center gap-2">
          <UIcon name="i-heroicons-check" class="w-4 h-4 text-green-600" />
          <span class="text-gray-700">{{ feature }}</span>
        </div>
      </div>
    </div>

    <!-- Images Gallery -->
    <div v-if="product.images && product.images.length > 1">
      <h4 class="font-medium text-gray-900 mb-3">Product Images</h4>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <img
          v-for="(image, index) in product.images"
          :key="index"
          :src="image"
          :alt="`${product.title} ${index + 1}`"
          class="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
        />
      </div>
    </div>

    <!-- Product Options -->
    <div v-if="product.options && product.options.length > 0">
      <h4 class="font-medium text-gray-900 mb-3">Options</h4>
      <div class="space-y-2">
        <div v-for="option in product.options" :key="`${option.type}-${option.value}`" class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div>
            <span class="font-medium">{{ option.type }}:</span>
            <span class="ml-2">{{ option.value }}</span>
          </div>
          <div class="text-right">
            <div v-if="option.price && option.price > 0" class="font-medium">
              +{{ formatCurrency(option.price) }}
            </div>
            <UBadge v-if="option.required" color="warning" variant="subtle" size="xs">
              Required
            </UBadge>
          </div>
        </div>
      </div>
    </div>

    <!-- Timestamps -->
    <div class="pt-4 border-t">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <span class="font-medium">Created:</span>
          {{ formatDate(product.createdAt) }}
        </div>
        <div>
          <span class="font-medium">Last Updated:</span>
          {{ formatDate(product.updatedAt) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps<{
  product: any
}>()

// Helper functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(amount)
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

</script>