<template>
    <v-container>
        <v-card-title class="mainTitle">
            Crear Envío > Selección Remitente/Destinatario
        </v-card-title>
        <v-card> 
            <!--Tabla de remitente-->
            <v-row>
                <v-col>
                    <v-card-title class="titleCard1">
                        Remitente
                    </v-card-title>
                    <v-card-text>
                        <v-card-subtitle>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        v-model="search1"
                                        append-icon="mdi-magnify"
                                        label="Buscar Cliente"
                                        single-line
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <br><v-btn class="mb-2" @click=createSender()>Añadir Cliente</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-subtitle>
                    
                        <v-data-table   :headers="headers"
                                        :items="senders"
                                        :items-per-page="5"
                                        :loading-text="loadingText"
                                        :no-data-text="noDataText"
                                        :no-results-text="filterNoResultsText"
                                        :footer-props="footerProps"
                                        :search="search1"
                                        class="elevation-1">
                        </v-data-table>
                    </v-card-text>
                </v-col>
            </v-row>
            <!--Tabla de destinatario-->
            <v-row>
                <v-col>
                    <v-card-title class="titleCard2">
                        Destinatario
                    </v-card-title>
                    <v-card-text>
                        <v-card-subtitle>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        v-model="search2"
                                        append-icon="mdi-magnify"
                                        label="Buscar Cliente"
                                        single-line
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <br><v-btn class="mb-2" @click=createAddressee()>Añadir Cliente</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-subtitle>
                    
                        <v-data-table   :headers="headers"
                                        :items="addressees"
                                        :items-per-page="5"
                                        :loading-text="loadingText"
                                        :no-data-text="noDataText"
                                        :no-results-text="filterNoResultsText"
                                        :footer-props="footerProps"
                                        :search="search2"
                                        class="elevation-1">
                        </v-data-table>
                    </v-card-text>
                </v-col>
            </v-row>
        </v-card>
        <v-divider class="mt-1"></v-divider>
        <v-card-actions>
            <v-row>
                <v-col cols="6" class="colButton">
                    <v-btn class="mb-2 buttonCreate" @click=finalDataSending()>Crear Envío</v-btn>
                </v-col>
            </v-row>
        </v-card-actions>
    </v-container>
</template>

<style src="@/styles/Administrator/ManageUsers.css" scoped>

</style>

<script>
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import {mapState, mapActions} from 'vuex'

export default {
    name: 'SelectClients',
    data () {
        return {
            footerProps:{'items-per-page-Text':'Filas por página:  ', 'items-per-page-options': [5,10,15]},
            search1: '',
            search2: '',
            loadingText: 'Cargando clientes',
            filterNoResultsText: 'No se encontraron usuarios que cumplan con los filtros',
            noDataText: 'No hay clientes para mostrar',
            senders: [
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
                }
            ],
            addressees: [
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
        ...mapActions(['setActionClient']),
        createSender(){
            this.$router.push('/CreateClients');
            this.setActionClient('Remitente');
        },
        createAddressee(){
            this.$router.push('/CreateClients');
            this.setActionClient('Destinatario');
        },
        finalDataSending(){
            this.$router.push('/CreateSending');
            this.setActionSender('Felipe Huerta');
            this.setActionAddressee('Martin Paniagua');
        },
    }

}
</script>