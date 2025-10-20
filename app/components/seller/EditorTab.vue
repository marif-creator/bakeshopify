<template>
  <div class="space-y-6">
    <!-- Store Pages -->
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-900">Store Pages</h3>
          <UButton @click="createNewPage" icon="i-heroicons-plus-circle" size="sm">
            New Page
          </UButton>
        </div>
      </template>

      <div class="space-y-4">
        <div v-for="page in storePages" :key="page.id" class="flex items-center justify-between p-4 border rounded-lg">
          <div class="flex items-center space-x-4">
            <div class="p-2 bg-blue-100 rounded-lg">
              <UIcon :name="getPageIcon(page.type)" class="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 class="font-medium text-gray-900">{{ page.title }}</h4>
              <p class="text-sm text-gray-600">{{ page.slug }} • {{ page.type }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <UBadge :color="page.isPublished ? 'success' : 'warning'" variant="subtle" size="xs">
              {{ page.isPublished ? 'Published' : 'Draft' }}
            </UBadge>
            <UButton @click="editPage(page)" variant="outline" size="sm" icon="i-heroicons-pencil-square" />
            <UButton @click="deletePage(page)" variant="outline" color="error" size="sm" icon="i-heroicons-trash" />
          </div>
        </div>
      </div>
    </UCard>

    <!-- Page Editor Modal -->
    <UModal v-model="showPageEditor" :title="editingPage ? 'Edit Page' : 'Create New Page'" class="max-w-4xl">
      <div class="space-y-6">
        <!-- Page Settings -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UFormGroup label="Page Title" name="title" required>
            <UInput v-model="pageForm.title" placeholder="Enter page title" size="lg" />
          </UFormGroup>

          <UFormGroup label="Page Slug" name="slug" required>
            <UInput v-model="pageForm.slug" placeholder="page-slug" size="lg" />
          </UFormGroup>

          <UFormGroup label="Page Type" name="type" required class="md:col-span-2">
            <USelect
              v-model="pageForm.type"
              :options="pageTypeOptions"
              placeholder="Select page type"
              size="lg"
            />
          </UFormGroup>
        </div>

        <!-- Page Content Editor -->
        <UFormGroup label="Page Content" name="content">
          <UTextarea
            v-model="pageForm.content"
            placeholder="Enter your page content here..."
            :rows="12"
            size="lg"
          />
        </UFormGroup>

        <!-- Page Settings -->
        <div class="flex items-center gap-4">
          <UCheckbox v-model="pageForm.isPublished" label="Publish this page" />
          <UCheckbox v-model="pageForm.showInMenu" label="Show in navigation menu" />
        </div>

        <!-- Modal Actions -->
        <div class="flex justify-end gap-4 pt-6 border-t">
          <UButton @click="showPageEditor = false" variant="outline" size="lg">
            Cancel
          </UButton>
          <UButton @click="savePage" :loading="savingPage" size="lg">
            {{ editingPage ? 'Update Page' : 'Create Page' }}
          </UButton>
        </div>
      </div>
    </UModal>

    <!-- Store Customization -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900">Store Branding</h3>
        </template>

        <div class="space-y-4">
          <UFormGroup label="Store Name" name="storeName">
            <UInput v-model="storeSettings.name" placeholder="Your Store Name" size="lg" />
          </UFormGroup>

          <UFormGroup label="Store Description" name="storeDescription">
            <UTextarea
              v-model="storeSettings.description"
              placeholder="Brief description of your store"
              :rows="3"
              size="lg"
            />
          </UFormGroup>

          <UFormGroup label="Store Logo URL" name="storeLogo">
            <UInput v-model="storeSettings.logo" placeholder="https://..." size="lg" />
          </UFormGroup>

          <UFormGroup label="Banner Image URL" name="storeBanner">
            <UInput v-model="storeSettings.banner" placeholder="https://..." size="lg" />
          </UFormGroup>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900">Store Policies</h3>
        </template>

        <div class="space-y-4">
          <UFormGroup label="Return Policy" name="returnPolicy">
            <UTextarea
              v-model="storeSettings.returnPolicy"
              placeholder="Describe your return policy"
              :rows="3"
              size="lg"
            />
          </UFormGroup>

          <UFormGroup label="Shipping Information" name="shippingInfo">
            <UTextarea
              v-model="storeSettings.shippingInfo"
              placeholder="Shipping rates and delivery times"
              :rows="3"
              size="lg"
            />
          </UFormGroup>

          <UFormGroup label="Contact Email" name="contactEmail">
            <UInput v-model="storeSettings.contactEmail" type="email" placeholder="store@example.com" size="lg" />
          </UFormGroup>

          <UFormGroup label="Contact Phone" name="contactPhone">
            <UInput v-model="storeSettings.contactPhone" placeholder="+62 xxx xxxx xxxx" size="lg" />
          </UFormGroup>
        </div>
      </UCard>
    </div>

    <!-- Save Store Settings -->
    <UCard>
      <div class="flex justify-between items-center">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">Save Changes</h3>
          <p class="text-sm text-gray-600">Update your store settings and branding</p>
        </div>
        <UButton @click="saveStoreSettings" :loading="savingSettings" size="lg">
          Save Store Settings
        </UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Reactive state
const showPageEditor = ref(false)
const editingPage = ref<any>(null)
const savingPage = ref(false)
const savingSettings = ref(false)

// Page form
const pageForm = reactive({
  title: '',
  slug: '',
  type: '',
  content: '',
  isPublished: false,
  showInMenu: false
})

// Store settings
const storeSettings = reactive({
  name: 'My Store',
  description: 'Welcome to my store',
  logo: '',
  banner: '',
  returnPolicy: '',
  shippingInfo: '',
  contactEmail: '',
  contactPhone: ''
})

// Sample store pages
const storePages = ref([
  {
    id: '1',
    title: 'About Us',
    slug: 'about-us',
    type: 'content',
    content: 'This is the about us page content...',
    isPublished: true,
    showInMenu: true,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    title: 'Contact',
    slug: 'contact',
    type: 'contact',
    content: 'Contact page content...',
    isPublished: true,
    showInMenu: true,
    createdAt: '2024-01-01'
  },
  {
    id: '3',
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    type: 'policy',
    content: 'Privacy policy content...',
    isPublished: true,
    showInMenu: false,
    createdAt: '2024-01-01'
  }
])

// Options
const pageTypeOptions = [
  { label: 'Content Page', value: 'content' },
  { label: 'Contact Page', value: 'contact' },
  { label: 'Policy Page', value: 'policy' },
  { label: 'Landing Page', value: 'landing' }
]

// Helper functions
const getPageIcon = (type: string) => {
  const icons: Record<string, string> = {
    content: 'i-heroicons-document-text',
    contact: 'i-heroicons-phone',
    policy: 'i-heroicons-shield-check',
    landing: 'i-heroicons-home'
  }
  return icons[type] || 'i-heroicons-document'
}

// Page actions
const createNewPage = () => {
  editingPage.value = null
  Object.assign(pageForm, {
    title: '',
    slug: '',
    type: '',
    content: '',
    isPublished: false,
    showInMenu: false
  })
  showPageEditor.value = true
}

const editPage = (page: any) => {
  editingPage.value = page
  Object.assign(pageForm, page)
  showPageEditor.value = true
}

const deletePage = (page: any) => {
  // In a real app, this would show a confirmation dialog
  const index = storePages.value.findIndex(p => p.id === page.id)
  if (index !== -1) {
    storePages.value.splice(index, 1)
  }
}

const savePage = () => {
  savingPage.value = true

  // Simulate API call
  setTimeout(() => {
    if (editingPage.value) {
      // Update existing page
      const index = storePages.value.findIndex(p => p.id === editingPage.value.id)
      if (index !== -1) {
        storePages.value[index] = { ...storePages.value[index], ...pageForm } as any
      }
    } else {
      // Create new page
      const newPage = {
        id: Date.now().toString(),
        ...pageForm,
        createdAt: new Date().toISOString()
      }
      storePages.value.push(newPage)
    }

    savingPage.value = false
    showPageEditor.value = false
  }, 1000)
}

const saveStoreSettings = () => {
  savingSettings.value = true

  // Simulate API call
  setTimeout(() => {
    savingSettings.value = false
    // In a real app, this would save to backend
    console.log('Store settings saved:', storeSettings)
  }, 1000)
}
</script>