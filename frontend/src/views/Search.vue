<template>
  <div class="flex-column">
    <div class="flex-row">
      <Search-Box id="search-box" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import SearchBox from '../components/Search-Box.vue'

export default defineComponent({
  name: 'Search',
  components: {
    SearchBox
  }
})
</script>
