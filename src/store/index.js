import Vue from 'vue'
import Vuex from 'vuex'
import * as userDA from '@/dataAccess/userDA.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {  
    edit:'',
    email:'',
    airports:[],
    clients:[],
    packages:[],
    countries: [],

    //PARA SIMULACIÓN GRÁFICA
    markers: [],
    paths: [], //Todos los datos de vuelos
    actualPaths: [], //Los vuelos que se van a mostrar en pantalla
    lstLat: [],
    lstLng: [],
    mapCenter :{
      lat: -1,
      lng: -1
    },
    mapZoom: 3,
    colorLegend: [ //Escala de colores
      {text: ' > 0 - 20', color: 'light-green'},
      {text: ' >20 - 40', color: 'lime'},
      {text: ' >40 - 60', color: 'yellow'},
      {text: ' >60 - 80', color: 'orange'},
      {text: ' >80 - 100', color: 'red'}
    ],

    //PARA TIMER

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
      ruta:{},  
    },
    clientCreate:{
      docIden : '',
      nombres : '',
      apellidos : '',
      correo : '',
      nroTelef : ''
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

    setActEmail(state,email){
      state.editEmail = email;
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
      state.PackageData.ruta = package_data.ruta;
    },

    //PARA COMPLETAR EL MAPA DE SIMULACIÓN
    fillMarkers(state,markers_data){
      state.markers=[];
      state.lstLat=[];
      state.lstLng=[];
      for (let marker of markers_data){
        state.markers.push({
          idAeropuerto : marker.idAeropuerto,
          codAero : marker.codAero,
          pais : marker.pais,
          ciudad : marker.ciudad,
          continente : marker.continente,
          abrev : marker.abrev,
          capacidad : marker.capacidad,
          title: marker.ciudad + ', ' + marker.pais + ' - ' + marker.codAero,
          position: {
            lat: marker.latitud,
            lng: marker.longitud
          }
        });
        state.lstLat.push(marker.latitud)
        state.lstLng.push(marker.longitud)
      }
      console.log("Se completaron las listas de latitudes y longitudes: " + state.lstLat + state.lstLng);
      //Centrar el mapa
      state.mapCenter.lat = (Math.min.apply(null, state.lstLat) + Math.max.apply(null, state.lstLat))/2;
      state.mapCenter.lng = (Math.min.apply(null, state.lstLng) + Math.max.apply(null, state.lstLng))/2;
    },

    fillPaths(state,paths_data){
      state.paths=[];
      for (let path of paths_data){
        let line=[];
        //console.log('Path: '+path);
        //console.log('LatOri: '+path.origen.latitud);

        //Generar ruta para el polyline
        let ori = {
          lat : path.origen.latitud,
          lng : path.origen.longitud
        };
        line.push(ori);

        let des = {
          lat : path.destino.latitud,
          lng : path.destino.longitud
        };        
        line.push(des);
        
        //console.log('Coord ' + line);

        //Datos del plan de vuelo
        state.paths.push({
          idPlan : path.idPlan,
          horaIni : path.horaIni,
          horaFin : path.horaFin,
          capacidad : path.capacidad,
          detallePorDia : path.detallePorDia,
          route : line
        });
        //console.log('Pushed');
      }
      //console.log('Paths ' + state.paths);
    },

    fillActualPaths(state,curTime){
      state.actualPaths=[];
      //console.log(curTime);
      let nIn = 0;
      let nOut = 0;
      if(curTime>=0){
        for (let path of state.paths){ //Filtra y escoge solo los paths que se van a mostrar
          //console.log('Path' + path);
          //console.log('Horas path: '+ path.horaIni + ' - ' + path.horaFin);
          //Calculo de hora inicio
          let h, m, s;
          h = parseInt(path.horaIni.substring(0,2));
          m = parseInt(path.horaIni.substring(3,5));
          s = parseInt(path.horaIni.substring(6,8));
          let hIni = h*3600 + m*60 + s;
          //Calculo de hora fin
          h = parseInt(path.horaFin.substring(0,2));
          m = parseInt(path.horaFin.substring(3,5));
          s = parseInt(path.horaFin.substring(6,8));
          let hFin = h*3600 + m*60 + s;
          //console.log(hIni);
          //console.log(hFin);
          //console.log(hIni + ' < ' + curTime + ' < ' + hFin);
          path.offset = -1;

          //Si en la hora actual hay un vuelo y la hora de llegada es mayor a la de partida
          if(hIni <= curTime && curTime <= hFin){
            path.offset = ((curTime-hIni)/(hFin-hIni))*100;
            nIn++;
            //console.log('Horas path: '+ path.horaIni + ' - ' + path.horaFin);
            state.actualPaths.push(path);
          }

          //Si en la hora actual hay un vuelo y la hora de partida es mayor a la de llegada
          else if(hIni > hFin && (hIni <= curTime || curTime <= hFin)){
            //Ajustes para calculo del porcentaje de camino
            hFin += 24*3600;
            let auxCurTime = curTime;
            if(curTime <= hIni)
              auxCurTime += 24*3600;
            path.offset = ((auxCurTime-hIni)/(hFin-hIni))*100;
            nIn++;
            //console.log('Horas path: '+ path.horaIni + ' - ' + path.horaFin);
            state.actualPaths.push(path);
          }

          else
            nOut++;
        }
        //console.log('Nro In: ' + nIn);
        //console.log('Nro Out: ' + nOut);
      }
    }

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
    setActionEmail(context,email){
      context.commit('setActEmail',email);
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


    //PARA COMPLETAR EL MAPA DE SIMULACIÓN
    completeMarkers(context,markers_data){
      context.commit('fillMarkers',markers_data);
    },
    completePaths(context,paths_data){
      context.commit('fillPaths',paths_data);
    },
    completeActualPaths(context,curTime){
      context.commit('fillActualPaths',curTime);
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
