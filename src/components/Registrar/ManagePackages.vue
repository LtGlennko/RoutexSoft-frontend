<template>
    <v-container>
        <v-card> 
            <v-row>
                <v-col>
                    <v-card-title class="titleCard">
                        Gestionar Paquetes
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
                                <v-col cols="6">
                                    <br><v-btn class="mb-2" @click=createUser()>Añadir Usuario</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-subtitle>
                    
                        <v-data-table   :headers="headers"
                                        :items="users"
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
                                <v-icon medium class="iconTable" v-on:click="deleteUser()">
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
    name: 'ManagePackages',
    data () {
        return {
            footerProps:{'items-per-page-Text':'Filas por página:  ', 'items-per-page-options': [5,10,15]},
            search: '',
            loadingText: 'Cargando usuarios',
            filterNoResultsText: 'No se encontraron usuarios que cumplan con los filtros',
            noDataText: 'No hay usuarios para mostrar',
            users: [
                {
                    name: 'Frozen Yogurt',
                    lastName: 'Frozen Yogurt',
                    emailAddress: 'ALOPEZ@GMAIL.COM',
                    userName: 'ALOPEZ',
                },
                {
                    name: 'Ice cream sandwich',
                    lastName: 'Frozen Yogurt',
                    emailAddress: 'JVARGAS@GMAIL.COM',
                    userName: 'JVARGAS',
                }
            ],
        }
    },
    computed: {
        headers () {
            let items = []
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
                text: 'USUARIO',
                align: 'center',
                sortable: true,
                value: 'userName'
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
        editUser(){
            this.$router.push('/CreateUser');
            this.setActionUser(true);
        },
        deletePackage(){
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