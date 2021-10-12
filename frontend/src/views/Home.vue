<template>
  <div>
    <div id="background" />
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

export default defineComponent({
  name: 'Home',
  components: {
    SearchBox
  }
})
</script>

<style scoped>
.flex-column {
  display: flex;
  flex-direction: column;
}

.flex-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
}

#background {
  background: url('/img/cat-wallpaper.jpg') no-repeat;
  background-position: -520px 0px;
  filter: blur(10px);
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: -1;
}

#logo-text {
  font-size: 2em;
  font-weight: bold;
  color: #B61B29;
}

#search-box {
  width: 80%
}
</style>
