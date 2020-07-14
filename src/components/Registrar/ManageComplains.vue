<template>
    <v-container>
        <v-card> 
            <v-row>
                <v-col>
                    <v-card-title class="titleCard">
                        Visualizar Quejas
                    </v-card-title>
                    <v-card-text>
                        <v-card-subtitle>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        v-model="search"
                                        append-icon="mdi-magnify"
                                        label="Buscar Quejas"
                                        single-line
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-subtitle>
                    
                        <v-data-table   :headers="headers"
                                        :items="complains"
                                        :items-per-page="5"
                                        :loading-text="loadingText"
                                        :no-data-text="noDataText"
                                        :no-results-text="filterNoResultsText"
                                        :footer-props="footerProps"
                                        :search="search"
                                        class="elevation-1">
                            <template v-slot:item.actions="{ item}" >
                                <v-icon  medium class="mr-5" @click="viewItem(item)" >
                                    mdi-eye
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
    name: 'ManageComplains',
    data () {
        return {
            footerProps:{'items-per-page-Text':'Filas por página:  ', 'items-per-page-options': [5,10,15]},
            search: '',
            loadingText: 'Cargando quejas',
            filterNoResultsText: 'No se encontraron quejas que cumplan con los filtros',
            noDataText: 'No hay quejas para mostrar',
        }
    },
    mounted(){
        this.getComplains();
    },
    computed: {
        ...mapState (['complains']),

        headers () {
            let items = []
            items.push({
                text: 'FECHA REGISTRO',
                align: 'center',
                sortable: true,
                value: 'fechaRegistro',
            })
            items.push({
                text: 'CODIGO QUEJA',
                align: 'center',
                sortable: true,
                value: 'codigoQueja',
            })
            items.push({
                text: 'NÚMERO DOCUMENTO',
                align: 'center',
                sortable: true,
                value: 'numdocumento',
            })
            items.push({ 
                text: 'CORREO',
                align: 'center',
                sortable: true,
                value: 'correo',
            })
            items.push({
                text: 'CÓDIGO ENVÍO',
                align: 'center',
                sortable: true,
                value: 'paquete.codigoEnvio',
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
        //...mapActions(['setActionUser']),
        ...mapActions(['completeComplains','setComplainIndex']),

        getComplains: function() {
            userDA.getAllComplains().then((res) =>{
                this.completeComplains(res.data);
                console.log('Se recibió el servicio de quejas');
                console.log(res.data);
            }).catch(error =>{
                Swal.fire({
                    title: '<p style="font-family:Roboto;">Error</p>',
                    icon: 'error',
                    html: '<p style="font-family:Roboto;">Error obteniendo las quejas</p>'
                })
            });
        },

        viewItem(item){
            const index = this.complains.indexOf(item)
            console.log('index: ',index);
            this.$router.push('/ViewComplain');
            this.setComplainIndex(index)
        },
    }

}
</script>