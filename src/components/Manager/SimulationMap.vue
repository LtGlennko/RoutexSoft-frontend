<template>
    <gmap-map
        :center="mapCenter"
        :zoom="mapZoom"
        :mapTypeControl="false"
        ref="gmap"
        style="width: 100%; height: 750px;">

        <gmap-marker v-for="(marker) in markers"
            :key="marker.key"
            :position="marker.position"
            :title="marker.title"
            :options="customedMarkerOptions(markerOptions, marker)"
            @click="showInfoMarker(marker)"
            ref="gmarkers"
        >
        </gmap-marker>

        <gmap-polyline v-for="(path) in actualPaths"
            :key="path.key"
            :path.sync="path.route"
            :options="customedPolylineOptions(polylineOptions, path)"
            @click="showInfoPolyline(path)"
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
            lineSymbol:{
                path: "M -2,0 0,-2 2,0 0,2 z",
                strokeColor: "#F00",
                fillColor: "#F00",
                fillOpacity: 1
                //scale: 3, //Tamaño del símbolo
                //strokeColor: '#000000', //Color del símbolo
                //strokeWeight: 1 //Ancho de borde del símbolo
            },
            polylineOptions:{ //Opciones predeterminadas de cada linea
                strokeColor: '#000000', //Color de la línea
                strokeWeight: 1, //Ancho de borde de la línea
                strokeOpacity: 1,
                icons:[
                    {
                        icon: {
                            //path: "M -2,0 0,-2 2,0 0,2 z",
                            //path: "M497.535,14.465c-19.569-19.568-51.395-19.241-70.557,0.726L322.092,124.488L66.131,39.781L12.4,93.513l213.352,131.365L117.796,337.372l-69.231-11.366L0,374.571l101.78,35.649L137.429,512l48.565-48.565l-11.366-69.231l112.494-107.955L418.487,499.6l53.732-53.732l-84.706-255.961L496.808,85.022C516.776,65.86,517.103,34.034,497.535,14.465z",
                            path: "M503.5,10c-58.7,0-106.3,153.8-106.3,212.5v148.7L24.2,528.7v104.8l373.1-72.1v205.9l-160.1,118V990L502,897.4L762.8,990V885.2l-153-114.4V561.7l366,71.8V528.7l-366-156.7V222.5C609.8,163.8,562.2,10,503.5,10z",
                            strokeWeight: 0,
                            fillColor: "#000000",
                            fillOpacity: 1,
                            scale: 0.01
                        },
                        offset: '0%'
                    }
                ]                
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
        ...mapState(['markers', 'actualPaths', 'mapCenter', 'mapZoom', 'colorLegend', 'simDay'])
    },
    methods:{
        ...mapActions(['completeMarkers', 'completePaths', 'completeActualPaths', 'setValueMapCenter']),
        showInfoMarker(marker){ //Mostrar información del aeropuerto
            this.setValueMapCenter(marker.position); //Centrar el mapa
            console.log("Show info of: " + marker.title);
        },
        showInfoPolyline(polyline){ //Mostrar información del plan de vuelo
            var oriHusoStr = ''+polyline.oriHuso;
            if(polyline.oriHuso >= 0)
                oriHusoStr = '+'+oriHusoStr;
            var desHusoStr = ''+polyline.desHuso;
            if(polyline.desHuso >= 0)
                desHusoStr = '+'+desHusoStr;
            const lines = ['Origen: ' + polyline.horaIni + ' (UTC' + oriHusoStr + ') - ' + polyline.origen,
            'Destino: ' + polyline.horaFin + ' (UTC' + desHusoStr + ') - ' + polyline.destino,
            'Ocupación',
            polyline.detallePorDia + '/' + polyline.capacidad];
            let texto = lines.join('<br>');
            Swal.fire({
                html: '<p style="font-family:Roboto;">' + texto + '</p>'
            });
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
        hallaColor(porcentaje){
            for (let i = 0; i < this.colorLegend.length; i++) {
                let minValue = this.colorLegend[i].min;
                let maxValue = this.colorLegend[i].max;
                if(minValue < porcentaje && porcentaje <= maxValue)
                    return i;
            }
            return -1;
        },
        customedPolylineOptions(baseOptionsP, polyline){
            let options = JSON.parse(JSON.stringify(baseOptionsP)); //Se instancia una nueva lista de opciones
            
            //console.log('polyline detalle: ' + polyline.detallePorDia);
            //console.log('dia ' + this.simDay);
            let porcOcup = (polyline.detallePorDia)/(polyline.capacidad);

            let indColor = this.hallaColor(porcOcup);
            //console.log('indColor' + indColor);

            if(indColor != -1)
                options.strokeColor = this.colorLegend[indColor].color;
            else{
                console.log('No Color: ' + porcOcup);
            }
            
            //Animación de vuelo
            //if(polyline.offset >= 0)
            //console.log('Offset: ' + polyline.offset)
            if(0 <= polyline.offset && polyline.offset <= 100)
                options.icons[0].offset = polyline.offset + '%';

            //console.log(options);
            //Modificar color de línea según capacidad ingresada
            return options;
        }
    }
}
</script>