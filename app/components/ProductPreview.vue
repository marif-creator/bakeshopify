<template>
  <div class="product-preview">
    <div class="product-preview__container">
      <!-- Thumbnail Images -->
      <div class="product-preview__thumbnails">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="product-preview__thumbnail"
          :class="{ 'product-preview__thumbnail--active': selectedImageIndex === index }"
          @click="selectImage(index)"
        >
          <img :src="image" :alt="`Product variant ${index + 1}`" />
        </div>
      </div>

      <!-- Main Image -->
      <div id="mainproductimage" class="product-preview__main">
        <div class="product-preview__main-image">
          <img :src="currentImage" :alt="altText" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
interface Props {
  images?: string[]
  altText?: string
}

const props = withDefaults(defineProps<Props>(), {
  images: () => [
    '/logo-mochi.webp',
    '/logo-mochi.webp',
    '/logo-mochi.webp'
  ],
  altText: 'Product image'
})

// Reactive state
const selectedImageIndex = ref(0)

// Computed
const currentImage = computed(() => props.images[selectedImageIndex.value])

// Methods
const selectImage = (index: number) => {
  selectedImageIndex.value = index
}
</script>

<style scoped>
.product-preview {
  width: 100%;
  max-width: 600px;
}

.product-preview__container {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.product-preview__thumbnails {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 80px;
}

.product-preview__thumbnail {
  width: 80px;
  height: 80px;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f5f5f5;
}

.product-preview__thumbnail:hover {
  border-color: #ddd;
  transform: translateY(-2px);
}

.product-preview__thumbnail--active {
  border-color: #000;
  box-shadow: 0 0 0 1px #000;
}

.product-preview__thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;
}

.product-preview__thumbnail:hover img {
  transform: scale(1.05);
}

.product-preview__main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-preview__main-image {
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  overflow: hidden;
  background: #f8f8f8;
}

.product-preview__main-image img {
  width: 100%;
  height: auto;
  display: block;
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-preview__container {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .product-preview__thumbnails {
    flex-direction: row;
    justify-content: center;
    order: 2;
    min-width: auto;
  }

  .product-preview__thumbnail {
    width: 60px;
    height: 60px;
  }

  .product-preview__main {
    order: 1;
  }
}

@media (max-width: 480px) {
  .product-preview__thumbnails {
    gap: 8px;
  }

  .product-preview__thumbnail {
    width: 50px;
    height: 50px;
  }
}
</style>