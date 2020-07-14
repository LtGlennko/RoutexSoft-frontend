<template>
    <v-content> 
        <v-row class="topBar">
            <v-col >
            </v-col>
        </v-row>
        <v-card class="principalCardComplain">
            <v-row >
                <v-col>
                    <v-card class="mt-5 ml-8 mr-8 " >
                        <v-row class="cardTopBar">
                            <v-col > 
                                REGISTRAR QUEJA
                            </v-col>
                        </v-row>
                        <v-card-text class="cardTextComplain">
                            <v-card-subtitle class="subtitleComplain">
                                Datos del Reclamante
                            </v-card-subtitle>
                            <v-divider></v-divider>
                            <v-row class="ml-3 mr-3">
                                <v-col cols="6" >
                                    <v-text-field
                                        class="mr-10"
                                        ref="name"
                                        v-model="nombres"
                                        :rules="rules.name"
                                        label="Nombres"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" >
                                    <v-text-field
                                        class="ml-10"
                                        ref="lastName"
                                        v-model="apellidos"
                                        :rules="[rules.required]"
                                        label="Apellidos"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" >
                                    <v-text-field
                                        class="mr-10"
                                        v-model="docIden"
                                        :rules="[rules.required,rules.necessary]"
                                        label="Número de documento"
                                        maxlength="20"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" >
                                    <v-text-field
                                        class="ml-10"
                                        ref="email"
                                        v-model="correo"
                                        :rules="[rules.required, rules.email]"
                                        label="Correo electrónico"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-text class="cardTextComplain">
                            <v-card-subtitle class="subtitleComplain">
                                Descripción de la queja
                            </v-card-subtitle>
                            <v-divider></v-divider>
                            <v-row class="ml-3 mr-3">
                                <v-col cols="6" >
                                    <v-text-field
                                        class="mr-10"
                                        ref="codigoEnvio"
                                        v-model="PackageData.codigoEnvio"
                                        label="Código del paquete"
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" >
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea
                                        ref="queja"
                                        v-model="queja"
                                        label="Descripción"
                                        :rules="[rules.required]"
                                    >
                                    </v-textarea>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-text class="cardTextComplainButton">
                            <v-row>
                                <v-col cols="12">
                                    <v-btn class="mb-2 my-2 buttonCreate" @click=sendComplain()>Enviar Queja</v-btn>
                                </v-col> 
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
        <v-footer absolute class="footerClient">
        <v-row class="topBar">
            <v-col >
            </v-col>
        </v-row>
        </v-footer>
    </v-content>
</template>


<style src="@/styles/Client/RegisterComplain.css" scoped>
</style>

<script>

import { mapState, mapActions } from 'vuex';
import Swal from 'sweetalert2'
import * as userDA from '@/dataAccess/userDA.js'

export default {
    name: 'RegisterComplain',
    data: () => ({
        docIden: '',
        nombres: '',
        apellidos: '',
        correo: '',
        nroTelef: '',
        queja:'',
        codigoEnvio:'',
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
        ...mapState (['PackageData']),
    },

    methods: {
        sendComplain(){
            console.log("documento:",this.docIden)
            console.log("nombre:",this.nombres)
           console.log("nombre:",this.PackageData.codigoEnvio),
            userDA.createComplain(this.PackageData.codigoEnvio,this.nombres,this.apellidos,this.docIden,this.correo,this.queja).then((res) =>{
                console.log("apellido:",this.apellidos)
                Swal.fire({
                    icon: 'success',
                    title: '<p style="font-family:Roboto;">Enhorabuena</p>',
                    html: '<p style="font-family:Roboto;">La queja ha sido enviada satisfactoriamente</p>'
                })
                this.$router.go(-1);
            }).catch(error =>{
                    Swal.fire({
                        icon : 'error',
                        title : '<p style="font-family:Roboto;">Error</p>',
                        html : '<p style="font-family:Roboto;">Error al enviar la queja</p>'
                    })
            })
               
        },
    },
}
</script>