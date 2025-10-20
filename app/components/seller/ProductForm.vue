<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Basic Information -->
      <div class="md:col-span-2">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
      </div>

      <UFormGroup label="Product Title" name="title" required>
        <UInput v-model="state.title" placeholder="Enter product title" size="lg" />
      </UFormGroup>

      <UFormGroup label="Brand" name="brand" required>
        <UInput v-model="state.brand" placeholder="Enter brand name" size="lg" />
      </UFormGroup>

      <UFormGroup label="Category" name="category" required>
        <USelect
          v-model="state.category"
          :options="categoryOptions"
          placeholder="Select category"
          size="lg"
        />
      </UFormGroup>

      <UFormGroup label="Price (IDR)" name="price" required>
        <UInput
          v-model.number="state.price"
          type="number"
          placeholder="0"
          size="lg"
          min="0"
          step="1000"
        />
      </UFormGroup>

      <UFormGroup label="Original Price (IDR)" name="originalPrice">
        <UInput
          v-model.number="state.originalPrice"
          type="number"
          placeholder="0"
          size="lg"
          min="0"
          step="1000"
        />
      </UFormGroup>

      <UFormGroup label="Stock Quantity" name="stock" required>
        <UInput
          v-model.number="state.stock"
          type="number"
          placeholder="0"
          size="lg"
          min="0"
        />
      </UFormGroup>

      <UFormGroup label="Weight" name="weight" required>
        <UInput v-model="state.weight" placeholder="e.g. 100g, 1kg" size="lg" />
      </UFormGroup>

      <UFormGroup label="Discount (%)" name="discount">
        <UInput
          v-model.number="state.discount"
          type="number"
          placeholder="0"
          size="lg"
          min="0"
          max="100"
        />
      </UFormGroup>
    </div>

    <!-- Description -->
    <UFormGroup label="Description" name="description" required>
      <UTextarea
        v-model="state.description"
        placeholder="Enter product description"
        :rows="4"
        size="lg"
      />
    </UFormGroup>

    <!-- Images -->
    <UFormGroup label="Product Images" name="images">
      <div class="space-y-4">
        <div v-for="(image, index) in state.images" :key="index" class="flex items-center gap-4">
          <UInput
            v-model="state.images[index]"
            placeholder="Image URL"
            size="lg"
            class="flex-1"
          />
          <UButton
            v-if="state.images.length > 1"
            @click="removeImage(index)"
            variant="outline"
            color="error"
            icon="i-heroicons-trash"
            size="lg"
          />
        </div>
        <UButton
          @click="addImage"
          variant="outline"
          icon="i-heroicons-plus"
          size="lg"
        >
          Add Image
        </UButton>
      </div>
    </UFormGroup>

    <!-- Features -->
    <UFormGroup label="Features" name="features">
      <div class="space-y-4">
        <div v-for="(feature, index) in state.features" :key="index" class="flex items-center gap-4">
          <UInput
            v-model="state.features[index]"
            placeholder="Enter feature"
            size="lg"
            class="flex-1"
          />
          <UButton
            v-if="state.features.length > 1"
            @click="removeFeature(index)"
            variant="outline"
            color="error"
            icon="i-heroicons-trash"
            size="lg"
          />
        </div>
        <UButton
          @click="addFeature"
          variant="outline"
          icon="i-heroicons-plus"
          size="lg"
        >
          Add Feature
        </UButton>
      </div>
    </UFormGroup>

    <!-- Settings -->
    <div class="flex items-center gap-4">
      <UCheckbox v-model="state.isAvailable" label="Available for purchase" />
    </div>

    <!-- Form Actions -->
    <div class="flex justify-end gap-4 pt-6 border-t">
      <UButton type="button" variant="outline" size="lg" @click="$emit('cancel')">
        Cancel
      </UButton>
      <UButton type="submit" size="lg" :loading="loading">
        {{ product ? 'Update Product' : 'Create Product' }}
      </UButton>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// Props
const props = defineProps<{
  product?: any
}>()

// Emits
const emit = defineEmits<{
  submit: [data: any]
  cancel: []
}>()

// Reactive state
const loading = ref(false)
const state = reactive({
  title: props.product?.title || '',
  brand: props.product?.brand || '',
  category: props.product?.category || '',
  price: props.product?.price || 0,
  originalPrice: props.product?.originalPrice || 0,
  stock: props.product?.stock || 0,
  weight: props.product?.weight || '',
  discount: props.product?.discount || 0,
  description: props.product?.description || '',
  images: props.product?.images || [''],
  features: props.product?.features || [''],
  isAvailable: props.product?.isAvailable ?? true
})

// Category options
const categoryOptions = [
  'Electronics',
  'Food & Beverages',
  'Fashion',
  'Home & Living',
  'Sports & Outdoor',
  'Health & Beauty',
  'Books & Media',
  'Automotive'
]

// Form schema
const schema = {
  title: 'required',
  brand: 'required',
  category: 'required',
  price: 'required|positive',
  stock: 'required|min:0',
  description: 'required'
}

// Methods
const addImage = () => {
  state.images.push('')
}

const removeImage = (index: number) => {
  state.images.splice(index, 1)
}

const addFeature = () => {
  state.features.push('')
}

const removeFeature = (index: number) => {
  state.features.splice(index, 1)
}

const handleCancel = () => {
  emit('cancel')
}

const onSubmit = async (data: any) => {
  loading.value = true

  try {
    // Filter out empty strings
    data.images = data.images.filter((img: string) => img.trim() !== '')
    data.features = data.features.filter((feature: string) => feature.trim() !== '')

    // Calculate discount if original price is provided
    if (data.originalPrice && data.originalPrice > data.price) {
      data.discount = Math.round(((data.originalPrice - data.price) / data.originalPrice) * 100)
    }

    emit('submit', data)
  } catch (error) {
    console.error('Form submission error:', error)
  } finally {
    loading.value = false
  }
}
</script>