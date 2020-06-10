<template>
<v-container>
   <v-card>
    <v-card-title>
      Gestionar Usuarios
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar Usuario"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table>
        <template>
            <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo electrónico</th>
                <th style="width: 18%; text-align: center;">Usuario</th>
                <th>Acciones</th>
            </tr>
        </template>
        <template>
            <tr> <!-- v-for="(user,index) in users" v-bind:key="index">-->
                <td>1</td>
                <td>ADRIANA CAROLINA</td>
                <td>LOPEZ VEGA</td>
                <td>ADRI@GMAIL.COM</td>
                <td>ALOPEZ</td>
                
            </tr>
        </template>    
    </v-data-table>
  </v-card>
  </v-container>
</template>

<style src="@/styles/Administrator/ManageUsers.css" scoped>

</style>

<script>
import Swal from 'sweetalert2'

export default {
    name: 'ManageUsers',
    methods:{
        /*createUser(){
            this.$router.push('/userCreate');
        },
        editUser(){
            this.$router.push('/userCreate');
        },
        deleteUser(){
            this.$router.push('/userCreate');
        },*/
    }

}
</script>