<template>
  <div v-if="order" class="space-y-6">
    <!-- Order Header -->
    <div class="flex justify-between items-start">
      <div>
        <h3 class="text-xl font-semibold">{{ order.orderNumber }}</h3>
        <p class="text-gray-600">Placed on {{ formatDate(order.createdAt) }}</p>
      </div>
      <UBadge :color="getStatusColor(order.status)" variant="subtle" size="lg">
        {{ order.status.charAt(0).toUpperCase() + order.status.slice(1) }}
      </UBadge>
    </div>

    <!-- Customer Information -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard>
        <template #header>
          <h4 class="font-semibold">Customer Information</h4>
        </template>
        <div class="space-y-3">
          <div>
            <p class="text-sm text-gray-600">Name</p>
            <p class="font-medium">{{ order.customerName }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Email</p>
            <p class="font-medium">{{ order.customerEmail }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Phone</p>
            <p class="font-medium">{{ order.customerPhone }}</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h4 class="font-semibold">Shipping Address</h4>
        </template>
        <div class="space-y-2">
          <p class="font-medium">{{ order.shippingAddress.street }}</p>
          <p class="text-gray-600">
            {{ order.shippingAddress.city }}, {{ order.shippingAddress.state }} {{ order.shippingAddress.postalCode }}
          </p>
          <p class="text-gray-600">{{ order.shippingAddress.country }}</p>
        </div>
      </UCard>
    </div>

    <!-- Order Items -->
    <UCard>
      <template #header>
        <h4 class="font-semibold">Order Items</h4>
      </template>
      <div class="space-y-4">
        <div v-for="item in order.items" :key="item.id" class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <img
            :src="item.productImage"
            :alt="item.productTitle"
            class="w-16 h-16 rounded-lg object-cover"
          />
          <div class="flex-1">
            <h5 class="font-medium">{{ item.productTitle }}</h5>
            <p class="text-sm text-gray-600">Quantity: {{ item.quantity }}</p>
          </div>
          <div class="text-right">
            <p class="font-medium">{{ formatCurrency(item.price) }}</p>
            <p class="text-sm text-gray-600">Total: {{ formatCurrency(item.total) }}</p>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Payment Information -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard>
        <template #header>
          <h4 class="font-semibold">Payment Information</h4>
        </template>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600">Payment Method:</span>
            <span class="font-medium">{{ order.paymentMethod }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Payment Status:</span>
            <UBadge :color="order.paymentStatus === 'paid' ? 'success' : 'warning'" variant="subtle">
              {{ order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1) }}
            </UBadge>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h4 class="font-semibold">Order Summary</h4>
        </template>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600">Subtotal:</span>
            <span class="font-medium">{{ formatCurrency(order.total) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Shipping:</span>
            <span class="font-medium">Free</span>
          </div>
          <div class="flex justify-between text-lg font-semibold border-t pt-2">
            <span>Total:</span>
            <span>{{ formatCurrency(order.total) }}</span>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Order Notes -->
    <UCard v-if="order.notes">
      <template #header>
        <h4 class="font-semibold">Order Notes</h4>
      </template>
      <p class="text-gray-700">{{ order.notes }}</p>
    </UCard>

    <!-- Status Update -->
    <UCard>
      <template #header>
        <h4 class="font-semibold">Update Order Status</h4>
      </template>
      <div class="flex flex-wrap gap-2">
        <UButton
          v-if="order.status === 'pending'"
          @click="$emit('status-update', order.id, 'processing')"
          variant="outline"
          size="lg"
        >
          Mark as Processing
        </UButton>
        <UButton
          v-if="order.status === 'processing'"
          @click="$emit('status-update', order.id, 'shipped')"
          variant="outline"
          size="lg"
        >
          Mark as Shipped
        </UButton>
        <UButton
          v-if="order.status === 'shipped'"
          @click="$emit('status-update', order.id, 'delivered')"
          variant="outline"
          size="lg"
        >
          Mark as Delivered
        </UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps<{
  order: any
}>()

// Emits
defineEmits<{
  'status-update': [orderId: string, status: string]
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

const getStatusColor = (status: string) => {
  const colors: Record<string, 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'> = {
    pending: 'warning',
    processing: 'info',
    shipped: 'primary',
    delivered: 'success',
    cancelled: 'error'
  }
  return colors[status] || 'neutral'
}
</script>