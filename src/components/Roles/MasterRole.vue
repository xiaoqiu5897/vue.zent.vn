<template>
	<div class="content">
		<div class="container-fluid">
			<role :key="key" @keyChanged="changedKey"/>
		</div>
	</div>
</template>

<script>
	import Role from './Role.vue'

	export default {
		data () {
			return {
				key: 0,
			}
		},
		components: {
			Role: Role
		},
		methods: { 
			changedKey() {
				this.key += 1
			},
		}
	}
</script>
