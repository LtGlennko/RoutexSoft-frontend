<template>
	<v-app>
		<v-row class="topBar">
            <v-col >
            </v-col>
        </v-row>
		<center>
			<img
				src="@/images/tittle-login.png"
				class="imgLogin"
			/>
		</center>
		<v-card
			color="blue-grey lighten-5"
			width="400"
			class="mx-auto mb-5 cardTitlePrincipal"
		>
			<v-card-title class="cardTitle">
				<h1 class="display-1 titleLogin">Accede al Sistema</h1>
			</v-card-title>
			<v-card-text>
				<v-form>
					<!-- Se cambiará el keyup.enter para contraseña cuando se tenga usuarios-->
					<v-text-field 
						color="teal darken-3"
						v-model="email"
						:rules="emailRules"
						label="Usuario"
						prepend-icon="mdi-account-circle"
						v-on:keyup.enter="validate()"
						required
					/>
					<v-text-field
						color="teal darken-3"
						v-model="password"
						:type="showPassword ? 'text' : 'password'"
						label="Contraseña"
						prepend-icon="mdi-lock"
						:append-icon="showPassword ? 'mdi-eye' :
						'mdi-eye-off'"
						@click:append="showPassword = !showPassword"
						required
					/>
					
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-row align="center">
				<v-col class="text-center" cols="4" sm="12">
					<div class="my-2">
						<v-btn
							class="btnValidate"
							@click="validate()"
						>
							Acceder
						</v-btn>
					</div>
					<div class="my-2">
						<v-btn text small color="teal darken-4">¿Olvidaste tu contraseña?</v-btn>	
					</div>
				</v-col>
				</v-row>
			</v-card-actions>
		</v-card>
		<v-row class="topBar">
            <v-col >
            </v-col>
        </v-row>
	</v-app>
</template>

<style src="@/styles/Login/Login.css" scoped>
</style>

<script>

import SideB from '@/components/Common/sidebar.vue'
import {mapState, mapActions} from 'vuex'

export default {
    name: 'Login',
	data: () => ({
		showPassword: false,
		role: 0,
		password: '',
		email: '',
		emailRules: [
			v => !!v || 'Debe ingresar su correo',
			v => /.+@.+\..+/.test(v) || 'Correo inválido'
		]
	}),

	methods: {
		...mapActions(['setActionRole','setActionEmail']),
		validate () {
			if(this.email=="lhuayta"){
				this.$router.push('/ManageUsers')
				console.log('Se pasara el rol1')
				this.setActionRole("Administrador")
				this.setActionEmail(this.email)
			}
			else if(this.email=="glozano" || this.email=="jcardenas" || this.email=="ptuya"){
				this.$router.push('/CreateSending')
				console.log('Se pasara el rol2')
				this.setActionRole("Registrador")
				this.setActionEmail(this.email)
			}
			else if(this.email=="jdueñas"){
				this.$router.push('/GestHistory')
				console.log('Se pasara el rol3')
				this.setActionRole("Gerente")
				this.setActionEmail(this.email)
			}
			else{
				alert('Usuario o contraseña incorrecto')
			}
		}
	}
};
</script>