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
    airportCreate:{
      idAeropuerto:-1,
      codAero:'',
      pais:'',
      ciudad:'',
      abrev:'',
      capacidad:-1,
    }
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
    setActSim(state,edit){
      state.editActSim = edit;
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

    fillAirports(state,airport_data){
      state.airports=[];
      for (let airport of airport_data){
        state.airports.push({
          idAeropuerto : airport.idAeropuerto,
          codAero : airport.codAero,
          pais : airport.pais,
          ciudad : airport.ciudad,
          abrev : airport.abrev,
          capacidad : airport.capacidad
        });
      }
    },

    setAirportInd(state,index){
      state.selectedAirportIndex = index;
      state.airportCreate.idAeropuerto = state.airports[index].idAeropuerto;
      state.airportCreate.codAero = state.airports[index].codAero;
      state.airportCreate.pais = state.airports[index].pais;
      state.airportCreate.ciudad = state.airports[index].ciudad;
      state.airportCreate.abrev = state.airports[index].abrev;
      state.airportCreate.capacidad = state.airports[index].capacidad;
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
    setActionSimulation(context,edit){
      context.commit('setActSim',edit);
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

    setAirportIndex(context,index){
      context.commit('setAirportInd',index);
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
      API_RESULT.forEach((elem) => {
        let newRecord = {
          text: elem.pais + ' - ' + elem.ciudad,
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
