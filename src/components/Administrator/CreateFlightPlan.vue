<template>
    <v-container>
        <v-card>
            <v-row>
                <v-col>
                    <!-- FORM TO ADD A FIGHT PLAN-->
                    <v-form v-if="!editFightPlan">
                        <v-card-title class="titleCard">
                            Gestionar Plan de Vuelo > Añadir Plan de Vuelo
                        </v-card-title>
                    
                        <v-row justify="center" class="ml-5 mr-5">
                            <v-col cols="6" >
                                <v-select
                                    ref="originCountry"
                                    v-model="originCountry"
                                    :items="countries"
                                    :rules="[() => !!originCountry || 'Debe seleccionar un Pais']"
                                    :error-messages="errorMessages"
                                    label="Pais de Origen"
                                ></v-select>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    ref="originCity"
                                    v-model="originCity"
                                    label="Ciudad de Origen"
                                    placeholder="BOGOTA"
                                    outlined
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    v-model="originAirport"
                                    label="Aeropuerto de Origen"
                                    placeholder="SKBO"
                                    outlined
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-dialog
                                    ref="dialog"
                                    v-model="modal1"
                                    :return-value.sync="departureTime"
                                    persistent
                                    width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="departureTime"
                                            label="Hora de Partida"
                                            prepend-icon="mdi-clock-outline"
                                            :rules="[() => !!departureTime || 'Debe seleccionar un hora']"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-time-picker
                                        v-if="modal1"
                                        v-model="departureTime"
                                        full-width
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="modal1 = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.dialog.save(departureTime)">OK</v-btn>
                                    </v-time-picker>
                                </v-dialog>
                            </v-col>
                            <v-col cols="6" >
                                <v-select
                                    ref="destinationCountry"
                                    v-model="destinationCountry"
                                    :items="countries"
                                    :rules="[() => !!destinationCountry || 'Debe seleccionar un Pais']"
                                    :error-messages="errorMessages"
                                    label="Pais de Destino"
                                ></v-select>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    ref="destinationCity"
                                    v-model="destinationCity"
                                    label="Ciudad de Destino"
                                    placeholder="QUITO"
                                    outlined
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    v-model="destinationAirport"
                                    label="Aeropuerto de Destino"
                                    placeholder="SEQM"
                                    outlined
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-dialog
                                    ref="dialogArrival"
                                    v-model="modal2"
                                    :return-value.sync="arrivalTime"
                                    persistent
                                    width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="arrivalTime"
                                            label="Hora de Llegada"
                                            prepend-icon="mdi-clock-outline"
                                            :rules="[() => !!arrivalTime || 'Debe seleccionar un hora']"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-time-picker
                                        v-if="modal2"
                                        v-model="arrivalTime"
                                        full-width
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.dialogArrival.save(arrivalTime)">OK</v-btn>
                                    </v-time-picker>
                                </v-dialog>
                            </v-col>
                        </v-row>
                        <v-divider class="mt-1"></v-divider>
                        <v-card-actions>
                            <v-row>
                                <v-col cols="6" class="colButton">
                                    <v-btn class="mb-2 buttonCreate" @click=createFightPlan()>Guardar</v-btn>
                                </v-col>
                                <v-col cols="6" class="colButton">
                                    <v-btn class="mb-2 buttonCancel" @click=$router.go(-1)>Cancelar</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-form>

                    <!-- FORM TO MODIFY A FIGHT PLAN-->
                    <v-form v-if="editFightPlan">
                        <v-card-title class="titleCard">
                            Gestionar Plan de Vuelo > Modificar Plan de Vuelo
                        </v-card-title>

                        <v-row justify="center" class="ml-5 mr-5">
                            <v-col cols="6" >
                                <v-select
                                    ref="originCountry"
                                    v-model="originCountry"
                                    :items="countries"
                                    :rules="[() => !!originCountry || 'Debe seleccionar un Pais']"
                                    :error-messages="errorMessages"
                                    label="Pais de Origen"
                                ></v-select>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    ref="originCity"
                                    v-model="originCity"
                                    label="Ciudad de Origen"
                                    placeholder="BOGOTA"
                                    outlined
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    v-model="originAirport"
                                    label="Aeropuerto de Origen"
                                    placeholder="SKBO"
                                    outlined
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-dialog
                                    ref="dialog"
                                    v-model="modal1"
                                    :return-value.sync="departureTime"
                                    persistent
                                    width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="departureTime"
                                            label="Hora de Partida"
                                            prepend-icon="mdi-clock-outline"
                                            :rules="[() => !!departureTime || 'Debe seleccionar un hora']"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-time-picker
                                        v-if="modal1"
                                        v-model="departureTime"
                                        full-width
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="modal1 = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.dialog.save(departureTime)">OK</v-btn>
                                    </v-time-picker>
                                </v-dialog>
                            </v-col>
                            <v-col cols="6" >
                                <v-select
                                    ref="destinationCountry"
                                    v-model="destinationCountry"
                                    :items="countries"
                                    :rules="[() => !!destinationCountry || 'Debe seleccionar un Pais']"
                                    :error-messages="errorMessages"
                                    label="Pais de Destino"
                                ></v-select>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    ref="destinationCity"
                                    v-model="destinationCity"
                                    label="Ciudad de Destino"
                                    placeholder="QUITO"
                                    outlined
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    v-model="destinationAirport"
                                    label="Aeropuerto de Destino"
                                    placeholder="SEQM"
                                    outlined
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-dialog
                                    ref="dialogArrival"
                                    v-model="modal2"
                                    :return-value.sync="arrivalTime"
                                    persistent
                                    width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="arrivalTime"
                                            label="Hora de Llegada"
                                            prepend-icon="mdi-clock-outline"
                                            :rules="[() => !!arrivalTime || 'Debe seleccionar un hora']"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-time-picker
                                        v-if="modal2"
                                        v-model="arrivalTime"
                                        full-width
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.dialogArrival.save(arrivalTime)">OK</v-btn>
                                    </v-time-picker>
                                </v-dialog>
                            </v-col>
                        </v-row>
                        
                        <v-divider class="mt-1"></v-divider>
                        <v-card-actions>
                            <v-row>
                                <v-col cols="6" class="colButton">
                                    <v-btn class="mb-2 buttonCreate" @click=modifyFightPlan()>Guardar</v-btn>
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

