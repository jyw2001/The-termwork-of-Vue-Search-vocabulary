import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store= new Vuex.Store({
  state: {
    counter:0,
    words:[],
    word:{

    } 
  },
  mutations: {
    addStarword(state,Tword){
      state.words.push(Tword);
      state.counter++;
      
    },
    delStarword(state){
      state.words[this.counter].pop();
      counter--;
    },
  },
  actions: {
  },
  getters:{
  },
  modules: {
  }
})

export default store
