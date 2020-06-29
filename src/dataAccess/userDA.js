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
    let url = process.env.VUE_APP_API_URL + 'api/airport/';  /*Switch to real url*/
    return axios.get(url);
}

<<<<<<< HEAD
export function getAllPackages(){
    let url = process.env.VUE_APP_API_URL + 'api/package/';  /*Switch to real url*/
    return axios.get(url);
}
=======
export function getPersonData(dni){
    let url = process.env.VUE_APP_API_URL + 'api/dniValidation/';
    var body ={
        "documentNumber" : dni
    }
    return axios.post(url,body);
}

export function editAirport(idAeropuerto,capacidad){
    let url = process.env.VUE_APP_API_URL + 'api/airport/' + idAeropuerto
    var body ={
        "capacidad" : capacidad
    }
    return axios.put(url,body);
}
>>>>>>> master
