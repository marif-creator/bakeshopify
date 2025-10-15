<template>
  <div class="relative">
    <div class="relative flex items-center">
      <!-- Search Input -->
      <input
        v-model="searchQuery"
        @focus="isFocused = true"
        @blur="handleBlur"
        type="text"
        class="w-full px-4 py-3 pr-16 rounded-lg bg-white/90 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 relative "
        :class="{
          'placeholder:text-sm placeholder:translate-y-[-8px] placeholder:text-gray-300': shouldShowSmallPlaceholder
        }"
        :placeholder="isFocused ? '' : 'Search'"
      />

      <!-- Search Icon Background (behind input) -->
      <div class="absolute right-2 top-1/2 -translate-y-1/2">
        <div class="bg-green-500 hover:bg-green-600 rounded-full p-3 transition-colors w-10 h-10 flex items-center justify-center">
          <Icon
            name="mdi:magnify"
            size="20"
            class="text-white"
          />
        </div>
      </div>

      <!-- Clear Button (when has content) -->
      <button
        v-if="searchQuery"
        @click="clearSearch"
        class="absolute right-15 rounded-full flex items-center justify-center w-6 h-6  hover:bg-gray-700 transition-colors"
      >
        <Icon
          name="mdi:close"
          size="16"
          class="text-gray-400 hover:text-white"
        />
      </button>
    </div>

    <!-- Animated Placeholder Label -->
    <div
      class="absolute left-4 pointer-events-none transition-all duration-300"
      :class="{
        'top-1/2 -translate-y-1/2 text-base text-gray-400': !shouldShowSmallPlaceholder,
        'top-1 text-[10px] text-gray-400': shouldShowSmallPlaceholder
      }"
    >
      {{ shouldShowSmallPlaceholder ? 'Search' : '' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const isFocused = ref(false)

const handleBlur = () => {
  setTimeout(() => {
    isFocused.value = false
  }, 150)
}

const clearSearch = () => {
  searchQuery.value = ''
  isFocused.value = false
}

const shouldShowSmallPlaceholder = computed(() => {
  return isFocused.value || searchQuery.value
})
</script>

<style scoped>
/* Custom styles for smooth animations */
input::placeholder {
  transition: all 0.3s ease;
  transform-origin: left center;
}
</style>