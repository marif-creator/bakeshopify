// Product option interface
export interface ProductOption {
  type: string
  value: string
  required?: boolean
  price?: number
  stock?: number
  sku?: string
}

// Product interface definitions
export interface Product {
  id: string
  title: string
  slug: string
  storeSlug: string
  price: number
  originalPrice?: number
  discount?: number
  description: string
  images: string[]
  category: string
  brand: string
  stock: number
  weight: string
  rating: number
  reviewCount: number
  isAvailable: boolean
  isOfficialStore: boolean
  features: string[]
  specifications: Record<string, string>
  tags: string[]
  options?: ProductOption[]
  createdAt: string
  updatedAt: string
}

// Product store state interface
export interface ProductState {
  products: Product[]
  currentProduct: Product | null
  loading: boolean
  error: string | null
  categories: string[]
}

// Sample product data for demonstration
const sampleProducts: Product[] = [
  {
    id: 'prod_samsung_galaxy_z_fold6',
    title: 'Samsung Galaxy Z Fold6',
    slug: 'samsung-galaxy-z-fold6',
    storeSlug: 'samsung-official-store',
    price: 19999000,
    originalPrice: 24999000,
    discount: 25,
    description: 'Latest foldable smartphone with advanced AI features and premium design.',
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500'
    ],
    category: 'Electronics',
    brand: 'Samsung',
    stock: 15,
    weight: '263g',
    rating: 4.8,
    reviewCount: 2847,
    isAvailable: true,
    isOfficialStore: true,
    features: ['Note Assist', 'Photo Assist', 'Smart Select', 'Multi Window'],
    specifications: {
      'Display': '7.6-inch Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 3',
      'RAM': '12GB',
      'Storage': '256GB',
      'Camera': '50MP + 12MP + 10MP',
      'Battery': '4400mAh'
    },
    options: [
      { type: 'memory', value: '256GB', required: true },
      { type: 'memory', value: '512GB', required: true, price: 2000000 },
      { type: 'memory', value: '1TB', required: true, price: 4000000 },
      { type: 'color', value: 'Phantom Black', required: false },
      { type: 'color', value: 'Cream', required: false },
      { type: 'color', value: 'Phantom Silver', required: false }
    ],
    tags: ['smartphone', 'foldable', 'flagship', '5g'],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-10-18T00:00:00Z'
  },
  {
    id: 'prod_apple_iphone_15_pro',
    title: 'Apple iPhone 15 Pro',
    slug: 'apple-iphone-15-pro',
    storeSlug: 'apple-official-store',
    price: 18999000,
    originalPrice: 19999000,
    discount: 5,
    description: 'Premium iPhone with titanium design and advanced camera system.',
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500',
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500'
    ],
    category: 'Electronics',
    brand: 'Apple',
    stock: 8,
    weight: '187g',
    rating: 4.9,
    reviewCount: 4521,
    isAvailable: true,
    isOfficialStore: true,
    features: ['A17 Pro Chip', 'Pro Camera System', 'Action Button', 'Titanium Design'],
    specifications: {
      'Display': '6.1-inch Super Retina XDR',
      'Processor': 'A17 Pro',
      'RAM': '8GB',
      'Storage': '128GB',
      'Camera': '48MP + 12MP + 12MP',
      'Battery': '3274mAh'
    },
    options: [
      { type: 'memory', value: '128GB', required: true },
      { type: 'memory', value: '256GB', required: true, price: 1500000 },
      { type: 'memory', value: '512GB', required: true, price: 3000000 },
      { type: 'color', value: 'Natural Titanium', required: false },
      { type: 'color', value: 'Blue Titanium', required: false },
      { type: 'color', value: 'White Titanium', required: false },
      { type: 'color', value: 'Black Titanium', required: false }
    ],
    tags: ['smartphone', 'premium', 'ios', '5g'],
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-10-18T00:00:00Z'
  },
  {
    id: 'prod_dried_aonori_seaweed',
    title: 'Dried Aonori Seaweed',
    slug: 'dried-aonori-seaweed',
    storeSlug: 'healthy-food-store',
    price: 45000,
    description: 'Premium dried aonori seaweed flakes, perfect for seasoning and garnishing.',
    images: [
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      'https://images.pexels.com/photos/128402/pexels-photo-128402.jpeg',
      'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg'
    ],
    category: 'Food & Beverages',
    brand: 'Ocean Fresh',
    stock: 48,
    weight: '100g',
    rating: 4.6,
    reviewCount: 892,
    isAvailable: true,
    isOfficialStore: false,
    features: ['100% Natural', 'No Preservatives', 'Rich in Minerals', 'Premium Quality'],
    specifications: {
      'Origin': 'Japan',
      'Ingredients': '100% Aonori Seaweed',
      'Shelf Life': '12 months',
      'Storage': 'Cool, dry place'
    },
    options: [
      { type: 'weight', value: '100g', required: false },
      { type: 'weight', value: '200g', required: false },
      { type: 'weight', value: '500g', required: false, price: 15000 }
    ],
    tags: ['seaweed', 'healthy', 'natural', 'japanese'],
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-10-18T00:00:00Z'
  },
  {
    id: 'prod_wireless_earbuds',
    title: 'Premium Wireless Earbuds',
    slug: 'premium-wireless-earbuds',
    storeSlug: 'tech-accessories',
    price: 1299000,
    originalPrice: 1599000,
    discount: 19,
    description: 'High-quality wireless earbuds with active noise cancellation and premium sound.',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500',
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500'
    ],
    category: 'Electronics',
    brand: 'SoundMax',
    stock: 23,
    weight: '50g',
    rating: 4.4,
    reviewCount: 1456,
    isAvailable: true,
    isOfficialStore: false,
    features: ['Active Noise Cancellation', '30h Battery Life', 'IPX7 Waterproof', 'Premium Sound'],
    specifications: {
      'Driver': '10mm Dynamic',
      'Battery': '400mAh (Case)',
      'Charging': 'USB-C, Wireless',
      'Connectivity': 'Bluetooth 5.2'
    },
    options: [
      { type: 'color', value: 'Black', required: false },
      { type: 'color', value: 'White', required: false },
      { type: 'color', value: 'Blue', required: false },
      { type: 'color', value: 'Pink', required: false }
    ],
    tags: ['wireless', 'earbuds', 'audio', 'bluetooth'],
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-10-18T00:00:00Z'
  },
  {
    id: 'prod_organic_coffee_beans',
    title: 'Organic Coffee Beans',
    slug: 'organic-coffee-beans',
    storeSlug: 'coffee-corner',
    price: 125000,
    description: 'Single-origin organic coffee beans from sustainable farms.',
    images: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500',
      'https://images.unsplash.com/photo-1587734195503-904fca47e0df?w=500',
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500'
    ],
    category: 'Food & Beverages',
    brand: 'BrewMasters',
    stock: 32,
    weight: '500g',
    rating: 4.7,
    reviewCount: 2156,
    isAvailable: true,
    isOfficialStore: false,
    features: ['Organic Certified', 'Single Origin', 'Fair Trade', 'Freshly Roasted'],
    specifications: {
      'Origin': 'Ethiopia',
      'Roast Level': 'Medium',
      'Processing': 'Washed',
      'Altitude': '1800-2000m'
    },
    tags: ['coffee', 'organic', 'fair-trade', 'beans'],
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-10-18T00:00:00Z'
  }
]

