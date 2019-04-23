<template >
	<v-card>
		<v-card-title>
			<h3>Quản lí vai trò</h3>
			<v-spacer></v-spacer>
			<v-text-field
			v-model="search"
			append-icon="search"
			label="Search"
			single-line
			hide-details
			></v-text-field>
		</v-card-title>
		<v-data-table
		style="padding: 30px;"
		:headers="headers"
		:items="roles"
		:search="search"
		:loading="loadingStatus"
		>
		<v-progress-linear v-slot:progress indeterminate style="color: #c768ff"></v-progress-linear>
		<template v-slot:items="list">
			<td class="text-xs-left">{{ list.item.name }}</td>
			<td class="text-xs-left">{{ list.item.display_name }}</td>
			<td class="text-xs-left">{{ list.item.description }}</td>
			<v-btn icon @click="listRolePermissions(list.item.id)">
				<i class="fas fa-rocket" style="color: #f4aa42;"></i>
			</v-btn>
			&nbsp
			<v-btn icon class="mx-0" @click="deleteItem(list.item)">
				<v-icon style="color: #c768ff;">delete</v-icon>
			</v-btn>
		</td>
	</template>

</v-data-table>

</v-card>
</template>

<script>
	import {APP_URL} from 'src/routes/env.js'
	import RolePermission from 'src/components/Roles/RolePermission.vue'

	export default {
		data () {
			return {
				search: '',
				loadingStatus: true,
				headers: [
				{
					text: 'Tên',
					align: 'center',
					sortable: false,
					value: 'name',
				},
				{ text: 'Tên hiển thị', value: 'display_name', align: 'center'},
				{ text: 'Mô tả', value: 'discription', align: 'center' }
				],
				roles: [],
			}
		},
		components: {
			RolePermission: RolePermission
		},
		created: function () {
			this.fetchData();
		},
		methods: { 
			changedKey() {
				this.$emit('keyChanged')
			},
			fetchData: function () {
				axios.get(''+APP_URL+'/roles',{
					headers:{
						'Accept':'application/json',
						'Authorization':'Bearer ' + JSON.parse(window.localStorage.getItem('authUser')).access_token,
						'cache-control':'no-cache'
					}
				})
				.then(response => {
					this.roles = response.data.data
					this.loadingStatus = false
					console.log(this.roles)
				}).catch(error => {
					this.error = error
				});
			},
			listRolePermissions: function (role_id) {
				
			}
		}
	}
</script>


<style type="text/css">
	i{
		font-size: 20px;
	}
</style>