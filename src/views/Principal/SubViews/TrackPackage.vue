<template>
    <v-content> 
        <v-row class="topBar">
            <v-col >
            </v-col>
        </v-row>
        <v-row class="topRow">
            <v-col class="colTopRow">
                <v-card class="mt-5 ml-8 mr-8 cardClient" >
                    <v-row class="cardTopBar">
                        <v-col class="colCardTitle"> 
                            DATOS DEL PAQUETE 
                        </v-col>
                    </v-row>
                    <v-row class="rowDetailPackage">
                        <v-col cols="2">
                        </v-col>
                        <v-col cols="2">
                            <h4 class="infoLabelPackage"> Código del paquete: </h4>
                        </v-col>
                        <v-col cols="2">
                            <h4 class="infoPackage"> PACK011 </h4>
                        </v-col>
                        <v-col cols="2">
                            <h4 class="infoLabelPackage"> Estado: </h4>
                        </v-col>
                        <v-col cols="2" >
                            <h4 class="infoPackage"> En camino </h4>
                        </v-col>
                        <v-col cols="2">
                        </v-col>

                        <v-col cols="2">
                        </v-col>
                        <v-col cols="2">
                            <h4 class="infoLabelPackage"> Destino Inicial: </h4>
                        </v-col>
                        <v-col cols="2">
                            <h4 class="infoPackage"> Lima, Perú</h4>
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
                    <v-card-text v-scroll.self="onScroll">
                        <v-row class="rowPrincipalTimeline">
                            <v-col cols="12" class="titleDetailTrack">
                                Detalles del seguimiento
                            </v-col>
                            <v-col cols="12" class="colTimeLine">
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
export default {
    name: 'TrackPackage',
    data: () => ({
        color: '#22A3A9',
        iconTimeline: 'mdi-checkbox-marked-circle',
        itemColor: '#F3F5F1',
        scrollInvoked: 0,
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
            }
        ]
    }), 

    methods: {
      onScroll () {
        this.scrollInvoked++
      },
    },
}
</script>