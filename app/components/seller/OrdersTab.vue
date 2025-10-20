<template>
  <div class="space-y-6">
    <!-- Header with stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Pending Orders</p>
            <p class="text-2xl font-bold text-yellow-600">{{ orderStats.pending }}</p>
          </div>
          <UIcon name="i-heroicons-clock" class="w-8 h-8 text-yellow-500" />
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Processing</p>
            <p class="text-2xl font-bold text-blue-600">{{ orderStats.processing }}</p>
          </div>
          <UIcon name="i-heroicons-cog-6-tooth" class="w-8 h-8 text-blue-500" />
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Shipped</p>
            <p class="text-2xl font-bold text-purple-600">{{ orderStats.shipped }}</p>
          </div>
          <UIcon name="i-heroicons-truck" class="w-8 h-8 text-purple-500" />
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Delivered</p>
            <p class="text-2xl font-bold text-green-600">{{ orderStats.delivered }}</p>
          </div>
          <UIcon name="i-heroicons-check-circle" class="w-8 h-8 text-green-500" />
        </div>
      </UCard>
    </div>

    <!-- Filters and search -->
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <UInput
          v-model="searchQuery"
          icon="i-heroicons-magnifying-glass"
          placeholder="Search orders..."
          size="lg"
        />
      </div>
      <USelect
        v-model="statusFilter"
        :options="statusOptions"
        placeholder="All Status"
        size="lg"
      />
      <USelect
        v-model="dateFilter"
        :options="dateOptions"
        placeholder="All Dates"
        size="lg"
      />
    </div>

    <!-- Orders table -->
    <UCard>
      <div class="overflow-x-auto">
        <UTable :rows="filteredOrders" :columns="columns as any">
          <template #customer-data="{ row }">
            <div>
              <p class="font-medium">{{ (row as any).customerName }}</p>
              <p class="text-sm text-gray-600">{{ (row as any).customerEmail }}</p>
            </div>
          </template>

          <template #items-data="{ row }">
            <div class="space-y-1">
              <div v-for="item in (row as any).items.slice(0, 2)" :key="item.id" class="text-sm">
                {{ item.productTitle }} × {{ item.quantity }}
              </div>
              <div v-if="(row as any).items.length > 2" class="text-xs text-gray-500">
                +{{ (row as any).items.length - 2 }} more items
              </div>
            </div>
          </template>

          <template #total-data="{ row }">
            <div class="font-medium">{{ formatCurrency((row as any).total) }}</div>
            <div class="text-sm text-gray-600">{{ (row as any).paymentMethod }}</div>
          </template>

          <template #status-data="{ row }">
            <UBadge :color="getStatusColor((row as any).status)" variant="subtle">
              {{ (row as any).status.charAt(0).toUpperCase() + (row as any).status.slice(1) }}
            </UBadge>
          </template>

          <template #date-data="{ row }">
            <div class="text-sm">
              {{ formatDate((row as any).createdAt) }}
            </div>
          </template>

          <template #actions-data="{ row }">
            <div class="flex items-center gap-2">
              <UTooltip text="View Details">
                <UButton
                  @click="viewOrder(row)"
                  variant="outline"
                  size="sm"
                  icon="i-heroicons-eye"
                />
              </UTooltip>
              <UTooltip v-if="(row as any).status === 'pending'" text="Mark as Processing">
                <UButton
                  @click="updateOrderStatus(row, 'processing')"
                  variant="outline"
                  size="sm"
                  icon="i-heroicons-arrow-right"
                />
              </UTooltip>
              <UTooltip v-if="(row as any).status === 'processing'" text="Mark as Shipped">
                <UButton
                  @click="updateOrderStatus(row, 'shipped')"
                  variant="outline"
                  size="sm"
                  icon="i-heroicons-truck"
                />
              </UTooltip>
              <UTooltip v-if="(row as any).status === 'shipped'" text="Mark as Delivered">
                <UButton
                  @click="updateOrderStatus(row, 'delivered')"
                  variant="outline"
                  size="sm"
                  icon="i-heroicons-check-circle"
                />
              </UTooltip>
            </div>
          </template>
        </UTable>
      </div>
    </UCard>

    <!-- Order Details Modal -->
    <UModal v-model="showOrderModal" title="Order Details">
      <OrderDetails v-if="selectedOrder" :order="selectedOrder" @status-update="handleStatusUpdate" />
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useOrderStore } from '~~/stores/orders'
// Stores
const orderStore = useOrderStore()

// Reactive state
const searchQuery = ref('')
const statusFilter = ref('')
const dateFilter = ref('')
const showOrderModal = ref(false)
const selectedOrder = ref<any>(null)

// Computed properties
const orderStats = computed(() => orderStore.getOrderStats)

const statusOptions = computed(() => [
  { label: 'All Status', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'Processing', value: 'processing' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' }
])

const dateOptions = computed(() => [
  { label: 'All Dates', value: '' },
  { label: 'Today', value: 'today' },
  { label: 'Last 7 days', value: 'week' },
  { label: 'Last 30 days', value: 'month' }
])

const filteredOrders = computed(() => {
  let orders = orderStore.orders

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    orders = orders.filter((order: any) =>
      order.customerName.toLowerCase().includes(query) ||
      order.customerEmail.toLowerCase().includes(query) ||
      order.orderNumber.toLowerCase().includes(query)
    )
  }

  // Filter by status
  if (statusFilter.value) {
    orders = orders.filter((order: any) => order.status === statusFilter.value)
  }

  // Filter by date
  if (dateFilter.value) {
    const now = new Date()
    let startDate: Date

    switch (dateFilter.value) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        break
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case 'month':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      default:
        startDate = new Date(0)
    }

    orders = orders.filter((order: any) => new Date(order.createdAt) >= startDate)
  }

  return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
})

// Table columns
const columns = [
  { id: 'orderNumber', key: 'orderNumber', label: 'Order #' },
  { id: 'customer', key: 'customer', label: 'Customer' },
  { id: 'items', key: 'items', label: 'Items' },
  { id: 'total', key: 'total', label: 'Total' },
  { id: 'status', key: 'status', label: 'Status' },
  { id: 'date', key: 'date', label: 'Date' },
  { id: 'actions', key: 'actions', label: 'Actions' }
]

// Helper functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(amount)
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    month: 'short',
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

// Order actions
const viewOrder = (order: any) => {
  selectedOrder.value = order
  showOrderModal.value = true
}

const updateOrderStatus = async (order: any, newStatus: string) => {
  await orderStore.updateOrderStatus(order.id, newStatus as any)
}

const handleStatusUpdate = (orderId: string, newStatus: string) => {
  orderStore.updateOrderStatus(orderId, newStatus as any)
}
</script>