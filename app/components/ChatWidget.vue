<template>
  <div class="chat-widget">
    <!-- Chat Trigger Button -->
    <button
      @click="toggleWidget"
      class="chat-trigger-button fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-all duration-200 flex items-center justify-center group"
      :class="{ 'animate-pulse': hasUnreadMessages }"
    >
      <!-- Chat Icon -->
      <Icon
        name="mdi:chat"
        size="24"
        class="transition-transform group-hover:scale-110"
      />

      <!-- Unread Badge -->
      <span
        v-if="totalUnreadCount > 0"
        class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-bounce"
      >
        {{ totalUnreadCount > 99 ? '99+' : totalUnreadCount }}
      </span>
    </button>

    <!-- Chat Widget Panel -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 transform translate-y-4 scale-95"
      enter-to-class="opacity-100 transform translate-y-0 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 transform translate-y-0 scale-100"
      leave-to-class="opacity-0 transform translate-y-4 scale-95"
    >
      <div
        v-if="isWidgetOpen"
        class="chat-widget-panel fixed bottom-24 right-6 z-50 w-[40rem] h-[32rem] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col"
      >
        <!-- Header -->
        <div class="chat-header p-4 border-b border-gray-200 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <h3 class="font-semibold text-gray-900">Chat with Sellers</h3>
            <span
              v-if="totalUnreadCount > 0"
              class="bg-red-500 text-white text-xs px-2 py-1 rounded-full"
            >
              {{ totalUnreadCount }} new
            </span>
          </div>
          <button
            @click="closeWidget"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Icon name="mdi:close" size="20" />
          </button>
        </div>

        <!-- Content Area -->
        <div class="flex-1 flex flex-row">
          <!-- Conversations Sidebar -->
          <div class="conversations-sidebar w-[220px] flex-shrink-0 border-r border-gray-200 bg-gray-50">
            <!-- Conversations List -->
            <div class="conversations-list p-2  space-y-1  overflow-y-auto">
              <div
                v-for="conversation in sortedConversations"
                :key="conversation.id"
                @click="setActiveConversation(conversation.id)"
                class="conversation-item p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white hover:shadow-sm"
                :class="{
                  'bg-green-50 border border-green-300 shadow-sm ring-2 ring-green-200': activeConversationId === conversation.id,
                  'bg-white border border-green-200': activeConversationId !== conversation.id
                }"
              >
                <div class="flex items-center space-x-2">
                  <div class="relative">
                    <img
                      :src="conversation.seller.avatar || '/logo/logo-mochi.webp'"
                      :alt="conversation.seller.name"
                      class="w-8 h-8 rounded-full"
                    />
                    <div
                      class="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white"
                      :class="conversation.seller.isOnline ? 'bg-green-500' : 'bg-gray-400'"
                    ></div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate max-w-[120px]" :title="conversation.seller.name">
                      {{ conversation.seller.name }}
                    </p>
                    <p class="text-xs text-gray-500 truncate max-w-[140px]" :title="conversation.lastMessage?.content || 'No messages yet'">
                      {{ conversation.lastMessage?.content || 'No messages yet' }}
                    </p>
                    <p class="text-xs text-gray-400 mt-0.5 truncate max-w-[120px]" :title="conversation.seller.storeName">
                      {{ conversation.seller.storeName }}
                    </p>
                  </div>
                  <div v-if="conversation.unreadCount > 0" class="unread-badge">
                    <span class="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {{ conversation.unreadCount }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

           
          </div>

          <!-- Chat Area -->
          <div class="chat-area  flex flex-1  flex-col " :class="{ 'bg-blue-50/30': activeConversation }">
            <!-- Chat Header -->
            <div class="chat-area-header p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <img
                    :src="activeConversation?.seller.avatar || '/logo/logo-mochi.webp'"
                    :alt="activeConversation?.seller.name || 'Select a conversation'"
                    class="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p class="text-sm font-medium text-gray-900">
                      {{ activeConversation?.seller.name || 'No conversation selected' }}
                    </p>
                    <p class="text-xs text-gray-500">
                      {{ activeConversation?.seller.isOnline ? 'Online' : 'Offline' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Messages -->
            <div class="messages-area flex-1 p-3 space-y-3 overflow-y-auto bg-white">
              <div v-if="activeConversation">
                <div
                  v-for="message in activeConversation.messages"
                  :key="message.id"
                  class="message flex"
                  :class="message.senderType === 'user' ? 'justify-end' : 'justify-start'"
                >
                  <div
                    class="message-bubble max-w-sm px-4 py-3 rounded-lg"
                    :class="message.senderType === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-900'"
                  >
                    <p class="text-sm">{{ message.content }}</p>
                    <p
                      class="text-xs mt-1"
                      :class="message.senderType === 'user' ? 'text-green-100' : 'text-gray-500'"
                    >
                      {{ formatTime(message.timestamp) }}
                    </p>
                  </div>
                </div>

                <!-- Typing Indicator -->
                <div v-if="isTyping" class="flex justify-start">
                  <div class="bg-gray-100 px-3 py-2 rounded-lg">
                    <div class="flex space-x-1">
                      <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                      <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Empty Messages State -->
              <div v-else class="flex items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100">
                <div class="text-center p-8">
                  <div class="relative mb-4">
                    <Icon name="mdi:chat-outline" size="48" class="text-gray-300 mx-auto" />
                    <div class="absolute -top-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Icon name="mdi:plus" size="16" class="text-white" />
                    </div>
                  </div>
                  <h3 class="text-lg font-medium text-gray-700 mb-2">Start a Conversation</h3>
                  <p class="text-gray-500 text-sm mb-4">Select a seller from the list to begin chatting</p>
                  <div class="flex items-center justify-center space-x-2 text-xs text-gray-400">
                    <Icon name="mdi:information" size="14" />
                    <span>Chat with sellers for product information</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Message Input -->
            <div v-if="activeConversation" class="message-input p-4 border-t border-gray-200 bg-gray-50">
              <form @submit.prevent="sendMessage" class="flex space-x-3">
                <UInput
                  v-model="newMessage"
                  placeholder="Type your message..."
                  class="flex-1 text-sm"
                  :disabled="chatStore.isLoading"
                  @keyup.enter="sendMessage"
                />
                <UButton
                  type="submit"
                  color="primary"
                  size="lg"
                  :disabled="!newMessage.trim() || chatStore.isLoading"
                  :loading="chatStore.isLoading"
                >
                  <Icon name="mdi:send" size="18" />
                </UButton>
              </form>
            </div>
          </div>

        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
// Import chat store
import { useChatStore } from '../../stores/chat'
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Chat store
const chatStore = useChatStore()

// Local state
const newMessage = ref('')
const isTyping = ref(false)

// Computed properties
const isWidgetOpen = computed(() => chatStore.isWidgetOpen)
const activeConversation = computed(() => chatStore.activeConversation)
const activeConversationId = computed(() => chatStore.activeConversationId)
const sortedConversations = computed(() => chatStore.sortedConversations)
const totalUnreadCount = computed(() => chatStore.totalUnreadCount)
const hasUnreadMessages = computed(() => totalUnreadCount.value > 0)

// Available sellers (sellers user hasn't chatted with yet)
const availableSellers = computed(() => {
  return chatStore.sellers.filter(seller => !chatStore.hasConversationWithSeller(seller.id))
})

// Methods
const toggleWidget = () => {
  chatStore.toggleWidget()
}

const closeWidget = () => {
  chatStore.closeWidget()
}

const setActiveConversation = (conversationId: string) => {
  chatStore.setActiveConversation(conversationId)
}

const startNewConversation = (sellerId: string) => {
  chatStore.startConversation(sellerId)
}


const sendMessage = () => {
  if (!newMessage.value.trim()) return

  chatStore.sendMessage(newMessage.value)
  newMessage.value = ''
}


const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(new Date(date))
}

// Request notification permission on mount
onMounted(() => {
  chatStore.loadFromStorage()
  chatStore.requestNotificationPermission()

  // Auto-save on changes
  watch(() => chatStore.conversations, () => {
    chatStore.saveToStorage()
  }, { deep: true })
})

// Keyboard shortcuts
onMounted(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    // Escape key closes widget
    if (e.key === 'Escape' && isWidgetOpen.value) {
      closeWidget()
    }
  }

  window.addEventListener('keydown', handleKeyPress)
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress)
  })
})
</script>

<style scoped>
.chat-widget {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.chat-trigger-button {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.chat-trigger-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.chat-widget-panel {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Message animations */
.message-bubble {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scrollbar styling */
.messages-area::-webkit-scrollbar {
  width: 4px;
}

.messages-area::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.messages-area::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.messages-area::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .chat-widget-panel {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
    flex-direction: column;
  }

  .chat-trigger-button {
    bottom: 4;
    right: 4;
  }

  .conversations-sidebar {
    width: 100%;
    max-height: 40%;
    border-r: none;
    border-b: 1px solid #e5e7eb;
  }

  .chat-widget-panel .flex-1 {
    overflow: visible;
  }
}
</style>
