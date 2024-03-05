import {defineStore} from "pinia";
import {ref} from "vue";

export const useThemeStore = defineStore("themes", () => {
    const previousTheme = JSON.parse(localStorage.getItem('theme') || false)
    const darkTheme = ref(previousTheme)

    const toggleTheme = () => {
        darkTheme.value = !darkTheme.value

        localStorage.setItem('theme', darkTheme.value)
    }

    return {
        darkTheme,
        toggleTheme,
    }
})