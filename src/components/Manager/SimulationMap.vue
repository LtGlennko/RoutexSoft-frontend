<template>
    <gmap-map
        :center="mapCenter"
        :zoom="mapZoom"
        ref="gmap"
        style="width: 100%; height: 750px;">

        <gmap-marker v-for="(marker) in markers"
            :key="marker.key"
            :position="marker.position"
            :title="marker.title"
            :options="customedMarkerOptions(markerOptions, marker)"
            @click="showInfo(marker)"
            ref="gmarkers"
        >
        </gmap-marker>

        <gmap-polyline v-for="(path) in actualPaths"
            :key="path.key"
            :path.sync="path.route"
            :options="customedPolylineOptions(polylineOptions, path)"
            ref="gpolylines"
        >
        </gmap-polyline>
        
    </gmap-map>
</template>
<style src="@/styles/Manager/Simulation.css" scoped>

</style>
<script>
import {mapState, mapActions} from 'vuex'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDKjcVHMCTYKk2keZygPn7LJ3IdF5ekfac'
  }
})

export default {
    name: 'SimulationMap',
    data(){
        return{
            markerOptions:{ //Opciones predeterminadas de cada marcador
              clickable: true,
              draggable: false,
              visible: true,
              icon: {
                  url: "http://maps.google.com/mapfiles/kml/paddle/red-circle-lv.png"
              }
            },
            polylineOptions:{ //Opciones predeterminadas de cada linea
                strokeColor: '#000000', //Color de la línea
                strokeWeight: 0.5, //Ancho de borde de la línea
                /*icons:[
                    { icon:
                        {
                            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                            scale: 3, //Tamaño del símbolo
                            strokeColor: '#000000', //Color del símbolo
                            strokeWeight: 1 //Ancho de borde del símbolo
                        },
                        offset: '75%'
                    }
                ]*/                
            },
        }
    },

    created(){
        
    },

    mounted(){

    },
    updated(){
        //this.customizeMarkers();
    },

    computed: {
        ...mapState(['markers', 'actualPaths', 'mapCenter', 'mapZoom', 'colorLegend'])
    },
    methods:{
        ...mapActions(['completeMarkers', 'completePaths', 'completeActualPaths']),
        animateRouteIcon(line){
            var count = 0;
            //console.log("Linea con icon a animar")
            /*window.setInterval(function(){
                count = (count+1) % 200;
                console.log("icono");
                console.log(iconMobile);
                line.options.icons[0].offset = count / 2 + "%";
                console.log(iconMobile);
            }, 20);*/
        },
        showInfo(marker){ //Mostrar información del aeropuerto
            this.$refs.gmap.center = marker.position; //Centrar el mapa
            console.log("Show info of: " + marker.title);
        },
        customedMarkerOptions(baseOptionsM, marker){
            //console.log(baseOptionsM);
            let options = JSON.parse(JSON.stringify(baseOptionsM)); //Se instancia una nueva lista de opciones
            var firstLetter = marker.title.toUpperCase()[0];
            var expresion = /[A-Z0-9]/;
            var arrayMatched = firstLetter.match(expresion);
            //console.log("Coincidencias: "+arrayMatched);
            if(arrayMatched != null){ //Solo personaliza valores alfanuméricos
                let customIcon = "http://maps.google.com/mapfiles/kml/paddle/"+firstLetter+"-lv.png";
                //console.log(customIcon);
                //console.log(gmarker.options.icon.url);
                options.icon.url = customIcon; //ÍCONO
            }
            return options;
        },
        customedPolylineOptions(baseOptionsP, polyline){
            let options = JSON.parse(JSON.stringify(baseOptionsP)); //Se instancia una nueva lista de opciones
            let rInd = Math.floor(Math.random() * 5);
            //console.log(this.colorLegend);
            options.strokeColor = this.colorLegend[rInd].color;
            //Animación de vuelo
            this.animateRouteIcon(polyline);
            //Modificar color de línea según capacidad ingresada
            return options;
        }
    }
}
</script>