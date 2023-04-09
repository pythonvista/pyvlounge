import { defineStore } from 'pinia';

export const useLoungeStore = defineStore({
  id: 'lounge-store',
  state: () => {
    return {
      accountType: ['admin', 'chef', 'sales'],
    }
  },
  actions: {},
  getters: {
    // filtersList: state => state.filtersList,
  },
})