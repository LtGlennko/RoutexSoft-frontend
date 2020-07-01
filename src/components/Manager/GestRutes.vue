<template>
   <v-container>
        <v-card> 
            <v-row>
                <v-col>
                    <v-card-title class="titleCard">
                        Reporte Paquetes
                    </v-card-title>
                    <v-card-text>
                        
                    
                        <v-data-table   :headers="headers"
                                        :items="users"
                                        :items-per-page="5"
                                        :loading-text="loadingText"
                                        :no-data-text="noDataText"
                                        :no-results-text="filterNoResultsText"
                                        :footer-props="footerProps"
                                        :search="search"
                                        class="elevation-1">
                        </v-data-table>
                        <v-card-subtitle>
                            <v-row>
                                <v-col cols="6">
                                    <br><v-btn class="mb-2 buttonLoadHistory" @click=LoadHistory()>Cargar Historial</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-subtitle>
                    </v-card-text>
                </v-col>
            </v-row>
        </v-card>
    </v-container> 
</template>

<script>
<style src="@/styles/Manager/GetSimulation.css" scoped>

</style>
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
export default {
    name: 'GestRutes',
    data(){}
}
</script>