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

.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flex-row {
  width: 85%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
}

.icon {
  font-size: 32px;
  color: black;
}

.white-bg-round {
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 20px;
}
</style>
