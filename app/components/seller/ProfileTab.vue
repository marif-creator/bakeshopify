<template>
  <div class="space-y-6">
    <!-- Profile Header -->
    <UCard>
      <div class="flex items-center gap-6">
        <div class="relative">
          <img
            :src="profile.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'"
            :alt="profile.name"
            class="w-20 h-20 rounded-full object-cover"
          />
          <button class="absolute bottom-0 right-0 p-1 bg-blue-600 text-white rounded-full hover:bg-blue-700">
            <UIcon name="i-heroicons-camera" class="w-4 h-4" />
          </button>
        </div>
        <div class="flex-1">
          <h3 class="text-xl font-semibold text-gray-900">{{ profile.name }}</h3>
          <p class="text-gray-600">{{ profile.email }}</p>
          <p class="text-sm text-gray-500">Seller since {{ formatDate(profile.joinedAt) }}</p>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-green-600">{{ profile.rating }}</div>
          <div class="text-sm text-gray-600">Store Rating</div>
        </div>
      </div>
    </UCard>

    <!-- Profile Information -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900">Personal Information</h3>
        </template>

        <div class="space-y-4">
          <UFormGroup label="Full Name" name="name">
            <UInput v-model="profileForm.name" placeholder="Enter your full name" size="lg" />
          </UFormGroup>

          <UFormGroup label="Email Address" name="email">
            <UInput v-model="profileForm.email" type="email" placeholder="Enter your email" size="lg" />
          </UFormGroup>

          <UFormGroup label="Phone Number" name="phone">
            <UInput v-model="profileForm.phone" placeholder="Enter your phone number" size="lg" />
          </UFormGroup>

          <UFormGroup label="Date of Birth" name="dateOfBirth">
            <UInput v-model="profileForm.dateOfBirth" type="date" size="lg" />
          </UFormGroup>

          <UFormGroup label="Bio" name="bio">
            <UTextarea
              v-model="profileForm.bio"
              placeholder="Tell us about yourself"
              :rows="3"
              size="lg"
            />
          </UFormGroup>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900">Business Information</h3>
        </template>

        <div class="space-y-4">
          <UFormGroup label="Business Name" name="businessName">
            <UInput v-model="profileForm.businessName" placeholder="Enter your business name" size="lg" />
          </UFormGroup>

          <UFormGroup label="Business Type" name="businessType">
            <USelect
              v-model="profileForm.businessType"
              :options="businessTypeOptions"
              placeholder="Select business type"
              size="lg"
            />
          </UFormGroup>

          <UFormGroup label="Tax ID / NPWP" name="taxId">
            <UInput v-model="profileForm.taxId" placeholder="Enter your tax ID" size="lg" />
          </UFormGroup>

          <UFormGroup label="Business Address" name="businessAddress">
            <UTextarea
              v-model="profileForm.businessAddress"
              placeholder="Enter your business address"
              :rows="3"
              size="lg"
            />
          </UFormGroup>
        </div>
      </UCard>
    </div>

    <!-- Store Settings -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-gray-900">Store Settings</h3>
      </template>

      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UFormGroup label="Store Name" name="storeName">
            <UInput v-model="storeForm.name" placeholder="Enter your store name" size="lg" />
          </UFormGroup>

          <UFormGroup label="Store Slug" name="storeSlug">
            <UInput v-model="storeForm.slug" placeholder="store-slug" size="lg" />
          </UFormGroup>
        </div>

        <UFormGroup label="Store Description" name="storeDescription">
          <UTextarea
            v-model="storeForm.description"
            placeholder="Describe your store"
            :rows="3"
            size="lg"
          />
        </UFormGroup>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UFormGroup label="Store Status" name="storeStatus">
            <USelect
              v-model="storeForm.status"
              :options="storeStatusOptions"
              placeholder="Select store status"
              size="lg"
            />
          </UFormGroup>

          <UFormGroup label="Minimum Order Amount" name="minOrderAmount">
            <UInput
              v-model.number="storeForm.minOrderAmount"
              type="number"
              placeholder="0"
              size="lg"
              min="0"
            />
          </UFormGroup>
        </div>

        <!-- Store Preferences -->
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Store Preferences</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UCheckbox v-model="storeForm.allowBackorders" label="Allow backorders" />
            <UCheckbox v-model="storeForm.requireShippingAddress" label="Require shipping address for all orders" />
            <UCheckbox v-model="storeForm.autoAcceptOrders" label="Auto-accept orders" />
            <UCheckbox v-model="storeForm.sendOrderNotifications" label="Send order notifications" />
          </div>
        </div>
      </div>
    </UCard>

    <!-- Security Settings -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-gray-900">Security Settings</h3>
      </template>

      <div class="space-y-4">
        <UFormGroup label="Current Password" name="currentPassword">
          <UInput v-model="securityForm.currentPassword" type="password" placeholder="Enter current password" size="lg" />
        </UFormGroup>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UFormGroup label="New Password" name="newPassword">
            <UInput v-model="securityForm.newPassword" type="password" placeholder="Enter new password" size="lg" />
          </UFormGroup>

          <UFormGroup label="Confirm New Password" name="confirmPassword">
            <UInput v-model="securityForm.confirmPassword" type="password" placeholder="Confirm new password" size="lg" />
          </UFormGroup>
        </div>

        <div class="flex justify-end">
          <UButton @click="changePassword" :loading="changingPassword" size="lg">
            Change Password
          </UButton>
        </div>
      </div>
    </UCard>

    <!-- Action Buttons -->
    <UCard>
      <div class="flex justify-between items-center">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">Save Changes</h3>
          <p class="text-sm text-gray-600">Update your profile and store information</p>
        </div>
        <div class="flex gap-4">
          <UButton @click="resetForms" variant="outline" size="lg">
            Reset
          </UButton>
          <UButton @click="saveProfile" :loading="savingProfile" size="lg">
            Save Profile
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Reactive state
const savingProfile = ref(false)
const changingPassword = ref(false)

