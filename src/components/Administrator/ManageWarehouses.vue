<template>
    <v-container>
        <v-card> 
            <v-row>
                <v-col>
                    <v-card-title class="titleCard">
                        Gestionar Almacenes
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
                                        :items="warehouses"
                                        :items-per-page="5"
                                        :loading-text="loadingText"
                                        :no-data-text="noDataText"
                                        :no-results-text="filterNoResultsText"
                                        :footer-props="footerProps"
                                        :search="search"
                                        class="elevation-1">
                            <template v-slot:item.actions="{ items }">
                                <v-icon medium class="mr-5" @click="editUser()" >
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

export default {
    name: 'ManageWarehouses',
    data () {
        return {
            footerProps:{'items-per-page-Text':'Filas por página:  ', 'items-per-page-options': [5,10,15]},
            search: '',
            loadingText: 'Cargando almacenes',
            filterNoResultsText: 'No se encontraron almacenes que cumplan con los filtros',
            noDataText: 'No hay almacenes para mostrar',
            warehouses: [
                {
                    name: 'BOGO',
                    country: 'COLOMBIA',
                    city: 'BOGOTA',
                    capacity: '200',
                },
                {
                    name: 'QUIT',
                    country: 'ECUADOR',
                    city: 'QUITO',
                    capacity: '200',
                },
                {
                    name: 'CARA',
                    country: 'VENEZUELA',
                    city: 'CARACAS',
                    capacity: '200',
                },
                {
                    name: 'BRAS',
                    country: 'BRASILIA',
                    city: 'BRASIL',
                    capacity: '200',
                }
            ],
        }
    },
    computed: {
        headers () {
            let items = []
            items.push({
                text: 'NOMBRE',
                align: 'center',
                sortable: true,
                value: 'name',
            })
            items.push({
                text: 'PAIS',
                align: 'center',
                sortable: true,
                value: 'country',
            })
            items.push({
                text: 'CIUDAD',
                align: 'center',
                sortable: true,
                value: 'city',
            })
            items.push({
                text: 'CAPACIDAD',
                align: 'center',
                sortable: true,
                value: 'capacity'
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
        editUser(){
            this.$router.push('/ModifyWarehouses');
        },
    }
}
</script>