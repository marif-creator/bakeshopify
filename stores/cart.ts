// Cart item interface
export interface CartItem {
  id: string | number
  name: string
  price: number
  image: string
  quantity: number
  slug?: string
  category?: string
}

// Cart store state interface
export interface CartState {
  items: CartItem[]
  isOpen: boolean
}

// Cart store
export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    isOpen: false,
  }),

  getters: {
    // Get total number of items in cart
    totalItems: (state): number => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },

    // Get total price of all items in cart
    totalPrice: (state): number => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },

    // Check if cart is empty
    isEmpty: (state): boolean => {
      return state.items.length === 0
    },

    // Get item by ID
    getItemById: (state) => (id: string | number): CartItem | undefined => {
      return state.items.find(item => item.id === id)
    },

    // Check if item exists in cart
    hasItem: (state) => (id: string | number): boolean => {
      return state.items.some(item => item.id === id)
    }
  },

  actions: {
    // Add item to cart
    addItem(item: Omit<CartItem, 'quantity'>) {
      const existingItem = this.items.find(cartItem => cartItem.id === item.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.items.push({
          ...item,
          quantity: 1
        })
      }
    },

    // Remove item from cart
    removeItem(id: string | number) {
      const index = this.items.findIndex(item => item.id === id)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    },

    // Update item quantity
    updateQuantity(id: string | number, quantity: number) {
      const item = this.items.find(cartItem => cartItem.id === id)
      if (item) {
        if (quantity <= 0) {
          this.removeItem(id)
        } else {
          item.quantity = quantity
        }
      }
    },

    // Increment item quantity
    incrementQuantity(id: string | number) {
      const item = this.items.find(cartItem => cartItem.id === id)
      if (item) {
        item.quantity += 1
      }
    },

    // Decrement item quantity
    decrementQuantity(id: string | number) {
      const item = this.items.find(cartItem => cartItem.id === id)
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          this.removeItem(id)
        }
      }
    },

    // Clear all items from cart
    clearCart() {
      this.items = []
    },

    // Toggle cart open/closed
    toggleCart() {
      this.isOpen = !this.isOpen
    },

    // Open cart
    openCart() {
      this.isOpen = true
    },

    // Close cart
    closeCart() {
      this.isOpen = false
    }
  }
})