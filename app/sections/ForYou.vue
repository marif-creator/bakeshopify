<template>
  <section class="py-8 px-4 sm:px-6 lg:px-8">
    <!-- Section Header -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">For You</h2>
      <p class="text-gray-600">Discover products tailored just for you</p>
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 grid-equal-heights">
      <ProductThumbnail
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
// Sample product data
const products = ref([
  {
    id: '1',
    title: 'Samsung Galaxy Z Fold6',
    price: 19999000,
    originalPrice: 24999000,
    discount: 25,
    rating: 5.0,
    soldCount: 50,
    isOfficialStore: true,
    brand: 'Samsung',
    features: ['Note Assist', 'Photo Assist', 'Smart Select']
  },
  {
    id: '2',
    title: 'STANLEY ICEFLOW',
    price: 740000,
    originalPrice: 820000,
    discount: 10,
    rating: 5.0,
    soldCount: 500,
    isOfficialStore: true,
    brand: 'STANLEY',
    features: ['Insulated', 'BPA Free', 'Leak Proof']
  },
  {
    id: '3',
    title: 'HISENSE RR58D4IGN',
    price: 1105000,
    originalPrice: 1350000,
    discount: 18,
    rating: 4.8,
    soldCount: 150,
    isOfficialStore: true,
    brand: 'HISENSE',
    features: ['Energy Efficient', 'Quiet Operation', 'Large Capacity']
  },
  {
    id: '4',
    title: 'LENOVO LOQ 15IRX9',
    price: 13499000,
    originalPrice: 16499000,
    discount: 18,
    rating: 4.9,
    soldCount: 250,
    isOfficialStore: true,
    brand: 'LENOVO',
    features: ['Gaming Laptop', 'RTX Graphics', 'High Performance']
  },
  {
    id: '5',
    title: 'SKIN1004 Madagascar Centella Cream',
    price: 450000,
    originalPrice: 550000,
    discount: 18,
    rating: 4.9,
    soldCount: 750,
    isOfficialStore: true,
    brand: 'SKIN1004',
    features: ['Brightening', 'Soothing', 'Natural Ingredients']
  },
  {
    id: '6',
    title: 'Blackmores I-Folic 60',
    price: 115400,
    originalPrice: 128200,
    discount: 10,
    rating: 5.0,
    soldCount: 100,
    isOfficialStore: true,
    brand: 'Blackmores',
    features: ['Vitamin Supplement', 'Folic Acid', 'Health Support']
  },
  {
    id: '7',
    title: '150 ML MINYAK TELON MY BABY',
    price: 33700,
    originalPrice: 42000,
    discount: 20,
    rating: 4.9,
    soldCount: 200,
    isOfficialStore: false,
    brand: 'MY BABY',
    features: ['Baby Oil', 'Natural Formula', 'Gentle Care']
  },
  {
    id: '8',
    title: 'Apple iPad 11 2025',
    price: 4535000,
    originalPrice: 5000000,
    discount: 9,
    rating: 5.0,
    soldCount: 180,
    isOfficialStore: true,
    brand: 'Apple',
    features: ['Latest Model', 'High Resolution', 'Fast Performance']
  },
  {
    id: '9',
    title: 'Sepatu Running 910',
    price: 393518,
    originalPrice: 480000,
    discount: 18,
    rating: 4.9,
    soldCount: 400,
    isOfficialStore: false,
    brand: 'Orion Sport',
    features: ['Running Shoes', 'Comfortable', 'Durable']
  },
  {
    id: '10',
    title: 'DJI Mini 3 - 4K Camera Drone',
    price: 7930000,
    originalPrice: 9500000,
    discount: 17,
    rating: 5.0,
    soldCount: 180,
    isOfficialStore: true,
    brand: 'DJI',
    features: ['4K Camera', 'Lightweight', 'Easy Control']
  },
  {
    id: '11',
    title: 'ANTBOX Lemari Pakaian',
    price: 1759000,
    originalPrice: 2150000,
    discount: 18,
    rating: 4.9,
    soldCount: 750,
    isOfficialStore: true,
    brand: 'ANTBOX',
    features: ['Wardrobe', 'Spacious', 'Modern Design']
  },
  {
    id: '12',
    title: 'Xiaomi Poco X7 Pro 5G',
    price: 3515000,
    originalPrice: 4500000,
    discount: 22,
    rating: 5.0,
    soldCount: 250,
    isOfficialStore: true,
    brand: 'Xiaomi',
    features: ['5G Smartphone', 'Fast Charging', 'Great Camera']
  }
])
</script>

<style scoped>
/* Mobile-first responsive grid */
.grid {
  display: grid;
}

/* Auto rows for equal height in grid */
.auto-rows-max {
  grid-auto-rows: max-content;
}

/* CSS Grid with equal height items */
.grid-equal-heights {
  display: grid;
}

.grid-equal-heights > * {
  /* Ensure all direct children have equal height */
  height: 100%;
  /* Prevent content from overflowing */
  overflow: hidden;
}

/* 2 columns on mobile */
.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

/* 3 columns on small screens */
@media (min-width: 640px) {
  .sm\:grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 4 columns on medium screens */
@media (min-width: 768px) {
  .md\:grid-cols-4 {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* 5 columns on large screens */
@media (min-width: 1024px) {
  .lg\:grid-cols-5 {
    grid-template-columns: repeat(5, 1fr);
  }
}

/* 6 columns on extra large screens */
@media (min-width: 1280px) {
  .xl\:grid-cols-6 {
    grid-template-columns: repeat(6, 1fr);
  }
}

/* Gap spacing */
.gap-4 {
  gap: 1rem;
}

/* Responsive padding */
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .sm\:px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .lg\:px-8 {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

/* Section spacing */
.py-8 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}
</style>