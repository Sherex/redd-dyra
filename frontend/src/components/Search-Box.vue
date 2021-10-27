<template>
  <div class="searchbox-parent" :class="{ 'searchbox-parent-expanded': expandSearchBox }">
    <div class="search-parent" :class="{ 'border-bottom': showQrReader }">
      <Home id="home-icon" class="icon"  v-if="currentRoute !== '/'" @click="routeToDashboard" />
      <input id="search-field" type="search" placeholder="Søk på navn, ID, fosterhjem.." v-model="searchText">
      <QrcodeScan id="qr-icon" class="icon" @click="toggleQrReader" />
      <Magnify id="search-icon" class="icon" />
    </div>
    <div v-if="showQrReader" class="qr-dropdown">
      <QrReader :hideCamera="!expandSearchBox" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Magnify, Home, QrcodeScan } from 'mdue'
import router from '../router'
import QrReader from './Qr-Reader.vue'

export default defineComponent({
  name: 'SearchBox',
  components: {
    Magnify,
    Home,
    QrcodeScan,
    QrReader
  },
  data: () => ({
    searchText: '',
    showQrReader: false,
    expandSearchBox: false
  }),
  methods: {
    routeToDashboard: () => {
      router.push('/')
    },
    toggleQrReader: function () {
      if (!this.showQrReader) this.showQrReader = true
      this.expandSearchBox = !this.expandSearchBox
    }
  },
  computed: {
    currentRoute: () => {
      return router.currentRoute.value.path
    }
  },
  mounted () {
    const searchBox = document.getElementsByClassName('searchbox-parent')[0]
    searchBox.addEventListener('transitionend', () => {
      if (!this.expandSearchBox) this.showQrReader = false
    }, true)
  }
})
</script>

<style scoped>
.searchbox-parent {
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 20px;
  align-items: center;
  width: 100%;
  max-width: 400px;
  height: 40px;
  transition: height 0.3s;
}

.searchbox-parent-expanded {
  height: 250px;
}

.search-parent {
  display: flex;
  border-radius: 20px;
  align-items: center;
  min-height: 40px;
  width: 100%;
}

.border-bottom {
  border-bottom: black solid 1px;
}

.qr-dropdown {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 20px 20px 20px;
  border-radius: 0px 0px 20px 20px;
}

#search-field {
  background-color: transparent;
  outline: none;
  border: none;
  width: 100%;
  padding: 10px 0px 10px 15px;
}

#home-icon + #search-field {
  border-left: #7E7E7E 1px solid;
  padding-left: 5px;
}

#search-icon {
  padding: 0px 10px 0px 5px;
}

#qr-icon {
  padding: 0px 0px 0px 5px;
}

#home-icon {
  padding: 0px 5px 0px 10px;
}
</style>
