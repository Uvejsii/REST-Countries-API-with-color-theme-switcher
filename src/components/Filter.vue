<script setup>
import {ref} from "vue";
import {useCountriesStore} from "@/store/useCountriesStore.js";
import {useThemeStore} from "@/store/useThemeStore.js";

const countriesStore = useCountriesStore()
const themeStore = useThemeStore()
const showFilterOptions = ref(false)

const toggleFilterOptions = () => {
  showFilterOptions.value = !showFilterOptions.value
}
</script>

<template>
  <div
      :class="{'dark-mode border-0': themeStore.darkTheme}"
      class="filter-container border rounded position-relative h-100 shadow">
    <div
        @click="toggleFilterOptions"
        class="filter-header h-100 d-flex justify-content-between align-items-center px-4">
      <div class="filter-by">
        <h5 class="m-0">Filter by Region</h5>
      </div>
      <div>
        <i v-if="showFilterOptions" class="bi bi-chevron-up fs-5"></i>
        <i v-else class="bi bi-chevron-down fs-5"></i>
      </div>
    </div>
    <div
        v-if="showFilterOptions"
        :class="{'dark-mode border-0 white-text': themeStore.darkTheme}"
        class="filter-options z-1 bg-light-subtle p-4 d-flex flex-column gap-2 shadow rounded border fw-semibold position-absolute top-100 w-100 start-0 mt-2">
      <p class="m-0" @click="countriesStore.refreshCountries()">Filter All</p>
      <p class="m-0" @click="countriesStore.filterCountriesByRegion('Africa')">Africa</p>
      <p class="m-0" @click="countriesStore.filterCountriesByRegion('America')">America</p>
      <p class="m-0" @click="countriesStore.filterCountriesByRegion('Asia')">Asia</p>
      <p class="m-0" @click="countriesStore.filterCountriesByRegion('Europe')">Europe</p>
      <p class="m-0" @click="countriesStore.filterCountriesByRegion('Oceania')">Oceania</p>
    </div>
  </div>
</template>

<style scoped>
@import "/styles.css";

.filter-header {
  cursor: pointer;
}

.filter-options p {
  font-size: 18px;
  cursor: pointer;
}

.filter-options p:hover {
  color: rgba(103, 103, 103, 0.8);
}

.white-text p {
  color: white !important;
}

.white-text p:hover {
  color: #bdbdbd !important;
}

@media (max-width: 520px) {
  .filter-by h5 {
    font-size: 16px !important;
  }

  i {
    font-size: 16px !important;
  }
}

@media (max-width: 460px) {
  .filter-by h5 {
    font-size: 13px !important;
  }

  i {
    font-size: 13px !important;
  }

  .filter-options p {
    font-size: 15px !important;
  }
}
</style>