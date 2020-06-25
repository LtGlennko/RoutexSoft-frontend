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
                        <v-row>
                            <!-- <v-col cols="5" class="colButton">
                                <v-btn class="mb-2 buttonCreate" @click=selectSender()>Seleccionar Cliente</v-btn>
                            </v-col>-->
                            <v-col cols="3" class="colButton ml-8">
                                <v-text-field 
                                    v-model.trim.number="docNumber"
                                    label="Número de documento"
                                    
                                    min="0">
                                </v-text-field>
                            </v-col> 
                            <v-col cols="3">
                                <v-btn class="mb-2 my-2 buttonCreate" @click=getClient()>Buscar Cliente</v-btn>
                            </v-col> 
                        </v-row>
                        <v-row>
                            <v-col>
                                <!-- FORM TO SELECT A ADDRESSEER -->
                                <v-form>
                                    <v-row justify="center" class="ml-5 mr-5">
                                        <v-col cols="6" >
                                            <v-text-field
                                                ref="Sdni"
                                                v-model="clientCreate.docNumber"
                                                label="Número de documento"
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="6" >
                                            <v-text-field
                                                ref="Sname"
                                                v-model="clientCreate.name"
                                                label="Nombres"
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="6" >
                                            <v-text-field
                                                ref="SlastName"
                                                v-model="clientCreate.lastName"
                                                label="Apellidos"
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="6" >
                                            <v-text-field
                                                ref="Semail"
                                                v-model="clientCreate.email"
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
                <v-tab-item :value="'tab-2'">
                    <v-card flat>
                        <v-row>
                            <v-col cols="5" class="colButton">
                                <v-btn class="mb-2 buttonCreate" @click=getAriports()>Seleccionar Cliente</v-btn>
                            </v-col>
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
                                            <v-select
                                                v-model="originCountry"
                                                required
                                                :items="countries"
                                                label="Origen"
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="6" >
                                            <v-select
                                                v-model="destinationCountry"
                                                required
                                                :items="items"
                                                label="Destino"
                                            ></v-select>
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
import * as userDA from '@/dataAccess/userDA.js'

export default {
    name: 'CreateSending',
    data: () => ({
        items: ['Brasil', 'Ecuador', 'Venezuela', 'Colombia'],
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
        name:null,
        docNumber:null,
        rules: {
            required: value => !!value || 'Este campo es requerido',
            counter: value => value.length <= 20 || 'Máximo 20 caracteres',
        },
        async created (){
            let promises = [this.obtainCountry()]
            try {
                await Promise.all(promises)
            }catch {
               
            }
        }
    }),   
    computed :{
        ...mapState (['editSender', 'editAddressee','airports','clientCreate','countries']),
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
        ...mapActions(['completeAirports','setActionClient','completePersonCreate','obtainCountry']),

        getAriports: function() {
            console.log('Antes de DA');
            userDA.getAllAirports().then((res) =>{
                console.log('Se consultara servicio');
                console.log(res);
                this.completeAirports(res.data);
                console.log('Se recibió el servicio de aeropuertos');
                console.log(res.data);
            }).catch(error =>{
                Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: 'Error obteniendo los clientes'
                })
            });
        },

        getClient(){
                console.log(this.docNumber);
                userDA.getPersonData(this.docNumber).then((res) =>{
                    this.completePersonCreate(res.data);
                }).catch(error =>{
                        Swal.fire({
                            title: '<p style="font-family:Roboto;">Error</p>',
                            icon: 'error',
                            html: '<p style="font-family:Roboto;">No se encontraron registros de la persona</p>'
                        })
                })
        },

        createSending(){
            Swal.fire({
                icon: 'success',
                title: '<p style="font-family:Roboto;">Enhorabuena</p>',
                html: '<p style="font-family:Roboto;">Envío del paquete registrado, se le notificará cuando la ruta haya sido creada</p>'
            })
        },

        selectAddresseer(){
            this.$router.push('/SelectClient');
            this.setActionClient('A');
        },

        selectSender(){
            this.$router.push('/SelectClient');
            this.setActionClient('S');
        }
    }
}
</script>