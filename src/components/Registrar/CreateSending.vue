<template>
    <v-container>
        <v-card>
            <v-card-title class="titleCard">
                Crear Envío
            </v-card-title>
            <v-tabs
                v-model="tab"
                background-color="#137073"
                centered
                dark
                icons-and-text
            >
                <v-tabs-slider></v-tabs-slider>
                <v-tab href="#tab-1">
                    Remitente
                </v-tab>
                <v-tab href="#tab-2">
                    Destinatario
                </v-tab>
                <v-tab href="#tab-3">
                    Datos Finales
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item :value="'tab-1'">
                    <v-card flat>
                        <v-card-title>
                            Remitente no seleccionado
                        </v-card-title>
                    </v-card>
                </v-tab-item>
                <v-tab-item :value="'tab-2'">
                    <v-card flat>
                        <v-row>
                            <v-col cols="5" class="colButton">
                                <v-btn class="mb-2 buttonCreate" @click=selectAddresseer()>Seleccionar Cliente</v-btn>
                            </v-col>
                            <v-card-subtitle> No seleccionado </v-card-subtitle>
                        </v-row>
                        <v-row>
                            <v-col>
                                <!-- FORM TO SELECT A ADDRESSEER -->
                                <v-form>
                                    <v-row justify="center" class="ml-5 mr-5">
                                        <v-col cols="6" >
                                            <v-text-field
                                                ref="Sdni"
                                                v-model="Sdni"
                                                label="DNI"
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="6" >
                                            <v-text-field
                                                ref="Sname"
                                                v-model="Sname"
                                                label="Nombres"
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="6" >
                                            <v-text-field
                                                ref="SlastName"
                                                v-model="SlastName"
                                                label="Apellidos"
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="6" >
                                            <v-text-field
                                                ref="Semail"
                                                v-model="Semail"
                                                label="Correo electrónico"
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-tab-item>
                <v-tab-item :value="'tab-3'">
                    <v-card flat>
                        <v-row>
                            <v-col>
                                <!-- FORM TO ADD A RENDER-->
                                <v-form>
                                    <v-row justify="center" class="ml-5 mr-5">
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
                                                ref="description"
                                                v-model="description"
                                                :rules="[() => !!description || 'Este campo es requerido']"
                                                :error-messages="errorMessages"
                                                label="Descripcion"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="6" >
                                            <v-text-field
                                                ref="type"
                                                v-model="type"
                                                :rules="[rules.required]"
                                                label="Tipo"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="6" >
                                            <v-text-field
                                                ref="source"
                                                v-model="source"
                                                :rules="[rules.required]"
                                                label="Origen"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="6" >
                                            <v-text-field
                                                ref="destination"
                                                v-model="destination"
                                                :rules="[rules.required]"
                                                label="Destino"
                                            ></v-text-field>
                                        </v-col>
                                        <!---Nro telf no obligatorio-->
                                        
                                        <v-col cols="6" >
                                        </v-col>
                                    </v-row>
                                    <v-divider class="mt-1"></v-divider>
                                    <v-card-actions>
                                        <v-row>
                                        <v-col cols="6" class="colButton">
                                        <v-btn class="mb-2 buttonCreate" @click=createSending()>Crear Envío</v-btn>
                                        </v-col>
                                        <v-col cols="6" class="colButton">
                                        <v-btn class="mb-2 buttonCancel" @click=$router.go(-1)>Atrás</v-btn>
                                        </v-col>
                                    </v-row>
                                    </v-card-actions>
                                </v-form>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
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
    name: 'CreateSending',
    data: () => ({
        tab: null,
        errorMessages: '',
        Sdni: ' ',
        Sname: ' ',
        SlastName: ' ',
        Semail: ' ',
        description: null,
        type: null,
        source: null,
        destination: null,
        rules: {
            required: value => !!value || 'Este campo es requerido',
            counter: value => value.length <= 20 || 'Máximo 20 caracteres',
        },
    }),    
    computed :{
        ...mapState (['editSender', 'editAddressee']),
        form () {
            return {
                sender: this.sender,
                addressee: this.addressee,
                name: this.name,
                description: this.description,
                type: this.type,
                source: this.source,
                destination: this.destination,
            }
        },
    },
    methods:{
        createSending(){
            Swal.fire({
                icon: 'success',
                title: '<p style="font-family:Roboto;">Enhorabuena</p>',
                html: '<p style="font-family:Roboto;">Envío del paquete registrado, se le notificará cuando la ruta haya sido creada</p>'
            })
        },
    }
}
</script>