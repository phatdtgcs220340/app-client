<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import SideBar from './components/SideBar/SideBar.vue';
  import { ref } from 'vue';
  const openSideBar = ref(false);
</script>

<template>
  <button class="sm:hidden" @click="openSideBar = !openSideBar">
    Open side bar
  </button>
  <SideBar :is-opened="openSideBar"/>
  <RouterView @click="openSideBar = false"/>
</template>

<style scoped>
/* Add your styles here */
</style>
