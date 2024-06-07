<script setup>
import {useCountriesStore} from "@/store/useCountriesStore.js";
import {useThemeStore} from "@/store/useThemeStore.js";

const countriesStore = useCountriesStore()
const themeStore = useThemeStore()
</script>

<template>
  <div class="search-container d-flex position-relative h-100">
    <button
        @click="countriesStore.filterCountries()"
        :class="{'btn-outline-light': themeStore.darkTheme}"
        class="position-absolute px-4 h-100 z-1 btn btn-outline-secondary border-0">
      <i class="bi bi-search fs-4"></i>
    </button>
    <input
        type="text"
        v-model.trim="countriesStore.search"
        @keyup.enter="countriesStore.filterCountries()"
        placeholder="Search for a country..."
        :class="{'dark-mode shadow white-text': themeStore.darkTheme}"
        class="position-absolute h-100 border-0 w-25 rounded-2 w-100 fw-semibold">
  </div>
</template>

<style scoped>
@import "/styles.css";

input {
  box-shadow: 0 0 12px -4px rgba(125, 125, 125, 1);
  padding-left: 80px !important;
  font-size: 19px;
}

input:focus {
  outline: none;
}

.white-text::placeholder {
  color: rgba(201, 201, 201, 0.94) !important;
}

@media (max-width: 580px) {
  input::placeholder {
    font-size: 16px;
  }
}
</style>