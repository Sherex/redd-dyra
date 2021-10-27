<template>
  <div id="background" />
</template>

<script lang="ts">
// TODO: Load images dynamically and eventually use selected (color, "cleaness") images from gallery
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Background'
})
</script>

<style scoped>
#background {
  background: url('/img/cat-wallpaper.jpg') no-repeat;
  background-position: center;
  background-size: cover;
  scale: 1.1; /* Hide blur edges */
  filter: blur(10px);
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: -1;
}
</style>
