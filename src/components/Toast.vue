<script setup>
import {onMounted, ref} from "vue";

const isToastVisible = ref(true)

onMounted(() => {
  setTimeout(() => {
    isToastVisible.value = false
  }, 6000)
})
</script>

<template>
    <div v-if="isToastVisible" class="toast-container bg-primary-subtle p-3 rounded-2 shadow-sm mx-5">
      <div class="toast-header">
        <strong class="me-auto fs-5">Info <i class="bi bi-info-circle"></i></strong>
      </div>
      <div class="toast-body">
        <p class="m-0 fw-bold">
          You might need to refresh the page to see all countries data
        </p>
      </div>
    </div>
</template>

<style scoped>
.toast-container {
  margin-top: 400px;
}
</style>