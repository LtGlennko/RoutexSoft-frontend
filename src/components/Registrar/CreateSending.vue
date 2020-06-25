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
                :icons-and-text=false
                :grow=true
            >
                <v-tabs-slider></v-tabs-slider>
                <v-tab href="#tab-1" class="tabTitle">
                    Remitente
                </v-tab>
                <v-tab href="#tab-2" class="tabTitle">
                    Destinatario
                </v-tab>
                <v-tab href="#tab-3" class="tabTitle">
                    Datos Finales
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab" >
                <v-tab-item :value="'tab-1'">
                    <v-card flat>
                        <v-row>
                            <!-- <v-col cols="5" class="colButton">
                                <v-btn class="mb-2 buttonCreate" @click=selectSender()>Seleccionar Cliente</v-btn>
                            </v-col>-->
                            <v-col cols="4" class="colButton ml-8">
                                <v-text-field 
                                    v-model.trim.number="docNumberSender"
                                    label="Ingresar número de documento"
                                    min="0">
                                </v-text-field>
                            </v-col> 
                            <v-col cols="3">
                                <v-btn class="mb-2 my-2 buttonCreate" @click=getSender()>Buscar Cliente</v-btn>
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
                            <!--<v-col cols="5" class="colButton">
                                <v-btn class="mb-2 buttonCreate" @click=getAriports()>Seleccionar Cliente</v-btn>
                            </v-col>-->
                            <v-col cols="4" class="colButton ml-8">
                                <v-text-field 
                                    v-model.trim.number="docNumberAddressee"
                                    label="Ingresar número de documento"
                                    
                                    min="0">
                                </v-text-field>
                            </v-col> 
                            <v-col cols="3">
                                <v-btn class="mb-2 my-2 buttonCreate" @click=getAddressee()>Buscar Cliente</v-btn>
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
                                                ref="typeSending"
                                                v-model="typeSending"
                                                :rules="[rules.required]"
                                                label="Tipo"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="6" >
                                            <v-select
                                                v-model="originCountry"
                                                required
                                                :items="countries"
                                                label="Pais - Ciudad de Origen"
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="6" >
                                            <v-select
                                                v-model="destinationCountry"
                                                required
                                                :items="countries"
                                                label="Pais - Ciudad de Destino"
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

<style src="@/styles/Registrar/CreateSending.css" scoped>

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
        typeSending: null,
        source: null,
        destination: null,
        name:null,
        docNumberSender:null,
        docNumberAddressee:null,
        rules: {
            required: value => !!value || 'Este campo es requerido',
            counter: value => value.length <= 20 || 'Máximo 20 caracteres',
        },
        
    }),   
    async created (){
        console.log('async create');
            let promises = [this.obtainCountry()]
            try {
                await Promise.all(promises)
            }catch {
               
            }
    },
    computed :{
        ...mapState (['editSender', 'editAddressee','airports','clientCreate','countries']),
        form () {
            return {
                sender: this.sender,
                addressee: this.addressee,
                name: this.name,
                description: this.description,
                typeSending: this.typeSending,
                source: this.source,
                destination: this.destination,
            }
        },
    },
    methods:{
        ...mapActions(['completeAirports','setActionClient','completePersonCreate','obtainCountry']),

        getAriports: function() {
            userDA.getAllAirports().then((res) =>{
                this.completeAirports(res.data);
                console.log('Se recibió el servicio de aeropuertos');
            }).catch(error =>{
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Error obteniendo los clientes'
                })
            });
        },

        getSender(){
            console.log(this.docNumberSender);
            userDA.getPersonData(this.docNumberSender).then((res) =>{
                this.completePersonCreate(res.data);
            }).catch(error =>{
                    Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: 'error',
                        html: '<p style="font-family:Roboto;">No se encontraron registros de la persona</p>'
                    })
            })
        },

        getAddressee(){
            console.log(this.docNumberAddressee);
            userDA.getPersonData(this.docNumberAddressee).then((res) =>{
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