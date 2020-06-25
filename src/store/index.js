import Vue from 'vue'
import Vuex from 'vuex'
import * as userDA from '@/dataAccess/userDA.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {  
    edit:'',
    airports:[],
    countries: [],
    originCountry:'',
    destinationCountry:'',
    clientCreate :{
      idPerson : -1,
      documentNumber : '',
      name : '',
      lastname : '',
      email : '',
      cellphone : ''
    },
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
    
    setRequestCountry (state, countries) {
      state.countries = countries
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

    fillPersonCreate(state,person_data){
      state.clientCreate.idPerson = person_data.idPerson;
      state.clientCreate.name = person_data.name;
      state.clientCreate.lastname = person_data.lastname;
      state.clientCreate.email = person_data.email;
      state.clientCreate.documentNumber = person_data.documentNumber;
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

    completePersonCreate(context,person_data){
      context.commit('fillPersonCreate',person_data);
    },



    async obtainCountry (context) {
      let response = await userDA.getAllAirports()
      const API_RESULT = response.data
      let newData = []
      API_RESULT.data.forEach((elem) => {
        let newRecord = {
          text: elem.country,
          value: elem.idAeropuerto
        }
        newData.push(newRecord)
      })
      context.commit('setRequestCountry', newData)
    },


  },
  modules: {
  }
})
