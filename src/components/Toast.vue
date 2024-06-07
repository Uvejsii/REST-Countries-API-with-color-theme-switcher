<script setup>
import {onMounted} from "vue";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal} from 'bootstrap';

onMounted(() => {
  const modal = new Modal(document.getElementById('exampleModal'));
  modal.show();
});
</script>

<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 fw-bold" id="exampleModalLabel">Info <i class="bi bi-info-circle"></i></h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body fw-bold">
          If you do not see countries data within few seconds please refresh the page
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
