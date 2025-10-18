// Cart item interface
export interface CartItem {
  id: string | number
  name: string
  price: number
  image: string
  quantity: number
  slug?: string
  storeSlug?: string
  category?: string
  selectedOptions?: Record<string, string>
  basePrice?: number
  optionsPrice?: number
  uniqueId?: string // Unique identifier including options for separate cart items
}

// Cart store state interface
export interface CartState {
  items: CartItem[]
  isOpen: boolean
}

// Utility function to generate unique cart item ID including options
export const generateCartItemId = (productId: string | number, selectedOptions?: Record<string, string>): string => {
  const baseId = String(productId)
  if (!selectedOptions || Object.keys(selectedOptions).length === 0) {
    return baseId
  }

  // Sort options for consistent ID generation
  const sortedOptions = Object.keys(selectedOptions)
    .sort()
    .map(key => `${key}:${selectedOptions[key]}`)
    .join('|')

  // Combine base ID with options string
  const uniqueId = `${baseId}_${sortedOptions}`

  return uniqueId
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

    // Get item by unique ID (including options)
    getItemByUniqueId: (state) => (uniqueId: string): CartItem | undefined => {
      return state.items.find(item => item.uniqueId === uniqueId)
    },

    // Get item by product ID (for finding any variant of a product)
    getItemById: (state) => (id: string | number): CartItem | undefined => {
      return state.items.find(item => item.id === id)
    },

    // Check if item exists in cart (by unique ID)
    hasItem: (state) => (uniqueId: string): boolean => {
      return state.items.some(item => item.uniqueId === uniqueId)
    },

    // Check if product exists in cart (any variant)
    hasProduct: (state) => (id: string | number): boolean => {
      return state.items.some(item => item.id === id)
    }
  },

  actions: {
    // Add item to cart
    addItem(item: Omit<CartItem, 'quantity' | 'uniqueId'>) {
      // Generate unique ID including options for separate cart items
      const uniqueId = generateCartItemId(item.id, item.selectedOptions)

      console.log('Adding item with uniqueId:', uniqueId)

      // Check for existing item with same product ID AND same options
      const existingItem = this.items.find(cartItem =>
        cartItem.uniqueId === uniqueId
      )

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.items.push({
          ...item,
          quantity: 1,
          uniqueId
        })
      }
    },

    // Remove item from cart (by unique ID or product ID)
    removeItem(idOrUniqueId: string | number) {
      // If it's a number or doesn't contain underscore, treat as product ID
      if (typeof idOrUniqueId === 'number' || !String(idOrUniqueId).includes('_')) {
        this.removeItemByProductId(idOrUniqueId)
      } else {
        // Treat as unique ID
        const index = this.items.findIndex(item => item.uniqueId === idOrUniqueId)
        if (index > -1) {
          this.items.splice(index, 1)
        }
      }
    },

    // Remove item from cart (by product ID - removes all variants)
    removeItemByProductId(id: string | number) {
      const indices = this.items
        .map((item, index) => item.id === id ? index : -1)
        .filter(index => index !== -1)
        .reverse() // Remove from end to avoid index shifting

      indices.forEach(index => {
        this.items.splice(index, 1)
      })
    },

    // Update item quantity (by unique ID or product ID)
    updateQuantity(idOrUniqueId: string | number, quantity: number) {
      // If it's a number or doesn't contain underscore, treat as product ID
      if (typeof idOrUniqueId === 'number' || !String(idOrUniqueId).includes('_')) {
        this.updateQuantityByProductId(idOrUniqueId, quantity)
      } else {
        // Treat as unique ID
        const item = this.items.find(cartItem => cartItem.uniqueId === idOrUniqueId)
        if (item) {
          if (quantity <= 0) {
            this.removeItem(idOrUniqueId)
          } else {
            item.quantity = quantity
          }
        }
      }
    },

    // Increment item quantity (by unique ID or product ID)
    incrementQuantity(idOrUniqueId: string | number) {
      // If it's a number or doesn't contain underscore, treat as product ID
      if (typeof idOrUniqueId === 'number' || !String(idOrUniqueId).includes('_')) {
        this.incrementQuantityByProductId(idOrUniqueId)
      } else {
        // Treat as unique ID
        const item = this.items.find(cartItem => cartItem.uniqueId === idOrUniqueId)
        if (item) {
          item.quantity += 1
        }
      }
    },

    // Decrement item quantity (by unique ID or product ID)
    decrementQuantity(idOrUniqueId: string | number) {
      // If it's a number or doesn't contain underscore, treat as product ID
      if (typeof idOrUniqueId === 'number' || !String(idOrUniqueId).includes('_')) {
        this.decrementQuantityByProductId(idOrUniqueId)
      } else {
        // Treat as unique ID
        const item = this.items.find(cartItem => cartItem.uniqueId === idOrUniqueId)
        if (item) {
          if (item.quantity > 1) {
            item.quantity -= 1
          } else {
            this.removeItem(idOrUniqueId)
          }
        }
      }
    },

    // Update item quantity (by product ID - for backward compatibility)
    updateQuantityByProductId(id: string | number, quantity: number) {
      const items = this.items.filter(cartItem => cartItem.id === id)
      if (items.length > 0) {
        if (quantity <= 0) {
          this.removeItemByProductId(id)
        } else {
          // Update all variants of this product
          items.forEach(item => {
            item.quantity = quantity
          })
        }
      }
    },

    // Increment item quantity (by product ID - for backward compatibility)
    incrementQuantityByProductId(id: string | number) {
      const items = this.items.filter(cartItem => cartItem.id === id)
      items.forEach(item => {
        item.quantity += 1
      })
    },

    // Decrement item quantity (by product ID - for backward compatibility)
    decrementQuantityByProductId(id: string | number) {
      const items = this.items.filter(cartItem => cartItem.id === id)
      items.forEach(item => {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          this.removeItem(item.uniqueId!)
        }
      })
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