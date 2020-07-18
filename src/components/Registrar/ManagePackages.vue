<template>
    <v-container>
        <v-card> 
            <v-row>
                <v-col>
                    <v-card-title class="titleCard">
                        Visualizar Paquetes
                    </v-card-title>
                    <v-card-text>
                        <v-card-subtitle>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        v-model="search"
                                        append-icon="mdi-magnify"
                                        label="Buscar Paquete"
                                        single-line
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-subtitle>
                    
                        <v-data-table   :headers="headers"
                                        :items="packages"
                                        :items-per-page="5"
                                        :loading-text="loadingText"
                                        :no-data-text="noDataText"
                                        :no-results-text="filterNoResultsText"
                                        :footer-props="footerProps"
                                        :search="search"
                                        class="elevation-1">
                            <template v-slot:top >
                                <v-toolbar flat color="white" height="16px">
                                    <v-dialog v-model="dialog" max-width="500px">

                                        <v-card>
                                            <v-card-title>
                                                <span class="headline">Editar Paquete</span>
                                            </v-card-title>
        
                                            <v-card-text>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <v-select
                                                                v-model="destinationCountry"
                                                                required
                                                                :items="countries"
                                                                label="Pais - Ciudad de Destino"
                                                                hide-details
                                                                menu-props="auto"
                                                            ></v-select>   
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                                                <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-toolbar>
                            </template>

                            <template v-slot:item.actions="{ item}" >
                                <v-icon v-if="item.estadoEnvio==='REGISTRADO' || item.estadoEnvio==='RUTA ASIGNADA'" medium class="mr-5" @click="editItem(item)" >
                                    mdi-pencil
                                </v-icon>
                                <v-icon v-if="item.estadoEnvio==='RUTA ASIGNADA' || item.estadoEnvio==='EN RUTA' || item.estadoEnvio==='RECOGIDO'" medium class="mr-5" @click="viewRute(item)" >
                                    mdi-call-split
                                </v-icon>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<style src="@/styles/Administrator/ManageUsers.css" scoped>

</style>

<script>
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import {mapState, mapActions} from 'vuex'
import * as userDA from '@/dataAccess/userDA.js'

