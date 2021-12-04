import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchText: '',
    lastSearchText: '',
    /** Keeps track of last URL to navigate back to after a canceled search */
    lastUrl: '/',
    isFocused: false
  }),
  getters: {
  },
  actions: {
  }
})
