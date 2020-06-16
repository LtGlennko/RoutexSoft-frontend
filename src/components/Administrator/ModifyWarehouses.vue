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
                                    ref="name"
                                    v-model="name"
                                    label="Nombre"
                                    placeholder="BOGO"
                                    outlined
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    ref="lastName"
                                    v-model="country"
                                    label="Pais"
                                    placeholder="COLOMBIA"
                                    outlined
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    v-model="city"
                                    label="Ciudad"
                                    placeholder="BOGOTA"
                                    single-line
                                    outlined
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    ref="oaci"
                                    v-model="oaci"
                                    label="OACI"
                                    placeholder="SKBO"
                                    outlined
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    ref="email"
                                    v-model="capacity"
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
import Swal from 'sweetalert2'

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
            Swal.fire({
                icon: 'success',
                title: '<p style="font-family:Roboto;">Enhorabuena</p>',
                html: '<p style="font-family:Roboto;">Almacen modificado satisfactoriamente</p>'
            })
        }
    }    
}
</script>