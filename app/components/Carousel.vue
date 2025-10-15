<template>
   <div v-if="loading" class="loading">
     Loading carousel images...
   </div>
   <div v-else-if="error" class="error">
     {{ error }}
   </div>
   <div v-else class="glide" :class="{ 'ready': ready }" ref="glideRef">
     <div class="glide__track" data-glide-el="track">
       <ul class="glide__slides">
         <li v-for="(image, index) in images" :key="index" class="glide__slide">
           <div class="image-card">
             <img :src="image.url" :alt="image.alt" class="carousel-image" />
             <div class="card-overlay" :class="[
               `overlay-${image.overlayVertical || 'bottom'}`,
               `overlay-${image.overlayHorizontal || 'left'}`
             ]">
               <div class="overlay-content">
                 <h3 class="card-title">{{ image.title }}</h3>
                 <p class="card-description">{{ image.description }}</p>
                 <button
                   v-if="props.showButton && image.buttonUrl"
                   class="overlay-button"
                   @click="openUrl(image.buttonUrl)"
                 >
                   {{ image.buttonText || 'Learn More' }}
                 </button>
               </div>
             </div>
           </div>
         </li>
       </ul>
     </div>
     <div v-if="showDots && images.length > 1" class="glide__bullets" data-glide-el="controls[nav]">
       <button
         v-for="(slide, index) in images.length"
         :key="index"
         class="glide__bullet"
         :class="{ 'glide__bullet--active': index === 0 }"
         :data-glide-dir="`=${index}`"
         @click="goToSlide(index)"
       ></button>
     </div>
   </div>
 </template>

<script setup lang="ts">
 import { ref, onMounted, onUnmounted, nextTick } from 'vue'
 import Glide from '@glidejs/glide'

 interface CarouselProps {
   options?: object
   autoplay?: number | boolean
   perView?: number
   gap?: number
   peek?: number | { before?: number; after?: number }
   breakpoints?: object
   showDots?: boolean
   showButton?: boolean
 }

 const props = withDefaults(defineProps<CarouselProps>(), {
   options: () => ({}),
   autoplay: false,
   perView: 1,
   gap: 0,
   peek: 0,
   showDots: true,
   breakpoints: () => ({
     768: {
       perView: 1,
       peek: 40
     },
     480: {
       perView: 1,
       peek: 20
     }
   }),
   showButton: true
 })

 const glideRef = ref<HTMLElement>()
 let glide: Glide | null = null

 // Reactive data for carousel images
 const images = ref<Array<{
   url: string
   alt: string
   title: string
   description: string
   buttonUrl?: string
   buttonText?: string
   overlayVertical?: 'top' | 'middle' | 'bottom'
   overlayHorizontal?: 'left' | 'center' | 'right'
 }>>([])

 const loading = ref(true)
 const error = ref<string | null>(null)
 const ready = ref(false)

 // Fetch images from public API
 const fetchImages = async () => {
   try {
     loading.value = true
     error.value = null

     // Using Lorem Picsum API to get 5 random images with different overlay positions
     const sampleData = [
       {
         buttonUrl: 'https://picsum.photos/800/600?random=1',
         buttonText: 'View Gallery',
         title: 'Beautiful Image 1',
         description: 'This is a beautiful random image from Lorem Picsum #1',
         overlayVertical: 'bottom' as const,
         overlayHorizontal: 'left' as const
       },
       {
         buttonUrl: 'https://picsum.photos/800/600?random=2',
         buttonText: 'Learn More',
         title: 'Beautiful Image 2',
         description: 'This is a beautiful random image from Lorem Picsum #2',
         overlayVertical: 'top' as const,
         overlayHorizontal: 'right' as const
       },
       {
         buttonUrl: 'https://picsum.photos/800/600?random=3',
         buttonText: 'Explore',
         title: 'Beautiful Image 3',
         description: 'This is a beautiful random image from Lorem Picsum #3',
         overlayVertical: 'middle' as const,
         overlayHorizontal: 'center' as const
       },
       {
         buttonUrl: 'https://picsum.photos/800/600?random=4',
         buttonText: 'Discover',
         title: 'Beautiful Image 4',
         description: 'This is a beautiful random image from Lorem Picsum #4',
         overlayVertical: 'top' as const,
         overlayHorizontal: 'left' as const
       },
       {
         buttonUrl: 'https://picsum.photos/800/600?random=5',
         buttonText: 'See Details',
         title: 'Beautiful Image 5',
         description: 'This is a beautiful random image from Lorem Picsum #5',
         overlayVertical: 'bottom' as const,
         overlayHorizontal: 'right' as const
       }
     ]

     const imagePromises = sampleData.map((data, index) =>
       fetch(`https://picsum.photos/800/600?random=${index + 1}`)
         .then(response => {
           if (!response.ok) throw new Error('Failed to fetch image')
           return {
             url: `https://picsum.photos/800/600?random=${index + 1}`,
             alt: `Random image ${index + 1}`,
             ...data
           }
         })
     )

     const fetchedImages = await Promise.all(imagePromises)
     images.value = fetchedImages
   } catch (err) {
     error.value = err instanceof Error ? err.message : 'Failed to fetch images'
     console.error('Error fetching images:', err)
   } finally {
     loading.value = false
     // Trigger animation after a brief delay to ensure DOM is updated
     setTimeout(() => {
       ready.value = true
     }, 100)
   }
 }

