<template>
  <div class="sticky top-0 left-0 right-0 z-50 bg-white shadow-md  pt-4 pl-4 pr-4">
    <div id="link" ref="linkElement" :class="[
      'flex flex-row justify-between items-center mb-4',
      'transition-all duration-300 ease-in-out',
      { 'hidden': isLinkVisible }
    ]">
      <div class="flex flex-nowrap">
        <ButtonLink label="FAQs" />
        <ButtonLink label="Sale" />
        <ButtonLink label="News" />
      </div>
      <div class="flex flex-row items-center">
        <IconLink name="mdi:facebook" />
        <IconLink name="mdi:instagram" />
        <IconLink name="mdi:youtube" />
        <IconLink name="bi:tiktok" />
        <SelectGhost :items="['USD', 'EUR']" v-model="selectedCurrency" />
        <SelectGhost :items="['EN', 'FR']" v-model="selectedLanguage" />
      </div>
    </div>
    <div id="search" class="sticky top-0 flex m-auto w-full">
      <NuxtLink to="/" id="logo" class="grow-1">
        <NuxtImg src="/logo-mochi.webp" alt="mochi" />
      </NuxtLink>
      <SearchBar class="grow-2" />
      <div id="login" class="flex grow-1 justify-end space-x-4">
        <!-- Auth Section -->
        <div v-if="status === 'authenticated' && data?.user">
          <!-- User Menu -->
          <UPopover>
            <button class="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              <img
                :src="data.user.image || '/default-avatar.png'"
                :alt="data.user.name || 'User'"
                class="w-8 h-8 rounded-full"
              />
              <span class="text-gray-700 font-medium">{{ data.user.name?.split(' ')[0] || 'User' }}</span>
              <Icon name="mdi:chevron-down" size="16" />
            </button>

            <template #content>
              <div class="p-4 min-w-[200px]">
                <div class="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p class="text-sm font-medium text-gray-900">{{ data.user.name }}</p>
                  <p class="text-sm text-gray-600">{{ data.user.email }}</p>
                </div>

                <div class="space-y-2">
                  <UButton
                    variant="ghost"
                    size="sm"
                    class="w-full justify-start"
                    @click="navigateTo('/profile')"
                  >
                    <Icon name="mdi:account" size="16" class="mr-2" />
                    Profile
                  </UButton>

                  <UButton
                    variant="ghost"
                    size="sm"
                    class="w-full justify-start"
                    @click="navigateTo('/orders')"
                  >
                    <Icon name="mdi:clipboard-list" size="16" class="mr-2" />
                    Orders
                  </UButton>

                  <UButton
                    variant="ghost"
                    size="sm"
                    class="w-full justify-start"
                    @click="handleSignOut"
                  >
                    <Icon name="mdi:logout" size="16" class="mr-2" />
                    Sign Out
                  </UButton>
                </div>
              </div>
            </template>
          </UPopover>
        </div>

        <!-- Login Button (when not authenticated) -->
        <UPopover v-else class="max-w-[100px]">
          <button class="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            <Icon name="mdi:account" size="20" class="text-gray-600" />
            <span class="text-gray-700 font-medium">Login</span>
          </button>

          <template #content>
            <div class="p-8 max-w-[300px] text-center">

              <div class="space-y-3">
                <UButton
                  color="primary"
                  variant="solid"
                  size="lg"
                  class="w-full"
                  @click="navigateTo('/login')"
                >
                  Log In
                </UButton>

                <UButton
                  variant="outline"
                  size="lg"
                  class="w-full"
                  @click="navigateTo('/register')"
                >
                  Create Account
                </UButton>
              </div>
            </div>
          </template>
        </UPopover>

        <template>
  <UPopover>
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #content>
      <Placeholder class="size-48 m-4 inline-flex" />
    </template>
  </UPopover>
