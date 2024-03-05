<script setup>
import {ref} from "vue";
import {useCountriesStore} from "@/store/useCountriesStore.js";
import {useThemeStore} from "@/store/useThemeStore.js";

const countriesStore = useCountriesStore()
const themeStore = useThemeStore()

const darkButton = ref(true)
</script>

<template>
  <header class="border-bottom shadow-sm"
          :class="{'dark-mode border-dark': themeStore.darkTheme}">
    <nav class="d-flex justify-content-between align-items-center mx-5 py-3">
      <div class="left-header">
        <RouterLink to="/" class="text-dark text-decoration-none">
          <h3 class="fw-bold m-0" :class="{'text-light': themeStore.darkTheme}" @click="countriesStore.refreshCountries()">
            Where in the
            world?</h3>
        </RouterLink>
      </div>
      <div class="right-header">
        <button
            v-if="themeStore.darkTheme"
            @click="themeStore.toggleTheme()"
            class="btn border-0 fs-4 fw-semibold"
            :class="{'btn-outline-light': themeStore.darkTheme}">
          <i class="bi bi-brightness-high"></i>
          Light Mode
        </button>
        <button
            v-else
            @click="themeStore.toggleTheme()"
            class="btn border-0 fs-4 fw-semibold"
            :class="{'btn-outline-dark': darkButton}">
          <i class="bi bi-moon"></i>
          Dark Mode
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
@import "styles.css";

.left-header h3 {
  cursor: pointer;
}

.right-header {
  cursor: pointer;
}

@media (max-width: 580px) {
  .left-header h3 {
    font-size: 18px !important;
  }

  .right-header button {
    font-size: 17px !important;
  }
}

@media (max-width: 460px) {
  .left-header h3 {
    font-size: 15px !important;
  }

  .right-header button {
    font-size: 14px !important;
  }
}
</style>