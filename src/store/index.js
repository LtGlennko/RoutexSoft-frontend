import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {  
    edit:''
  },
  mutations: {
    setActUser(state,edit){
      state.editUser = edit;
    },
  },
  actions: {
    setActionUser(context,edit){
      context.commit('setActUser',edit);
    },
  },
  modules: {
  }
})
