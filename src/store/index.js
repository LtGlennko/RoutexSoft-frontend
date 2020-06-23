import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {  
    edit:'',
    airports:[]
  },
  mutations: {
    setActUser(state,edit){
      state.editUser = edit;
    },
    setActFightPlans(state,edit){
      state.editFightPlan = edit;
    },
    setActRole(state,edit){
      state.editRole = edit;
    },
    setActClient(state,edit){
      state.editClient = edit;
    },
    setActSender(state,edit){
      state.editSender = edit;
    },
    setActAddressee(state,edit){
      state.editAddressee = edit;
    },


    fillAirports(state,airport){
      state.airports=[];
      let airport_data = airport.airports;
      for (let i=0; i< airport_data.length;i++){
        state.airports.push({
          idAeropuerto : airport_data[i].idAeropuerto,
          nombre : airport_data[i].nombre,
          codAero : airport_data[i].codAero,
          pais : airport_data[i].pais,
          capacidad : airport_data[i].capacidad,
          huso : airport_data[i].huso
        });
      }
    },


  },
  actions: {
    setActionUser(context,edit){
      context.commit('setActUser',edit);
    },
    setActionFightPlans(context,edit){
      context.commit('setActFightPlans',edit);
    },
    setActionRole(context,edit){
      context.commit('setActRole',edit);
    },
    setActionClient(context,edit){
      context.commit('setActClient',edit);
    },
    setActionSender(context,edit){
      context.commit('setActSender',edit);
    },
    setActionAddressee(context,edit){
      context.commit('setActAddressee',edit);
    },

    completeAirports(context,airports_data){
      context.commit('fillAirports',airports_data);
    },


  },
  modules: {
  }
})
