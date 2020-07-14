<template>
    <v-content> 
        <v-row class="topBar">
            <v-col >
            </v-col>
        </v-row>
        <v-row class="rowPrincipal">
            <v-col>
                <v-card class="mt-5 ml-8 mr-8 " >
                    <v-row class="cardTopBar">
                        <v-col > 
                            DATOS DEL PAQUETE 
                        </v-col>
                    </v-row>
                    <v-row >
                        <v-col cols="2">
                        </v-col>
                        <v-col cols="2">
                            <h4 class="infoLabelPackage"> Código del paquete: </h4>
                        </v-col>
                        <v-col cols="2">
                            <h4 class="infoPackage"> {{PackageData.codigoEnvio}} </h4>
                        </v-col>
                        <v-col cols="2">
                            <h4 class="infoLabelPackage"> Estado: </h4>
                        </v-col>
                        <v-col cols="2" >
                            <h4 class="infoPackage"> {{PackageData.estadoEnvio}} </h4>
                        </v-col>
                        <v-col cols="2">
                        </v-col>

                        <v-col cols="2">
                        </v-col>
                        <v-col cols="2">
                            <h4 class="infoLabelPackage"> Destino Inicial: </h4>
                        </v-col>
                        <v-col cols="2">
                            <h4 class="infoPackage"> {{PackageData.origen.ciudad}}, {{PackageData.origen.pais}}</h4>
                        </v-col>
                        <v-col cols="2">
                            <h4 class="infoLabelPackage"> Destino Final: </h4>
                        </v-col>
                        <v-col cols="2" >
                            <h4 class="infoPackage"> {{PackageData.destino.ciudad}}, {{PackageData.destino.pais}} </h4>
                        </v-col>
                        <v-col cols="2">
                        </v-col>
                    </v-row>
                    
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row >
                            <v-col cols="12" class="titleDetailTrack">
                                Detalles de la ruta
                            </v-col>
                            <v-col cols="12" >
                                <v-timeline :align-top=true dense clipped class="timelinePrincipal">
                                    <v-timeline-item
                                        v-for="(item, index) in PackageData.ruta"
                                        :key="index"
                                        :color="color"
                                        :icon="iconTimeline"
                                        :small=true 
                                        fill-dot
                                        class="timeLineItem"
                                    >
                                        <v-card class="elevation-2" :color="itemColor" dark >
                                            <v-card-title class="cardTitleTimeline">
                                                <v-layout class="layoutTitleTimeline" align-center justify-space-between>
                                                    
                                                    <div class="divItemTimeline">
                                                        <v-layout align-center>
                                                            <span>{{ item.origen.ciudad}}, {{ item.origen.pais}}</span>
                                                        </v-layout>
                                                    </div>
                                                    <div class="divItemTimeline">
                                                        <v-layout align-center>
                                                            <span>
                                                                <v-icon medium color="#003A3C" >
                                                                     mdi-trending-neutral
                                                                </v-icon>
                                                            </span>
                                                        </v-layout>
                                                    </div>
                                                    <div class="divItemTimeline">
                                                        <v-layout align-center>
                                                            <span>{{ item.destino.ciudad}}, {{ item.destino.pais}}</span>
                                                        </v-layout>
                                                    </div>

                                                </v-layout>
                                            </v-card-title>
                                        </v-card>
                                    </v-timeline-item>
                                </v-timeline>
                            </v-col>
                            
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text class="cardTextComplain">
                        <v-card-title class="cardTitleComplain">
                            Estamos para ayudarte, contáctanos
                        </v-card-title>
                        <v-card-subtitle class="mt-1 cardSubTitleComplain">
                            Si tienes alguna queja acerca de tu paquete, puedes escribirnos.
                        </v-card-subtitle>
                        <v-row >
                            <v-col cols="12">
                                <v-btn class="buttonCreate" @click=sendComplain()>
                                    <v-icon class="mr-2">mdi-file-document</v-icon>
                                    <span>Enviar una queja</span>
                                </v-btn>
                            </v-col> 
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            
        </v-row>
        <v-footer absolute class="footerClient">
        <v-row class="topBar">
            <v-col >
            </v-col>
        </v-row>
        </v-footer>
    </v-content>
</template>



<style src="@/styles/Client/TrackPackage.css" scoped>
</style>

<script>

import { mapState, mapActions } from 'vuex';
import Swal from 'sweetalert2'
import * as userDA from '@/dataAccess/userDA.js'

export default {
    name: 'TrackPackage',
    data: () => ({
        color: '#22A3A9',
        iconTimeline: 'mdi-checkbox-marked-circle',
        itemColor: '#F3F5F1',
        
    }), 

    computed :{
        ...mapState (['PackageData']),
    },

    methods: {
        sendComplain(){
            this.$router.push('/RegisterComplain');
        }
    },
}
</script>