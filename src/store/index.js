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
    complains:[],
    //PARA SIMULACIÓN GRÁFICA
    markers: [],
    flightPaths:[],
    paths: [], //Todos los datos de vuelos de un día cargados al inicio
    actualPaths: [], //Los vuelos que se van a mostrar en pantalla
    dailyPaths: [], //Los vuelos de un día actual
    lstLat: [],
    lstLng: [],
    mapCenter :{
      lat: -1,
      lng: -1
    },
    mapZoom: 3,
    colorLegend: [ //Escala de colores
      {text: ' > 0 - 10', color: 'blue', min: 0, max: 0.1},
      {text: ' >10 - 25', color: 'lime', min: 0.1, max: 0.25},
      {text: ' >25 - 45', color: 'yellow', min: 0.25, max: 0.45},
      {text: ' >45 - 70', color: 'orange', min: 0.45, max: 0.7},
      {text: ' >70 - 100', color: 'red', min: 0.7, max: 1}
    ],

    //PARA TIMER
    simDay: 0,

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

    packageCreate:{
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
    },

    complainCreate:{
      idQueja:-1,
      codigoQueja : '',
      nombresReclamante : '',
      apellidosReclamante : '',
      numdocumento : '',
      correo : '',
      queja : '',
      fechaRegistro : '',
      paquete : {},
    },

    airportsCapacity:[],
    airportsCapacityEurope:[],
    airportsCapacityAmerica:[],

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
          longitud : packageSW.longitud,
          fechaRegistro : packageSW.fechaRegistro,
          horaRegistro : packageSW.horaRegistro
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
      //console.log("Se completaron las listas de latitudes y longitudes: " + state.lstLat + state.lstLng);
      //Centrar el mapa
      state.mapCenter.lat = (Math.min.apply(null, state.lstLat) + Math.max.apply(null, state.lstLat))/2;
      state.mapCenter.lng = (Math.min.apply(null, state.lstLng) + Math.max.apply(null, state.lstLng))/2;
    },

    fillPaths(state,paths_data){
      state.paths=[];
      for (let path of paths_data){
        let line=[];
        //console.log('Path: '+JSON.stringify(path));
        //console.log('LatOri: '+path.origen.latitud);

        //Generar ruta para el polyline
        let ori = {
          lat : path.flightPlan.origen.latitud,
          lng : path.flightPlan.origen.longitud
        };
        line.push(ori);

        let des = {
          lat : path.flightPlan.destino.latitud,
          lng : path.flightPlan.destino.longitud
        };        
        line.push(des);
        
        //Prueba con ocupación aleatoria
        //console.log(path.capacidad);
        //let rInd = Math.floor(Math.random() * (path.flightPlan.capacidad + 1));
        //console.log('rInd ' + rInd);
        /*let arrOcupacion = []; //Aplicable cuando se tenía una arreglo de ocupaciones
        for (let i = 0; i < 5; i++) {
          arrOcupacion.push({
            nroPaquetesSim : rInd
          })          
        }*/
        //console.log('Arr Ocup ' + arrOcupacion)

        
        console.log('nroPaquetesSim: '+path.nroPaquetesSim);

        //Datos del plan de vuelo
        state.paths.push({
          idPlan : path.flightPlan.idPlan,
          origen : path.flightPlan.origen.ciudad + ', ' + path.flightPlan.origen.pais,
          oriHuso: path.flightPlan.origen.huso,
          destino : path.flightPlan.destino.ciudad + ', ' + path.flightPlan.destino.pais,
          desHuso: path.flightPlan.destino.huso,
          horaIni : path.flightPlan.horaIni,
          horaFin : path.flightPlan.horaFin,
          capacidad : path.flightPlan.capacidad,
          route : line,
          detallePorDia : path.nroPaquetesSim
          //detallePorDia : rInd //Ocupación en el día actual
        });
        //if(path.nroPaquetesSim > 0){
          //console.log('Paquetes: '+path.nroPaquetesSim);
          //console.log('Horas vuelo: '+path.flightPlan.horaIni+' - '+path.flightPlan.horaFin);
        //}
        
        //console.log('Pushed');
      }
      //console.log('Paths ' + state.paths);
    },


    setPackageInd(state,index){
      state.selectedPackageIndex = index;
      state.packageCreate.idPaquete = state.packages[index].idPaquete;
      state.packageCreate.codigoEnvio = state.packages[index].codigoEnvio;
      state.packageCreate.nombre = state.packages[index].nombre;
      state.packageCreate.descripcion = state.packages[index].descripcion;
      state.packageCreate.estadoEnvio = state.packages[index].estadoEnvio;
      state.packageCreate.origen = state.packages[index].origen;
      state.packageCreate.destino = state.packages[index].destino;
      state.packageCreate.fechahoraRegistro = state.packages[index].fechahoraRegistro;
      state.packageCreate.ruta = state.packages[index].ruta;
    },


    fillComplains(state,complain_data){
      state.complains=[];
      for (let complain of complain_data){
        state.complains.push({
          idQueja : complain.idQueja,
          codigoQueja : complain.codigoQueja,
          nombresReclamante : complain.nombresReclamante,
          apellidosReclamante : complain.apellidosReclamante,
          numdocumento : complain.numdocumento,
          correo : complain.correo,
          queja : complain.queja,
          fechaRegistro : complain.fechaRegistro,
          paquete : complain.paquete
        });
      }
    },

    setComplainInd(state,index){
      state.selectedComplainndex = index;
      state.complainCreate.idQueja = state.complains[index].idQueja;
      state.complainCreate.codigoQueja = state.complains[index].codigoQueja;
      state.complainCreate.nombresReclamante = state.complains[index].nombresReclamante;
      state.complainCreate.apellidosReclamante = state.complains[index].apellidosReclamante;
      state.complainCreate.numdocumento = state.complains[index].numdocumento;
      state.complainCreate.correo = state.complains[index].correo;
      state.complainCreate.queja = state.complains[index].queja;
      state.complainCreate.fechaRegistro = state.complains[index].fechaRegistro;
      state.complainCreate.paquete = state.complains[index].paquete;
    },

    fillActualPaths(state,curTime){
      state.actualPaths=[];
      //console.log(curTime);
      let nIn = 0;
      let nOut = 0;
      let nOut2 = 0;
      if(curTime>=0){
        for (let path of state.dailyPaths){ //Filtra y escoge solo los paths que se van a mostrar
          //console.log('Path' + path);
          //console.log('Horas path: '+ path.horaIni + ' - ' + path.horaFin);
          //Calculo de hora inicio
          let h, m, s;
          h = (parseInt(path.horaIni.substring(0,2))-path.oriHuso)%24;
          m = parseInt(path.horaIni.substring(3,5));
          s = parseInt(path.horaIni.substring(6,8));
          let hIni = h*3600 + m*60 + s;
          //Calculo de hora fin
          h = (parseInt(path.horaFin.substring(0,2))-path.desHuso)%24;
          m = parseInt(path.horaFin.substring(3,5));
          s = parseInt(path.horaFin.substring(6,8));
          let hFin = h*3600 + m*60 + s;
          //console.log(hIni);
          //console.log(hFin);
          //console.log(hIni + ' < ' + curTime + ' < ' + hFin);
          path.offset = -1;
          
          if(path.detallePorDia > 0){ //Solo muestra si en el vuelo de ese día hay paquetes
            //Si en la hora actual hay un vuelo y la hora de llegada es mayor a la de partida
            if((hIni <= curTime) && (curTime <= hFin)){
              //console.log(hIni + ' < ' + curTime + ' < ' + hFin);
              //console.log('Horas path: '+ path.horaIni + ' - ' + path.horaFin);
              path.offset = ((curTime-hIni)/(hFin-hIni))*100;
              nIn++;
              //console.log('Horas path: '+ path.horaIni + ' - ' + path.horaFin);
              if(path.offset >=0 && path.offset<=100)
                state.actualPaths.push(path);
            }
            //Si en la hora actual hay un vuelo y la hora de partida es mayor a la de llegada
            else if((hIni > hFin) && (hIni <= curTime || curTime <= hFin)){
              //Ajustes para calculo del porcentaje de camino
              hFin += 24*3600;
              let auxCurTime = curTime;
              if(curTime <= hIni)
                auxCurTime += 24*3600;
              path.offset = ((auxCurTime-hIni)/(hFin-hIni))*100;
              nIn++;
              //console.log('Horas path: '+ path.horaIni + ' - ' + path.horaFin);
              if(path.offset >=0 && path.offset<=100)
                state.actualPaths.push(path);
            }
            else
              nOut++;
          }
          else
            //console.log('Horas path: '+ path.horaIni + ' - ' + path.horaFin + ' NroPaquetes: ' + path.detallePorDia.nroPaquetesSim);
            nOut2++;
        }
        //console.log('In: ' + nIn + ' Out: ' + nOut + ' OutCapac: ' + nOut2);
      }
    },

    fillDailyPaths(state){
      state.dailyPaths = [];
      state.dailyPaths = state.paths.slice(); //Saca un duplicado
    },

    fillPathsAdmi(state,flightPath_data){
      state.flightPaths=[];
      for (let flightPath of flightPath_data){
        state.flightPaths.push({
          idPlan : flightPath.idPlan,
          capacidad : flightPath.capacidad,
          destino : flightPath.destino,
          origen : flightPath.origen,
          horaFin : flightPath.horaFin,
          horaIni : flightPath.horaIni
        });
      }
    },

    setValSimDay (state, edit) {
      state.simDay = edit;
    },

    setValMapCenter (state, edit) {
      state.mapCenter = edit;
    },


    fillCapacityAirport(state,airportCapacity_data){
      state.airportsCapacity=[];
      for (let airportCapacity of airportCapacity_data){
        state.airportsCapacity.push({
          idAeropuertoxDiaxHora : airportCapacity.idAeropuertoxDiaxHora,
          airport : airportCapacity.airport,
          fechaHoraIni : airportCapacity.fechaHoraIni,
          nroPaquetes : airportCapacity.nroPaquetes,
          nroPaquetesSim : airportCapacity.nroPaquetesSim
        });
      }
    },

    fillCapacityAirportEurope(state,airportCapacityEurope_data){
      state.airportsCapacityEurope=[];
      for (let airportCapacity of airportCapacityEurope_data){
        state.airportsCapacityEurope.push({
          idAeropuertoxDiaxHora : airportCapacity.idAeropuertoxDiaxHora,
          airport : airportCapacity.airport,
          fechaHoraIni : airportCapacity.fechaHoraIni,
          nroPaquetes : airportCapacity.nroPaquetes,
          nroPaquetesSim : airportCapacity.nroPaquetesSim
        });
      }
    },

    fillCapacityAirportAmerica(state,airportCapacityAmerica_data){
      state.airportsCapacityAmerica=[];
      for (let airportCapacity of airportCapacityAmerica_data){
        state.airportsCapacityAmerica.push({
          idAeropuertoxDiaxHora : airportCapacity.idAeropuertoxDiaxHora,
          airport : airportCapacity.airport,
          fechaHoraIni : airportCapacity.fechaHoraIni,
          nroPaquetes : airportCapacity.nroPaquetes,
          nroPaquetesSim : airportCapacity.nroPaquetesSim
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

    setPackageIndex(context,index){
      context.commit('setPackageInd',index);
    },

    completeComplains(context,complain_data){
      context.commit('fillComplains',complain_data);
    },

    setComplainIndex(context,index){
      context.commit('setComplainInd',index);
    },

    setValueSimDay(context,index){
      context.commit('setValSimDay',index);
    },

    setValueMapCenter(context,index){
      context.commit('setValMapCenter',index);
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
    completeDailyPaths(context){
      context.commit('fillDailyPaths');
    },

    completeFlightPaths(context,flightPath_data){
      context.commit('fillPathsAdmi',flightPath_data);
    },

    completeAirportCapacity(context,airportCapacity_data){
      context.commit('fillCapacityAirport',airportCapacity_data);
    },

    completeAirportCapacityEurope(context,airportCapacityEurope_data){
      context.commit('fillCapacityAirportEurope',airportCapacityEurope_data);
    },

    completeAirportCapacityAmerica(context,airportCapacityAmerica_data){
      context.commit('fillCapacityAirportAmerica',airportCapacityAmerica_data);
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
