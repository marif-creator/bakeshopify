<template>
    <div id="main">
    <Header/>
    <slot />
     <Footer/>
    <!-- <div id="chat" class="absolute bottom-0  z-10">chat</div> -->
    </div>
</template>

<script setup lang="js">
import Footer from '~/sections/Footer.vue';
import Header from '~/sections/Header.vue';
</script>