// Profile data
const profile = ref({
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '',
  phone: '+62 812-3456-7890',
  dateOfBirth: '1990-01-01',
  bio: 'Experienced seller with 5+ years in e-commerce',
  businessName: 'PT. Doe Commerce',
  businessType: 'retail',
  taxId: '12.345.678.9-012.345',
  businessAddress: 'Jl. Sudirman No. 123, Jakarta Pusat',
  rating: 4.8,
  joinedAt: '2023-01-15T00:00:00Z'
})

// Form data
const profileForm = reactive({ ...profile.value })
const storeForm = reactive({
  name: 'My Awesome Store',
  slug: 'my-awesome-store',
  description: 'Your one-stop shop for quality products',
  status: 'active',
  minOrderAmount: 0,
  allowBackorders: false,
  requireShippingAddress: true,
  autoAcceptOrders: false,
  sendOrderNotifications: true
})

const securityForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Options
const businessTypeOptions = [
  { label: 'Individual', value: 'individual' },
  { label: 'Partnership', value: 'partnership' },
  { label: 'Limited Company', value: 'limited_company' },
  { label: 'Corporation', value: 'corporation' }
]

const storeStatusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Under Maintenance', value: 'maintenance' }
]

// Helper functions
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Actions
const saveProfile = () => {
  savingProfile.value = true

  // Simulate API call
  setTimeout(() => {
    Object.assign(profile.value, profileForm)
    savingProfile.value = false
    console.log('Profile saved:', profileForm)
  }, 1000)
}

const changePassword = () => {
  if (securityForm.newPassword !== securityForm.confirmPassword) {
    // Handle password mismatch error
    return
  }

  changingPassword.value = true

  // Simulate API call
  setTimeout(() => {
    changingPassword.value = false
    Object.assign(securityForm, {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    console.log('Password changed')
  }, 1000)
}

const resetForms = () => {
  Object.assign(profileForm, profile.value)
  Object.assign(securityForm, {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
}
</script>