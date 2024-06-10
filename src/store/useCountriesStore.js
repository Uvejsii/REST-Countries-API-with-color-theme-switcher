import { defineStore } from "pinia";
import { ref } from "vue";
import data from "/src/store/data.json"

export const useCountriesStore = defineStore("country", () => {
    const countriesDataFile = data;
    const countries = ref(countriesDataFile);
    const filteredCountries = ref([]);
    const search = ref('');

    filteredCountries.value = countries.value

    const formatPopulation = (population) => {
        return new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(population);
    };

    const refreshCountries = () => {
        filteredCountries.value = countries.value;
        search.value = '';
    };

    const filterCountries = () => {
        filteredCountries.value = countries.value.filter(c => c.name.toLowerCase().includes(search.value.toLowerCase()));
    };

    const filterCountriesByRegion = (regionToFilter) => {
        filteredCountries.value = countries.value.filter(c => c.region.includes(regionToFilter));
    };

    return {
        countriesDataFile,
        countries,
        filteredCountries,
        search,
        formatPopulation,
        refreshCountries,
        filterCountries,
        filterCountriesByRegion,
    };
});
