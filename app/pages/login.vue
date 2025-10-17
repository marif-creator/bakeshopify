<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to BakeShop
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Sign in to discover delicious baked goods and fresh products
        </p>
      </div>

      <div class="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
        <div class="space-y-6">
          <!-- Google Login Button -->
          <div>
            <GoogleSignInButton @success="handleLoginSuccess" @error="handleLoginError"></GoogleSignInButton>
          </div>

          <!-- Divider -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <!-- Continue as Guest Button -->
          <div>
            <UButton @click="continueAsGuest" block variant="outline" size="lg"
              class="w-full flex items-center justify-center gap-3 py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              🛍️ Continue as Guest
            </UButton>
          </div>

          <div class="text-center">
            <p class="text-sm text-gray-600">
              By signing in, you can:
            </p>
            <ul class="mt-2 text-sm text-gray-600 space-y-1">
              <li>• Access your saved preferences</li>
              <li>• Track your order history</li>
              <li>• Receive personalized recommendations</li>
              <li>• Get exclusive offers and deals</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: false
})

import {
  GoogleSignInButton,
  type CredentialResponse,
} from "vue3-google-signin";
import { onMounted } from 'vue';

// handle success event
const handleLoginSuccess = (response: CredentialResponse) => {
  const { credential } = response;
  console.log("Access Token", credential);
};

// handle an error event
const handleLoginError = () => {
  console.error("Login failed");
};


// Continue as guest
const continueAsGuest = () => {
  navigateTo('/')
}

// Check authentication status on mount
onMounted(() => {
  // Authentication check logic can be added here if needed
})
</script>