<style src="@/styles/Administrator/CreateFlightPlan.css" scoped>

</style>

<script>
import { mapState, mapActions } from 'vuex';
import Swal from 'sweetalert2'

export default {
    name: 'CreateFlightPlan',
    data: () => ({
        errorMessages: '',
        time: null,
        originCountry: '',
        countries:[
            'COLOMBIA',
            'ECUADOR',
            'BRASIL'
        ],
        originCity: null,
        originAirport: null,
        departureTime: null,
        modal1: false,
        modal2: false,
        destinationCountry: '',
        destinationCity: null,
        destinationAirport:null,
        arrivalTime:null,
        
        show1: false,
        rules: {
            required: value => !!value || 'Este campo es requerido',
            counter: value => value.length <= 20 || 'Máximo 20 caracteres',
            min: value => value.length >= 8 || 'Mínimo 8 caracteres',
            necessary: value => value.length >= 8 || 'El DNI debe contener 8 digitos',
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Correo electrónico inválido'
            }
        },
    }),    
    computed :{
         ...mapState (['editFightPlan']),
         form () {
            return {
                originCountry: this.originCountry,
                originCity: this.originCity,
                originAirport: this.originAirport,
                departureTime: this.departureTime,
                destinationCountry: this.destinationCountry,
                destinationAirport: this.destinationAirport,
                destinationCity: this.destinationCity,
                arrivalTime: this.arrivalTime,
            }
         },
    },
    methods:{
        createFightPlan(){
            Swal.fire({
                icon: 'success',
                title: '<p style="font-family:Roboto;">Enhorabuena</p>',
                html: '<p style="font-family:Roboto;">Plan de vuelo creado satisfactoriamente</p>'
            })
        },
        modifyFightPlan(){
            Swal.fire({
                icon: 'success',
                title: '<p style="font-family:Roboto;">Enhorabuena</p>',
                html: '<p style="font-family:Roboto;">Plan de vuelo modificado satisfactoriamente</p>'
            })
        }
            

    }    
}
</script>