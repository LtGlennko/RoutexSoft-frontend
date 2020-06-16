<template>
    <v-container>
        <v-card> 
            <v-row>
                <v-col>
                    <v-form>
                        <v-card-title class="titleCard">
                            Configurar Parámetros
                        </v-card-title>

                        <v-card-text>
                            <v-row justify="center" class="ml-5 mr-5">
                                <v-col cols="6" >
                                    <v-text-field
                                        ref="maxDaySame"
                                        v-model="maxDaySame"
                                        :rules="[() => !!maxDaySame || 'Este campo es requerido']"
                                        :error-messages="errorMessages"
                                        type="number"
                                        label="Máximo de días mismo continente"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" >
                                    <v-text-field
                                        ref="maxDayDifferent"
                                        v-model="maxDayDifferent"
                                        :rules="[() => !!maxDayDifferent || 'Este campo es requerido']"
                                        :error-messages="errorMessages"
                                        type="number"
                                        label="Máximo de días diferente continente"
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-divider class="mt-1"></v-divider>

                            <v-card-actions>
                                <v-row>
                                    <v-col cols="12" class="colButton">
                                        <v-btn class="mb-2 buttonCreate" @click=modifyParameters()>Guardar</v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-actions>
                        </v-card-text>
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

export default {
    name: 'ConfigureParameters',
     data: () => ({
        errorMessages: '',
        maxDaySame: null,
        maxDayDifferent: null,

    }),
    computed :{
         form () {
            return {
                maxDaySame: this.maxDaySame,
                maxDaySame: this.maxDaySame,
            }
         },
    },
    methods:{
        modifyParameters(){
            Swal.fire({
                icon: 'success',
                title: '<p style="font-family:Roboto;">Enhorabuena</p>',
                html: '<p style="font-family:Roboto;">Parámetros modificados satisfactoriamente</p>'
            })
        },
    }
}
</script>