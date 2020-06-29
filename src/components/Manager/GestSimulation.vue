<template>
    <v-container>
        <v-card> 
            <v-row>
                <v-col>
                    <v-card-title class="titleCard">
                         Simulación
                    </v-card-title>
                    <v-card-text>
                        <v-card-subtitle>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        v-model="search"
                                        append-icon="mdi-magnify"
                                        label="Ingrese el campo a buscar"
                                        single-line
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <br><v-btn class="mb-2" @click=GenerateSim()>Generar Simulación</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-subtitle>
                    
                        <v-data-table   :headers="headers"
                                        :items="simulation_details"
                                        :items-per-page="5"
                                        :loading-text="loadingText"
                                        :no-data-text="noDataText"
                                        :no-results-text="filterNoResultsText"
                                        :footer-props="footerProps"
                                        :search="search"
                                        class="elevation-1">
                                        <template v-slot:item.actions="{ items }">
                                            <v-icon medium class="mr-5" @click="detailSim()" >
                                                mdi-eye
                                            </v-icon>
                                            <v-icon medium class="iconTable" v-on:click="deleteSim()">
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
<style src="@/styles/Manager/GetSimulation.css" scoped>

</style>
<script>
import {mapState, mapActions} from 'vuex'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
export default {
    name: 'GestSimulation',
    data(){
        return{
            search: '',
            loadingText: 'Cargando usuarios',
            filterNoResultsText: 'No se encontraron usuarios que cumplan con los filtros',
            noDataText: 'No hay usuarios para mostrar',
            simulation_details: [
                {
                    id_simulation: '1',
                    date_created: '04/09/19',
                    time_created: '17:49',
                    time_duration: '765',
                    state:'Terminado - Colapso'
                },
                {
                    id_simulation: '2',
                    date_created: '25/06/20',
                    time_created: '20:01',
                    time_duration: '-',
                    state:'En proceso'
                }
            ],
        }
    },
    computed: {
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
        ...mapActions(['setActionSimulation']),
        GenerateSim(){
            Swal.fire({
                html: '<p style="font-family:Roboto;">Se ha iniciado la ejecución de la simulación</p>'
            })
            this.$router.push('/Simulation');
            this.setActionSimulation('Simulación > Generar Simulación');
        },
        detailSim(){
            this.$router.push('/Simulation');
            this.setActionSimulation('Simulación > Ver Simulación');
        },
        deleteSim(){
            Swal.fire({
                title: '<p style="font-family:Roboto;">¿Está seguro que desea eliminar esta simulación?</p>',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#28a745',
                cancelButtonColor: '#d33',
                confirmButtonText: '<p style="font-family:Roboto;">Sí, eliminar</p>',
                cancelButtonText : '<p style="font-family:Roboto;">Cancelar</p>'
            })
        }
    }
}
</script>