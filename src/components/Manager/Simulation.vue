<template>
    <v-container>
        <v-card> 
            <v-row>
                <v-col>
                    <v-card-title class="titleCard" v-text='editActSim'>
                    </v-card-title>
                    <v-card>
                        <v-card-actions>
                            <v-row>
                                <v-col cols="2">
                                    <v-icon medium class="mr-5" @click="detailSim()">mdi-play-circle </v-icon>
                                </v-col>
                                <v-col cols="2">
                                    <v-icon medium class="mr-5" @click="detailSim()">mdi-pause-circle </v-icon>
                                </v-col>
                                <v-col cols="2">
                                    <v-icon medium class="mr-5" @click="detailSim()">mdi-step-forward </v-icon>
                                </v-col>
                                <v-col cols="2">
                                    <v-icon medium class="mr-5" @click="detailSim()">mdi-step-backward </v-icon>
                                </v-col>
                                <v-col cols="3">
                                    <v-icon medium class="mr-5" @click="detailSim()">mdi-stop-circle </v-icon>
                                </v-col>
                            </v-row>
                            
                        </v-card-actions>
                        <v-row>
                            <v-col class="cosa-rara">
                                <gmap-map
                                    :center="mapCenter"
                                    :zoom="mapZoom"
                                    style="width: 100%; height: 750px;">
                                    <gmap-marker v-for="(marker) in markers"
                                        :key="marker.key"
                                        :position="marker.position"
                                        :title="marker.title"
                                        :options="markerOptions"
                                        {{setIcon(marker.title)}}
                                        @click="center=marker.position"
                                    >
                                    </gmap-marker>
                                    <gmap-polyline v-for="(path) in paths"
                                        :key="path.key"
                                        :path.sync="path.route"
                                        :options="polylineOptions"
                                    >
                                    </gmap-polyline>
                                </gmap-map>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="nani">
                                <br><v-btn class="mb-3" @click=$router.go(-1)>Regresar</v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>
<style src="@/styles/Manager/Simulation.css" scoped>

</style>
<script>
import {mapState, mapActions} from 'vuex'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import Vue from 'vue'
//import * as math from 'Math'
import * as userDA from '@/dataAccess/userDA.js'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDKjcVHMCTYKk2keZygPn7LJ3IdF5ekfac'
  }
})

export default {
    name: 'Simulation',
    data(){
        return{
            /*
            center: {
                lat: 36.60338869729776,
                lng: -4.643738644531254
            },

            markers: [
                { 
                    title: 'Hola',
                    position: {
                        lat: 36.71395099999999, lng: -4.432000000000016
                    }
                },
                { 
                    title: 'Mundo',
                    position: {
                        lat: 36.51007199999999, lng: -4.882447400000046
                    }
                },
                { 
                    title: 'What is Love',
                    position: {
                        lat: 36.51007199999999, lng: -4.032447400000046
                    }
                }, 
                { 
                    title: 'Baby dont hurt me',
                    position: {
                        lat: 36.31007199999999, lng: -4.882447400000046
                    }
                },
                { 
                    title: 'No more',
                    position: {
                        lat: 36.10007199999999, lng: -4.922447400000046
                    }
                }
            ],
            */
            paths: [
                {
                    route: [
                        {lat: 36.71395099999999, lng: -4.432000000000016},
                        {lat: -36.51007199999999, lng: 4.032447400000046}
                    ]
                },
                {
                    route: [
                        {lat: -36.31007199999999, lng: -4.882447400000046},
                        {lat: 36.51007199999999, lng: -4.032447400000046}
                    ]
                }
            ],
            markerOptions:{
              clickable: true,
              draggable: false,
              icon: {
                  url: "http://maps.google.com/mapfiles/kml/paddle/wht-circle-lv.png"
              }
            },
            polylineOptions:{
                strokeColor: '#008000', //Color de la línea
                strokeWeight: 2, //Ancho de borde de la línea
                icons:[
                    { icon:
                        {
                            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                            scale: 5, //Tamaño del símbolo
                            strokeColor: '#000000', //Color del símbolo
                            strokeWeight: 2 //Ancho de borde del símbolo
                        },
                        offset: '50%'
                    }
                ]
            },

            /*search: '',
            loadingText: 'Cargando usuarios',
            filterNoResultsText: 'No se encontraron usuarios que cumplan con los filtros',
            noDataText: 'No hay usuarios para mostrar',
            simulation: [
                {
                    id_simulation: '3',
                    date_created: '25/06/20',
                    time_created: '18:55',
                    time_duration: '-',
                    state:'En Proceso'
                },
            ],*/
        }
    },

    mounted(){
        this.getMarkers();
        this.getPaths();
    },

    computed: {
        ...mapState(['markers', 'mapCenter', 'mapZoom']),
        headers () {
            let items = []
            items.push({
                text: '#',
                align: 'center',
                sortable: true,
                value: 'id_simulation',
            })
            items.push({
                text: 'FECHA REGISTRO',
                align: 'center',
                sortable: true,
                value: 'date_created',
            })
            items.push({
                text: 'HORA REGISTRO',
                align: 'center',
                sortable: true,
                value: 'time_created',
            })
            items.push({
                text: 'TIEMPO EJECUCIÓN(seg)',
                align: 'center',
                sortable: true,
                value: 'time_duration'
            })
            items.push({
                text: 'ESTADO',
                align: 'center',
                sortable: true,
                value: 'state'
            })
            
            return items
        },
    },
    methods:{
        ...mapActions(['completeMarkers', 'completePaths']),

        GenerateSim(){
            Swal.fire({
                html: '<p style="font-family:Roboto;">Se ha iniciado la ejecución de la simulación</p>'
            })
            this.$router.push('/Simulation');
        },
        animateRouteIcons(line){
            var count = 0;
            window.setInterval(function(){
                var icons = line.get("icons");
                icons[0].offset = count / 2 + "%";
                line.set("icons", icons);
            }, 20);
        },
        setIcon(string){
          console.log(string);
        },
        getMarkers: function() {
            userDA.getAllAirports().then((res) =>{ //Obtiene los mismos datos que los aeropuertos
                this.completeMarkers(res.data);
                console.log('Se recibió el servicio de aeropuertos');
            }).catch(error =>{
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Error obteniendo los aeropuertos'
                })
            });
        },
        getPaths: function() {
            userDA.getAllPathsOfplans().then((res) =>{
                this.completePaths(res.data);
                console.log('Se recibió el servicio de planes de vuelo');
            }).catch(error =>{
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Error obteniendo los planes de vuelo'
                })
            });
        },
    }
}
</script>