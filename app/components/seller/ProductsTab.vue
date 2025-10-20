<template>
  <div class="space-y-6">
    <!-- Header with actions -->
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">Product Management</h3>
        <p class="text-sm text-gray-600">Manage your store's product inventory</p>
      </div>
      <UButton @click="navigateToAddProduct" icon="i-heroicons-plus-circle" size="lg">
        Add New Product
      </UButton>
    </div>

    <!-- Search and filters -->
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <UInput v-model="searchQuery" icon="i-heroicons-magnifying-glass" placeholder="Search products..." size="lg" />
      </div>
      <div class="flex gap-2">
        <USelect v-model="selectedCategory" :options="categoryOptions" placeholder="All Categories" size="lg" />
        <USelect v-model="selectedAvailability" :options="availabilityOptions" placeholder="All Status" size="lg" />
      </div>
    </div>

    <!-- Products table -->
    <UCard>
      <div class="overflow-x-auto">
        <UTable :rows="filteredProducts" :columns="(columns as any)">
          <template #image-data="{ row }">
            <img :src="(row as any).images[0]" :alt="(row as any).title" class="w-12 h-12 rounded-lg object-cover" />
          </template>

          <template #price-data="{ row }">
            <div class="font-medium">{{ formatCurrency((row as any).price) }}</div>
            <div v-if="(row as any).discount" class="text-sm text-green-600">{{ (row as any).discount }}% off</div>
          </template>

          <template #stock-data="{ row }">
            <UBadge :color="(row as any).stock > 10 ? 'success' : (row as any).stock > 0 ? 'warning' : 'error'"
              variant="subtle">
              {{ (row as any).stock }} left
            </UBadge>
          </template>

          <template #status-data="{ row }">
            <UBadge :color="(row as any).isAvailable ? 'success' : 'error'" variant="subtle">
              {{ (row as any).isAvailable ? 'Available' : 'Out of Stock' }}
            </UBadge>
          </template>

          <template #actions-data="{ row }">
            <div class="flex items-center gap-2">
              <UTooltip text="Edit Product">
                <UButton @click="editProduct(row)" variant="outline" size="sm" icon="i-heroicons-pencil-square" />
              </UTooltip>
              <UTooltip text="View Details">
                <UButton @click="viewProduct(row)" variant="outline" size="sm" icon="i-heroicons-eye" />
              </UTooltip>
              <UTooltip text="Delete Product">
                <UButton @click="deleteProduct(row)" variant="outline" color="error" size="sm"
                  icon="i-heroicons-trash" />
              </UTooltip>
            </div>
          </template>
        </UTable>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center mt-6">
        <UPagination v-model="currentPage" :page-count="10" :total="totalPages" />
      </div>
    </UCard>

  </div>
</template>

<script setup lang="ts">
// Imports
import { computed, ref } from 'vue'
import { useProductStore } from '~~/stores/products'

// Stores
const productStore = useProductStore()

// Reactive state
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedAvailability = ref('')
const currentPage = ref(1)
const showProductDetailsModal = ref(false)
const showDeleteModal = ref(false)
const selectedProduct = ref<any>(null)
const productToDelete = ref<any>(null)

// Computed properties
const categoryOptions = computed(() => {
  const categories = [...new Set(productStore.products.map((p: any) => p.category))]
  return [{ label: 'All Categories', value: '' }, ...categories.map(cat => ({ label: cat, value: cat }))]
})

const availabilityOptions = computed(() => [
  { label: 'All Status', value: '' },
  { label: 'Available', value: 'available' },
  { label: 'Out of Stock', value: 'out_of_stock' }
])

const filteredProducts = computed((): any[] => {
  let products = productStore.products

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    products = products.filter((product: any) =>
      product.title.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    )
  }

  // Filter by category
  if (selectedCategory.value) {
    products = products.filter((product: any) => product.category === selectedCategory.value)
  }

  // Filter by availability
  if (selectedAvailability.value) {
    if (selectedAvailability.value === 'available') {
      products = products.filter((product: any) => product.isAvailable)
    } else if (selectedAvailability.value === 'out_of_stock') {
      products = products.filter((product: any) => !product.isAvailable)
    }
  }

  return products
})

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / 10)
})

// Table columns
const columns = [
  {
    id: 'image',
    key: 'image',
    label: '',
    sortable: false
  },
  {
    id: 'title',
    key: 'title',
    label: 'Product',
    sortable: true
  },
  {
    id: 'category',
    key: 'category',
    label: 'Category',
    sortable: true
  },
  {
    id: 'brand',
    key: 'brand',
    label: 'Brand',
    sortable: true
  },
  {
    id: 'price',
    key: 'price',
    label: 'Price',
    sortable: true
  },
  {
    id: 'stock',
    key: 'stock',
    label: 'Stock',
    sortable: true
  },
  {
    id: 'status',
    key: 'status',
    label: 'Status',
    sortable: false
  },
  {
    id: 'actions',
    key: 'actions',
    label: 'Actions',
    sortable: false
  }
]

// Helper functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(amount)
}

// Navigation
const navigateToAddProduct = () => {
  navigateTo('/seller/dashboard/product/addProduct')
}

const navigateToEditProduct = (product: any) => {
  navigateTo(`/seller/dashboard/product/${product.id}/edit`)
}

// Product actions
const editProduct = (product: any) => {
  navigateToEditProduct(product)
}

const viewProduct = (product: any) => {
  selectedProduct.value = product
  showProductDetailsModal.value = true
}

const deleteProduct = (product: any) => {
  productToDelete.value = product
  showDeleteModal.value = true
}

const confirmDelete = () => {
  if (productToDelete.value) {
    productStore.deleteProduct(productToDelete.value.id)
    showDeleteModal.value = false
    productToDelete.value = null
  }
}

</script>