<template>
	<div class="panel panel-default">
		<div id="particles-js">
			<login-component></login-component>
		</div>
	</div>
</template>


<script type="text/javascript">
	import Login from './Login.vue'

	export default {
		components: {
			'login-component': Login
		}
	}
</script>

<style type="text/css">
	/* ---- reset ---- */ 
	body {
		margin: 0;
		font: normal 75% Arial,  Helvetica,  sans-serif;
	}
	canvas {
		display:  block;
		vertical-align:  bottom;
	}
	/* ---- particles.js container ---- */ 
	#particles-js {
		position: absolute;
		width:  100%;
		height:  100%;
		background-image: linear-gradient(141deg, #009e6c 0%, #00d1b2 71%, #00e7eb 100%)!important;
		background-color: #00d1b2;
		background-repeat:  no-repeat;
		background-size:  cover;
		background-position:  50% 50%;
	}
	/* ---- stats.js ---- */ 
</style>