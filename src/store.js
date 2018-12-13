import Vue from 'vue'
import Vuex from 'vuex'
import system from './store/system.js'

Vue.use(Vuex)
import createPersistedState from 'vuex-persistedstate'

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
     
  },
  plugins: [createPersistedState()]
})
