<template>
  <div id="content-section" class="content-area py-8">
    <div class="container mx-auto">
      <div class="">
        <DailyEssentials />
        <ForYou />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DailyEssentials from '~/components/DailyEssentials.vue';
import ForYou from '~/sections/ForYou.vue';
</script>