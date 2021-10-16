<template>
  <div>
    <div class="flex-column">
      <div class="flex-row logo-row">
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
      <div class="flex-row card-row">
        <div class="card" v-for="card in cards" :key="card.title">
          <img class="card-icon" alt="House icon" :src="card.icon">
          <span class="card-title">{{card.title}}</span>
          <span class="card-status">{{card.status}}</span>
        </div>
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
  },
  data: () => ({
    cards: [
      {
        title: 'Kattehuset',
        icon: '/img/home/house-icon.png',
        status: '>🏠 2 | 🏥 1 | 🏠 4'
      },
      {
        title: 'Dagslogger',
        icon: '/img/home/note-icon.png',
        status: 'Dagens er påbegynt'
      },
      {
        title: 'Oppgaver',
        icon: '/img/home/checklist-icon.png',
        status: '4 oppgaver gjenstår'
      },
      {
        title: 'Arbeidsvakter',
        icon: '/img/home/clock-icon.png',
        status: '2 dager ubemannet'
      }
    ]
  })
})
</script>

<style scoped>
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

.logo-row {
  width: 90%
}

.card-row {
  flex-wrap: wrap;
  /* justify-content: space-between; */
  row-gap: 20px;
  column-gap: 20px;
}

.card {
  background-color: rgba(255, 255, 255, 0.75);
  height: 135px;
  width: 135px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.card-icon {
  width: 60%;
  padding-top: 2px;
}

.card-title {
  font-size: 1.2em;
  font-weight: bold;
}

.card-status {
  font-size: 0.8em;
  padding: 0px 10px 5px 10px;
}

#logo-text {
  font-size: 2.5em;
  font-weight: bold;
  color: #B61B29;
  margin: 0;
  padding-left: 10px;
}

#search-box {
  width: 100%;
  max-width: 400px;
}
</style>
