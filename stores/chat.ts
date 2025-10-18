// Chat store interfaces
export interface Message {
  id: string
  senderId: string
  senderName: string
  senderType: 'user' | 'seller'
  content: string
  timestamp: Date
  isRead: boolean
  productId?: string | number
}

export interface Seller {
  id: string
  name: string
  avatar?: string
  storeName: string
  isOnline: boolean
  lastSeen?: Date
  products?: (string | number)[]
}

export interface Conversation {
  id: string
  sellerId: string
  seller: Seller
  messages: Message[]
  lastMessage?: Message
  unreadCount: number
  updatedAt: Date
  productId?: string | number
}

export interface ChatState {
  conversations: Conversation[]
  activeConversationId: string | null
  currentUserId: string
  isWidgetOpen: boolean
  isLoading: boolean
  sellers: Seller[]
}

// Mock sellers data
const mockSellers: Seller[] = [
  {
    id: 'seller-1',
    name: 'Ahmad Bakery',
    avatar: '/logo/logo-mochi.webp',
    storeName: 'Mochi Bakery',
    isOnline: true,
    products: ['product-1', 'product-2', 'product-3']
  },
  {
    id: 'seller-2',
    name: 'Sari Roti',
    avatar: '/logo/logo-mochi.webp',
    storeName: 'Sari Roti Official',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    products: ['product-4', 'product-5']
  },
  {
    id: 'seller-3',
    name: 'Dapur Coklat',
    avatar: '/logo/logo-mochi.webp',
    storeName: 'Chocolate Corner',
    isOnline: true,
    products: ['product-6', 'product-7', 'product-8']
  }
]

// Default state
const defaultState = (): ChatState => ({
  conversations: [],
  activeConversationId: null,
  currentUserId: 'user-' + Date.now(),
  isWidgetOpen: false,
  isLoading: false,
  sellers: mockSellers
})

