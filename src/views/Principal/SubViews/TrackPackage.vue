<template>
    <v-content> 
        <v-row class="topBar">
            <v-col >
            </v-col>
        </v-row>

        <v-card class="mt-5 ml-8 mr-8 cardClient">
            <v-row class="cardTopBar">
                <v-col>
                    <h2 class="cardTitle text-center"> DATOS DEL PAQUETE </h2>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="3" class="ml-5">
                    <h4> Código del paquete: </h4>
                </v-col>
                <v-col cols="3">
                    <h4> Estado: </h4>
                </v-col>
                <v-col cols="5" class="mr-5">
                    <h4> Ruta del paquete: </h4>
                </v-col>
            </v-row>

            <v-stepper v-model="e1">
                <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">Name of step 1</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3">Name of step 3</v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card
                    class="mb-12"
                    color="grey lighten-1"
                    height="200px"
                    ></v-card>

                    <v-btn
                    color="primary"
                    @click="e1 = 2"
                    >
                    Continue
                    </v-btn>

                    <v-btn text>Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-card
                    class="mb-12"
                    color="grey lighten-1"
                    height="200px"
                    ></v-card>

                    <v-btn
                    color="primary"
                    @click="e1 = 3"
                    >
                    Continue
                    </v-btn>

                    <v-btn text>Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-card
                    class="mb-12"
                    color="grey lighten-1"
                    height="200px"
                    ></v-card>

                    <v-btn
                    color="primary"
                    @click="e1 = 1"
                    >
                    Continue
                    </v-btn>

                    <v-btn text>Cancel</v-btn>
                </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-card>

        <v-row class="topBar">
            <v-col >
            </v-col>
        </v-row>
    </v-content>
</template>



<style src="@/styles/Client/TrackPackage.css" scoped>
</style>

<script>
export default {
    name: 'TrackPackage',
}
</script>