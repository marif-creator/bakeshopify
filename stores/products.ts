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
    id: 'prod_fresh_baguettes',
    title: 'Fresh Baguettes',
    slug: 'fresh-baguettes',
    storeSlug: 'bakes-food',
    price: 45000,
    originalPrice: 55000,
    discount: 18,
    description: 'Classic French baguettes baked fresh daily with crispy crust and soft airy interior.',
    images: [
      'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=500',
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500'
    ],
    category: 'Bakery',
    brand: 'Bakes Food',
    stock: 35,
    weight: '250g each',
    rating: 4.6,
    reviewCount: 756,
    isAvailable: true,
    isOfficialStore: true,
    features: ['Fresh Daily', 'Traditional Recipe', 'Crispy Crust', 'Artisan Quality'],
    specifications: {
      'Ingredients': 'Flour, Water, Yeast, Salt',
      'Length': '60-65cm',
      'Weight': '250g',
      'Shelf Life': '1 day'
    },
    options: [
      { type: 'quantity', value: '1 piece', required: false },
      { type: 'quantity', value: '3 pieces', required: false, price: 100000 },
      { type: 'quantity', value: '6 pieces', required: false, price: 240000 },
      { type: 'type', value: 'Classic', required: false },
      { type: 'type', value: 'Seeded', required: false, price: 5000 }
    ],
    tags: ['baguette', 'french', 'bread', 'fresh'],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-10-18T00:00:00Z'
  },
  {
    id: 'prod_artisan_pastries',
    title: 'Artisan Pastries Box',
    slug: 'artisan-pastries-box',
    storeSlug: 'bakes-food',
    price: 125000,
    originalPrice: 150000,
    discount: 17,
    description: 'Assorted collection of handcrafted artisan pastries including croissants, danishes, and muffins baked fresh daily.',
    images: [
      'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=500',
      'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500',
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500'
    ],
    category: 'Bakery',
    brand: 'Bakes Food',
    stock: 22,
    weight: '1.2kg (12 pieces)',
    rating: 4.8,
    reviewCount: 634,
    isAvailable: true,
    isOfficialStore: true,
    features: ['Fresh Daily', 'Handcrafted', 'Premium Ingredients', 'Variety Pack'],
    specifications: {
      'Contents': 'Mixed croissants, danishes, muffins',
      'Pieces': '12 assorted pastries',
      'Allergens': 'Contains gluten, dairy, eggs',
      'Shelf Life': '1 day'
    },
    options: [
      { type: 'size', value: 'Small (8 pieces)', required: false },
      { type: 'size', value: 'Medium (12 pieces)', required: false },
      { type: 'size', value: 'Large (16 pieces)', required: false, price: 50000 },
      { type: 'type', value: 'Mixed Assortment', required: false },
      { type: 'type', value: 'Sweet Only', required: false, price: 10000 },
      { type: 'type', value: 'Savory Only', required: false, price: 10000 }
    ],
    tags: ['pastries', 'assorted', 'fresh', 'artisan'],
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-10-18T00:00:00Z'
  },
  {
    id: 'prod_artisan_sourdough_bread',
    title: 'Artisan Sourdough Bread',
    slug: 'artisan-sourdough-bread',
    storeSlug: 'bakes-food',
    price: 65000,
    originalPrice: 75000,
    discount: 13,
    description: 'Handcrafted sourdough bread made with traditional fermentation methods, crispy crust and soft airy interior.',
    images: [
      'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=500',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500',
      'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=500'
    ],
    category: 'Bakery',
    brand: 'Bakes Food',
    stock: 25,
    weight: '800g',
    rating: 4.8,
    reviewCount: 1247,
    isAvailable: true,
    isOfficialStore: true,
    features: ['Long Fermentation', 'No Preservatives', 'Handcrafted', 'Traditional Recipe'],
    specifications: {
      'Ingredients': 'Flour, Water, Salt, Natural Starter',
      'Fermentation': '24 hours',
      'Shelf Life': '3 days',
      'Storage': 'Room temperature'
    },
    options: [
      { type: 'size', value: 'Regular', required: false },
      { type: 'size', value: 'Large', required: false, price: 15000 },
      { type: 'variant', value: 'Classic', required: false },
      { type: 'variant', value: 'Seeded', required: false, price: 5000 }
    ],
    tags: ['bread', 'sourdough', 'artisan', 'fresh'],
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-10-18T00:00:00Z'
  },
  {
    id: 'prod_custom_birthday_cake',
    title: 'Custom Birthday Cake',
    slug: 'custom-birthday-cake',
    storeSlug: 'bakes-food',
    price: 350000,
    originalPrice: 400000,
    discount: 12,
    description: 'Personalized birthday cake with custom design, message, and flavor. Perfect for celebrations.',
    images: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500',
      'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500',
      'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=500'
    ],
    category: 'Bakery',
    brand: 'Bakes Food',
    stock: 12,
    weight: '2kg',
    rating: 4.7,
    reviewCount: 567,
    isAvailable: true,
    isOfficialStore: true,
    features: ['Custom Design', 'Multiple Flavors', 'Fresh Ingredients', 'Personalized Message'],
    specifications: {
      'Base Flavors': 'Vanilla, Chocolate, Red Velvet',
      'Frosting': 'Buttercream, Cream Cheese, Chocolate Ganache',
      'Servings': '10-12 people',
      'Preparation Time': '2 days advance notice'
    },
    options: [
      { type: 'size', value: '1.5kg (8-10 people)', required: false },
      { type: 'size', value: '2kg (10-12 people)', required: false },
      { type: 'size', value: '3kg (15-18 people)', required: false, price: 150000 },
      { type: 'flavor', value: 'Vanilla', required: false },
      { type: 'flavor', value: 'Chocolate', required: false },
      { type: 'flavor', value: 'Red Velvet', required: false, price: 25000 },
      { type: 'flavor', value: 'Strawberry', required: false, price: 25000 }
    ],
    tags: ['cake', 'birthday', 'custom', 'celebration'],
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-10-18T00:00:00Z'
  },
  {
    id: 'prod_chocolate_croissants',
    title: 'Chocolate Croissants',
    slug: 'chocolate-croissants',
    storeSlug: 'bakes-food',
    price: 85000,
    originalPrice: 100000,
    discount: 15,
    description: 'Buttery, flaky croissants filled with premium dark chocolate, baked fresh daily.',
    images: [
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500',
      'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=500',
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500'
    ],
    category: 'Bakery',
    brand: 'Bakes Food',
    stock: 18,
    weight: '200g (2 pieces)',
    rating: 4.9,
    reviewCount: 892,
    isAvailable: true,
    isOfficialStore: true,
    features: ['Fresh Daily', 'Premium Chocolate', 'Buttery Layers', 'Handcrafted'],
    specifications: {
      'Ingredients': 'Flour, Butter, Dark Chocolate, Yeast, Milk',
      'Allergens': 'Contains gluten, dairy',
      'Shelf Life': '1 day',
      'Storage': 'Room temperature'
    },
    options: [
      { type: 'quantity', value: '2 pieces', required: false },
      { type: 'quantity', value: '4 pieces', required: false, price: 70000 },
      { type: 'quantity', value: '6 pieces', required: false, price: 140000 },
      { type: 'filling', value: 'Dark Chocolate', required: false },
      { type: 'filling', value: 'Milk Chocolate', required: false, price: 5000 }
    ],
    tags: ['croissants', 'chocolate', 'pastry', 'fresh'],
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-10-18T00:00:00Z'
  },
  {
    id: 'prod_red_velvet_cupcakes',
    title: 'Red Velvet Cupcakes',
    slug: 'red-velvet-cupcakes',
    storeSlug: 'bakes-food',
    price: 95000,
    originalPrice: 110000,
    discount: 14,
    description: 'Moist red velvet cupcakes topped with cream cheese frosting and chocolate shavings.',
    images: [
      'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=500',
      'https://images.unsplash.com/photo-1519869325930-281384150729?w=500',
      'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=500'
    ],
    category: 'Bakery',
    brand: 'Bakes Food',
    stock: 30,
    weight: '60g each',
    rating: 4.7,
    reviewCount: 423,
    isAvailable: true,
    isOfficialStore: true,
    features: ['Cream Cheese Frosting', 'Moist Texture', 'Premium Ingredients', 'Handcrafted'],
    specifications: {
      'Flavor': 'Red Velvet',
      'Frosting': 'Cream Cheese',
      'Size': 'Standard cupcake',
      'Allergens': 'Contains gluten, dairy, eggs'
    },
    options: [
      { type: 'quantity', value: '6 pieces', required: false },
      { type: 'quantity', value: '12 pieces', required: false, price: 90000 },
      { type: 'quantity', value: '24 pieces', required: false, price: 220000 },
      { type: 'frosting', value: 'Cream Cheese', required: false },
      { type: 'frosting', value: 'Vanilla Buttercream', required: false, price: 5000 }
    ],
    tags: ['cupcakes', 'red-velvet', 'cream-cheese', 'dessert'],
    createdAt: '2024-01-08T00:00:00Z',
    updatedAt: '2024-10-18T00:00:00Z'
  },
  {
    id: 'prod_blueberry_muffins',
    title: 'Blueberry Muffins',
    slug: 'blueberry-muffins',
    storeSlug: 'bakes-food',
    price: 75000,
    originalPrice: 85000,
    discount: 12,
    description: 'Freshly baked muffins bursting with juicy blueberries and topped with crunchy streusel.',
    images: [
      'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=500',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500',
      'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500'
    ],
    category: 'Bakery',
    brand: 'Bakes Food',
    stock: 28,
    weight: '80g each',
    rating: 4.6,
    reviewCount: 387,
    isAvailable: true,
    isOfficialStore: true,
    features: ['Fresh Blueberries', 'Crunchy Topping', 'Moist Interior', 'Baked Daily'],
    specifications: {
      'Main Ingredient': 'Fresh blueberries',
      'Topping': 'Streusel crumble',
      'Size': 'Large muffin',
      'Shelf Life': '2 days'
    },
    options: [
      { type: 'quantity', value: '4 pieces', required: false },
      { type: 'quantity', value: '8 pieces', required: false, price: 60000 },
      { type: 'quantity', value: '16 pieces', required: false, price: 140000 },
      { type: 'variant', value: 'Classic Blueberry', required: false },
      { type: 'variant', value: 'Lemon Blueberry', required: false, price: 8000 }
    ],
    tags: ['muffins', 'blueberry', 'breakfast', 'fresh'],
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-10-18T00:00:00Z'
  },
  {
    id: 'prod_chocolate_chip_cookies',
    title: 'Chocolate Chip Cookies',
    slug: 'chocolate-chip-cookies',
    storeSlug: 'bakes-food',
    price: 55000,
    originalPrice: 65000,
    discount: 15,
    description: 'Classic homemade-style chocolate chip cookies with premium chocolate chunks and crispy edges.',
    images: [
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500',
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500',
      'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=500'
    ],
    category: 'Bakery',
    brand: 'Bakes Food',
    stock: 45,
    weight: '50g each',
    rating: 4.8,
    reviewCount: 756,
    isAvailable: true,
    isOfficialStore: true,
    features: ['Premium Chocolate', 'Crispy Edges', 'Soft Center', 'Freshly Baked'],
    specifications: {
      'Chocolate': 'Belgian chocolate chunks',
      'Size': 'Large cookie',
      'Texture': 'Crispy outside, chewy inside',
      'Shelf Life': '3 days'
    },
    options: [
      { type: 'quantity', value: '6 pieces', required: false },
      { type: 'quantity', value: '12 pieces', required: false, price: 50000 },
      { type: 'quantity', value: '24 pieces', required: false, price: 120000 },
      { type: 'variant', value: 'Classic Chocolate Chip', required: false },
      { type: 'variant', value: 'Double Chocolate', required: false, price: 8000 },
      { type: 'variant', value: 'White Chocolate Macadamia', required: false, price: 10000 }
    ],
    tags: ['cookies', 'chocolate-chip', 'classic', 'dessert'],
    createdAt: '2024-01-18T00:00:00Z',
    updatedAt: '2024-10-18T00:00:00Z'
  },
  {
    id: 'prod_apple_pie',
    title: 'Classic Apple Pie',
    slug: 'classic-apple-pie',
    storeSlug: 'bakes-food',
    price: 185000,
    originalPrice: 220000,
    discount: 16,
    description: 'Traditional apple pie with fresh apples, cinnamon spice, and flaky butter crust made from scratch.',
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500',
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500'
    ],
    category: 'Bakery',
    brand: 'Bakes Food',
    stock: 15,
    weight: '1.2kg',
    rating: 4.9,
    reviewCount: 298,
    isAvailable: true,
    isOfficialStore: true,
    features: ['Fresh Apples', 'Flaky Crust', 'Cinnamon Spice', 'Traditional Recipe'],
    specifications: {
      'Filling': 'Fresh apples with cinnamon',
      'Crust': 'Double butter crust',
      'Size': '9-inch pie',
      'Servings': '8-10 people'
    },
    options: [
      { type: 'size', value: '9-inch (8-10 people)', required: false },
      { type: 'size', value: '10-inch (10-12 people)', required: false, price: 40000 },
      { type: 'crust', value: 'Regular Crust', required: false },
      { type: 'crust', value: 'Latticed Crust', required: false, price: 15000 },
      { type: 'variant', value: 'Classic Apple', required: false },
      { type: 'variant', value: 'Dutch Apple Crumble', required: false, price: 20000 }
    ],
    tags: ['pie', 'apple', 'traditional', 'dessert'],
    createdAt: '2024-02-05T00:00:00Z',
    updatedAt: '2024-10-18T00:00:00Z'
  },
  {
    id: 'prod_cinnamon_rolls',
    title: 'Cinnamon Rolls',
    slug: 'cinnamon-rolls',
    storeSlug: 'bakes-food',
    price: 85000,
    originalPrice: 100000,
    discount: 15,
    description: 'Soft and fluffy cinnamon rolls with cinnamon filling and cream cheese glaze, baked to perfection.',
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500',
      'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500',
      'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=500'
    ],
    category: 'Bakery',
    brand: 'Bakes Food',
    stock: 22,
    weight: '70g each',
    rating: 4.7,
    reviewCount: 512,
    isAvailable: true,
    isOfficialStore: true,
    features: ['Soft & Fluffy', 'Cream Cheese Glaze', 'Cinnamon Filling', 'Fresh Daily'],
    specifications: {
      'Filling': 'Cinnamon, brown sugar, butter',
      'Glaze': 'Cream cheese frosting',
      'Size': 'Standard roll',
      'Best Served': 'Warm'
    },
    options: [
      { type: 'quantity', value: '6 pieces', required: false },
      { type: 'quantity', value: '12 pieces', required: false, price: 80000 },
      { type: 'quantity', value: '18 pieces', required: false, price: 150000 },
      { type: 'glaze', value: 'Cream Cheese', required: false },
      { type: 'glaze', value: 'Vanilla', required: false },
      { type: 'variant', value: 'Classic Cinnamon', required: false },
      { type: 'variant', value: 'Pecan Cinnamon', required: false, price: 15000 }
    ],
    tags: ['cinnamon-rolls', 'breakfast', 'sweet', 'glazed'],
    createdAt: '2024-01-25T00:00:00Z',
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
    categories: ['Electronics', 'Food & Beverages', 'Bakery', 'Fashion', 'Home & Living']
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