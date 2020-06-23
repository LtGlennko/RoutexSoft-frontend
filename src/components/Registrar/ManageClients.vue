<template>
    <v-container>
        <v-card> 
            <!--Tabla de remitente-->
            <v-row>
                <v-col>
                    <v-card-title class="titleCard">
                        Clientes
                    </v-card-title>
                    <v-card-text>
                        <v-card-subtitle>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        v-model="search"
                                        append-icon="mdi-magnify"
                                        label="Buscar Cliente"
                                        single-line
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <br><v-btn class="mb-2" @click=createClient()>Añadir Cliente</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-subtitle>
                    
                        <v-data-table   :headers="headers"
                                        :items="clients"
                                        :items-per-page="5"
                                        :loading-text="loadingText"
                                        :no-data-text="noDataText"
                                        :no-results-text="filterNoResultsText"
                                        :footer-props="footerProps"
                                        :search="search"
                                        class="elevation-1">
                            <template v-slot:item.actions="{ items }">
                                <v-icon medium class="mr-5" @click="editClient()" >
                                    mdi-pencil
                                </v-icon>
                                <v-icon medium class="iconTable" v-on:click="deleteClient()">
                                    mdi-delete
                                </v-icon>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-col>
            </v-row>
        </v-card>
        <v-divider class="mt-1"></v-divider>
    </v-container>
</template>

<style src="@/styles/Administrator/ManageUsers.css" scoped>

</style>

<script>
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import {mapState, mapActions} from 'vuex'

export default {
    name: 'ManageClients',
    data () {
        return {
            footerProps:{'items-per-page-Text':'Filas por página:  ', 'items-per-page-options': [5,10,15]},
            search: '',
            loadingText: 'Cargando clientes',
            filterNoResultsText: 'No se encontraron usuarios que cumplan con los filtros',
            noDataText: 'No hay clientes para mostrar',
            clients: [
                {
                    dni: '18232212',
                    name: 'Pancho',
                    lastName: 'Rodriguez',
                    emailAddress: 'aia2043@gmail.com',
                    nroTlf: '+54 2342311',
                },
                {
                    dni: '73274372',
                    name: 'daddy',
                    lastName: 'yankee',
                    emailAddress: 'osuna@gmail.com',
                    nroTlf: '+53 9012112',
                },
                {
                    dni: '73424483',
                    name: 'INGA',
                    lastName: 'Inga',
                    emailAddress: 'lasmanoshaciaarriba@gmail.com',
                    nroTlf: '+51 7624671',
                },
                {
                    dni: '01213882',
                    name: 'shaky shaky',
                    lastName: 'sheky oh',
                    emailAddress: 'aquillegotutiburon@gmail.com',
                    nroTlf: '+53 3233211',
                }
            ],
        }
    },
    computed: {
        ...mapState (['editSender', 'editAddressee']),
        headers () {
            let items = []
            items.push({
                text: 'DNI',
                align: 'center',
                sortable: true,
                value: 'dni',
            })
            items.push({
                text: 'NOMBRES',
                align: 'center',
                sortable: true,
                value: 'name',
            })
            items.push({
                text: 'APELLIDOS',
                align: 'center',
                sortable: true,
                value: 'lastName',
            })
            items.push({
                text: 'CORREO ELECTRÓNICO',
                align: 'center',
                sortable: true,
                value: 'emailAddress',
            })
            items.push({
                text: 'TELÉFONO',
                align: 'center',
                sortable: true,
                value: 'nroTlf'
            })            
            return items
        },
        
    },
    methods:{
        ...mapActions(['setActionClient', 'setActionSender', 'setActionAddressee']),
        createClient(){
            this.$router.push('/CreateClients');
            this.setActionClient(false);
        },
        editClient(){
            this.$router.push('/CreateClients');
            this.setActionClient(true);
        },
        deleteUser(){
            Swal.fire({
                title: '<p style="font-family:Roboto;">¿Está seguro que desea eliminar este usuario?</p>',
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