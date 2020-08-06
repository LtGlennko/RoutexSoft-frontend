<template>
    <v-container>
        <v-card>
            <v-row>
                <v-col>
                    <v-card-title class="titleCard">
                        Reporte de Estado de capacidad de almacenes
                    </v-card-title>
                    <v-row>
                        <!--
                        <v-col cols="12">
                            <v-card-subtitle class="subtitleCard">
                                América
                            </v-card-subtitle>
                        </v-col>
                        <v-col cols="6">
                            <v-card class="ml-4">
                                <apexchart height="250" type="bar" :options="optionsBarAmerica" :series="americaSerieBar"></apexchart>
                            </v-card>
                        </v-col>
                        <v-col cols="6">
                            <v-card class="mr-4">
                                <apexchart height="241" type="donut" :options="optionsDonutAmerica" :series="americaDonut"></apexchart>
                            </v-card>
                        </v-col>
                        <v-col cols="12">
                            <v-card-subtitle class="subtitleCard">
                                Europa
                            </v-card-subtitle>
                        </v-col>
                        <v-col cols="6">
                            <v-card class="ml-4"> 
                                <apexchart height="250" type="bar" :options="optionsBarEuropa" :series="europaSerieBar"></apexchart>
                            </v-card>
                        </v-col>
                        <v-col cols="6">
                            <v-card class="mr-4">
                                <apexchart height="241"  type="donut" :options="optionsDonutEuropa" :series="europaDonut"></apexchart>
                            </v-card>
                        </v-col>
                        -->
                        <v-col cols="12">
                            <v-card-subtitle class="subtitleCard">
                                Lista de capacidades de almacenes de América y Europa
                            </v-card-subtitle>
                            <v-card-text>
                                <v-card-subtitle>
                                    <v-row>
                                        <v-col cols="6">
                                            <v-text-field
                                                v-model="search"
                                                append-icon="mdi-magnify"
                                                label="Buscar capacidades de aeropuertos y aviones"
                                                single-line
                                                hide-details
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-card-subtitle>
                                <v-data-table   :headers="headers"
                                        :items="airportsCapacity"
                                        :items-per-page="5"
                                        :loading-text="loadingText"
                                        :no-data-text="noDataText"
                                        :no-results-text="filterNoResultsText"
                                        :footer-props="footerProps"
                                        :search="search"
                                        class="elevation-1">
                                </v-data-table>
                            </v-card-text>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<style src="@/styles/Manager/CollapseCapacityReport.css" scoped>

</style>

<script>

import { mapState, mapActions } from 'vuex';
import Swal from 'sweetalert2'
import * as userDA from '@/dataAccess/userDA.js'
import VueApexCharts from 'vue-apexcharts'


