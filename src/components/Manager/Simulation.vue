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
                                    <v-btn 
                                        icon
                                        x-large
                                        @click="getDataSimulation"
                                        color=#137073
                                        width=100
                                    >
                                        <v-icon>mdi-play-circle</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn 
                                        icon
                                        x-large
                                        color=#137073
                                        width=100
                                    >
                                        <v-icon>mdi-play-pause</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn 
                                        icon
                                        x-large
                                        color=#137073
                                        width=100
                                    >
                                        <v-icon>mdi-step-forward</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn 
                                        icon
                                        x-large
                                        color=#137073
                                        width=100
                                    >
                                        <v-icon>mdi-step-backward</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn 
                                        icon
                                        x-large
                                        color=#137073
                                        width=100
                                    >
                                        <v-icon>mdi-stop-circle</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                            
                        </v-card-actions>
                        <v-row>
                            <v-col class="cosa-rara">
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
                                Días: {{ days }}<br/>
                                Horas: {{ hours | formatTime }} <br/>
                                Minutos: {{ minutes | formatTime }} <br/>
                                Segundos: {{ seconds | formatTime }} <br/>
                                <span>Día {{ days }} - {{ hours | formatTime }}:{{ minutes | formatTime }}:{{ seconds | formatTime }}</span><br />
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

const SECOND = 1000; //1 segundo
const DAY = 24*3600*SECOND; //1 dia en milisegundos
const F_REFRESH = 1; //Número de refresheos por segundo
const REFRESH = SECOND/F_REFRESH;
const F_TIME = 1200; //Cantidad de tiempo que transcurre por un segundo
const LIMIT_D = 140;

export default {
    name: 'Simulation',
    props: {
        /*deadline: {
            type: String,
            required: true,
            default: "05/01/2021"
        }*/
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

            //TIMER
            currentTime: 1 //Inicio del contador (1 para que muestre componente)
        }
    },

    created(){
        
    },

    mounted(){
        this.getMarkers();
        this.getFirstsPaths();
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
        ...mapState(['markers', 'actualPaths', 'mapCenter', 'mapZoom', 'colorLegend', 'simDay']),
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
        getFirstsPaths: function() {
            this.currentTime = 1000*60*60*24*this.simDay; //Actualiza el tiempo transcurrido

            userDA.getAllPathsOfplans(this.days).then((res) =>{
                console.log('Primer path: '+res.data[0].flightPlan.idPlan);
                //console.log('Datos: '+res.data);
                //console.log('Tam lista vuelos: '+res.data.size());
                const subList = res.data.slice(1, 25+1);
                //console.log('Sublista: '+subList);
                //console.log('Tam sublista vuelos: '+res.data.size());
                console.log('Horas primer path: '+ res.data[0].flightPlan.horaIni + ' - ' + res.data[0].flightPlan.horaFin);
                //console.log('Primer path sub: '+res.data[0].idPlan);
                //console.log('Tercer path sub: '+res.data[2].idPlan);
                //this.completePaths(subList);
                this.completePaths(res.data);
                this.completeActualPaths(Math.trunc((this.currentTime % DAY)/1000),this.days); //Transforma milisegundo a segundo
                console.log('Se recibió el servicio de planes de vuelo');
                this.pathsRecibidos = true;
            }).catch(error =>{
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Error obteniendo los planes de vuelo del primer día'
                })
            });
        },

        getPaths: function() {
            userDA.loadSimulation(this.days+1).then(() =>{
                userDA.getAllPathsOfplans(this.days+1).then((res) =>{
                    console.log('Primer path: '+res.data[0].flightPlan.idPlan);
                    //console.log('Datos: '+res.data);
                    //console.log('Tam lista vuelos: '+res.data.size());
                    const subList = res.data.slice(1, 25+1);
                    //console.log('Sublista: '+subList);
                    //console.log('Tam sublista vuelos: '+res.data.size());
                    console.log('Horas primer path: '+ res.data[0].flightPlan.horaIni + ' - ' + res.data[0].flightPlan.horaFin);
                    //console.log('Primer path sub: '+res.data[0].idPlan);
                    //console.log('Tercer path sub: '+res.data[2].idPlan);
                    //this.completePaths(subList);
                    this.completePaths(res.data);
                }).catch(error =>{
                    Swal.fire({
                        title: 'Error',
                        icon: 'error',
                        text: 'Error obteniendo los planes de vuelo del día siguiente'
                    })
                });
            }).catch(error =>{
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Error calculando las rutas para el día siguiente'
                })
            });
        },

        //TIMER
        iniciaContador(){
            setTimeout(this.contadorTiempo, SECOND*5); //Inicia después de 5 segundsos (aprox carga del componente)
        },
        contadorTiempo(){
            
            this.currentTime+=REFRESH*F_TIME;
            if(this.days < LIMIT_D){

                if(this.currentTime >= 0){
                    if(this.currentTime % DAY == 0){ //Calcula rutas del día siguiente
                        this.getPaths();
                    }
                    this.completeActualPaths(Math.trunc((this.currentTime % DAY)/1000)); //Transforma milisegundo a segundo
                    setTimeout(this.contadorTiempo, REFRESH);
                }else{
                    this.currentTime = null;
                }
            }
            else{
                Swal.fire({
                    html: '<p style="font-family:Roboto;">Simulación finalizada</p>'
                })
                this.$router.push('/Simulation');
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