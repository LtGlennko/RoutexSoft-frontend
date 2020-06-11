<template>
	<v-app>
		<center>
			<img
				src="@/images/tittle-login.png"
				style="max-width: 50%"	
			/>
		</center>
		<v-card color="blue-grey lighten-5" width="400" class="mx-auto">
			<v-card-title>
				<h1 class="display-1">Accede al Sistema</h1>
			</v-card-title>
			<v-card-text>
				<v-form>
					<v-text-field
						color="teal darken-3"
						label="Correo electrónico"
						prepend-icon="mdi-account-circle"
					/>
					<v-text-field
						color="teal darken-3"
						:type="showPassword ? 'text' : 'password'"
						label="Contraseña"
						prepend-icon="mdi-lock"
						:append-icon="showPassword ? 'mdi-eye' :
						'mdi-eye-off'"
						@click:append="showPassword =
						!showPassword"
					/>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-row align="center">
				<v-col class="text-center" cols="4" sm="12">
					<div class="my-2">
						<v-btn color="success">Acceder</v-btn>
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
export default {
    name: 'Login',
	data: () => ({
		showPassword: false
	}),
};
</script>