import axios from 'axios'

/**
 * This function calls the backend server to do login
 * @param {Object} data The data of the user to send to the server
 */

/*export function Login (data){
    let url=process.env.VUE_APP_API_URL + 'aqui se pone e servicio del back'
    return Axios.post(url,data)
}
*/

export function getAllAirports(){
    let url = process.env.VUE_APP_API_URL + 'api/airport/';  
    return axios.get(url);
}

export function getAllClients(){
    let url = process.env.VUE_APP_API_URL + 'api/client';  
    return axios.get(url);
}

export function getPersonData(documento){
    let url = process.env.VUE_APP_API_URL + 'api/client';
    
    return axios.get(url,{ params:{
            documento
        }
    });
}

export function getPackageDataByTrackNumber(codigoEnvio){
    let url = process.env.VUE_APP_API_URL + 'api/package/';
    
    return axios.get(url,{ params:{
            codigoEnvio
        }
    });
}
    
export function getAllPackages(){
    let url = process.env.VUE_APP_API_URL + 'api/package/';  /*Switch to real url*/
    return axios.get(url);
}


export function editAirport(idAeropuerto,capacidad){
    let url = process.env.VUE_APP_API_URL + 'api/airport/' + idAeropuerto
    var body ={
        "capacidad" : capacidad
    }
    return axios.put(url,body);
}

export function createSending(idRemitente,idDestinatario,idOri,idDes,nombre,descripcion){
    let url = process.env.VUE_APP_API_URL + 'api/package' 
    var body ={
        "nombre": nombre,
        "descripcion": descripcion,
        "idRemitente": idRemitente,
        "idDestinatario": idDestinatario,
        "idOri": idOri,
        "idDes": idDes
    }
    
    return axios.post(url,body);
}

export function createClient(docIden,nombres,apellidos,correo,nroTelef){
    let url = process.env.VUE_APP_API_URL + 'api/client'
    
    var body ={
        "docIden" : docIden,
        "nombres" : nombres,
        "apellidos" : apellidos,
        "correo" : correo,
        "nroTelef" : nroTelef
    }

    return axios.post(url,body);
}

export function getAllPathsOfplans(simDay){
    let url = process.env.VUE_APP_API_URL + 'api/flightPlan';
    //console.log("Ruta: "+url);
    //console.log("Parametro: "+simDay);
    return axios.get(url,{ params:{
            simDay
        }
    });
}

export function editPackage(packageId,destinationId){
    let url = process.env.VUE_APP_API_URL + 'api/package/updateDestination'

    return axios.post(url,null,{ params:{
        packageId, destinationId
    }
});
}


export function createComplain(codigoPaquete,nombresReclamante,apellidosReclamante,numdocumento,correo,queja){
    let url = process.env.VUE_APP_API_URL + 'api/complaint'
    
    var body ={
        "codigoPaquete" : codigoPaquete,
        "nombresReclamante" : nombresReclamante,
        "apellidosReclamante" : apellidosReclamante,
        "numdocumento" : numdocumento,
        "correo" : correo,
        "queja" : queja
    }

    return axios.post(url,body);
}

export function getAllComplains(){
    let url = process.env.VUE_APP_API_URL + 'api/complaint';  /*Switch to real url*/
    return axios.get(url);
}

/*export function loadSimulation(){
    let url = process.env.VUE_APP_API_URL + 'api/loadSimulation/';
    return axios.get(url,{ params:{
            simDay
        }
    });
}*/


export function getCapacityAirport(type){
    let url = process.env.VUE_APP_API_URL + 'api/ReportAirport';
    return axios.get(url,{ params:{
            type
        }
    });
}