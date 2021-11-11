<template>
  <div class="flex-column">
    <div class="flex-row">
      <Search-Box id="search-box" />
    </div>
    <div id="search-results" class="flex-column white-bg-round">
      <div v-for="cat in searchResults" :key="cat.id" class="flex-row search-result">
        <img src="/mocking/oliver.jpg" />
        <div class="flex-column name-stats">
          <div class="flex-row name-id">
            <div>{{cat.name}}</div>
            <div class="cat-catid">#{{cat.catId}}</div>
          </div>
          <div class="flex-row stats-row">
            <!-- TODO: Stat key and value should be separated and all values should line up -->
            <div class="stats">
              Alder: {{dateToHuman(new Date(cat.stats.birthdate))}}<br>
              Chip: {{cat.stats.chipped ? 'Ja' : 'Nei'}}<br>
              Vaksinert: {{cat.stats.vaccinated ? 'Ja' : 'Nei'}}
            </div>
            <div class="stats">
              <!-- TODO: Find a better way to display this (house, room, cage) -->
              Lokasjon: {{cat.stats.location.house}}<br>
              Rom: {{cat.stats.location.room}}<br>
              Bur: {{cat.stats.location.cage}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SearchBox from '../components/Search-Box.vue'
import { dateToHuman } from '../lib/date-to-human'

interface CatSearchResult {
  id: number;
  catId: string;
  name: string;
  imageUrl: string;
  stats: {
    birthdate: string;
    chipped: boolean;
    vaccinated: boolean;
    location: {
      house: string;
      room: string;
      cage: string;
    };
  };
}

const searchResults = ref<CatSearchResult[]>([])

onMounted(async () => {
  const cats = await fetch('/mocking/mocked-cats.json')
  if (cats.ok) searchResults.value = await cats.json() as CatSearchResult[]
})
</script>

<style scoped>
#search-results {
  width: 85%;
  margin-top: 20px;
  padding: 0 5px;
  box-sizing: border-box;
}

.search-result {
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px 5px;
  border-bottom: solid 1px #000;
}

.search-result > img {
  width: 64px;
  border-radius: 10px;
}

.name-stats {
  height: 100%;
  width: 100%;
  padding: 0 5px;
  justify-items: flex-start;
  align-items: flex-start;
}

.stats-row {
  width: 100%;
  justify-content: space-between;
}

.stats {
  color: gray;
  font-size: 0.6em;
  padding-top: 3px;
}

.stats + .stats {
  border-left: solid 0.5px #818181;
  padding-left: 5px;
}

.stats-row {
  padding: 0;
}

.name-id {
  width: 100%;
  padding: 0;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: solid 0.5px #818181;
}

.cat-catid {
  color: gray;
  font-size: 0.8em;
}
</style>
