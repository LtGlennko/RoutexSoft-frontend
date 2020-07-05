<template>
    <v-container>
        <v-card> 
            <v-row>
                <v-col>
                    <v-card-title class="titleCard">
                        Visualizar Paquetes
                    </v-card-title>
                    <v-card-text>
                        <v-card-subtitle>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        v-model="search"
                                        append-icon="mdi-magnify"
                                        label="Buscar Usuario"
                                        single-line
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-subtitle>
                    
                        <v-data-table   :headers="headers"
                                        :items="packages"
                                        :items-per-page="5"
                                        :loading-text="loadingText"
                                        :no-data-text="noDataText"
                                        :no-results-text="filterNoResultsText"
                                        :footer-props="footerProps"
                                        :search="search"
                                        class="elevation-1">
                            <template v-slot:item.actions="{ item}" >
                                <v-icon medium class="mr-5" @click="viewRute(item)" >
                                    mdi-call-split
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
import * as userDA from '@/dataAccess/userDA.js'

export default {
    name: 'ManagePackages',
    data () {
        return {
            footerProps:{'items-per-page-Text':'Filas por página:  ', 'items-per-page-options': [5,10,15]},
            search: '',
            loadingText: 'Cargando usuarios',
            filterNoResultsText: 'No se encontraron usuarios que cumplan con los filtros',
            noDataText: 'No hay usuarios para mostrar',
        }
    },
    mounted(){
        this.getPackages();
    },
    computed: {
        ...mapState (['packages','PackageData']),

        headers () {
            let items = []
            items.push({
                text: 'COD. ENVÍO',
                align: 'center',
                sortable: true,
                value: 'codigoEnvio',
            })
            items.push({
                text: 'DESCRIPCIÓN',
                align: 'center',
                sortable: true,
                value: 'descripcion',
            })
            items.push({
                text: 'REMITENTE',
                align: 'center',
                sortable: true,
                value: 'remitente.nombres',
            })
            items.push({ 
                text: 'DESTINATARIO',
                align: 'center',
                sortable: true,
                value: 'destinatario.nombres',
            })
            items.push({
                text: 'ORIGEN',
                align: 'center',
                sortable: true,
                value: 'origen.ciudad',
            })
            items.push({
                text: 'DESTINO',
                align: 'center',
                sortable: true,
                value: 'destino.ciudad',
            })
            items.push({ 
                text: 'VER RUTA',
                align: 'center',
                sortable: false,
                value: 'actions'
            })
            
            return items
        },
        
    },    
    methods:{
        //...mapActions(['setActionUser']),
        ...mapActions(['completePackages','completePackageData']),

        getPackages: function() {
            userDA.getAllPackages().then((res) =>{
                this.completePackages(res.data);
                console.log('Se recibió el servicio de paquetes');
                console.log(res.data);
            }).catch(error =>{
                Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: 'Error obteniendo los clientes'
                })
            });
        },

        viewRute(item){
            console.log('Se mostrará la ruta');
            console.log(item.codigoEnvio);
            userDA.getPackageDataByTrackNumber(item.codigoEnvio).then((res) =>{
                console.log(res.data);
                this.completePackageData(res.data);
                this.$router.push('/RouteDetail');
            }).catch(error =>{
                    Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: 'error',
                        html: '<p style="font-family:Roboto;">Código del paquete no encontrado</p>'
                    })
            })

        },

        deletePackage(){
            Swal.fire({
                title: '<p style="font-family:Roboto;">¿Está seguro que desea eliminar este paquete?</p>',
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