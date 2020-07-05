<template>
    <v-content> 
        <v-row class="topBar">
            <v-col >
            </v-col>
        </v-row>
        <v-row >
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
                            <h4 class="infoPackage"> Madrid, España </h4>
                        </v-col>
                        <v-col cols="2">
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row >
                            <v-col cols="12" class="titleDetailTrack">
                                Detalles del seguimiento
                            </v-col>
                            <v-col cols="12" >
                                <v-timeline :align-top=true dense clipped class="timelinePrincipal">
                                    <v-timeline-item
                                        v-for="(item, index) in items"
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
                                                        {{ item.date }}
                                                    </div>
                                                    <div class="divItemTimeline">
                                                        <v-layout align-center>
                                                            <span>{{ item.time }}</span>
                                                        </v-layout>
                                                    </div>
                                                    <div class="divItemTimeline">
                                                        <v-layout align-center>
                                                            <span>{{ item.state }}</span>
                                                        </v-layout>
                                                    </div>
                                                    <div class="divItemTimeline"> 
                                                        <v-layout align-center>
                                                            <span>{{ item.route }}</span>
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
                </v-card>
            </v-col>
        </v-row>
        <v-row class="topBar">
            <v-col >
            </v-col>
        </v-row>
    </v-content>
</template>



<style src="@/styles/Client/TrackPackage.css" scoped>
</style>

<script>

import { mapState, mapActions } from 'vuex';
import Swal from 'sweetalert2'
import * as userDA from '@/dataAccess/userDA.js'

export default {
    name: 'prueba',
    data: () => ({
        color: '#22A3A9',
        iconTimeline: 'mdi-checkbox-marked-circle',
        itemColor: '#F3F5F1',
        items: [
            {
                date: '2020-06-25',
                time: '8:34 am',
                route: 'Lima, Perú',
                state: 'Registrado'
                
            },
            {
                date: '2020-06-25',
                time: '9:34 am',
                route: 'Lima, Perú',
                state: 'Origen de salida'
                
            },
            {
                date: '2020-06-25',
                time: '1:17 pm',
                route: 'Quito, Ecuador',
                state: 'En camino'
            },
            {
                date: '2020-06-25',
                time: '1:17 pm',
                route: 'Quito, Ecuador',
                state: 'En camino'
            },
            {
                date: '2020-06-25',
                time: '1:17 pm',
                route: 'Quito, Ecuador',
                state: 'En camino'
            },
            {
                date: '2020-06-25',
                time: '1:17 pm',
                route: 'Quito, Ecuador',
                state: 'En camino'
            }
        ]
    }), 

    computed :{
        ...mapState (['PackageData']),
    },

    methods: {
    },
}
</script>