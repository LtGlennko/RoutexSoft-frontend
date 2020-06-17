<template>
    <v-container>
        <v-card> 
            <v-row>
                <v-col>
                    <v-card-title class="titleCard">
                        Cargar Historial
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
                                    <br><v-btn class="mb-2" @click=LoadHistory()>Cargar Historial</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-subtitle>
                    </v-card-text>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<style src="@/styles/Manager/GestHistory.css" scoped>
</style>
<script>

export default {
    name: 'GestHistory',
    data () {
        return {
            footerProps:{'items-per-page-Text':'Filas por página:  ', 'items-per-page-options': [5,10,15]},
            search: '',
            loadingText: 'Cargando usuarios',
            filterNoResultsText: 'No se encontraron usuarios que cumplan con los filtros',
            noDataText: 'No hay usuarios para mostrar',
            users: [
                {
                    first_city: 'ESKN',
                    last_city: 'SKBO',
                    first_time: '18:22',
                    last_time: '15:24',
                },
                {
                    first_city: 'SGAS',
                    last_city: 'SEQM',
                    first_time: '08:40',
                    last_time: '18:45',
                }
            ],
        }
    },
    computed: {
        headers () {
            let items = []
            items.push({
                text: 'Ciudad Origen',
                align: 'center',
                sortable: true,
                value: 'first_city',
            })
            items.push({
                text: 'Ciudad Destino',
                align: 'center',
                sortable: true,
                value: 'last_city',
            })
            items.push({
                text: 'Hora Partida',
                align: 'center',
                sortable: true,
                value: 'first_time',
            })
            items.push({
                text: 'Hora Salida',
                align: 'center',
                sortable: true,
                value: 'last_time'
            })
            
            return items
        },
        
    },    
    /*methods:{
        ...mapActions(['setActionUser']),
        createUser(){
            this.$router.push('/LoadHistory');
            this.setActionUser(false);
        },
    }*/
    //Todavía tengo que ver como funciona los actions en el index.js del store

}
</script>