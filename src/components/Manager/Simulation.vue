<template>
    <v-container>
        <v-card> 
            <v-row>
                <v-col>
                    <v-card-title class="titleCard" v-text='editActSim'>
                    </v-card-title>
                    <v-card>
                        <v-card-actions>
                            <v-row>
                                <v-col cols="2">
                                    <v-icon medium class="mr-5" @click="detailSim()">mdi-play-circle </v-icon>
                                </v-col>
                                <v-col cols="2">
                                    <v-icon medium class="mr-5" @click="detailSim()">mdi-pause-circle </v-icon>
                                </v-col>
                                <v-col cols="2">
                                    <v-icon medium class="mr-5" @click="detailSim()">mdi-step-forward </v-icon>
                                </v-col>
                                <v-col cols="2">
                                    <v-icon medium class="mr-5" @click="detailSim()">mdi-step-backward </v-icon>
                                </v-col>
                                <v-col cols="3">
                                    <v-icon medium class="mr-5" @click="detailSim()">mdi-stop-circle </v-icon>
                                </v-col>
                            </v-row>
                            
                        </v-card-actions>
                        <v-row>
                            <v-col class="cosa-rara">
                                <img class="img" src="@/images/world-map2.png" alt=""> 
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="nani">
                                <br><v-btn class="mb-3" @click=$router.go(-1)>Regresar</v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>
<style src="@/styles/Manager/Simulation.css" scoped>

</style>
<script>
import {mapState, mapActions} from 'vuex'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
export default {
    name: 'Simulation',
    data(){
        return{
            /*search: '',
            loadingText: 'Cargando usuarios',
            filterNoResultsText: 'No se encontraron usuarios que cumplan con los filtros',
            noDataText: 'No hay usuarios para mostrar',
            simulation: [
                {
                    id_simulation: '3',
                    date_created: '25/06/20',
                    time_created: '18:55',
                    time_duration: '-',
                    state:'En Proceso'
                },
            ],*/
        }
    },
    computed: {
        ...mapState(['editActSim']),
        headers () {
            let items = []
            items.push({
                text: '#',
                align: 'center',
                sortable: true,
                value: 'id_simulation',
            })
            items.push({
                text: 'FECHA REGISTRO',
                align: 'center',
                sortable: true,
                value: 'date_created',
            })
            items.push({
                text: 'HORA REGISTRO',
                align: 'center',
                sortable: true,
                value: 'time_created',
            })
            items.push({
                text: 'TIEMPO EJECUCIÓN(seg)',
                align: 'center',
                sortable: true,
                value: 'time_duration'
            })
            items.push({
                text: 'ESTADO',
                align: 'center',
                sortable: true,
                value: 'state'
            })
            
            return items
        },
    },
    methods:{
        GenerateSim(){
            Swal.fire({
                html: '<p style="font-family:Roboto;">Se ha iniciado la ejecución de la simulación</p>'
            })
            this.$router.push('/Simulation');
        }
    }
}
</script>