<template>
    <v-container>
        <v-card>
            <v-row>
                <v-col>
                    <!-- FORM TO ADD A RENDER-->
                    <v-form>
                        <v-card-title class="titleCard">
                            Crear Envío > Datos Finales
                        </v-card-title>
                    
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
    name: 'CreateSending',
    data: () => ({
        errorMessages: '',
        name: null,
        description: null,
        type: null,
        source: null,
        source: null,
        destination: null,
        rules: {
            required: value => !!value || 'Este campo es requerido',
            counter: value => value.length <= 20 || 'Máximo 20 caracteres',
            necessary: value => value.length >= 8 || 'El DNI debe contener 8 digitos',
        },
    }),    
    computed :{
        //...mapState (['editClient']),
        form () {
        return {
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