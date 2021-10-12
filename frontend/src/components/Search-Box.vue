<template>
  <div>
    <div id="parent">
      <input id="search-field" type="search" placeholder="Søk på navn, ID, fosterhjem.." v-model="searchText">
      <!-- TODO: Search icon -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SearchBox',
  data: () => ({
    searchText: ''
  })
})
</script>

<style scoped>
#parent {
  display: flex;
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 20px;
}

#search-field {
  background-color: rgba(0, 0, 0, 0);
  outline: none;
  border: none;
  width: 100%;
  padding: 10px 20px;
}
</style>
