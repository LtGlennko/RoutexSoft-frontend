<template>
    <v-content> 
        <v-row class="topBar">
            <v-col >
            </v-col>
        </v-row>
        <v-parallax
            class="backgroundImage"
            src="@/images/fondo_mapa_dp.jpg"
        >
            <v-row>
                <v-col>
                    <img class="img-fluid logo" src="@/images/tittle_rotex.png" alt=""> 
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="6" class="ml-5 mb-12">
                    <v-card class="card_InsertCod">
                        <v-row>
                            <v-col>
                            </v-col>
                        </v-row>
                        <h1 class="mb-2 ml-10 mt-0 titleClient">Rastrea tu pedido</h1>
                        <h3 class="mb-4 ml-10 textCLient">Seguimiento de pedidos de America del Sur y Europa</h3>
                        <v-row>
                            <v-col cols="8">
                                <v-text-field
                                    v-model="trackNumber"
                                    class="mb-1 ml-10"
                                    placeholder="Ingrese el codigo de rastreo"
                                    solo>
                                </v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-btn class="mb-1 ml-1 buttonTrack" @click=trackPackage()>Localizar Envío</v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>

        </v-parallax>
        <v-row class="topBar">
            <v-col >
            </v-col>
        </v-row>
    </v-content>
</template>

<style src="@/styles/Client/ClientPrincipal.css" scoped>
</style>

<script>
import { mapState, mapActions } from 'vuex';
import Swal from 'sweetalert2'
import * as userDA from '@/dataAccess/userDA.js'

export default {
    name: 'ClientPrincipal',

    data: () => ({
        trackNumber:null,
    }), 

    computed :{
        ...mapState (['PackageData']),
    },

    methods:{
        ...mapActions(['completePackageData']),
        trackPackage(){
            console.log(this.trackNumber);
            userDA.getPackageDataByTrackNumber(this.trackNumber).then((res) =>{
                this.completePackageData(res.data);
                console.log(res.data);
                this.$router.push('/TrackPackage');
            }).catch(error =>{
                    Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: 'error',
                        html: '<p style="font-family:Roboto;">Código del paquete no encontrado</p>'
                    })
            })
            
        }
    }
}
</script>