<script setup>
import SearchBar from "@/components/SearchBar.vue";
import Filter from "@/components/Filter.vue";
import CountryCard from "@/components/CountryCard.vue";
</script>

<template>
  <main class="m-5 mb-0 pb-5">
    <div class="row search-and-filter d-flex justify-content-between">
      <div class="search col-xl-4 col-lg-4 col-md-5 col-sm-6 col-12">
        <SearchBar/>
      </div>
      <div class="filter col-xl-3 col-lg-3 col-md-5 col-sm-5 col-8">
        <Filter/>
      </div>
    </div>
    <CountryCard/>
  </main>
</template>

<style scoped>
.search-and-filter {
  height: 70px;
}

@media (max-width: 580px) {
  main {
    margin-left: 30px !important;
    margin-right: 30px !important;
  }

  .search-and-filter {
    height: 180px !important;
  }

  .search {
    height: 60px;
  }

  .filter {
    height: 60px;
  }
}
</style>
