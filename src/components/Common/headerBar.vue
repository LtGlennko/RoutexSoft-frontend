<template>
  <div>
      <v-app-bar class="v-appBar">
        <v-spacer></v-spacer>
        <img class="img-fluid smile_face" src="@/images/smile_face.png" alt=""> 
        <v-toolbar-title>
          GLENN LOZANO TAPIA 
          <div class="cargo">
            ADMINISTRADOR
          </div>
        </v-toolbar-title>
        <v-btn icon >
          <v-icon left>mdi-logout</v-icon> Salir
        </v-btn>
      </v-app-bar>
  </div>
</template>

<style src="@/styles/Common/HeaderBar.css" scoped>

</style>

<script>
  export default {
    name: 'headerBar',
    methods:{
      
    }
  }
</script>