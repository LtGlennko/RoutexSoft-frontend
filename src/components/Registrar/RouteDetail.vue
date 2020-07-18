<template>
    <v-container>
        <v-card> 
            <v-row>
                <v-col>
                    <v-card-title class="titleCard">
                        Visualizar Paquetes > Detalles de la Ruta
                    </v-card-title>
                    <v-card-text>
                        <v-row >
                            
                            <v-col cols="5" class="origenTitle">
                                Destino Inicial
                                <br>
                                <br>
                                <div class="origenTitleDetail">
                                    {{PackageData.origen.ciudad}}, {{PackageData.origen.pais}}
                                </div>
                            </v-col>

                            <v-col cols="2" class="origenTitle">
                                <v-icon size="70px" color="#003A3C" >
                                    mdi-chevron-double-right
                                </v-icon>
                            </v-col>

                            <v-col cols="5" class="origenTitle">
                                Destino Final
                                <br>
                                <br> 
                                <div class="origenTitleDetail">
                                    {{PackageData.destino.ciudad}}, {{PackageData.destino.pais}}
                                </div>
                            </v-col>
                            <v-card-text>
                           <v-divider></v-divider>
                            </v-card-text>
                            <v-col cols="12" class="titleDetailTrack">
                                Detalles
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
                                                            <span>{{ item.flightPlan.origen.ciudad}}, {{ item.flightPlan.origen.pais}}</span>
                                                        </v-layout>
                                                    </div>
                                                    <div class="divItemHoursTimeline">
                                                        <v-layout align-center>
                                                            <span>{{ item.flightPlan.horaIni}}</span>
                                                        </v-layout>
                                                    </div>
                                                    <div class="divItemIconTimeline">
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
                                                            <span>{{ item.flightPlan.destino.ciudad}}, {{ item.flightPlan.destino.pais}}</span>
                                                        </v-layout>
                                                    </div>
                                                    <div class="divItemHoursTimeline">
                                                        <v-layout align-center>
                                                            <span>{{ item.flightPlan.horaFin}}</span>
                                                        </v-layout>
                                                    </div>

                                                </v-layout>
                                            </v-card-title>
                                        </v-card>
                                    </v-timeline-item>
                                </v-timeline>
                            </v-col>
                            <v-col cols="12" class="colButton">
                                    <v-btn class="mb-2 buttonCancel" @click=$router.go(-1)>Regresar</v-btn>
                            </v-col>
                            
                        </v-row>
                    </v-card-text>
                    
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<style src="@/styles/Registrar/RouteDetail.css" scoped>
</style>


<script>
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import {mapState, mapActions} from 'vuex'
import * as userDA from '@/dataAccess/userDA.js'

export default {
    name: 'RouteDetail',
    data: () => ({
        color: '#22A3A9',
        iconTimeline: 'mdi-checkbox-marked-circle',
        itemColor: '#F3F5F1',
        
    }), 
    mounted(){
        console.log('data de este paquete:',PackageData)
    },
    computed: {
        ...mapState (['PackageData']),

        
        
    },    
    methods:{
        

        
    }

}
</script>