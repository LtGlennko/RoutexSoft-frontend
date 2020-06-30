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
        "descripcion": descripcion
    }
    
    return axios.post(url,body,{ params:{
            idRemitente,
            idDestinatario,
            idOri,
            idDes
        }
    });
}