// Product store
export const useProductStore = defineStore('products', {
  state: (): ProductState => ({
    products: sampleProducts,
    currentProduct: null,
    loading: false,
    error: null,
    categories: ['Electronics', 'Food & Beverages', 'Fashion', 'Home & Living']
  }),

  getters: {
    // Get all products
    getAllProducts: (state) => state.products,

    // Get products by category
    getProductsByCategory: (state) => (category: string) => {
      return state.products.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
      )
    },

    // Get products by store
    getProductsByStore: (state) => (storeSlug: string) => {
      return state.products.filter(product =>
        product.storeSlug === storeSlug
      )
    },

    // Get featured products (products with discount or high rating)
    getFeaturedProducts: (state) => {
      return state.products.filter(product =>
        (product.discount && product.discount > 0) || product.rating >= 4.5
      )
    },

    // Get available products only
    getAvailableProducts: (state) => {
      return state.products.filter(product => product.isAvailable)
    },

    // Get product by ID
    getProductById: (state) => (id: string) => {
      return state.products.find(product => product.id === id) || null
    },

    // Get product by slug (main requirement)
    getProductBySlug: (state) => (slug: string) => {
      return state.products.find(product =>
        product.slug === slug ||
        product.slug === slug.replace(/-/g, '_')
      ) || null
    },

    // Get product by slug and store slug combination
    getProductBySlugAndStore: (state) => (productSlug: string, storeSlug: string) => {
      return state.products.find(product =>
        product.slug === productSlug &&
        product.storeSlug === storeSlug
      ) || null
    },

    // Get related products (same category, different product)
    getRelatedProducts: (state) => (currentProductId: string, limit: number = 4) => {
      const currentProduct = state.products.find(p => p.id === currentProductId)
      if (!currentProduct) return []

      return state.products
        .filter(product =>
          product.id !== currentProductId &&
          product.category === currentProduct.category
        )
        .slice(0, limit)
    },

    // Search products
    searchProducts: (state) => (query: string) => {
      const searchTerm = query.toLowerCase()
      return state.products.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    },

    // Get unique brands
    getAllBrands: (state) => {
      const brands = state.products.map(product => product.brand)
      return [...new Set(brands)]
    },

    // Get unique categories
    getAllCategories: (state) => {
      const categories = state.products.map(product => product.category)
      return [...new Set(categories)]
    },

    // Check if product exists
    productExists: (state) => (slug: string) => {
      return state.products.some(product => product.slug === slug)
    },

    // Get product options by type
    getProductOptionsByType: (state) => (productId: string, optionType: string) => {
      const product = state.products.find(p => p.id === productId)
      if (!product || !product.options) return []
      return product.options.filter(option => option.type === optionType)
    },

    // Get required options for a product
    getRequiredOptions: (state) => (productId: string) => {
      const product = state.products.find(p => p.id === productId)
      if (!product || !product.options) return []
      return product.options.filter(option => option.required === true)
    },

    // Get available options for a product (non-required)
    getOptionalOptions: (state) => (productId: string) => {
      const product = state.products.find(p => p.id === productId)
      if (!product || !product.options) return []
      return product.options.filter(option => option.required !== true)
    }
  },

  actions: {
    // Fetch all products (dummy implementation)
    async fetchProducts() {
      this.loading = true
      this.error = null

      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800))

        // In a real app, this would be an API call
        // this.products = await $fetch('/api/products')

        this.loading = false
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch products'
        this.loading = false
      }
    },

    // Fetch product by slug (main requirement)
    async fetchProductBySlug(slug: string) {
      this.loading = true
      this.error = null

      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))

        const product = this.getProductBySlug(slug)

        if (product) {
          this.currentProduct = product
          this.loading = false
          return product
        } else {
          throw new Error('Product not found')
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch product'
        this.loading = false
        return null
      }
    },

    // Fetch product by slug and store combination
    async fetchProductBySlugAndStore(productSlug: string, storeSlug: string) {
      this.loading = true
      this.error = null

      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 600))

        const product = this.getProductBySlugAndStore(productSlug, storeSlug)

        if (product) {
          this.currentProduct = product
          this.loading = false
          return product
        } else {
          throw new Error('Product not found in this store')
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch product'
        this.loading = false
        return null
      }
    },

    // Set current product manually
    setCurrentProduct(product: Product) {
      this.currentProduct = product
    },

    // Clear current product
    clearCurrentProduct() {
      this.currentProduct = null
    },

    // Add new product (for admin functionality)
    addProduct(product: Product) {
      this.products.push(product)
    },

    // Update existing product
    updateProduct(id: string, updates: any) {
      const index = this.products.findIndex(product => product.id === id)
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...updates }
      }
    },

    // Delete product
    deleteProduct(id: string) {
      const index = this.products.findIndex(product => product.id === id)
      if (index !== -1) {
        this.products.splice(index, 1)
      }
    },

    // Clear error
    clearError() {
      this.error = null
    }
  }
})