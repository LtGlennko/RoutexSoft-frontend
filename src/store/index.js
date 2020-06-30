import Vue from 'vue'
import Vuex from 'vuex'
import * as userDA from '@/dataAccess/userDA.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {  
    edit:'',
    airports:[],
    clients:[],
    packages:[],
    countries: [],
    originCountry:'',
    destinationCountry:'',
    SenderCreate :{
      idCliente : -1,
      docIden : '',
      nombres : '',
      apellidos : '',
      correo : '',
      nroTelef : ''
    },
    AddresseeCreate:{
      idCliente : -1,
      docIden : '',
      nombres : '',
      apellidos : '',
      correo : '',
      nroTelef : ''
    },
    airportCreate:{
      idAeropuerto:-1,
      codAero:'',
      pais:'',
      ciudad:'',
      abrev:'',
      capacidad:-1,
    },
    PackageData:{
      idPaquete:-1, 
      codigoEnvio:'', 
      nombre:'',  
      descripcion:'',  
      estadoEnvio:'',  
      fechahoraRegistro:'',
      origen:{},
      destino:{},  
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
          continente : airport.continente,
          abrev : airport.abrev,
          capacidad : airport.capacidad
        });
      }
    },

    fillPackages(state,package_data){
      state.packages=[];
      for (let packageSW of package_data){
        state.packages.push({
          idPaquete : packageSW.idPaquete,
          codigoEnvio : packageSW.codigoEnvio,
          nombre : packageSW.nombre,
          descripcion : packageSW.descripcion,
          estadoEnvio : packageSW.estadoEnvio,
          remitente : packageSW.remitente,
          destinatario : packageSW.destinatario,
          origen : packageSW.origen,
          destino : packageSW.destino,
          latitud : packageSW.latitud,
          longitud : packageSW.longitud
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

    fillSenderCreate(state,person_data){
      state.SenderCreate.idCliente = person_data.idCliente;
      state.SenderCreate.nombres = person_data.nombres;
      state.SenderCreate.apellidos = person_data.apellidos;
      state.SenderCreate.correo = person_data.correo;
      state.SenderCreate.docIden = person_data.docIden;
      state.SenderCreate.nroTelef = person_data.nroTelef;
    },

    fillAddresseeCreate(state,person_data){
      state.AddresseeCreate.idCliente = person_data.idCliente;
      state.AddresseeCreate.nombres = person_data.nombres;
      state.AddresseeCreate.apellidos = person_data.apellidos;
      state.AddresseeCreate.correo = person_data.correo;
      state.AddresseeCreate.docIden = person_data.docIden;
      state.AddresseeCreate.nroTelef = person_data.nroTelef;
    },

    fillClients(state,client_data){
      state.clients=[];
      for (let client of client_data){
        state.clients.push({
          idCliente : client.idCliente,
          nombres : client.nombres,
          apellidos : client.apellidos,
          correo : client.correo,
          docIden : client.docIden,
          nroTelef : client.nroTelef
        });
      }
    },

    fillPackageData(state,package_data){
      state.PackageData.idPaquete = package_data.idPaquete;
      state.PackageData.codigoEnvio = package_data.codigoEnvio;
      state.PackageData.nombre = package_data.nombre;
      state.PackageData.descripcion = package_data.descripcion;
      state.PackageData.estadoEnvio = package_data.estadoEnvio;
      state.PackageData.origen = package_data.origen;
      state.PackageData.destino = package_data.destino;
      state.PackageData.fechahoraRegistro = package_data.fechahoraRegistro;
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
    completePackages(context,packages_data){
      context.commit('fillPackages',packages_data);
    },

    completeSenderCreate(context,person_data){
      context.commit('fillSenderCreate',person_data);
    },

    completeAddresseeCreate(context,person_data){
      context.commit('fillAddresseeCreate',person_data);
    },

    completeClients(context,client_data){
      context.commit('fillClients',client_data);
    },

    completePackageData(context,package_data){
      context.commit('fillPackageData',package_data);
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
