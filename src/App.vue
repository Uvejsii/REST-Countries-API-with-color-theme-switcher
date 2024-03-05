<script setup>
import {RouterView} from 'vue-router'
import Navbar from "@/components/Navbar.vue";
import {useThemeStore} from "@/store/useThemeStore.js";

const themeStore = useThemeStore()
</script>

<template>
  <div
      class="h-auto app-container"
      :class="{'very-dark-mode': themeStore.darkTheme}">
    <Navbar/>
    <RouterView/>
  </div>
</template>

<style scoped>
@import "styles.css";

.app-container {
  padding-bottom: 200px;
}
</style>
