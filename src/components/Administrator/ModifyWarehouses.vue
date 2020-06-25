<template>
    <v-container>
        <v-card>
            <v-row>
                <v-col>
                    <!-- FORM TO MODIFY A WAREHOUSES-->
                    <v-form>
                        <v-card-title class="titleCard">
                            Gestionar Almacenes > Modificar Almacen
                        </v-card-title>
                    
                        <v-row justify="center" class="ml-5 mr-5">
                            
                            <v-col cols="6" >
                                <v-text-field
                                    ref="lastName"
                                    v-model="airportCreate.pais"
                                    label="Pais"
                                    outlined
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    v-model="airportCreate.ciudad"
                                    label="Ciudad"
                                    outlined
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    ref="oaci"
                                    v-model="airportCreate.codAero"
                                    label="OACI"
                                    outlined
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    ref="name"
                                    v-model="airportCreate.abrev"
                                    label="Abreviatura"
                                    outlined
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                
                                    v-model="airportCreate.capacidad"
                                    label="Capacidad"
                                    :rules="[rules.required, rules.min, rules.max]"
                                    type="number"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                            </v-col>
                        </v-row>
                        <v-divider class="mt-1"></v-divider>
                        <v-card-actions>
                            <v-row>
                                <v-col cols="6" class="colButton">
                                    <v-btn class="mb-2 buttonCreate" @click=modifyCapacity()>Guardar</v-btn>
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

<style src="@/styles/Administrator/ModifyWarehouses.css" scoped>

</style>

<script>
import { mapState, mapActions } from 'vuex';
import Swal from 'sweetalert2';
import * as userDA from '@/dataAccess/userDA.js'

export default {
    name: 'ModifyWarehouses',
    data: () => ({
        name: null,
        country: null,
        city: null,
        oaci: null,
        capacity: '',
        rules: {
            required: value => !!value || 'Este campo es requerido',
            min: value => value > 0 || 'Debe ser mayor a 0',
            max: value => value < 9999 || 'Debe ser menor a 9999',
        }
    }),    
    computed :{
        ...mapState(['selectedAirportIndex','airportCreate']),
         form () {
            return {
                name: this.name,
                country: this.country,
                city: this.city,
                oaci: this.oaci,
                capacity: this.capacity,
            }
         },
    },
    methods:{
        modifyCapacity(){
            console.log(this.airportCreate.capacidad);
            userDA.editAirport(this.airportCreate.idAeropuerto,this.airportCreate.capacidad).then((res) =>{
                Swal.fire({
                    icon: 'success',
                    title: '<p style="font-family:Roboto;">Enhorabuena</p>',
                    html: '<p style="font-family:Roboto;">Capacidad del aeropuerto modificado satisfactoriamente</p>'
                })
               
            }).catch(error =>{
                Swal.fire({
                    title : '<p style="font-family:Roboto;">Error</p>',
                    icon : 'error',
                    html : '<p style="font-family:Roboto;">Error al editar la capacidad del aeropuerto</p>'
                })
            })
        }
    },    
}
</script>