// Chat store
export const useChatStore = defineStore('chat', {
  state: defaultState,

  getters: {
    // Get active conversation
    activeConversation: (state): Conversation | null => {
      if (!state.activeConversationId) return null
      return state.conversations.find(conv => conv.id === state.activeConversationId) || null
    },

    // Get conversations sorted by last activity
    sortedConversations: (state): Conversation[] => {
      return [...state.conversations].sort((a, b) => {
        const aTime = a.lastMessage?.timestamp.getTime() || a.updatedAt.getTime()
        const bTime = b.lastMessage?.timestamp.getTime() || b.updatedAt.getTime()
        return bTime - aTime
      })
    },

    // Get total unread count
    totalUnreadCount: (state): number => {
      return state.conversations.reduce((total, conv) => total + conv.unreadCount, 0)
    },

    // Get online sellers
    onlineSellers: (state): Seller[] => {
      return state.sellers.filter(seller => seller.isOnline)
    },

    // Get seller by ID
    getSellerById: (state) => (sellerId: string): Seller | undefined => {
      return state.sellers.find(seller => seller.id === sellerId)
    },

    // Check if user has chatted with seller before
    hasConversationWithSeller: (state) => (sellerId: string): boolean => {
      return state.conversations.some(conv => conv.sellerId === sellerId)
    }
  },

  actions: {
    // Toggle chat widget
    toggleWidget() {
      this.isWidgetOpen = !this.isWidgetOpen
    },

    // Open chat widget
    openWidget() {
      this.isWidgetOpen = true
    },

    // Close chat widget
    closeWidget() {
      this.isWidgetOpen = false
    },

    // Set active conversation
    setActiveConversation(conversationId: string) {
      this.activeConversationId = conversationId

      // Mark messages as read
      const conversation = this.conversations.find(conv => conv.id === conversationId)
      if (conversation) {
        conversation.unreadCount = 0
        conversation.messages.forEach(message => {
          if (message.senderType === 'seller') {
            message.isRead = true
          }
        })
        this.saveToStorage()
      }
    },

    // Start new conversation with seller
    startConversation(sellerId: string, productId?: string | number) {
      const seller = this.getSellerById(sellerId)
      if (!seller) return null

      // Check if conversation already exists
      const existingConversation = this.conversations.find(conv => conv.sellerId === sellerId)
      if (existingConversation) {
        this.setActiveConversation(existingConversation.id)
        return existingConversation.id
      }

      // Create new conversation
      const conversationId = 'conv-' + Date.now()
      const newConversation: Conversation = {
        id: conversationId,
        sellerId: seller.id,
        seller,
        messages: [],
        unreadCount: 0,
        updatedAt: new Date(),
        productId
      }

      this.conversations.push(newConversation)
      this.setActiveConversation(conversationId)
      this.saveToStorage()

      return conversationId
    },

    // Send message
    sendMessage(content: string, productId?: string | number) {
      if (!this.activeConversationId || !content.trim()) return

      const conversation = this.conversations.find(conv => conv.id === this.activeConversationId)
      if (!conversation) return

      // Create user message
      const userMessage: Message = {
        id: 'msg-' + Date.now(),
        senderId: this.currentUserId,
        senderName: 'You',
        senderType: 'user',
        content: content.trim(),
        timestamp: new Date(),
        isRead: true,
        productId
      }

      // Add user message
      conversation.messages.push(userMessage)
      conversation.updatedAt = new Date()

      // Simulate seller response (after 1-3 seconds)
      this.simulateSellerResponse(conversation.id)

      this.saveToStorage()
    },

    // Simulate seller response
    simulateSellerResponse(conversationId: string) {
      const conversation = this.conversations.find(conv => conv.id === conversationId)
      if (!conversation) return

      setTimeout(() => {
        const responses = [
          "Thank you for your message! I'll help you with that.",
          "I'd be happy to provide more information about this product.",
          "Let me check that for you right away.",
          "That's a great question! Here's what I can tell you...",
          "I can definitely help you with more details about this item."
        ]

        const randomIndex = Math.floor(Math.random() * responses.length)
        const sellerMessage: Message = {
          id: 'msg-' + Date.now(),
          senderId: conversation.seller.id,
          senderName: conversation.seller.name,
          senderType: 'seller',
          content: responses[randomIndex] || 'Thank you for your message!',
          timestamp: new Date(),
          isRead: false
        }

        conversation.messages.push(sellerMessage)
        conversation.updatedAt = new Date()
        conversation.unreadCount += 1

        // Update last message
        conversation.lastMessage = sellerMessage

        this.saveToStorage()

        // Show notification if widget is closed
        if (!this.isWidgetOpen) {
          this.showNotification(conversation.seller.name)
        }
      }, 1000 + Math.random() * 2000) // 1-3 seconds
    },

    // Show notification for new message
    showNotification(sellerName: string) {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`New message from ${sellerName}`, {
          body: 'You have a new message in your chat',
          icon: '/favicon.ico'
        })
      }
    },

    // Mark conversation as read
    markAsRead(conversationId: string) {
      const conversation = this.conversations.find(conv => conv.id === conversationId)
      if (conversation) {
        conversation.unreadCount = 0
        conversation.messages.forEach(message => {
          if (message.senderType === 'seller') {
            message.isRead = true
          }
        })
        this.saveToStorage()
      }
    },

    // Delete conversation
    deleteConversation(conversationId: string) {
      const index = this.conversations.findIndex(conv => conv.id === conversationId)
      if (index > -1) {
        this.conversations.splice(index, 1)
        if (this.activeConversationId === conversationId) {
          this.activeConversationId = null
        }
        this.saveToStorage()
      }
    },

    // Clear all conversations
    clearAllConversations() {
      this.conversations = []
      this.activeConversationId = null
      this.saveToStorage()
    },

    // Save chat state to localStorage
    saveToStorage() {
      if (process.client) {
        try {
          localStorage.setItem('bakeshopify_chat', JSON.stringify({
            conversations: this.conversations,
            activeConversationId: this.activeConversationId,
            currentUserId: this.currentUserId
          }))
        } catch (error) {
          console.error('Error saving chat to storage:', error)
        }
      }
    },

    // Load chat state from localStorage
    loadFromStorage() {
      if (process.client) {
        try {
          const saved = localStorage.getItem('bakeshopify_chat')
          if (saved) {
            const data = JSON.parse(saved)

            // Restore conversations with proper Date objects
            this.conversations = data.conversations.map((conv: any) => ({
              ...conv,
              updatedAt: new Date(conv.updatedAt),
              messages: conv.messages.map((msg: any) => ({
                ...msg,
                timestamp: new Date(msg.timestamp)
              }))
            }))

            this.activeConversationId = data.activeConversationId
            this.currentUserId = data.currentUserId
          }
        } catch (error) {
          console.error('Error loading chat from storage:', error)
        }
      }
    },

    // Request notification permission
    requestNotificationPermission() {
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission()
      }
    }
  }
})