<script setup lang="ts">
import { ref } from 'vue';
import LoginBox from './components/Login/LoginBox.vue';
import SideBar from './components/SideBar/SideBar.vue';
import WelcomePage from './components/Welcome/WelcomePage.vue';

const loginBoxVisible = ref(false);
</script>

<template>
  <LoginBox
    v-show="loginBoxVisible"
  />
  <SideBar @toggle-login="() => loginBoxVisible = !loginBoxVisible" />
  <div class="p-4 pt-8 sm:ml-64">
    <div class="p-2 border-2 border-gray-200 border-dashed rounded-lg">
      <WelcomePage class="bg-gray-100 rounded-lg"/>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
