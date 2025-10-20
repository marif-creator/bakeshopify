// Order interfaces
export interface OrderItem {
  id: string
  productId: string
  productTitle: string
  productImage: string
  quantity: number
  price: number
  total: number
}

export interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  paymentMethod: string
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  createdAt: string
  updatedAt: string
  notes?: string
}

// Order store state interface
export interface OrderState {
  orders: Order[]
  currentOrder: Order | null
  loading: boolean
  error: string | null
}

// Sample order data
const sampleOrders: Order[] = [
  {
    id: 'order_001',
    orderNumber: 'ORD-20241001-001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+1234567890',
    items: [
      {
        id: 'item_001',
        productId: 'prod_samsung_galaxy_z_fold6',
        productTitle: 'Samsung Galaxy Z Fold6',
        productImage: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500',
        quantity: 1,
        price: 19999000,
        total: 19999000
      }
    ],
    total: 19999000,
    status: 'pending',
    shippingAddress: {
      street: '123 Main St',
      city: 'Jakarta',
      state: 'DKI Jakarta',
      postalCode: '10110',
      country: 'Indonesia'
    },
    paymentMethod: 'Credit Card',
    paymentStatus: 'paid',
    createdAt: '2024-10-18T10:30:00Z',
    updatedAt: '2024-10-18T10:30:00Z',
    notes: 'Please handle with care'
  },
  {
    id: 'order_002',
    orderNumber: 'ORD-20241001-002',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '+1234567891',
    items: [
      {
        id: 'item_002',
        productId: 'prod_apple_iphone_15_pro',
        productTitle: 'Apple iPhone 15 Pro',
        productImage: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
        quantity: 1,
        price: 18999000,
        total: 18999000
      }
    ],
    total: 18999000,
    status: 'processing',
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Bandung',
      state: 'West Java',
      postalCode: '40115',
      country: 'Indonesia'
    },
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'paid',
    createdAt: '2024-10-17T14:20:00Z',
    updatedAt: '2024-10-18T09:15:00Z'
  },
  {
    id: 'order_003',
    orderNumber: 'ORD-20241001-003',
    customerName: 'Bob Johnson',
    customerEmail: 'bob@example.com',
    customerPhone: '+1234567892',
    items: [
      {
        id: 'item_003',
        productId: 'prod_dried_aonori_seaweed',
        productTitle: 'Dried Aonori Seaweed',
        productImage: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
        quantity: 2,
        price: 45000,
        total: 90000
      }
    ],
    total: 90000,
    status: 'shipped',
    shippingAddress: {
      street: '789 Pine St',
      city: 'Surabaya',
      state: 'East Java',
      postalCode: '60241',
      country: 'Indonesia'
    },
    paymentMethod: 'E-Wallet',
    paymentStatus: 'paid',
    createdAt: '2024-10-16T16:45:00Z',
    updatedAt: '2024-10-18T08:00:00Z'
  },
  {
    id: 'order_004',
    orderNumber: 'ORD-20241001-004',
    customerName: 'Alice Brown',
    customerEmail: 'alice@example.com',
    customerPhone: '+1234567893',
    items: [
      {
        id: 'item_004',
        productId: 'prod_wireless_earbuds',
        productTitle: 'Premium Wireless Earbuds',
        productImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
        quantity: 1,
        price: 1299000,
        total: 1299000
      }
    ],
    total: 1299000,
    status: 'delivered',
    shippingAddress: {
      street: '321 Elm St',
      city: 'Medan',
      state: 'North Sumatra',
      postalCode: '20111',
      country: 'Indonesia'
    },
    paymentMethod: 'Credit Card',
    paymentStatus: 'paid',
    createdAt: '2024-10-15T11:10:00Z',
    updatedAt: '2024-10-17T13:30:00Z'
  },
  {
    id: 'order_005',
    orderNumber: 'ORD-20241001-005',
    customerName: 'Charlie Wilson',
    customerEmail: 'charlie@example.com',
    customerPhone: '+1234567894',
    items: [
      {
        id: 'item_005',
        productId: 'prod_organic_coffee_beans',
        productTitle: 'Organic Coffee Beans',
        productImage: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500',
        quantity: 1,
        price: 125000,
        total: 125000
      }
    ],
    total: 125000,
    status: 'cancelled',
    shippingAddress: {
      street: '654 Cedar St',
      city: 'Yogyakarta',
      state: 'DI Yogyakarta',
      postalCode: '55281',
      country: 'Indonesia'
    },
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'refunded',
    createdAt: '2024-10-14T09:25:00Z',
    updatedAt: '2024-10-16T15:45:00Z',
    notes: 'Customer requested cancellation'
  }
]

// Order store
export const useOrderStore = defineStore('orders', {
  state: (): OrderState => ({
    orders: sampleOrders,
    currentOrder: null,
    loading: false,
    error: null
  }),

  getters: {
    // Get all orders
    getAllOrders: (state) => state.orders,

    // Get orders by status
    getOrdersByStatus: (state) => (status: Order['status']) => {
      return state.orders.filter(order => order.status === status)
    },

    // Get pending orders
    getPendingOrders: (state) => {
      return state.orders.filter(order => order.status === 'pending')
    },

    // Get recent orders
    getRecentOrders: (state) => (limit: number = 10) => {
      return state.orders
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, limit)
    },

    // Get order by ID
    getOrderById: (state) => (id: string) => {
      return state.orders.find(order => order.id === id) || null
    },

    // Get total revenue
    getTotalRevenue: (state) => {
      return state.orders
        .filter(order => order.status === 'delivered')
        .reduce((sum, order) => sum + order.total, 0)
    },

    // Get order statistics
    getOrderStats: (state) => {
      const stats = {
        total: state.orders.length,
        pending: state.orders.filter(o => o.status === 'pending').length,
        processing: state.orders.filter(o => o.status === 'processing').length,
        shipped: state.orders.filter(o => o.status === 'shipped').length,
        delivered: state.orders.filter(o => o.status === 'delivered').length,
        cancelled: state.orders.filter(o => o.status === 'cancelled').length
      }
      return stats
    }
  },

  actions: {
    // Fetch all orders
    async fetchOrders() {
      this.loading = true
      this.error = null

      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800))

        // In a real app, this would be an API call
        // this.orders = await $fetch('/api/seller/orders')

        this.loading = false
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch orders'
        this.loading = false
      }
    },

    // Fetch order by ID
    async fetchOrderById(id: string) {
      this.loading = true
      this.error = null

      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))

        const order = this.getOrderById(id)

        if (order) {
          this.currentOrder = order
          this.loading = false
          return order
        } else {
          throw new Error('Order not found')
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch order'
        this.loading = false
        return null
      }
    },

    // Update order status
    async updateOrderStatus(orderId: string, status: Order['status']) {
      this.loading = true
      this.error = null

      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))

        const orderIndex = this.orders.findIndex(order => order.id === orderId)
        if (orderIndex !== -1) {
          this.orders[orderIndex].status = status
          this.orders[orderIndex].updatedAt = new Date().toISOString()

          // Update current order if it's the same
          if (this.currentOrder && this.currentOrder.id === orderId) {
            this.currentOrder.status = status
            this.currentOrder.updatedAt = new Date().toISOString()
          }

          this.loading = false
          return this.orders[orderIndex]
        } else {
          throw new Error('Order not found')
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to update order status'
        this.loading = false
        return null
      }
    },

    // Set current order
    setCurrentOrder(order: Order) {
      this.currentOrder = order
    },

    // Clear current order
    clearCurrentOrder() {
      this.currentOrder = null
    },

    // Clear error
    clearError() {
      this.error = null
    }
  }
})