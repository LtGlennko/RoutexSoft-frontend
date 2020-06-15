<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card> 
                    <v-card-title class="titleCard">
                        Gestionar Usuarios
                    </v-card-title>
                    <v-card-subtitle>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    label="Buscar Usuario"
                                    single-line
                                    hide-details
                                    color="secondary"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <br><v-btn class="mb-2" @click=createUser()>Añadir Usuario</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-subtitle>
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
                        <template v-slot:item.actions="{ items }">
                            <v-icon medium class="mr-5" @click="editUser(item)" >
                                mdi-pencil
                            </v-icon>
                            <v-icon medium class="iconTable" @click="deleteUser(item)">
                                mdi-delete
                            </v-icon>
                        </template>
                    </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style src="@/styles/Administrator/ManageUsers.css" scoped>

</style>

<script>
import Swal from 'sweetalert2'
import UsersTable from '@/components/Administrator/UsersTable.vue'

export default {
    name: 'ManageUsers',
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
        createUser(){
            this.$router.push('/CreateUser');
        },
        editUser(){
            this.$router.push('/CreateUser');
        },
        deleteUser(){
             Swal.fire({
                title: '¿Está seguro que desea eliminar este usuario?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText : 'Cancelar'
            })
        },
    }

}
</script>