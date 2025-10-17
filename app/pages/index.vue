<script setup lang="ts">
definePageMeta({
  auth: false
})
import Carousel from '~/components/Carousel.vue';
import Content from '~/sections/Content.vue';
import FindUs from '~/sections/FindUs.vue';
</script>

<template>
  <div class=" bg-gray-50">
     <Carousel :autoplay="4000" :perView="1" :peek="300" :gap="24"/>
     
    <div class="container  m-auto">
      <Content />
      </div>
      <FindUs/>
   
  </div>
</template>
