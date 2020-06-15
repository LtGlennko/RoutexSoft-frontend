<template>
    <v-container>
        <v-card>
            <v-row>
                <v-col>
                    <!-- FORM TO ADD A USER-->
                    <v-form v-if="!editUser">
                        <v-card-title class="titleCard">
                            Gestionar Usuarios > Añadir Usuarios
                        </v-card-title>
                    
                        <v-row justify="center" class="ml-5 mr-5">
                            <v-col cols="6" >
                                <v-text-field
                                    ref="name"
                                    v-model="name"
                                    :rules="[() => !!name || 'Este campo es requerido']"
                                    :error-messages="errorMessages"
                                    label="Nombres"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    ref="lastName"
                                    v-model="lastName"
                                    :rules="[() => !!lastName || 'Este campo es requerido']"
                                    :error-messages="errorMessages"
                                    label="Apellidos"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    v-model="dni"
                                    :rules="[rules.required,rules.necessary]"
                                    label="DNI"
                                    maxlength="8"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    ref="email"
                                    v-model="email"
                                    :rules="[rules.required, rules.email]"
                                    label="Correo electrónico"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-select
                                    label="Rol"
                                    v-model="select"
                                    :items="roles"
                                    :rules="[v => !!v || 'Debe seleccionar un rol']"
                                    required
                                ></v-select>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    ref="userName"
                                    v-model="userName"
                                    :rules="[() => !!userName || 'Este campo es requerido']"
                                    :error-messages="errorMessages"
                                    label="Usuario"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    v-model="password"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[rules.required, rules.min]"
                                    :type="show1 ? 'text' : 'password'"
                                    name="input-10-1"
                                    label="Contraseña"
                                    hint="Al menos 8 caracteres"
                                    value="12345"
                                    @click:append="show1 = !show1"
                                ></v-text-field>            
                            </v-col>
                            <v-col cols="6" >
                            </v-col>
                        </v-row>
                        <v-divider class="mt-1"></v-divider>
                        <v-card-actions>
                            <v-row>
                            <v-col cols="6" class="colButton">
                            <v-btn class="mb-2 buttonCreate" @click=createUser()>Guardar</v-btn>
                            </v-col>
                            <v-col cols="6" class="colButton">
                            <v-btn class="mb-2 buttonCancel" @click=$router.go(-1)>Cancelar</v-btn>
                            </v-col>
                        </v-row>
                        </v-card-actions>
                    </v-form>

                    <!-- FORM TO MODIFY A USER-->
                    <v-form v-if="editUser">
                        <v-card-title class="titleCard">
                            Gestionar Usuarios > Modificar Usuarios
                        </v-card-title>
                    
                        <v-row justify="center" class="ml-5 mr-5">
                            <v-col cols="6" >
                                <v-text-field
                                    ref="name"
                                    v-model="name"
                                    :rules="[() => !!name || 'Este campo es requerido']"
                                    :error-messages="errorMessages"
                                    label="Nombres"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    ref="lastName"
                                    v-model="lastName"
                                    :rules="[() => !!lastName || 'Este campo es requerido']"
                                    :error-messages="errorMessages"
                                    label="Apellidos"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    v-model="dni"
                                    :rules="[rules.required,rules.necessary]"
                                    label="DNI"
                                    maxlength="8"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    ref="email"
                                    v-model="email"
                                    :rules="[rules.required, rules.email]"
                                    label="Correo electrónico"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-select
                                    label="Rol"
                                    v-model="select"
                                    :items="roles"
                                    :rules="[v => !!v || 'Debe seleccionar un rol']"
                                    required
                                ></v-select>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    ref="userName"
                                    v-model="userName"
                                    :rules="[() => !!userName || 'Este campo es requerido']"
                                    :error-messages="errorMessages"
                                    label="Usuario"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    v-model="password"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[rules.required, rules.min]"
                                    :type="show1 ? 'text' : 'password'"
                                    name="input-10-1"
                                    label="Contraseña"
                                    hint="Al menos 8 caracteres"
                                    value="12345"
                                    @click:append="show1 = !show1"
                                ></v-text-field>            
                            </v-col>
                            <v-col cols="6" >
                            </v-col>
                        </v-row>
                        <v-divider class="mt-1"></v-divider>
                        <v-card-actions>
                            <v-row>
                                <v-col cols="6" class="colButton">
                                    <v-btn class="mb-2 buttonCreate" @click=createUser()>Guardar</v-btn>
                                </v-col>
                                <v-col cols="6" class="colButton">
                                    <v-btn class="mb-2 buttonCancel" @click=$router.go(-1)>Cancelar</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-form>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<style src="@/styles/Administrator/CreateUser.css" scoped>

</style>

<script>
import { mapState, mapActions } from 'vuex';
import Swal from 'sweetalert2'

export default {
    name: 'CreateUser',
    data: () => ({
        errorMessages: '',
        name: null,
        lastName: null,
        email: null,
        userName: null,
        dni: '',
        select: '',
        roles: [
            'Registrador',
            'Administrador',
            'Gerente'
        ],
        password: '',
        show1: false,
        rules: {
            required: value => !!value || 'Este campo es requerido',
            counter: value => value.length <= 20 || 'Máximo 20 caracteres',
            min: value => value.length >= 8 || 'Mínimo 8 caracteres',
            necessary: value => value.length >= 8 || 'El DNI debe contener 8 digitos',
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Correo electrónico inválido'
            }
        },
    }),    
    computed :{
         ...mapState (['editUser']),
         form () {
            return {
                name: this.name,
                lastName: this.lastName,
                userName: this.userName,
                email: this.email,
                password: this.password,
                dni: this.dni,
                select: this.select,
            }
         },
    },
    methods:{
        createUser(){
            Swal.fire({
                icon: 'success',
                title: '<p style="font-family:Roboto;">Enhorabuena</p>',
                html: '<p style="font-family:Roboto;">Usuario creado satisfactoriamente</p>'
            })
        }
            

    }    
}
</script>