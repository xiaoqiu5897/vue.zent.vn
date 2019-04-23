<template>
	<div id="login-form">
		<form action="" method="POST" role="form" >
			<h1>Login</h1>
			<div class="form-group">
				<label for="" class="name-input">Email</label>
				<input 
				type="email" 
				class="form-control" 
				id="email" 
				v-model="email" 
				required
				>
			</div>
			<div class="form-group">
				<label for="" class="name-input">Password</label>
				<input 	
				type="password" 
				class="form-control" 
				id="password" 
				v-model="password" 
				required
				>
			</div>
			<button  type="submit" class="btn btn-warning" id="btn-login"  group="auth" @click.prevent="submited()" >Submit</button >
			<!-- <notifications type="submit" class="btn btn-warning" id="btn-login" @click=" notifi()">noti</notifications> -->
		</form>
	</div>
</template>
<script>
	import Vue from 'vue'
	import {APP_URL} from 'src/routes/env.js'
	import Card from 'src/components/Cards/Card.vue'


	export default {
		data: function () {
			return {
				email: '',
				password: '',
				error: false,
				type: ['', 'info', 'success', 'warning', 'danger'],
				notifications: {
					topCenter: false
				}
			}
		},
		methods: {
			submited: function () {
				const authUser = {}
				this.$http.post(''+APP_URL+'/login', {email: this.email, password: this.password})
				.then(response => {
					console.log(response)
					if (response.status === 200) {
						authUser.access_token = response.data.data.access_token
						authUser.user = response.data.data.user
						window.localStorage.setItem('authUser', JSON.stringify(authUser))
						this.$router.push('/admin/overview')
					} 
				})
				.catch(error => {
					if (typeof error.response.data.errors.message == 'string') {
						toastr.error(error.response.data.errors.message)
					} else {
						for(var k in error.response.data.errors.message) {
							toastr.error(error.response.data.errors.message[k]);
						}
					}
					console.log(typeof error.response.data.errors.message)
					if (!error.response) {
						this.errorStatus = 'Error: Network Error';
					} else {
						this.errorStatus = error.response.data.message;
					}
				})
			}
		}
	}
</script>
<style type="text/css">
	#login-form {
		width: 500px;
		padding: 20px;
		background-color: white;
		margin: auto;
		margin-top: 200px;
		border: 0px;
		color: black;
	}
	h1{
		margin-bottom: 50px;
		text-align: center;
	}
	input{
		margin-bottom: 30px;
		font-size: 20px;
	}
	label{
		font-size: 17px!important;
	}
	form{
		width: 90%;
	}
	#btn-login{
		margin-left: 170px;
	}
	.toast-error{
		background-color: #c277ff;
		color: #000000!important;
	}
	.toast-success{
		background-color: #ff8300;
		color: #000000!important;
	}
</style>