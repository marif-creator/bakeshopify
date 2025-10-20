<template>
  <div class="space-y-6">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Products</p>
            <p class="text-2xl font-bold text-gray-900">{{ productStore.products.length }}</p>
          </div>
          <div class="p-3 bg-blue-100 rounded-full">
            <UIcon name="i-heroicons-cube" class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Orders</p>
            <p class="text-2xl font-bold text-gray-900">{{ orderStore.orders.length }}</p>
          </div>
          <div class="p-3 bg-green-100 rounded-full">
            <UIcon name="i-heroicons-shopping-bag" class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Revenue</p>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(totalRevenue) }}</p>
          </div>
          <div class="p-3 bg-purple-100 rounded-full">
            <UIcon name="i-heroicons-currency-dollar" class="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Pending Orders</p>
            <p class="text-2xl font-bold text-gray-900">{{ pendingOrdersCount }}</p>
          </div>
          <div class="p-3 bg-yellow-100 rounded-full">
            <UIcon name="i-heroicons-clock" class="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </UCard>
    </div>

    <!-- Recent Orders -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900">Recent Orders</h3>
        </template>
        <div class="space-y-4">
          <div v-for="order in recentOrders" :key="order.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="p-2 bg-white rounded-lg">
                <UIcon name="i-heroicons-shopping-bag" class="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ order.customerName }}</p>
                <p class="text-sm text-gray-600">{{ order.items.length }} items</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-medium text-gray-900">{{ formatCurrency(order.total) }}</p>
              <UBadge :color="getOrderStatusColor(order.status)" variant="subtle" size="xs">
                {{ order.status }}
              </UBadge>
            </div>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900">Top Products</h3>
        </template>
        <div class="space-y-4">
          <div v-for="product in topProducts" :key="product.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center space-x-3">
              <img :src="product.images[0]" :alt="product.title" class="w-10 h-10 rounded-lg object-cover" />
              <div>
                <p class="font-medium text-gray-900 truncate">{{ product.title }}</p>
                <p class="text-sm text-gray-600">{{ product.stock }} in stock</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-medium text-gray-900">{{ formatCurrency(product.price) }}</p>
              <p class="text-sm text-gray-600">{{ product.rating }} ⭐</p>
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Quick Actions -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-gray-900">Quick Actions</h3>
      </template>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UButton @click="$emit('switchTab', 'products')" variant="outline" class="justify-start" size="lg">
          <UIcon name="i-heroicons-plus-circle" class="w-5 h-5 mr-2" />
          Add New Product
        </UButton>
        <UButton @click="$emit('switchTab', 'orders')" variant="outline" class="justify-start" size="lg">
          <UIcon name="i-heroicons-clipboard-document-list" class="w-5 h-5 mr-2" />
          View All Orders
        </UButton>
        <UButton @click="$emit('switchTab', 'profile')" variant="outline" class="justify-start" size="lg">
          <UIcon name="i-heroicons-cog-6-tooth" class="w-5 h-5 mr-2" />
          Update Store Info
        </UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProductStore } from '~~/stores/products'
import { useOrderStore } from '~~/stores/orders'
// Stores
const productStore = useProductStore()
const orderStore = useOrderStore()

// Computed properties
const totalRevenue = computed((): number => {
  return orderStore.orders
    .filter((order: any) => order.status === 'delivered')
    .reduce((sum: number, order: any) => sum + order.total, 0)
})

const pendingOrdersCount = computed((): number => {
  return orderStore.orders.filter((order: any) => order.status === 'pending').length
})

const recentOrders = computed((): any[] => {
  return orderStore.orders.slice(0, 5)
})

const topProducts = computed((): any[] => {
  return productStore.products
    .sort((a: any, b: any) => b.rating - a.rating)
    .slice(0, 5)
})

// Helper functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(amount)
}

const getOrderStatusColor = (status: string): 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' => {
  const colors: Record<string, 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'> = {
    pending: 'warning',
    processing: 'info',
    shipped: 'primary',
    delivered: 'success',
    cancelled: 'error'
  }
  return colors[status] || 'neutral'
}

// Define emits
defineEmits<{
  switchTab: [tab: string]
}>()
</script>