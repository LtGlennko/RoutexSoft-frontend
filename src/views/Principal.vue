<template>
    <div id="principal">
        <headerBar/>
        <sidebar/>
        <v-content>
            <v-fade-transition mode="out-in">
                <router-view />
            </v-fade-transition>
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