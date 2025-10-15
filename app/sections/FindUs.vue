<template>
  <div class="find-us-section py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Find Us</h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Visit our locations or get in touch with us. We're here to serve you the finest products.
        </p>
      </div>

      <!-- Locations and Map Container -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <!-- Locations Info -->
        <div class="space-y-8">
          <!-- London Location -->
          <div class="location-card bg-white rounded-lg shadow-md p-6">
            <h3 class="text-2xl font-semibold text-gray-900 mb-4">London</h3>

            <div class="space-y-3">
              <div class="flex items-start space-x-3">
                <div class="icon mt-1">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900 mb-1">Address</p>
                  <p class="text-gray-600">1517 Washing Ave. Manchester, Kentucky 39495</p>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <div class="icon">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900 mb-1">Phone</p>
                  <p class="text-gray-600">077 4252 4776</p>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <div class="icon">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900 mb-1">Email</p>
                  <p class="text-gray-600">demo@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Google Map -->
        <div class="map-container">
          <div class="bg-white rounded-lg shadow-md p-4">
            <div class="aspect-video w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3224.962609332409!2d-121.30286068468735!3d38.13413607970375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8090013fdfd3e5c9%3A0x8c648f8b5c5b3a3f!2s1826%20S%20Hutchins%20St%2C%20Lodi%2C%20CA%2095240%2C%20USA!5e0!3m2!1sen!2sus!4v1703123456789!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style="border:0; border-radius: 8px;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
            <div class="mt-4 flex justify-between items-center">
              <button class="text-green-600 hover:text-green-700 text-sm font-medium flex items-center space-x-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                <span>View larger map</span>
              </button>
              <button class="text-green-600 hover:text-green-700 text-sm font-medium flex items-center space-x-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                </svg>
                <span>Directions</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Location data can be easily modified or extended
const locations = [
  {
    id: 2,
    name: 'London',
    address: '1517 Washing Ave. Manchester, Kentucky 39495',
    phone: '077 4252 4776',
    email: 'demo@gmail.com'
  }
];
</script>

<style scoped>
.find-us-section {
  min-height: 600px;
}

.location-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.location-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.icon {
  flex-shrink: 0;
}

.map-container {
  position: sticky;
  top: 100px;
}

@media (max-width: 1024px) {
  .map-container {
    position: static;
    margin-top: 2rem;
  }
}
</style>