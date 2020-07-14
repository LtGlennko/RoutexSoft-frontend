<template>
    <v-container>
        <v-card>
            <v-row>
                <v-col>
                    <!-- FORM TO MODIFY A WAREHOUSES-->
                    <v-form>
                        <v-card-title class="titleCard">
                            Visualizar Quejas > Detalle de queja
                        </v-card-title>

                        <v-row justify="center" class="ml-5 mr-5">
                            <v-col cols="12" class="colSubtitle">
                                <v-card-subtitle class="subtitleComplain">
                                    Datos del Reclamo
                                </v-card-subtitle>
                            </v-col>
                            <v-col cols="12">
                            <v-divider></v-divider>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    v-model="complainCreate.codigoQueja"
                                    label="Código de queja"
                                    outlined
                                    disabled
                                    class="ml-4 mr-4"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    v-model="complainCreate.fechaRegistro"
                                    label="Fecha de Registro"
                                    outlined
                                    disabled
                                    class="ml-4 mr-4"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    v-model="complainCreate.nombresReclamante"
                                    label="Nombres"
                                    outlined
                                    disabled
                                    class="ml-4 mr-4"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    v-model="complainCreate.apellidosReclamante"
                                    label="Apellidos"
                                    outlined
                                    disabled
                                    class="ml-4 mr-4"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    v-model="complainCreate.numdocumento"
                                    label="Número de documento"
                                    outlined
                                    disabled
                                    class="ml-4 mr-4"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    v-model="complainCreate.correo"
                                    label="Correo electrónico"
                                    outlined
                                    disabled
                                    class="ml-4 mr-4"
                                ></v-text-field>
                            </v-col>
                            
                            <v-col cols="6" >
                                <v-textarea
                                    v-model="complainCreate.queja"
                                    label="Descripción"
                                    outlined
                                    auto-grow
                                    disabled
                                    class="ml-4 mr-4"
                                ></v-textarea>
                            </v-col>
                            <v-col cols="6" >
                            </v-col>
                        </v-row>


                        <v-row justify="center" class="ml-5 mr-5">
                            <v-col cols="12" class="colSubtitlePackage">
                                <v-card-subtitle class="subtitlePackage">
                                    Datos del Paquete
                                </v-card-subtitle>
                            </v-col>
                            <v-col cols="12">
                            <v-divider></v-divider>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    v-model="complainCreate.paquete.codigoEnvio"
                                    label="Código de envío"
                                    outlined
                                    disabled
                                    class="ml-4 mr-4"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    v-model="complainCreate.paquete.estadoEnvio"
                                    label="Estado del paquete"
                                    outlined
                                    disabled
                                    class="ml-4 mr-4"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    v-model="complainCreate.paquete.remitente.docIden"
                                    label="Remitente - Número de documento"
                                    outlined
                                    disabled
                                    class="ml-4 mr-4"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    v-model="complainCreate.paquete.destinatario.docIden"
                                    label="Destinatario - Número de documento"
                                    outlined
                                    disabled
                                    class="ml-4 mr-4"
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <v-divider class="mt-1"></v-divider>

                        <v-card-actions>
                            <v-row>
                                <v-col cols="12" class="colButton">
                                    <v-btn class="mb-2 buttonCancel" @click=$router.go(-1)>Regresar</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-form>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<style src="@/styles/Registrar/ViewComplain.css" scoped>

</style>

<script>
import { mapState, mapActions } from 'vuex';
import Swal from 'sweetalert2';
import * as userDA from '@/dataAccess/userDA.js'

export default {
    name: 'ViewComplain',
    data: () => ({
        
    }),    
    computed :{
        ...mapState(['setComplainIndex','complainCreate']),
        
    },
    methods:{
        
    },    
}
</script>