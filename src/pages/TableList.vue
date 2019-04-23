<template>
	<div class="content">
		<div class="container-fluid">
			<user-table :key="key" @keyChanged="changedKey"/>
		</div>
	</div>
</template>

<script>
	import UserTable from 'src/components/UserTable.vue'

	export default {
		data () {
			return {
				key: 0,
			}
		},
		components: {
			UserTable: UserTable
		},
		methods: { 
			changedKey() {
				this.key += 1
			},
		}
	}
</script>
