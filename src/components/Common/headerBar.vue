<template>
  <div>
      <v-app-bar class="v-appBar">
        <v-spacer></v-spacer>
        <img class="img-fluid smile_face" src="@/images/smile_face.png" alt=""> 
        <v-toolbar-title>
          GLENN LOZANO TAPIA 
          <v-toolbar-items
            class="cargo"
            v-text="editRole">
          </v-toolbar-items>
        </v-toolbar-title>
        <v-btn icon @click="logout()">
          <v-icon left>mdi-logout</v-icon> Salir
        </v-btn>
      </v-app-bar>
  </div>
</template>

<style src="@/styles/Common/HeaderBar.css" scoped>

</style>

<script>

  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'headerBar',
    computed :{
        ...mapState (['editRole']),
    },
    methods:{
      logout () {
				this.$router.push('/Login')
      }
    }
  }
</script>