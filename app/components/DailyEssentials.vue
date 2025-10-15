<template>
  <div v-if="loading" class="loading">
    Loading daily essentials...
  </div>
  <div v-else-if="error" class="error">
    {{ error }}
  </div>
  <div v-else class="glide" :class="{ 'ready': ready }" ref="glideRef">
    <div class="section-header">
      <h2 class="section-title">Your Daily Essentials</h2>
      <UButton variant="solid" >Discover What's Fresh</UButton>
    </div>
    <div class="glide__track" data-glide-el="track">
      <ul class="glide__slides">
        <li v-for="(item, index) in dailyEssentials" :key="index" class="glide__slide">
          <div class="essential-card">
            <div class="card-image-container">
              <img :src="item.image" :alt="item.name" class="essential-image" />
              <div class="card-overlay">
                <h3 class="card-title">{{ item.name }}</h3>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import Glide from '@glidejs/glide'

interface DailyEssential {
  name: string
  image: string
}

interface DailyEssentialsProps {
  options?: object
  autoplay?: number | boolean
  perView?: number
  gap?: number
  peek?: number | { before?: number; after?: number }
  breakpoints?: object
}

const props = withDefaults(defineProps<DailyEssentialsProps>(), {
  options: () => ({}),
  autoplay: false,
  perView: 7,
  gap: 20,
  peek: 0,
  breakpoints: () => ({
    1024: {
      perView: 3,
      peek: 30
    },
    768: {
      perView: 2,
      peek: 20
    },
    480: {
      perView: 1,
      peek: 10
    }
  })
})

const glideRef = ref<HTMLElement>()
let glide: Glide | null = null

const dailyEssentials = ref<DailyEssential[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const ready = ref(false)

// Daily essentials data based on the image
const fetchDailyEssentials = async () => {
  try {
    loading.value = true
    error.value = null

    const essentialsData = [
      {
        name: 'Noodles',
        image: 'https://picsum.photos/400/300?random=10'
      },
      {
        name: 'Dairy Products',
        image: 'https://picsum.photos/400/300?random=11'
      },
      {
        name: 'Seafood',
        image: 'https://picsum.photos/400/300?random=12'
      },
      {
        name: 'Snacks',
        image: 'https://picsum.photos/400/300?random=13'
      },
      {
        name: 'Coffee & Drinks',
        image: 'https://picsum.photos/400/300?random=14'
      },
      {
        name: 'Flour & Panko',
        image: 'https://picsum.photos/400/300?random=15'
      },
      {
        name: 'Dried Soup',
        image: 'https://picsum.photos/400/300?random=16'
      }
    ]

    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const imagePromises = essentialsData.map((item, index) =>
      fetch(item.image)
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch image')
          return {
            name: item.name,
            image: item.image
          }
        })
    )

    const fetchedEssentials = await Promise.all(imagePromises)
    dailyEssentials.value = fetchedEssentials
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load daily essentials'
    console.error('Error fetching daily essentials:', err)
  } finally {
    loading.value = false
    setTimeout(() => {
      ready.value = true
    }, 100)
  }
}

// Convert autoplay prop to Glide-compatible format
const getAutoplayValue = (): number | false => {
  if (typeof props.autoplay === 'number') return props.autoplay
  if (props.autoplay === true) return 3000
  return false
}

const defaultOptions = {
  type: 'carousel' as const,
  startAt: 0,
  perView: props.perView,
  gap: props.gap,
  peek: props.peek,
  autoplay: getAutoplayValue(),
  breakpoints: props.breakpoints,
  dragThreshold: 80,
  swipeThreshold: 50,
}

onMounted(async () => {
  await fetchDailyEssentials()

  if (glideRef.value) {
    glide = new Glide(glideRef.value, defaultOptions as any)
    glide.mount()
  }
})

onUnmounted(() => {
  if (glide) {
    glide.destroy()
  }
})

// Expose glide instance for external control
defineExpose({
  glide: () => glide
})
</script>

<style scoped>
@import '@glidejs/glide/dist/css/glide.core.min.css';

.glide {
  position: relative;
  box-sizing: border-box;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.glide.ready {
  opacity: 1;
  transform: translateY(0);
}

.glide * {
  box-sizing: inherit;
}

.glide__track {
  overflow: hidden;
}

.glide__slides {
  position: relative;
  list-style: none;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  touch-action: pan-Y;
  overflow: visible;
  padding: 0;
  white-space: nowrap;
  display: flex;
  flex-wrap: nowrap;
  will-change: transform;
}

.glide__slides li {
  flex-shrink: 0;
  white-space: normal;
  position: relative;
}

.glide__slide {
  height: 100%;
  position: relative;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 10px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.discover-btn {
  background: #2ecc71;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.discover-btn:hover {
  background: #27ae60;
  box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);
}

/* Card wrapper styles */
.essential-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin: 0 10px;
  height: 180px;
  position: relative;
}

.essential-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.card-image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.essential-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 30px 20px 20px;
  z-index: 2;
}

.card-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

/* Loading state */
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  font-size: 1.1rem;
  color: #666;
}

.error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  font-size: 1.1rem;
  color: #e74c3c;
  text-align: center;
  padding: 20px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .glide {
    transform: translateY(25px);
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    margin-bottom: 15px;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .essential-card {
    height: 250px;
    margin: 0 5px;
  }

  .card-overlay {
    padding: 25px 15px 15px;
  }

  .card-title {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .glide {
    transform: translateY(20px);
  }

  .section-title {
    font-size: 1.3rem;
  }

  .essential-card {
    height: 220px;
    margin: 0 3px;
  }

  .card-overlay {
    padding: 20px 12px 12px;
  }

  .card-title {
    font-size: 1rem;
  }
}
</style>