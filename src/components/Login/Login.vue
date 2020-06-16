<template>
	<v-app>
		<center>
			<img
				src="@/images/tittle-login.png"
				style="max-width: 50%"	
			/>
		</center>
		<v-card
			color="blue-grey lighten-5"
			width="400"
			class="mx-auto"
		>
			<v-card-title>
				<h1 class="display-1">Accede al Sistema</h1>
			</v-card-title>
			<v-card-text>
				<v-form>
					<v-text-field
						color="teal darken-3"
						v-model="email"
						:rules="emailRules"
						label="Correo electrónico"
						prepend-icon="mdi-account-circle"
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
					<h6>
						En correo: 1=Administrador, 2=Registrador, 3=Gerente, 4=Cliente
					</h6>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-row align="center">
				<v-col class="text-center" cols="4" sm="12">
					<div class="my-2">
						<v-btn
							color="success"
							@click="validate"
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
	</v-app>    
</template>

<script>

import SideB from '@/components/Common/sidebar.vue'
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

	components: {
		SideB
	},

	methods: {
		validate () {
			if(this.email=="1"){
				this.$router.push('/ManageUsers')
				console.log('Se pasara el rol')
				SideB.setRole("Administrador")
			}
			else if(this.email=="2"){
				this.$router.push('/SelectClients')
				SideB.setRole("Registrador")
			}
			else if(this.email=="3"){

			}
			else if(this.email=="4"){

			}
			else{
				alert('Usuario o contraseña incorrecto')
			}
		}
	}
};
</script>