<template>
  <div>
    <Background />
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Background from './components/Background.vue'

export default defineComponent({
  name: 'App',
  components: {
    Background
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon {
  font-size: 32px;
  color: black;
}
</style>
