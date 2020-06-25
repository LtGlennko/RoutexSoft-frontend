<template>
    
</template>
<style src="@/styles/Manager/GetSimulation.css" scoped>

</style>
<script>

import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
export default {
    name: 'Simulation',
    data(){
        return{
            search: '',
            loadingText: 'Cargando usuarios',
            filterNoResultsText: 'No se encontraron usuarios que cumplan con los filtros',
            noDataText: 'No hay usuarios para mostrar',
            uwu: [
                {
                    id_simulation: '1',
                    date_created: '04/09/19',
                    time_created: '17:49',
                    time_duration: '765',
                    state:'Terminado - Colapso'
                },
                {
                    id_simulation: '2',
                    date_created: '25/06/20',
                    time_created: '20:01',
                    time_duration: '-',
                    state:'En proceso'
                }
            ],
        }
    },
    computed: {
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