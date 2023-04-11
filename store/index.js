import { defineStore } from 'pinia';

export const useLoungeStore = defineStore({
  id: 'lounge-store',
  state: () => {
    return {
      accountType: ['admin', 'chef', 'sales'],
      activeUser: '',
      userData: {}
    }
  },
  actions: {
    SetActiveUser(id, set){
     let name='activeUser'
      if(set){
        this.activeUser = id
      

      }else{
        this.activeUser =''
      }

    },

    SetUserData(user){
      this.userData = user
    }
  },
  getters: {
    // filtersList: state => state.filtersList,
  },
})