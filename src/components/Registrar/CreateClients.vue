<template>
    <v-container>
        <v-card>
            <v-row>
                <v-col>
                    <!-- FORM TO ADD A RENDER-->
                    <v-form>
                        <v-card-title class="titleCard" v-if="!editUser">
                            Crear Cliente
                        </v-card-title>

                        <v-row justify="center" class="ml-5 mr-5">
                            <v-col cols="6" >
                                <v-text-field
                                    v-model="docIden"
                                    :rules="[rules.required,rules.necessary]"
                                    label="Número de documento"
                                    maxlength="20"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    ref="name"
                                    v-model="nombres"
                                    :rules="rules.name"
                                    label="Nombres"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    ref="lastName"
                                    v-model="apellidos"
                                    :rules="[rules.required]"
                                    label="Apellidos"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    ref="email"
                                    v-model="correo"
                                    :rules="[rules.required, rules.email]"
                                    label="Correo electrónico"
                                ></v-text-field>
                            </v-col>
                            <!---Nro telf no obligatorio-->
                            <v-col cols="6" >
                                <v-text-field
                                    v-model="nroTelef"
                                    :rules="[rules.required]"
                                    label="Celular"
                                    maxlength="20"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                            </v-col>
                        </v-row>
                        <v-divider class="mt-1"></v-divider>
                        <v-card-actions>
                            <v-row>
                            <v-col cols="6" class="colButton">
                            <v-btn class="mb-2 buttonCreate" @click=createClient()>Guardar</v-btn>
                            </v-col>
                            <v-col cols="6" class="colButton">
                            <v-btn class="mb-2 buttonCancel" @click=$router.go(-1)>Cancelar</v-btn>
                            </v-col>
                        </v-row>
                        </v-card-actions>
                    </v-form>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<style src="@/styles/Administrator/CreateUser.css" scoped>

</style>

<script>

import { mapState, mapActions } from 'vuex';
import Swal from 'sweetalert2'
import PrincipalVue from '../../views/Principal/Principal.vue';

import * as userDA from '@/dataAccess/userDA.js'

export default {
    name: 'CreateClients',
    data: () => ({
        errorMessages: '',
        docIden: '',
        nombres: '',
        apellidos: '',
        correo: '',
        nroTelef: '',
        rules: {
            required: value => !!value || 'Este campo es requerido',
            counter: value => value.length <= 20 || 'Máximo 20 caracteres',
            min: value => value.length >= 8 || 'Mínimo 8 caracteres',
            min2: value => value.length >= 9 || 'Mínimo 9 dígitos',
            necessary: value => value.length >= 8 || 'El DNI debe contener 8 digitos',
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Correo electrónico inválido'
            },
            name: [val => (val || '').length > 0 || 'This field is required'],
        },
    }),    
    computed :{
         ...mapState (['editClient']),
        form () {
            return {
                docIden: this.docIden,
                nombres: this.nombres,
                apellidos: this.apellidos,
                correo: this.correo,
                nroTelef: this.nroTelef,
            }
         },
    },
    methods:{
        createClient(){
            console.log("documento:",this.docIden)
            console.log("nombre:",this.nombres)
            userDA.createClient(this.docIden,this.nombres,this.apellidos,this.correo,this.nroTelef).then((res) =>{
                console.log("apellido:",this.apellidos)
                Swal.fire({
                    icon: 'success',
                    title: '<p style="font-family:Roboto;">Enhorabuena</p>',
                    html: '<p style="font-family:Roboto;">Cliente creado satisfactoriamente</p>'
                })
                this.$router.push('/ManageClients');
            }).catch(error =>{
                    Swal.fire({
                        icon : 'error',
                        title : '<p style="font-family:Roboto;">Error</p>',
                        html : '<p style="font-family:Roboto;">Error al crear al cliente</p>'
                    })
            })
               
        },
        modifyClient(){
            Swal.fire({
                icon: 'success',
                title: '<p style="font-family:Roboto;">Enhorabuena</p>',
                html: '<p style="font-family:Roboto;">Cliente modificado satisfactoriamente</p>'
            })
        }
    }    
}
</script>