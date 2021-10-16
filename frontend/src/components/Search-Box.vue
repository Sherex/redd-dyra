<template>
  <div>
    <div id="parent">
      <ViewDashboardOutline id="dashboard-icon" class="icon"  v-if="currentRoute !== '/'" @click="routeToDashboard" />
      <input id="search-field" type="search" placeholder="Søk på navn, ID, fosterhjem.." v-model="searchText">
      <Magnify id="search-icon" class="icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Magnify, ViewDashboardOutline } from 'mdue'
import router from '../router'

export default defineComponent({
  name: 'SearchBox',
  components: {
    Magnify,
    ViewDashboardOutline
  },
  data: () => ({
    searchText: ''
  }),
  methods: {
    routeToDashboard: () => {
      router.push('/')
    }
  },
  computed: {
    currentRoute: () => {
      return router.currentRoute.value.path
    }
  }
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
  background-color: transparent;
  outline: none;
  border: none;
  width: 100%;
  padding: 10px 0px 10px 15px;
}

#dashboard-icon + #search-field {
  border-left: #7E7E7E 1px solid;
  padding-left: 5px;
}

#search-icon {
  padding: 0px 10px 0px 5px;
}

#dashboard-icon {
  padding: 0px 5px 0px 10px;
}
</style>
