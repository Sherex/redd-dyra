<template>
  <div class="Search-Box">
    <!-- <van-search
      id="searchField"
      v-model="searchText"
      placeholder="Søk på navn, ID, fosterhjem.."
      shape="round"
      background="#FFFFFF00"
    /> -->
    <van-field
      v-model="message"
      label=""
      placeholder="Søk på navn, ID, fosterhjem.."
    />
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

<style>
#searchField {
  color: rgba(0, 0, 0, 128);
}
</style>
