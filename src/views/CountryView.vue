<script setup>
import {useCountriesStore} from "@/store/useCountriesStore.js";
import {useThemeStore} from "@/store/useThemeStore.js";
import {onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

const countriesStore = useCountriesStore()
const themeStore = useThemeStore()

const route = useRoute()
const router = useRouter()
const newCountry = ref({})
const country = ref({})

watch(() => route.params.id, () => {
  newCountry.value = countriesStore.filteredCountries.find(c => c.cca3 === route.params.id)
  country.value = newCountry.value
})

const getCountryNameByBorder = (border) => {
  const targetCountry = countriesStore.filteredCountries.find(c => c.cca3 === border);
  return targetCountry ? targetCountry.name.common : '';
}

onMounted(async () => {
  const response = await fetch('https://restcountries.com/v3.1/all')
  const data = await response.json()
  country.value = data.find(c => c.cca3 === route.params.id)

  countriesStore.fetchData()
})
</script>

<template>
  <div
      v-if="Object.keys(country).length !== 0"
      :class="{'dark-mode-country': themeStore.darkTheme}"
      class="m-5 mb-0 country-view-container">
    <div class="row mb-5">
      <div class="buttons-container col-xl-2 col-lg-2 col-md-3 col-sm-3 pe-0">
        <button
            v-if="themeStore.darkTheme"
            @click="router.back()"
            class="dark-theme-btns btn border border-dark text-light shadow-lg fw-semibold w-75">
          <i class="bi bi-arrow-left"></i> Back
        </button>
        <button
            v-else
            @click="router.back()"
            class="btn btn-outline-dark border shadow fw-semibold w-75">
          <i class="bi bi-arrow-left"></i> Back
        </button>
      </div>
    </div>
    <div class="row d-flex justify-content-between gap-3 pt-4">
      <div class="col-xl-5 col-lg-6">
        <img :src="country?.flags.png" class="img-fluid h-100 w-100" :alt="country?.flags.alt">
      </div>
      <div class="col-xl-6 col-lg-5">
        <h1 class="mb-4 fw-bold">
          <span v-if="!country?.name.common"> -</span>
          <span v-else> {{ country?.name.common }}</span>
        </h1>
        <div class="row">
          <div class="country-info-container d-flex justify-content-between gap-5">
            <div class="left-details d-flex col-xl-5 col-lg-6 col-md-12 flex-column gap-2">
              <p class="m-0">
                <b>Native Name: </b>
                <span v-if="!country?.name.nativeName"> -</span>
                <span v-else>{{ Object.values(country?.name.nativeName)[0].official }}</span>
              </p>
              <p class="m-0"><b>Population: </b>
                <span v-if="!country?.population"> -</span>
                <span v-else>{{ countriesStore.formatPopulation(country?.population) }}</span>
              </p>
              <p class="m-0"><b>Region: </b>
                <span v-if="!country?.region"> -</span>
                <span v-else>{{ country?.region }}</span>
              </p>
              <p class="m-0"><b>Sub Region: </b>
                <span v-if="!country?.subregion"> -</span>
                <span v-else>{{ country?.subregion }}</span>
              </p>
              <p class="m-0">
                <b>Capital: </b>
                <span v-if="!country?.capital"> -</span>
                <span v-else>
                    {{
                    country?.capital && country?.capital.length > 1 ? Object.values(country?.capital).join(', ').toString() : String(country?.capital)
                  }}
                  </span>
              </p>
            </div>
            <div class="right-details col-xl-5 col-lg-5 col-md-12 d-flex flex-column gap-2">
              <p
                  v-if="country?.tld"
                  class="m-0">
                <b>Top Level Domain: </b>
                {{ Object.values(country?.tld).join(', ').toString() }}
              </p>
              <p
                  v-else
                  class="m-0">
                <b>Top Level Domain: </b>
                No Data
              </p>
              <p class="m-0">
                <b>Currencies: </b>
                <span v-if="!country?.currencies"> -</span>
                <span v-else>
                       {{ Object.values(country?.currencies)[0].name }} - ({{
                    Object.values(country?.currencies)[0].symbol
                  }})
                    </span>
              </p>
              <p class="m-0">
                <b>Languages: </b>
                <span v-if="!country?.languages"> -</span>
                <span v-else>
                      {{ Object.values(country?.languages).join(', ').toString() }}
                </span>
              </p>
            </div>
          </div>
          <div class="borders col-12 mt-5 d-flex gap-2 flex-wrap align-items-center">
            <div>
              <p class="m-0 border-countries">
                <b>Border Countries:</b>
              </p>
            </div>
            <p class="m-0">
              <span v-if="!country?.borders">No border countries</span>
            </p>
            <div
                v-for="border in country?.borders"
                :key="border.cca3"
                class="d-flex">
              <RouterLink :to="`/country/${border}`">
                <button
                    v-if="themeStore.darkTheme"
                    class="dark-theme-btns btn border border-dark text-light shadow-lg fw-semibold shadow-lg">
                  {{ getCountryNameByBorder(border) }}
                </button>
                <button
                    v-else
                    class="btn btn-outline-dark fw-semibold border shadow-sm">
                  {{ getCountryNameByBorder(border) }}
                </button>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="position-absolute start-50 top-50"><h1>Loading...</h1></div>
</template>

<style scoped>
.dark-theme-btns {
  background-color: var(--dark-blue) !important;
}

.dark-theme-btns:hover {
  scale: 1.1;
}

.dark-mode-country h1 {
  color: white;
}

.dark-mode-country p {
  color: rgb(218, 218, 218) !important;
}

.dark-mode-country b {
  color: rgb(245, 245, 245) !important;
}

@media (max-width: 995px) {
  .country-info-container {
    flex-direction: column !important;
  }
}

@media (max-width: 750px) {
  .border-countries {
    width: 60vw !important;
  }
}

@media (max-width: 576px) {
  .buttons-container {
    width: 150px !important;
  }
}
</style>