// Convert autoplay prop to Glide-compatible format
const getAutoplayValue = (): number | false => {
  if (typeof props.autoplay === 'number') return props.autoplay
  if (props.autoplay === true) return 3000 // Default 3s when true
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
  ...props.options
}

onMounted(async () => {
  // Fetch images first
  await fetchImages()

  // Initialize carousel after images are loaded
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


// Method to navigate to specific slide
const goToSlide = (index: number) => {
  if (glide) {
    glide.go(`=${index}`)
  }
}

// Method to open URL in new tab
const openUrl = (url: string) => {
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

// Expose glide instance for external control
defineExpose({
  glide: () => glide
})
</script>

<style scoped>
@import '@glidejs/glide/dist/css/glide.core.min.css';

.glide {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 60px;
  /* Space for bullets */
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
  margin-top: 20px;
}

.glide__slides {
  position: relative;
  width: 100%;
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
  width: 100%;
  height: 100%;
  position: relative;
}

.glide__arrows {
  display: none;
}

.glide__arrow {
  pointer-events: auto;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.glide__arrow:hover {
  background: rgba(255, 255, 255, 1);
}

.glide__arrow--left {
  margin-left: -20px;
}

.glide__arrow--right {
  margin-right: -20px;
}

.glide__bullets {
  position: absolute;
  margin-top: 5px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 2;
}

.glide__bullet {
  width: 14px;
  height: 14px;
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.glide__bullet:hover {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(255, 255, 255, 1);
  transform: scale(1.1);
}

.glide__bullet--active {
  background: rgba(255, 255, 255, 1);
  border-color: rgba(255, 255, 255, 1);
  transform: scale(1.2);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
}

 /* Card wrapper styles */
.image-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin: 0 10px;
  height: 300px;
  position: relative;
}

.image-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-overlay {
  position: absolute;
  color: white;
  padding: 20px;
  transform: translateY(0);
  z-index: 2;
}

/* Vertical positioning */
.overlay-top {
  top: 0;
  bottom: auto;
}

.overlay-middle {
  top: 50%;
  bottom: auto;
  transform: translateY(-50%);
}

.overlay-bottom {
  bottom: 0;
  top: auto;
}

/* Horizontal positioning */
.overlay-left {
  left: 0;
  right: auto;
}

.overlay-center {
  left: 0;
  right: 0;
}

.overlay-right {
  right: 0;
  left: auto;
}

.card-title {
  margin: 0 0 8px 0;
  font-size: 1.5rem;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.card-description {
  margin: 0 0 15px 0;
  font-size: 0.9rem;
  opacity: 0.9;
  line-height: 1.4;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.overlay-button {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.8);
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.overlay-button:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 1);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
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
    padding-bottom: 50px;
  }

  .glide {
    transform: translateY(25px);
  }

  .glide__bullets {
    bottom: -40px;
  }

  .glide__bullet {
    width: 12px;
    height: 12px;
  }

  .image-card {
    height: 350px;
    margin: 0 5px;
  }

  .carousel-image {
    height: 100%;
  }

  .card-overlay {
    padding: 15px;
  }

  .overlay-button {
    padding: 8px 16px;
    font-size: 0.8rem;
  }

  .card-title {
    font-size: 1.3rem;
  }

  .card-description {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .glide {
    padding-bottom: 45px;
  }

  .glide {
    transform: translateY(20px);
  }

  .glide__bullets {
    bottom: -35px;
    gap: 10px;
  }

  .glide__bullet {
    width: 10px;
    height: 10px;
  }

  .image-card {
    height: 300px;
    margin: 0 3px;
  }

  .carousel-image {
    height: 100%;
  }

  .card-overlay {
    padding: 12px;
  }

  .overlay-button {
    padding: 6px 12px;
    font-size: 0.75rem;
  }

  .card-title {
    font-size: 1.2rem;
  }

  .card-description {
    font-size: 0.8rem;
  }
}
</style>