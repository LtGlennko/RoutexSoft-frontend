<template>
    <v-container>
        <v-card> 
            <v-row>
                <v-col>
                    <v-card-title class="titleCard">
                        Cargar Historial
                    </v-card-title>
                    <v-card-text>
                        
                    
                        <v-data-table   :headers="headers"
                                        :items="users"
                                        :items-per-page="5"
                                        :loading-text="loadingText"
                                        :no-data-text="noDataText"
                                        :no-results-text="filterNoResultsText"
                                        :footer-props="footerProps"
                                        :search="search"
                                        class="elevation-1">
                        </v-data-table>
                        <v-card-subtitle>
                            <v-row>
                                <v-col cols="6">
                                    <br><v-btn class="mb-2 buttonLoadHistory" @click=LoadHistory()>Cargar Historial</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-subtitle>
                    </v-card-text>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<style src="@/styles/Manager/GestHistory.css" scoped>
</style>
<script>
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
export default {
    name: 'GestHistory',
    data () {
        return {
            footerProps:{'items-per-page-Text':'Filas por página:  ', 'items-per-page-options': [5,10,15]},
            search: '',
            loadingText: 'Cargando usuarios',
            filterNoResultsText: 'No se encontraron usuarios que cumplan con los filtros',
            noDataText: 'No hay usuarios para mostrar',
            users: [
                {
                    first_city: 'ESKN',
                    last_city: 'SKBO',
                    first_time: '18:22',
                    last_time: '15:24',
                },
                {
                    first_city: 'SGAS',
                    last_city: 'SEQM',
                    first_time: '08:40',
                    last_time: '18:45',
                }
            ],
        }
    },
    computed: {
        headers () {
            let items = []
            items.push({
                text: 'CIUDAD ORIGEN',
                align: 'center',
                sortable: true,
                value: 'first_city',
            })
            items.push({
                text: 'CIUDAD DESTINO',
                align: 'center',
                sortable: true,
                value: 'last_city',
            })
            items.push({
                text: 'HORA PARTIDA',
                align: 'center',
                sortable: true,
                value: 'first_time',
            })
            items.push({
                text: 'HORA SALIDA',
                align: 'center',
                sortable: true,
                value: 'last_time'
            })
            
            return items
        },
        
    },    
    methods:{
        LoadHistory(){
            Swal.fire({
                icon: 'success',
                title: '<p style="font-family:Roboto;">Enhorabuena</p>',
                html: '<p style="font-family:Roboto;">Se ha cargado exitosamente el historial</p>'
            })
        }
    }
    //Todavía tengo que ver como funciona los actions en el index.js del store

}
</script>