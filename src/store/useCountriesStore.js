import { defineStore } from "pinia";
import { ref } from "vue";

export const useCountriesStore = defineStore("country", () => {
    const apiUrl = 'https://restcountries.com/v3.1/all';
    const countries = ref([]);
    const filteredCountries = ref([]);
    const search = ref('');

    const fetchData = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const data = await response.json();
            countries.value = data;
            filteredCountries.value = countries.value;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const formatPopulation = (population) => {
        return new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(population);
    };

    const refreshCountries = () => {
        filteredCountries.value = countries.value;
        search.value = '';
    };

    const filterCountries = () => {
        filteredCountries.value = countries.value.filter(c => c.name.common.toLowerCase().includes(search.value.toLowerCase()));
    };

    const filterCountriesByRegion = (regionToFilter) => {
        filteredCountries.value = countries.value.filter(c => c.region.includes(regionToFilter));
    };

    return {
        apiUrl,
        countries,
        filteredCountries,
        search,
        fetchData,
        formatPopulation,
        refreshCountries,
        filterCountries,
        filterCountriesByRegion,
    };
});
