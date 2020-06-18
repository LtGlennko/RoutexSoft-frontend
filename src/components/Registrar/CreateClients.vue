<template>
    <v-container>
        <v-card>
            <v-row>
                <v-col>
                    <!-- FORM TO ADD A RENDER-->
                    <v-form>
                        <v-card-title class="titleCard" v-if="editClient==='Remitente'">
                            Crear Cliente > Remitente
                        </v-card-title>

                        <v-card-title class="titleCard" v-if="editClient==='Destinatario'">
                            Crear Cliente > Destinatario
                        </v-card-title>
                    
                        <v-row justify="center" class="ml-5 mr-5">
                            <v-col cols="6" >
                                <v-text-field
                                    v-model="dni"
                                    :rules="[rules.required,rules.necessary]"
                                    label="DNI"
                                    maxlength="8"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    ref="name"
                                    v-model="name"
                                    :rules="[() => !!name || 'Este campo es requerido']"
                                    :error-messages="errorMessages"
                                    label="Nombres"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    ref="lastName"
                                    v-model="lastName"
                                    :rules="[() => !!lastName || 'Este campo es requerido']"
                                    :error-messages="errorMessages"
                                    label="Apellidos"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    ref="email"
                                    v-model="email"
                                    :rules="[rules.required, rules.email]"
                                    label="Correo electrónico"
                                ></v-text-field>
                            </v-col>
                            <!---Nro telf no obligatorio-->
                            <v-col cols="6" >
                                <v-text-field
                                    v-model="nroTlf"

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
                            <v-btn class="mb-2 buttonCreate" v-if="editClient==='Remitente'" @click=createSender()>Guardar</v-btn>
                            <v-btn class="mb-2 buttonCreate" v-if="editClient==='Destinatario'" @click=createAddresseer()>Guardar</v-btn>
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


export default {
    name: 'CreateClients',
    data: () => ({
        errorMessages: '',
        dni: '',
        name: null,
        lastName: null,
        email: null,
        nroTlf: '',
        rules: {
            required: value => !!value || 'Este campo es requerido',
            counter: value => value.length <= 20 || 'Máximo 20 caracteres',
            min: value => value.length >= 8 || 'Mínimo 8 caracteres',
            min2: value => value.length >= 9 || 'Mínimo 9 dígitos',
            necessary: value => value.length >= 8 || 'El DNI debe contener 8 digitos',
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Correo electrónico inválido'
            }
        },
    }),    
    computed :{
         ...mapState (['editClient']),
         form () {
            return {
                dni: this.dni,
                name: this.name,
                lastName: this.lastName,
                email: this.email,
                nroTlf: this.nroTlf,
            }
         },
    },
    methods:{
        createSender(){
            Swal.fire({
                icon: 'success',
                title: '<p style="font-family:Roboto;">Enhorabuena</p>',
                html: '<p style="font-family:Roboto;">Cliente remitente creado satisfactoriamente</p>'
            })
        },
        createAddresseer(){
            Swal.fire({
                icon: 'success',
                title: '<p style="font-family:Roboto;">Enhorabuena</p>',
                html: '<p style="font-family:Roboto;">Cliente destinatario creado satisfactoriamente</p>'
            })
        }
    }    
}
</script>