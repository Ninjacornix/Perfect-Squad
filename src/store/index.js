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
        if (index > -1) {
          state.favs.splice(index, 1);
        }
      }
    },
    starCalculate(state, payload){
      let res = 0;
      for(const player in state.store.players){
        if(state.store.players[player].lastName === payload.surname  &&  state.store.players[player].name === payload.name){
          state.store.players[player].marks.push(payload.star);
          for(let i = 0; i < state.store.players[player].marks.length; i++){
            res = res + Number(state.store.players[player].marks[i]);
          }
          state.store.players[player].result = (res / state.store.players[player].marks.length);
        } else if(payload.name.includes("Neymar Jr") && state.store.players[player].name.includes("Neymar Jr")){
          state.store.players[player].marks.push(payload.star);
          for(let i = 0; i < state.store.players[player].marks.length; i++){
            res = res + Number(state.store.players[player].marks[i]);
          }
          state.store.players[player].result = (res / state.store.players[player].marks.length);
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
  getters:{
    isInFav: state => fav_player => state.favs.includes(fav_player)
  }
})