export default {
    name: 'CollapseCapacityReport',
    
    data() {
      return {
        optionsBarAmerica:{},
        optionsDonutAmerica:{},
        optionsBarEuropa:{},
        optionsDonutEuropa:{},
        series:{},
        americaSerieBar:{},
        americaDonut:{},
        europaSerieBar:{},
        europaDonut:{},

        typeGlobal:0,
        typeEurope:1,
        typeAmerica:2,

        footerProps:{'items-per-page-Text':'Filas por página:  ', 'items-per-page-options': [5,10,15]},
        search: '',
        loadingText: 'Cargando capacidades de aeropuertos y aviones',
        filterNoResultsText: 'No se encontraron capacidades de aeropuertos y aviones que cumplan con los filtros',
        noDataText: 'No hay capacidades de aeropuertos y aviones para mostrar',
        
      }
      
    },    
    mounted(){
        this.getCapacityAirport();
        this.getCapacityAirportEurope();
        this.getCapacityAirportAmerica();
    },
    created(){
        this.fillDataCollapseCapacity();
        console.log('Se creo', this.series);
    },
    computed :{
         ...mapState (['editClient', 'airportsCapacity','airportsCapacityEurope','airportsCapacityAmerica']),
        headers () {
            let items = []
            items.push({
                text: 'CONTINENTE',
                align: 'center',
                sortable: true,
                value: 'airport.continente',
            })
            items.push({
                text: 'PAIS',
                align: 'center',
                sortable: true,
                value: 'airport.pais',
            })
            items.push({
                text: 'CIUDAD',
                align: 'center',
                sortable: true,
                value: 'airport.ciudad',
            })
            items.push({
                text: 'CÓDIGO AÉREO',
                align: 'center',
                sortable: true,
                value: 'airport.codAero'
            })
            items.push({ 
                text: 'CAPACIDAD ALMACÉN',
                align: 'center',
                sortable: false,
                value: 'nroPaquetesSim'
            })
            
            return items
        },
         
    },
    methods:{
        ...mapActions(['completeAirportCapacity','completeAirportCapacityEurope','completeAirportCapacityAmerica']),
        fillDataCollapseCapacity(){
            //BAR CHART AMERICA
            this.optionsBarAmerica= {
                chart: {
                    id: 'AMÉRICA - TOP 5 DE CAPACIDAD DE ALMACENES MÁS OCUPADOS'
                },
                colors: ["#1e2a5a", "#ffc300"],
                plotOptions: {
                    bar: {
                        horizontal: true,
                        dataLabels: {
                            position: 'top',
                        },
                    },
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: '12px',
                        colors: ['#FFF'],
                        fontFamily:  'Roboto',
                    }
                },
                title: {
                    text: 'Top 5 de capacidad de almacenes más ocupados',
                    align: 'center',
                    margin: 15,
                    style: {
                    fontSize:  '14px',
                    fontWeight:  'bold',
                    fontFamily:  'Roboto',
                    },
                },
                xaxis: {
                    categories: [this.airportsCapacityAmerica.airport.pais],
                     labels: {
                        style: {
                            fontFamily:  'Roboto',
                        }
                    }
                },
                legend: {
                    show: true,
                    floating: true,
                    position: "top",
                }
            },
            //BAR CHART EUROPA
            this.optionsBarEuropa= {
                chart: {
                    id: 'EUROPA - TOP 5 DE CAPACIDAD DE ALMACENES MÁS OCUPADOS'
                },
                colors: ["#1e2a5a", "#ffc300"],
                plotOptions: {
                    bar: {
                        horizontal: true,
                        dataLabels: {
                            position: 'top',
                        },
                    },
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: '12px',
                        colors: ['#FFF'],
                        fontFamily:  'Roboto',
                    }
                },
                title: {
                    text: 'Top 5 de capacidad de almacenes más ocupados',
                    align: 'center',
                    margin: 15,
                    style: {
                    fontSize:  '14px',
                    fontWeight:  'bold',
                    fontFamily:  'Roboto',
                    },
                },
                xaxis: {
                    categories: ['Perú', 'Ecuador', 'Brasil', 'Bolivia','Venezuela'],
                     labels: {
                        style: {
                            fontFamily:  'Roboto',
                        }
                    }
                },
                legend: {
                    show: true,
                    floating: true,
                    position: "top",
                }
            },
            //DONUT CHART AMERICA
            this.optionsDonutAmerica= {
                chart:{
                    id: 'AMÉRICA - TOP 5 DE AVIONES CON CAPACIDAD MÁS OCUPADA',
                    toolbar: {
                        show: true,
                    }
                },
                labels: ['Perú', 'Ecuador', 'Brasil', 'Bolivia','Venezuela'],
                colors: ["#FF5733", "#ffc300", "#9c3455","#505dbd","#34b534","#5AA382","#581845"],
                plotOptions: {
                    pie: {
                        customScale: 0.9
                    }
                },
                legend: {
                    show: true,
                    position: "bottom",
                },
                title: {
                    text: 'Top 5 de aviones con capacidad más ocupada',
                    align: 'center',
                    margin: 15,
                    style: {
                        fontSize:  '14px',
                        fontWeight:  'bold',
                        fontFamily:  'Roboto',
                    },
                }
            },
            //DONUT CHART EUROPA
            this.optionsDonutEuropa= {
                chart:{
                    id: 'EUROPA - TOP 5 DE AVIONES CON CAPACIDAD MÁS OCUPADA',
                    toolbar: {
                        show: true,
                    }
                },
                labels: ['Perú', 'Ecuador', 'Brasil', 'Bolivia','Venezuela'],
                colors: ["#FF5733", "#ffc300", "#9c3455","#505dbd","#34b534","#5AA382","#581845"],
                plotOptions: {
                    pie: {
                        customScale: 0.9
                    }
                },
                legend: {
                    show: true,
                    position: "bottom",
                },
                title: {
                    text: 'Top 5 de aviones con capacidad más ocupada',
                    align: 'center',
                    margin: 15,
                    style: {
                        fontSize:  '14px',
                        fontWeight:  'bold',
                        fontFamily:  'Roboto',
                    },
                }
            },
            //SERIE BAR AMERICA
            this.americaSerieBar =[{
                name: 'Cantidad ocupada',
                data: [30, 40, 45, 50, 49, 60, 70, 91]
                }
            ],
            //SERIE BAR EUROPA
            this.europaSerieBar= [{
                name: 'Cantidad ocupada',
                data: [30, 40, 45, 50, 49, 60, 70, 91]
                }
            ],
            //SERIE DONUT AMERICA
            this.americaDonut =[30, 40, 45, 50, 49]

            //SERIE DONUT EUROPA
            this.europaDonut =[30, 40, 45, 50, 49]
           
        },

        getCapacityAirport: function() {
            userDA.getCapacityAirport(this.typeGlobal).then((res) =>{
                this.completeAirportCapacity(res.data);
                console.log('Tipo de reporte: ',this.typeGlobal );
                console.log('Se recibió el servicio de reporte');
                console.log(res.data);
            }).catch(error =>{
                Swal.fire({
                    title: '<p style="font-family:Roboto;">Error</p>',
                    icon: 'error',
                    html: '<p style="font-family:Roboto;">Error obteniendo los reportes</p>'
                })
            });
        },

        getCapacityAirportEurope: function() {
            userDA.getCapacityAirport(this.typeEurope).then((res) =>{
                this.completeAirportCapacityEurope(res.data);
                console.log('Tipo de reporte: ',this.typeEurope );
                console.log('Se recibió el servicio de reporte');
                console.log(res.data);
            }).catch(error =>{
                Swal.fire({
                    title: '<p style="font-family:Roboto;">Error</p>',
                    icon: 'error',
                    html: '<p style="font-family:Roboto;">Error obteniendo los reportes</p>'
                })
            });
        },

        getCapacityAirportAmerica: function() {
            userDA.getCapacityAirport(this.typeAmerica).then((res) =>{
                this.completeAirportCapacityAmerica(res.data);
                console.log('Tipo de reporte: ',this.typeAmerica );
                console.log('Se recibió el servicio de reporte');
                console.log(res.data);
            }).catch(error =>{
                Swal.fire({
                    title: '<p style="font-family:Roboto;">Error</p>',
                    icon: 'error',
                    html: '<p style="font-family:Roboto;">Error obteniendo los reportes</p>'
                })
            });
        },
        
    }    
}
</script>