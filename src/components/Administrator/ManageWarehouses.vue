<template>
    <v-container>
        <v-card> 
            <v-row>
                <v-col>
                    <v-card-title class="titleCard">
                        Gestionar Aeropuertos
                    </v-card-title>
                    <v-card-text>
                        <v-card-subtitle>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        v-model="search"
                                        append-icon="mdi-magnify"
                                        label="Buscar Almacén"
                                        single-line
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    
                                </v-col>
                            </v-row>
                        </v-card-subtitle>
                    
                        <v-data-table   :headers="headers"
                                        :items="airports"
                                        :item-key="idAero"
                                        :items-per-page="5"
                                        :loading-text="loadingText"
                                        :no-data-text="noDataText"
                                        :no-results-text="filterNoResultsText"
                                        :footer-props="footerProps"
                                        :search="search"
                                        class="elevation-1">
                            <template v-slot:item.actions="{ item}" >
                                <v-icon medium class="mr-5" @click="editWarehouses(item)" >
                                    mdi-pencil
                                </v-icon>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<style src="@/styles/Administrator/ManageWarehouses.css" scoped>

</style>

<script>
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import {mapState, mapActions} from 'vuex'
import * as userDA from '@/dataAccess/userDA.js'

export default {
    name: 'ManageWarehouses',
    data () {
        return {
            footerProps:{'items-per-page-Text':'Filas por página:  ', 'items-per-page-options': [5,10,15]},
            search: '',
            loadingText: 'Cargando almacenes',
            filterNoResultsText: 'No se encontraron almacenes que cumplan con los filtros',
            noDataText: 'No hay almacenes para mostrar',
        }
    },

    mounted(){
        this.getAirports();
    },
    
    computed: {
        ...mapState (['airports']),

        headers () {
            let items = []
            items.push({
                text: 'CÓDIGO AEREO',
                align: 'center',
                sortable: true,
                value: 'codAero',
            })
            items.push({
                text: 'CONTINENTE',
                align: 'center',
                sortable: true,
                value: 'continente',
            })
            items.push({
                text: 'PAIS',
                align: 'center',
                sortable: true,
                value: 'pais',
            })
            items.push({
                text: 'CIUDAD',
                align: 'center',
                sortable: true,
                value: 'ciudad',
            })
            items.push({
                text: 'CAPACIDAD',
                align: 'center',
                sortable: true,
                value: 'capacidad'
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
        ...mapActions(['completeAirports','setAirportIndex']),
        
        editWarehouses(item){
            const index = this.airports.indexOf(item)
            console.log('index: ',index);
            console.log('codigo: ',item.ciudad);
            this.$router.push('/ModifyWarehouses');
            this.setAirportIndex(index)
        },
        

        getAirports: function() {
            userDA.getAllAirports().then((res) =>{
                this.completeAirports(res.data);
                console.log('Se recibió el servicio de aeropuertos');
            }).catch(error =>{
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Error obteniendo los aeropuertos'
                })
            });
        },
    }
}
</script>