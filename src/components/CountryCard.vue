<script setup>
import {useCountriesStore} from "@/store/useCountriesStore.js";
import {useThemeStore} from "@/store/useThemeStore.js";
import {onMounted} from "vue";

const countriesStore = useCountriesStore()
const themeStore = useThemeStore()

onMounted(() => {
  countriesStore.fetchData()
})
</script>

<template>
  <div
      v-if="countriesStore.filteredCountries.length > 0"
      class="row row-cols-1 row-cols-md-3 g-5 mt-1">
    <div
        v-for="country in countriesStore.filteredCountries"
        :key="country.cca3"
        class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
      <RouterLink
          :to="`/country/${country.cca3}`"
          class="text-decoration-none">
        <div class="card h-100 shadow border" :class="{'dark-mode border-dark': themeStore.darkTheme}">
          <img :src="country.flags.png" class="card-img-top" :alt="country.flags.alt">
          <div class="card-body">
            <h5 class="card-title fw-bold mb-3">{{ country.name.common }}</h5>
            <p class="card-text m-0">
              <b>Population:</b> {{ countriesStore.formatPopulation(country.population) }}
            </p>
            <p class="card-text my-1">
              <b>Region:</b> {{ country.region }}
            </p>
            <p class="card-text m-0">
              <b>Capital: </b>
              <span v-if="!country.capital"> -</span>
              <span v-else>
                {{
                  country.capital && country.capital.length > 1 ? Object.values(country.capital).join(', ').toString() : String(country.capital)
                }}
              </span>
            </p>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
  <div v-else
       :class="{'very-dark-mode': themeStore.darkTheme}"
       class="d-flex justify-content-center align-items-center vh-100"><p class="fs-1">Loading...</p></div>
</template>

<style scoped>
@import "/styles.css";

.card {
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.card:hover {
  scale: 1.05;
}

.card img {
  height: 200px;
}
</style>