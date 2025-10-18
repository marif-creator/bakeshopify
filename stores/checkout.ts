// Checkout store interfaces
import { useCartStore } from './cart'

export interface DeliveryOptions {
  service: 'standard' | 'express' | 'same-day'
  time: string
  instructions: string
}

export interface Address {
  fullName: string
  phone: string
  email: string
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface PaymentMethod {
  type: 'card' | 'cod' | 'bank-transfer'
  cardDetails?: {
    cardNumber: string
    expiryDate: string
    cvv: string
    cardholderName: string
  }
}

export interface CheckoutState {
  // Delivery information
  delivery: DeliveryOptions

  // Address information
  address: Address

  // Payment information
  payment: PaymentMethod

  // Order status
  isSubmitting: boolean
  currentStep: 'cart' | 'delivery' | 'payment' | 'review' | 'complete'

  // Order summary
  orderSummary: {
    subtotal: number
    deliveryFee: number
    tax: number
    total: number
  }
}

// Default state
const defaultState = (): CheckoutState => ({
  delivery: {
    service: 'standard',
    time: 'asap',
    instructions: ''
  },
  address: {
    fullName: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Indonesia'
  },
  payment: {
    type: 'card',
    cardDetails: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: ''
    }
  },
  isSubmitting: false,
  currentStep: 'cart',
  orderSummary: {
    subtotal: 0,
    deliveryFee: 5,
    tax: 0,
    total: 0
  }
})

// Checkout store
export const useCheckoutStore = defineStore('checkout', {
  state: defaultState,

  getters: {
    // Calculate delivery fee based on selected service
    deliveryFee: (state): number => {
      switch (state.delivery.service) {
        case 'express': return 10
        case 'same-day': return 15
        default: return 5
      }
    },

    // Check if delivery information is complete
    isDeliveryComplete: (state): boolean => {
      return !!(state.delivery.service && state.delivery.time)
    },

    // Check if address information is complete
    isAddressComplete: (state): boolean => {
      return !!(state.address.fullName && state.address.phone &&
                state.address.email && state.address.street &&
                state.address.city && state.address.postalCode)
    },

    // Check if payment information is complete
    isPaymentComplete: (state): boolean => {
      if (state.payment.type === 'card') {
        return !!(state.payment.cardDetails?.cardNumber &&
                  state.payment.cardDetails?.expiryDate &&
                  state.payment.cardDetails?.cvv &&
                  state.payment.cardDetails?.cardholderName)
      }
      return !!state.payment.type
    },

    // Check if entire checkout form is valid
    isFormValid: (state): boolean => {
      return !!(state.delivery.service && state.delivery.time) &&
             !!(state.address.fullName && state.address.phone &&
                state.address.email && state.address.street &&
                state.address.city && state.address.postalCode) &&
             (state.payment.type === 'card' ?
               !!(state.payment.cardDetails?.cardNumber &&
                  state.payment.cardDetails?.expiryDate &&
                  state.payment.cardDetails?.cvv &&
                  state.payment.cardDetails?.cardholderName) :
               !!state.payment.type)
    },

    // Get current step number (for progress indicator)
    currentStepNumber: (state): number => {
      const steps = ['cart', 'delivery', 'payment', 'review']
      return steps.indexOf(state.currentStep) + 1
    }
  },

  actions: {
    // Update delivery options
    updateDelivery(delivery: Partial<DeliveryOptions>) {
      this.delivery = { ...this.delivery, ...delivery }
      this.updateOrderSummary()
    },

    // Update address information
    updateAddress(address: Partial<Address>) {
      this.address = { ...this.address, ...address }
    },

    // Update payment method
    updatePayment(payment: Partial<PaymentMethod>) {
      this.payment = { ...this.payment, ...payment }
    },

    // Update card details
    updateCardDetails(cardDetails: Partial<PaymentMethod['cardDetails']>) {
      if (this.payment.cardDetails) {
        this.payment.cardDetails = { ...this.payment.cardDetails, ...cardDetails }
      }
    },

    // Update current step
    setCurrentStep(step: CheckoutState['currentStep']) {
      this.currentStep = step
    },

    // Update order summary
    updateOrderSummary() {
      const cartStore = useCartStore()
      const subtotal = cartStore.totalPrice
      const deliveryFee = this.deliveryFee
      const tax = subtotal * 0.1 // 10% tax

      this.orderSummary = {
        subtotal,
        deliveryFee,
        tax,
        total: subtotal + deliveryFee + tax
      }
    },

    // Initialize checkout from cart
    initializeFromCart() {
      this.updateOrderSummary()
      this.currentStep = 'delivery'
    },

    // Proceed to next step
    nextStep() {
      const steps: CheckoutState['currentStep'][] = ['cart', 'delivery', 'payment', 'review']
      const currentIndex = steps.indexOf(this.currentStep)

      if (currentIndex < steps.length - 1 && currentIndex >= 0) {
        this.currentStep = steps[currentIndex + 1]!
      }
    },

    // Go back to previous step
    previousStep() {
      const steps: CheckoutState['currentStep'][] = ['cart', 'delivery', 'payment', 'review']
      const currentIndex = steps.indexOf(this.currentStep)

      if (currentIndex > 0 && currentIndex < steps.length) {
        this.currentStep = steps[currentIndex - 1]!
      }
    },

    // Place order
    async placeOrder(): Promise<boolean> {
      if (!this.isFormValid) {
        throw new Error('Checkout form is not valid')
      }

      this.isSubmitting = true

      try {
        // Get cart items
        const cartStore = useCartStore()

        // Prepare order data
        const orderData = {
          items: cartStore.items,
          delivery: this.delivery,
          address: this.address,
          payment: this.payment,
          summary: this.orderSummary,
          timestamp: new Date().toISOString()
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))

        console.log('Order placed:', orderData)

        // Clear checkout state and cart after successful order
        this.$reset()
        cartStore.clearCart()

        return true

      } catch (error) {
        console.error('Error placing order:', error)
        throw error
      } finally {
        this.isSubmitting = false
      }
    },

    // Reset checkout state
    resetCheckout() {
      this.$reset()
    },

    // Save checkout state to localStorage
    saveToStorage() {
      if (process.client) {
        localStorage.setItem('bakeshopify_checkout', JSON.stringify({
          delivery: this.delivery,
          address: this.address,
          payment: this.payment,
          currentStep: this.currentStep
        }))
      }
    },

    // Load checkout state from localStorage
    loadFromStorage() {
      if (process.client) {
        const saved = localStorage.getItem('bakeshopify_checkout')
        if (saved) {
          try {
            const data = JSON.parse(saved)
            this.delivery = { ...this.delivery, ...data.delivery }
            this.address = { ...this.address, ...data.address }
            this.payment = { ...this.payment, ...data.payment }
            this.currentStep = data.currentStep || 'cart'
          } catch (error) {
            console.error('Error loading checkout from storage:', error)
          }
        }
      }
    }
  }
})