</template>


        <!-- Cart -->
        <div class="relative">
          <button class="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 transition-colors">
            <Icon name="mdi:cart" size="20" class="text-gray-600" />
            <!-- Cart Counter Badge -->
            <span
              class="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {{ cartItemCount }}
            </span>
          </button>
        </div>
      </div>
    </div>
    <!-- Navigation Menu -->
    <nav class="relative">
      <ul class="flex items-center space-x-8">
        <!-- Shop All Dropdown -->
        <li class="relative group">
          <button
            class="flex items-center space-x-1 px-4 py-3 text-gray-700 hover:text-green-600 font-medium transition-colors">
            <span>Shop All</span>
            <Icon name="mdi:chevron-down" size="16" class="transition-transform group-hover:rotate-180" />
          </button>

          <!-- Dropdown Menu -->
          <div
            class="absolute top-full left-0  w-80 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div class="p-6">
              <div class="grid grid-cols-2 gap-6">
                <!-- Sauces & Spreads -->
                <div>
                  <h3 class="font-semibold text-gray-900 mb-3">Sauces & Spreads</h3>
                  <ul class="space-y-2">
                    <li>
                      <NuxtLink to="/category/dried-soup"
                        class="text-sm text-gray-600 hover:text-green-600 transition-colors">Dried Soup</NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/category/noodles"
                        class="text-sm text-gray-600 hover:text-green-600 transition-colors">
                        Noodles</NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/category/sauces-spreads"
                        class="text-sm text-gray-600 hover:text-green-600 transition-colors">Sauces & Spreads</NuxtLink>
                    </li>
                  </ul>
                </div>

                <!-- Daily Use -->
                <div>
                  <h3 class="font-semibold text-gray-900 mb-3">Daily Use</h3>
                  <ul class="space-y-2">
                    <li>
                      <NuxtLink to="/category/dairy-products"
                        class="text-sm text-gray-600 hover:text-green-600 transition-colors">Dairy Products</NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/category/flour-panko"
                        class="text-sm text-gray-600 hover:text-green-600 transition-colors">Flour & Panko</NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/category/bakery-products"
                        class="text-sm text-gray-600 hover:text-green-600 transition-colors">Bakery Products</NuxtLink>
                    </li>
                  </ul>
                </div>

                <!-- Flour & Panko -->
                <div>
                  <h3 class="font-semibold text-gray-900 mb-3">Flour & Panko</h3>
                  <ul class="space-y-2">
                    <li>
                      <NuxtLink to="/category/soup"
                        class="text-sm text-gray-600 hover:text-green-600 transition-colors">
                        Soup</NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/category/snacks"
                        class="text-sm text-gray-600 hover:text-green-600 transition-colors">
                        Snacks</NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/category/flour"
                        class="text-sm text-gray-600 hover:text-green-600 transition-colors">
                        Flour</NuxtLink>
                    </li>
                  </ul>
                </div>

                <!-- Seafood -->
                <div>
                  <h3 class="font-semibold text-gray-900 mb-3">Seafood</h3>
                  <ul class="space-y-2">
                    <li>
                      <NuxtLink to="/category/noodles"
                        class="text-sm text-gray-600 hover:text-green-600 transition-colors">
                        Noodles</NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/category/beverages"
                        class="text-sm text-gray-600 hover:text-green-600 transition-colors">Beverages</NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/category/weekend-treats"
                        class="text-sm text-gray-600 hover:text-green-600 transition-colors">Weekend Treats</NuxtLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </li>

        <!-- Other Menu Items -->
        <li>
          <NuxtLink to="/healthy-food"
            class="px-4 py-3 text-gray-700 hover:text-green-600 font-medium transition-colors">
            Healthy Food</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/categories" class="px-4 py-3 text-gray-700 hover:text-green-600 font-medium transition-colors">
            Categories</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/offers" class="px-4 py-3 text-gray-700 hover:text-green-600 font-medium transition-colors">
            Offers
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/blogs" class="px-4 py-3 text-gray-700 hover:text-green-600 font-medium transition-colors">Blogs
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contact" class="px-4 py-3 text-gray-700 hover:text-green-600 font-medium transition-colors">
            Contact
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/features" class="px-4 py-3 text-gray-700 hover:text-green-600 font-medium transition-colors">
            Features</NuxtLink>
        </li>
      </ul>
    </nav>

  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import ButtonLink from '~/components/ButtonLink.vue';
import IconLink from '~/components/IconLink.vue';
import SelectGhost from '~/components/SelectGhost.vue';
import SearchBar from '~/components/SearchBar.vue';

const { data, status, signOut } = useAuth()

const selectedLanguage = ref('EN');
const selectedCurrency = ref('USD');
const cartItemCount = ref(0);

// Scroll-based link visibility
const isLinkVisible = ref(true);
const linkElement = ref<HTMLElement | null>(null);

const handleScroll = () => {
  const mainElement = document.getElementById('main');
  if (!mainElement || !linkElement.value) return;

  const scrollTop = mainElement.scrollTop || window.pageYOffset || document.documentElement.scrollTop;
  const linkHeight = linkElement.value.offsetHeight;
  const hideThreshold = linkHeight / 2;

  // Hide link when scrolled past half the link height
  isLinkVisible.value = scrollTop > hideThreshold;
};

onMounted(() => {
  // Get reference to the link element
  linkElement.value = document.getElementById('link');

  // Add scroll listener to main element
  const mainElement = document.getElementById('main');
  if (mainElement) {
    mainElement.addEventListener('scroll', handleScroll);
  }

  // Also listen to window scroll as fallback
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  const mainElement = document.getElementById('content-section');
  if (mainElement) {
    mainElement.removeEventListener('scroll', handleScroll);
  }
  window.removeEventListener('scroll', handleScroll);
});

const handleSignOut = async () => {
  await signOut({
    callbackUrl: '/login'
  })
}

</script>
