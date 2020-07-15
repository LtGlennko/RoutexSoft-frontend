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
                                    <v-icon medium class="mr-5" @click="getDataSimulation">mdi-play-circle </v-icon>
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
                                <button 
                                    @click="getDataSimulation"
                                    class="btn btn-primary"
                                >
                                    Ejecutar simulación       
                                </button>

                                <!--El componente que quieres mostrar después recibir resultados en las llamadas de las apis-->
                                <SimulationMap v-if="showComponent">

                                </SimulationMap>

                                <h2 v-if="showLoading">Cargando...</h2>
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

                        <v-col>
                            <div class="text-center" v-if="currentTime">
                                <span v-if="days">
                                    Days: {{ days }}<br/>
                                </span>
                                <span v-if="hours">
                                    Hours: {{ hours | formatTime }} <br/>
                                </span>
                                    Minutes: {{ minutes | formatTime }} <br/>
                                    Seconds: {{ seconds | formatTime }} <br/>
                                <br/>
                                <span v-if="days">{{ days }}</span
                                >:<span v-if="hours">{{ hours | formatTime }}:</span><span>{{ minutes | formatTime }}:{{ seconds | formatTime }}</span><br />
                            </div>
                            <div class="text-center" v-if="!currentTime">
                                Time's Up!
                            </div>
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
import SimulationMap from '@/components/Manager/SimulationMap.vue'

/*
Vue.component('comp-mapa-simulacion', {
    template: `
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

            <gmap-polyline v-for="(path) in actualPaths"
                :key="path.key"
                :path.sync="path.route"
                :options="customedPolylineOptions(JSON.parse(JSON.stringify(polylineOptions)), path)"
                ref="gpolylines"
            >
            </gmap-polyline>
            
        </gmap-map>
    `
});*/

export default {
    name: 'Simulation',
    props: {
        deadline: {
            type: String,
            required: true,
            default: "05/01/2021"
        },
        speed: {
            type: Number,
            default: 1000 //1 segundo
        }

    },
    components: {
        SimulationMap
    },
    data(){
        return{
            /*
            center: {
                lat: 36.60338869729776,
                lng: -4.643738644531254
            },
            */
            /*colorLegend: [
                {text: ' > 0 - 20', color: 'light-green'},
                {text: ' >20 - 40', color: 'lime'},
                {text: ' >40 - 60', color: 'yellow'},
                {text: ' >60 - 80', color: 'orange'},
                {text: ' >80 - 100', color: 'red'}
            ],*/
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
            showComponent: false,//Muestra al componente que se quiere cargar
            showLoading: false,//Muestra el mensaje de Cargando...

            markersRecibidos: false,
            pathsRecibidos: false,

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

            //TIMER
            currentTime: 1 //Inicio del contador
        }
    },

    created(){
        
    },

    mounted(){
        this.getMarkers();
        this.getPaths();
        /*
        setInterval(function(){
            //this.contadorTiempo();
            if(this.currentTime == null || this.currentTime>2000)
                this.currentTime = 0;
            else
                this.currentTime += 1;
            console.log(1000000);
        }, this.speed)*/
    },
    updated(){
        //this.customizeMarkers();
    },

    computed: {
        ...mapState(['markers', 'actualPaths', 'mapCenter', 'mapZoom', 'colorLegend']),
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
        //TIMER
        /*getHora(){
            return this.hora+":"+this.minuto+":"+this.segundo;
        }*/
        seconds() {
            return Math.floor((this.currentTime / 1000) % 60);
        },
        minutes() {
            return Math.floor((this.currentTime / 1000 / 60) % 60);
        },
        hours() {
            return Math.floor((this.currentTime / (1000 * 60 * 60)) % 24);
        },
        days() {
            return Math.floor(this.currentTime / (1000 * 60 * 60 * 24));
        },
    },
    filters: {
        formatTime(value) {
            if (value < 10) {
                return "0" + value;
            }
            return value;
        }
    },
    methods:{
        ...mapActions(['completeMarkers', 'completePaths', 'completeActualPaths']),

        GenerateSim(){
            Swal.fire({
                html: '<p style="font-family:Roboto;">Se ha iniciado la ejecución de la simulación</p>'
            })
            this.$router.push('/Simulation');
        },
        getMarkers: function() {
            userDA.getAllAirports().then((res) =>{ //Obtiene los mismos datos que los aeropuertos
                console.log('Primer marker: '+res.data[0].codAero);
                console.log('Datos: '+res.data);
                //console.log('Tam lista markers: '+res.data.size());
                this.completeMarkers(res.data);
                console.log('Se recibió el servicio de aeropuertos');
                this.markersRecibidos = true;
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
                //console.log('Primer path sub: '+res.data[0].idPlan);
                //console.log('Tercer path sub: '+res.data[2].idPlan);
                this.completePaths(res.data);
                this.completeActualPaths(this.currentTime);
                console.log('Se recibió el servicio de planes de vuelo');
                this.pathsRecibidos = true;
                console.log('Holi');
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
        //TIMER
        iniciaContador(){
            setTimeout(this.contadorTiempo, this.speed); //Inicia 
        },
        contadorTiempo(){
            
            this.currentTime+=this.speed;
            /*if(this.currentTime == null)
                this.currentTime = 0;
            else
                this.currentTime += 1;*/
            if(this.currentTime >= 0){
                if(this.currentTime % 7000 == 0){
                    if((this.currentTime / 7000) % 2 == 0)
                        this.completeActualPaths(-1);
                    else
                        this.completeActualPaths(0);
                }

                setTimeout(this.contadorTiempo, this.speed);
            }else{
                this.currentTime = null;
            }
            //console.log(this.currentTime);
        },
        getDataSimulation(){
            this.showLoading = true;
            //this.getMarkers();
            //this.getPaths();
            console.log("M: " + this.markersRecibidos + " P: " + this.pathsRecibidos);
            if(this.markersRecibidos && this.pathsRecibidos){
                console.log("Se cargaron");
                this.showLoading = false;
                this.showComponent = true;
                this.iniciaContador();
            }
        }
    }
}
</script>