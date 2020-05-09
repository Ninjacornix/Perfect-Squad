import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//import firebase from '@/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    store: {},
    favs: []
  },
  mutations: {
    setData(state , info ) {
      state.store = info;
    },
    favoritesadd(state, player){
      if(!state.favs.includes(player)){
        state.favs.push(player);
      }
    },
    favoritesremove(state, player){
      if(state.favs.includes(player)){
        const index = state.favs.indexOf(player);
        console.log(index)
        if (index > -1) {
          state.favs.splice(index, 1);
        }
      }
    }
  },
  actions: {
    login(){
      axios.get("https://jsonblob.com/api/jsonBlob/50fd5df9-8283-11ea-a9e3-ab457510f846").then( response => {let data = response.data
        this.commit("setData", data)});
    },
  },
})
