<template>
    <div id="principal">
        <headerBar/>
        <sidebar/>
        <v-content tag="div">
            <v-container fluid fill-height>
                <router-view></router-view>
            </v-container>
        </v-content>        
    </div>
</template>

<style src="@/styles/Common/Principal.css" scoped>
</style>

<script>
    import sidebar from '@/components/Common/sidebar'
    import headerBar from '@/components/Common/headerBar'
    //import footer from '@/components/footer'
export default {
    name: 'Principal',
    components:{
        sidebar,
        headerBar,
        //footer
    }
}
</script>