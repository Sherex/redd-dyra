<template>
  <div>
    <div id="parent">
      <input id="search-field" type="search" placeholder="Søk på navn, ID, fosterhjem.." v-model="searchText">
      <Magnify class="icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Magnify } from 'mdue'

export default defineComponent({
  name: 'SearchBox',
  components: {
    Magnify
  },
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
  align-items: center;
}

#search-field {
  background-color: rgba(0, 0, 0, 0);
  outline: none;
  border: none;
  width: 100%;
  padding: 10px 0px 10px 15px;
}

.icon {
  padding: 0px 10px 0px 5px;
}
</style>
