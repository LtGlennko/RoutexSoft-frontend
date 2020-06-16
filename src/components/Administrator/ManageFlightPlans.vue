<template>
    <v-container>
        <v-card> 
            <v-row>
                <v-col>
                    <v-card-title class="titleCard">
                        Gestionar Planes de Vuelo
                    </v-card-title>
                    <v-card-text>
                        <v-card-subtitle>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        v-model="search"
                                        append-icon="mdi-magnify"
                                        label="Buscar Plan de Vuelo"
                                        single-line
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <br><v-btn class="mb-2" @click=createFightPlan()>Añadir Plan de vuelo</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-subtitle>
                    
                        <v-data-table   :headers="headers"
                                        :items="flightPlans"
                                        :items-per-page="5"
                                        :loading-text="loadingText"
                                        :no-data-text="noDataText"
                                        :no-results-text="filterNoResultsText"
                                        :footer-props="footerProps"
                                        :search="search"
                                        class="elevation-1">
                            <template v-slot:item.actions="{ items }">
                                <v-icon medium class="mr-5" @click="editFightPlan()" >
                                    mdi-pencil
                                </v-icon>
                                <v-icon medium class="iconTable" v-on:click="deleteFightPlan()">
                                    mdi-delete
                                </v-icon>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<style src="@/styles/Administrator/ManageUsers.css" scoped>

</style>


<script>
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import {mapState, mapActions} from 'vuex'

export default {
    name: 'ManageFlightPlans',
    data () {
        return {
            footerProps:{'items-per-page-Text':'Filas por página:  ', 'items-per-page-options': [5,10,15]},
            search: '',
            loadingText: 'Cargando planes de vuelo',
            filterNoResultsText: 'No se encontraron planes de vuelo que cumplan con los filtros',
            noDataText: 'No hay planes de vuelo para mostrar',
            flightPlans: [
                {
                    originAirport: 'SKBO',
                    destinationAirport: 'SEQM',
                    departureTime: '11:34',
                    arrivalTime: '15:42',
                },
                {
                    originAirport: 'SBBR',
                    destinationAirport: 'SPIM',
                    departureTime: '3:48',
                    arrivalTime: '7:51',
                },
                {
                    originAirport: 'SCEL',
                    destinationAirport: 'SABE',
                    departureTime: '3:48',
                    arrivalTime: '7:51',
                },
                {
                    originAirport: 'LATI',
                    destinationAirport: 'LOWW',
                    departureTime: '3:48',
                    arrivalTime: '7:51',
                },
                {
                    originAirport: 'LBSF',
                    destinationAirport: 'LZIB',
                    departureTime: '3:48',
                    arrivalTime: '7:51',
                },
                {
                    originAirport: 'EFHK',
                    destinationAirport: 'LHBP',
                    departureTime: '3:48',
                    arrivalTime: '7:51',
                }
            ],
        }
    },
    computed: {
        headers () {
            let items = []
            items.push({
                text: 'AEROPUERTO ORIGEN',
                align: 'center',
                sortable: true,
                value: 'originAirport',
            })
            items.push({
                text: 'AEROPUERTO DESTINO',
                align: 'center',
                sortable: true,
                value: 'destinationAirport',
            })
            items.push({
                text: 'HORA PARTIDA',
                align: 'center',
                sortable: true,
                value: 'departureTime',
            })
            items.push({
                text: 'HORA LLEGADA',
                align: 'center',
                sortable: true,
                value: 'arrivalTime'
            })
            items.push({ 
                text: 'ACCIONES',
                align: 'center',
                sortable: false,
                value: 'actions'
            })
            
            return items
        },
        
    },    
    methods:{
        ...mapActions(['setActionFightPlans']),
        createFightPlan(){
            this.$router.push('/CreateFlightPlan');
            this.setActionFightPlans(false);
        },
        editFightPlan(){
            this.$router.push('/CreateFlightPlan');
            this.setActionFightPlans(true);
        },
        deleteFightPlan(){
            Swal.fire({
                title: '<p style="font-family:Roboto;">¿Está seguro que desea eliminar este plan de vuelo?</p>',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#28a745',
                cancelButtonColor: '#d33',
                confirmButtonText: '<p style="font-family:Roboto;">Sí, eliminar</p>',
                cancelButtonText : '<p style="font-family:Roboto;">Cancelar</p>'
            })
        },
    }

}
</script>