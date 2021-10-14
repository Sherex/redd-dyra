<template>
  <div>
    <Background />
    <div class="flex-column">
      <div class="flex-row">
        <div>
          <img alt="Redd-dyra logo" src="../assets/redd-dyra-logo.png">
        </div>
        <h1 id="logo-text">
          REDD DYRA
        </h1>
      </div>
      <div class="flex-row">
        <Search-Box id="search-box" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchBox from '../components/Search-Box.vue'
import Background from '../components/Background.vue'

export default defineComponent({
  name: 'Home',
  components: {
    SearchBox,
    Background
  }
})
</script>

<style scoped>
.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flex-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
}

#logo-text {
  font-size: 2.5em;
  font-weight: bold;
  color: #B61B29;
  margin: 0;
  padding-left: 10px;
}

#search-box {
  width: 80%;
  max-width: 400px;
}
</style>
