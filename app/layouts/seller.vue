<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <div class="w-64 bg-white shadow-lg">
      <div class="p-6">
        <h1 class="text-xl font-bold text-gray-800">Seller Dashboard</h1>
        <p class="text-sm text-gray-600 mt-1">Store Management</p>
      </div>

      <nav class="px-4 space-y-2">
        <NuxtLink
          to="/seller/dashboard/overview"
          :class="[
            'w-full text-left p-3 rounded-lg transition-colors block',
            $route.path === '/seller/dashboard/overview' || ($route.path === '/seller/dashboard' && !$route.query.tab)
              ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
              : 'text-gray-700 hover:bg-gray-50'
          ]"
        >
          <div class="flex items-center space-x-3">
            <UIcon name="i-heroicons-home" class="w-5 h-5" />
            <span>Overview</span>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/seller/dashboard/product"
          :class="[
            'w-full text-left p-3 rounded-lg transition-colors block',
            $route.path === '/seller/dashboard/product' || ($route.path === '/seller/dashboard/product/' || $route.path.startsWith('/seller/dashboard/product/'))
              ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
              : 'text-gray-700 hover:bg-gray-50'
          ]"
        >
          <div class="flex items-center space-x-3">
            <UIcon name="i-heroicons-cube" class="w-5 h-5" />
            <span>Products</span>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/seller/dashboard/order"
          :class="[
            'w-full text-left p-3 rounded-lg transition-colors block',
            $route.path === '/seller/dashboard/order' || $route.path === '/seller/dashboard/order/'
              ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
              : 'text-gray-700 hover:bg-gray-50'
          ]"
        >
          <div class="flex items-center space-x-3">
            <UIcon name="i-heroicons-shopping-bag" class="w-5 h-5" />
            <span>Orders</span>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/seller/dashboard/editor"
          :class="[
            'w-full text-left p-3 rounded-lg transition-colors block',
            $route.path === '/seller/dashboard/editor' || $route.path === '/seller/dashboard/editor/'
              ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
              : 'text-gray-700 hover:bg-gray-50'
          ]"
        >
          <div class="flex items-center space-x-3">
            <UIcon name="i-heroicons-pencil-square" class="w-5 h-5" />
            <span>Store Editor</span>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/seller/dashboard/profile"
          :class="[
            'w-full text-left p-3 rounded-lg transition-colors block',
            $route.path === '/seller/dashboard/profile' || $route.path === '/seller/dashboard/profile/'
              ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
              : 'text-gray-700 hover:bg-gray-50'
          ]"
        >
          <div class="flex items-center space-x-3">
            <UIcon name="i-heroicons-user-circle" class="w-5 h-5" />
            <span>Profile</span>
          </div>
        </NuxtLink>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b p-6">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-2xl font-bold text-gray-800 capitalize">
              {{ getPageTitle() }}
            </h2>
            <p class="text-gray-600 mt-1">
              {{ getPageDescription() }}
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <UButton variant="outline" icon="i-heroicons-bell" size="sm">
              Notifications
            </UButton>
            <UButton variant="outline" icon="i-heroicons-cog-6-tooth" size="sm">
              Settings
            </UButton>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// Helper functions for dynamic titles
const getPageTitle = () => {
  const route = useRoute()

  // Handle different page types
  if (route.path.includes('/product/') && route.path.includes('/edit')) {
    return 'Edit Product'
  }

  if (route.path.includes('/product/addProduct')) {
    return 'Add New Product'
  }

  if (route.path === '/seller/dashboard/overview') {
    return 'Overview'
  }

  if (route.path === '/seller/dashboard/product' || route.path === '/seller/dashboard/product/') {
    return 'Products'
  }

  if (route.path === '/seller/dashboard/order' || route.path === '/seller/dashboard/order/') {
    return 'Orders'
  }

  if (route.path === '/seller/dashboard/editor' || route.path === '/seller/dashboard/editor/') {
    return 'Store Editor'
  }

  if (route.path === '/seller/dashboard/profile' || route.path === '/seller/dashboard/profile/') {
    return 'Profile'
  }

  // Handle tab-based pages
  const tab = route.query.tab as string
  if (tab) {
    return tab.charAt(0).toUpperCase() + tab.slice(1)
  }

  // Default title
  return 'Dashboard'
}

const getPageDescription = () => {
  const route = useRoute()

  // Handle different page types
  if (route.path.includes('/product/') && route.path.includes('/edit')) {
    return 'Update product information'
  }

  if (route.path.includes('/product/addProduct')) {
    return 'Create a new product for your store'
  }

  if (route.path === '/seller/dashboard/overview') {
    return 'Store overview and key metrics'
  }

  if (route.path === '/seller/dashboard/product' || route.path === '/seller/dashboard/product/') {
    return 'Manage your store\'s product inventory'
  }

  if (route.path === '/seller/dashboard/order' || route.path === '/seller/dashboard/order/') {
    return 'Track and manage customer orders'
  }

  if (route.path === '/seller/dashboard/editor' || route.path === '/seller/dashboard/editor/') {
    return 'Customize your store pages and branding'
  }

  if (route.path === '/seller/dashboard/profile' || route.path === '/seller/dashboard/profile/') {
    return 'Manage your seller profile and settings'
  }

  // Handle tab-based pages
  const tab = route.query.tab as string
  const descriptions: Record<string, string> = {
  }

  return descriptions[tab] || 'Manage your store'
}
</script>