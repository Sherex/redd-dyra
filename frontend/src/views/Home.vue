<template>
  <div>
    <div class="background" />
    <van-row justify="center">
      <van-col span="4" class="logo">
        <img alt="Redd-dyra logo" src="../assets/redd-dyra-logo.png">
      </van-col>
      <van-col span="16" class="logo">
        <h1>REDD DYRA</h1>
      </van-col>
    </van-row>
    <van-row justify="center">
      <van-col span="18" class="logo">
        <Search-Box />
      </van-col>
    </van-row>
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
.background {
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
.logo {
  font-size: 1.3em;
  text-align: center;
}
.logo img {
  padding-top: 16px; /* TODO: Is there a way to calculate this? */
}
</style>
