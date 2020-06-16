<template>
    <v-navigation-drawer app permanent>
        <v-list-item class="content_Title">
            <v-list-item-content>
                <v-list-item-title class="title">RoutEx - Soft</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list nav>
            <v-list-item-group v-model="item">
                <ul v-if="editRole==='Gerente'"> <!--verificar cargo del usuario-->
                    <v-list-item v-for="(item, i) in optionManager" :key="i" :to="item.to">
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </ul>
                <ul v-if="editRole==='Administrador'">
                    <v-list-item v-for="(item, i) in optionAdministrator" :key="i" :to="item.to">
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </ul>
                <ul v-if="editRole==='Registrador'">
                    <v-list-item v-for="(item, i) in optionRegistrar" :key="i" :to="item.to">
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </ul>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<style src="@/styles/Common/Sidebar.css" scoped>

</style>


<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        name: 'sidebar',
        data: () => ({
            user1: "Administrador",
            item: 0,
            optionAdministrator: [
                { text: 'Gestionar Usuarios', icon: 'mdi-account-circle', to:'/ManageUsers'},
                { text: 'Gestionar Almacenes', icon: 'mdi-store', to:'/ManageWarehouses' },
                { text: 'Gestionar Planes de Vuelo', icon: 'mdi-airplane', to:'/ManageFlightPlans' },
                { text: 'Configurar Parametros', icon: 'mdi-brightness-7', to:'/ConfigureParameters' },
            ],
            optionRegistrar: [
                { text: 'Crear Envios', icon: 'mdi-send', to:'/ManageUsers'},
                { text: 'Paquetes', icon: 'mdi-package-variant', to:'/ManageUsers' },
                { text: 'Clientes', icon: 'mdi-account-box', to:'/ManageUsers' },
            ],
            optionManager: [
                { text: 'Cargar Historial', icon: 'mdi-upload', to:'/ManageUsers'},
                { text: 'Simulacion', icon: 'mdi-account-multiple', to:'/ManageUsers' },
                { text: 'Reporte Rutas', icon: 'mdi-chart-areaspline', to:'/ManageUsers' },
                { text: 'Reporte Paquetes', icon: 'mdi-chart-bar', to:'/ManageUsers' },
            ],
        }),
        computed :{
            ...mapState (['editRole']),
        },
        actions: {      
        setRole(context,role){
            console.log('Se dara el rooool')
            props.rol=role
        }
        },
    }
</script>
