import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchText: '',
    lastSearchText: '',
    lastUrl: '/',
    isFocused: false
  }),
  getters: {
  },
  actions: {
    setLastUrl (newUrl: string) {
      if (newUrl === '/search') return
      this.lastUrl = newUrl
    }
  }
})
