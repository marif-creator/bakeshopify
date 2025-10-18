<template>
    <div id="main">
    <Header/>
    <slot />
     <Footer/>
    <ChatWidget />
    </div>
</template>

<script setup lang="js">
import Footer from '~/sections/Footer.vue';
import Header from '~/sections/Header.vue';
import ChatWidget from '~/components/ChatWidget.vue';
</script>