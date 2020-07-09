<template>
    <v-container>
        <v-card> 
            <v-row>
                <v-col>
                    <v-card-title class="titleCard">
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
                                    ref="gmap"
                                    style="width: 100%; height: 750px;">

                                    <gmap-marker v-for="(marker) in markers"
                                        :key="marker.key"
                                        :position="marker.position"
                                        :title="marker.title"
                                        :options="customedMarkerOptions(JSON.parse(JSON.stringify(markerOptions)), marker)"
                                        @click="showInfo(marker)"
                                        ref="gmarkers"
                                    >
                                    </gmap-marker>

                                    <gmap-polyline v-for="(path) in paths"
                                        :key="path.key"
                                        :path.sync="path.route"
                                        :options="customedPolylineOptions(JSON.parse(JSON.stringify(polylineOptions)), path)"
                                        ref="gpolylines"
                                    >
                                    </gmap-polyline>
                                    
                                </gmap-map>
                            </v-col>
                        </v-row>
                        <v-col class="leyenda">
                            <v-card-title>
                                Ocupación de capacidades de planes de vuelo (%)
                            </v-card-title>
                            <v-card>
                                <v-sheet v-for="(colorLg) in colorLegend"
                                    :key="colorLg.key"
                                    :color="colorLg.color"
                                    :width="100"
                                >
                                    {{colorLg.text}}
                                </v-sheet>
                            </v-card>
                        </v-col>
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
            */
            colorLegend: [
                {text: ' > 0 - 20', color: 'light-green'},
                {text: ' >20 - 40', color: 'lime'},
                {text: ' >40 - 60', color: 'yellow'},
                {text: ' >60 - 80', color: 'orange'},
                {text: ' >80 - 100', color: 'red'}
            ],
            /*markers: [
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
            ],*/
            markerOptions:{ //Opciones predeterminadas de cada marcador
              clickable: true,
              draggable: false,
              visible: true,
              icon: {
                  url: "http://maps.google.com/mapfiles/kml/paddle/red-circle-lv.png"
              }
            },
            polylineOptions:{ //Opciones predeterminadas de cada linea
                strokeColor: '#000000', //Color de la línea
                strokeWeight: 0.5, //Ancho de borde de la línea
                icons:[
                    { icon:
                        {
                            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                            scale: 3, //Tamaño del símbolo
                            strokeColor: '#000000', //Color del símbolo
                            strokeWeight: 1 //Ancho de borde del símbolo
                        },
                        offset: '75%'
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

    created(){
        this.getMarkers();
        this.getPaths();
    },

    mounted(){
        //this.customizeMarkers();
        //this.customizePolylines();
    },
    updated(){
        //this.customizeMarkers();
    },

    computed: {
        ...mapState(['markers', 'paths', 'mapCenter', 'mapZoom']),
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
        animateRouteIcon(line){
            var count = 0;
            console.log("Linea con icon a animar")
            /*window.setInterval(function(){
                count = (count+1) % 200;
                console.log("icono");
                console.log(iconMobile);
                line.options.icons[0].offset = count / 2 + "%";
                console.log(iconMobile);
            }, 20);*/
        },
        showInfo(marker){ //Mostrar información del aeropuerto
            this.$refs.gmap.center = marker.position; //Centrar el mapa
            console.log("Show info of: " + marker.title);
        },
        getMarkers: function() {
            userDA.getAllAirports().then((res) =>{ //Obtiene los mismos datos que los aeropuertos
                console.log('Primer marker: '+res.data[0].codAero);
                console.log('Datos: '+res.data);
                //console.log('Tam lista markers: '+res.data.size());
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
                console.log('Primer path: '+res.data[0].idPlan);
                console.log('Datos: '+res.data);
                //console.log('Tam lista vuelos: '+res.data.size());
                const subList = res.data.slice(1, 3+1);
                console.log('Sublista: '+subList);
                //console.log('Tam sublista vuelos: '+res.data.size());
                console.log('Primer path sub: '+res.data[0].idPlan);
                console.log('Tercer path sub: '+res.data[2].idPlan);
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
        /*
        customizeMarkers(){
            console.log("Modificar opciones de markers");
            for(let gmarker of (this.$refs.gmarkers)){
                //console.log(gmarker);
                var firstLetter = gmarker.title.toUpperCase()[0];
                var expresion = /[A-Z0-9]/;
                var arrayMatched = firstLetter.match(expresion);
                //console.log("Coincidencias: "+arrayMatched);
                if(arrayMatched != null){ //Solo personaliza valores alfanuméricos
                    let customIcon = "http://maps.google.com/mapfiles/kml/paddle/"+firstLetter+"-lv.png";
                    //console.log(customIcon);
                    //console.log(gmarker.options.icon.url);
                    gmarker.options.icon.url = customIcon;
                }                
            };
        },*/
        customedMarkerOptions(options, marker){
            var firstLetter = marker.title.toUpperCase()[0];
            var expresion = /[A-Z0-9]/;
            var arrayMatched = firstLetter.match(expresion);
            //console.log("Coincidencias: "+arrayMatched);
            if(arrayMatched != null){ //Solo personaliza valores alfanuméricos
                let customIcon = "http://maps.google.com/mapfiles/kml/paddle/"+firstLetter+"-lv.png";
                //console.log(customIcon);
                //console.log(gmarker.options.icon.url);
                options.icon.url = customIcon;
            }
            return options;
        },
        /*
        customizePolylines(){
            console.log("Modificar opciones de polylines");
            for(let gpolyline of (this.$refs.gpolylines)){
                //console.log(gpolyline.options);
                gpolyline.options.strokeColor = this.colorLegend[4].color;
                //Animación de vuelo
                this.animateRouteIcon(gpolyline);
                //Modificar color de línea según capacidad i ngresada 
            };
            //this.$refs.gpolylines[0].options.strokeColor = this.colorLegend[3].color;
        },*/
        customedPolylineOptions(options, polyline){
            let rInd = Math.floor(Math.random() * 5);
            options.strokeColor = this.colorLegend[rInd].color;
            //Animación de vuelo
            this.animateRouteIcon(polyline);
            //Modificar color de línea según capacidad i ngresada
            return options;
        }
    }
}
</script>