export default {
    name: 'ManagePackages',
    data () {
        return {
            dialog: false,
            editedIndex: -1,
            editedItem:{
                idPaquete:-1, 
                codigoEnvio:'', 
                nombre:'',  
                descripcion:'',  
                estadoEnvio:'',  
                fechahoraRegistro:'',
                origen:{},
                destino:{},
                ruta:{}, 
            },
            defaultItem: {
                idPaquete:-1, 
                codigoEnvio:'', 
                nombre:'',  
                descripcion:'',  
                estadoEnvio:'',  
                fechahoraRegistro:'',
                origen:{},
                destino:{},
                ruta:{}, 
            },
            footerProps:{'items-per-page-Text':'Filas por página:  ', 'items-per-page-options': [5,10,15]},
            search: '',
            loadingText: 'Cargando paquetes',
            filterNoResultsText: 'No se encontraron paquetes que cumplan con los filtros',
            noDataText: 'No hay paquetes para mostrar',
        }
    },
    async created (){
        console.log('async create');
            let promises = [this.obtainCountry()]
            try {
                await Promise.all(promises)
            }catch {
               
            }
    },
    mounted(){
        this.getPackages();
    },
    computed: {
        ...mapState (['packages','PackageData','countries']),

        headers () {
            let items = []
            items.push({
                text: 'FECHA REGISTRO',
                align: 'center',
                sortable: true,
                value: 'fechaRegistro',
            })
            items.push({
                text: 'CODIGO ENVÍO',
                align: 'center',
                sortable: true,
                value: 'codigoEnvio',
            })
            items.push({
                text: 'REMITENTE',
                align: 'center',
                sortable: true,
                value: 'remitente.docIden',
            })
            items.push({ 
                text: 'DESTINATARIO',
                align: 'center',
                sortable: true,
                value: 'destinatario.docIden',
            })
            items.push({
                text: 'ORIGEN',
                align: 'center',
                sortable: true,
                value: 'origen.ciudad',
            })
            items.push({
                text: 'DESTINO',
                align: 'center',
                sortable: true,
                value: 'destino.ciudad',
            })
            items.push({
                text: 'ESTADO',
                align: 'center',
                sortable: true,
                value: 'estadoEnvio',
            })
            items.push({ 
                text: 'ACCIONES',
                align: 'center',
                sortable: false,
                value: 'actions'
            })
            
            return items
        },
        
    },    
    methods:{
        //...mapActions(['setActionUser']),
        ...mapActions(['completePackages','completePackageData','setPackageIndex','obtainCountry']),

        getPackages: function() {
            userDA.getAllPackages().then((res) =>{
                this.completePackages(res.data);
                console.log('Se recibió el servicio de paquetes');
                console.log(res.data);
            }).catch(error =>{
                Swal.fire({
                    title: '<p style="font-family:Roboto;">Error</p>',
                    icon: 'error',
                    html: '<p style="font-family:Roboto;">Error obteniendo los paquetes</p>'
                })
            });
        },

        viewRute(item){
            console.log('Se mostrará la ruta');
            console.log(item.codigoEnvio);
            userDA.getPackageDataByTrackNumber(item.codigoEnvio).then((res) =>{
                console.log(res.data);
                this.completePackageData(res.data);
                this.$router.push('/RouteDetail');
            }).catch(error =>{
                    Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: 'error',
                        html: '<p style="font-family:Roboto;">Código del paquete no encontrado</p>'
                    })
            })

        },

        editItem (item) {
            this.editedIndex = this.packages.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
         },

        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save () {
            console.log('destino:',this.destinationCountry)
            console.log('idPaquete:',this.editedItem.idPaquete)
            userDA.editPackage(this.editedItem.idPaquete,this.destinationCountry).then((res) =>{
                console.log('paso editar')
                Swal.fire({
                    icon: 'success',
                    title: '<p style="font-family:Roboto;">Enhorabuena</p>',
                    html: '<p style="font-family:Roboto;">Se editó correctamente el destino del paquete</p>'
                })
                this.getPackages();
                this.close()
                this.destinationCountry=''
            }).catch(error =>{
                const API_RESULT = error.response.data
                console.log(API_RESULT)
                console.log('mensaje de error: ',API_RESULT.apierror.debugMessage)
                if(API_RESULT.apierror.debugMessage=='El destino y el origen no pueden ser iguales'){
                    Swal.fire({
                        title : '<p style="font-family:Roboto;">Error</p>',
                        icon : 'error',
                        html : '<p style="font-family:Roboto;">El origen y el destino del paquete no pueden ser iguales</p>'
                    })
                    this.close()
                    this.destinationCountry=''
                }else if(API_RESULT.apierror.debugMessage=='No se puede actualizar un paquete en ruta'){
                    Swal.fire({
                        title : '<p style="font-family:Roboto;">Error</p>',
                        icon : 'error',
                        html : '<p style="font-family:Roboto;">No se puede actualizar un paquete en ruta</p>'
                    })
                    this.close()
                    this.destinationCountry=''
                }else if(API_RESULT.apierror.debugMessage=='No se puede actualizar un paquete recogido'){
                    Swal.fire({
                        title : '<p style="font-family:Roboto;">Error</p>',
                        icon : 'error',
                        html : '<p style="font-family:Roboto;">No se puede actualizar un paquete recogido</p>'
                    })
                    this.close()
                    this.destinationCountry=''
                }else {
                    Swal.fire({
                        title : '<p style="font-family:Roboto;">Error</p>',
                        icon : 'error',
                        html : '<p style="font-family:Roboto;">No se puede editar el destino del paquete</p>'
                    })
                    this.close()
                    this.destinationCountry=''
                }
            })
        },

        deletePackage(){
            Swal.fire({
                title: '<p style="font-family:Roboto;">¿Está seguro que desea eliminar este paquete?</p>',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#28a745',
                cancelButtonColor: '#d33',
                confirmButtonText: '<p style="font-family:Roboto;">Sí, eliminar</p>',
                cancelButtonText : '<p style="font-family:Roboto;">Cancelar</p>'
            })
        },
    }

}
</script>