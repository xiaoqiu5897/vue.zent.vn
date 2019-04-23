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
		:items="permissions"
		:search="search"
		v-slot:items="list"
		>
		<td>{{ list.item.name }}</td>
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
				permissions: [],
			}
		},
		components: {
			RolePermission: RolePermission
		},
		created: function () {
			this.fetchData();
		},
		methods: { 
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
					console.log(this.roles)
				}).catch(error => {
					this.error = error
				});
			},
			listPermissions: function () {
				axios.get(''+APP_URL+'/permissions',{
					headers:{
						'Accept':'application/json',
						'Authorization':'Bearer ' + JSON.parse(window.localStorage.getItem('authUser')).access_token,
						'cache-control':'no-cache'
					}
				})
				.then(response => {
					this.permissions = response.data.data
					console.log(this.permissions)
				}).catch(error => {
					this.error = error
				});
			}
		}
	}
</script>


<style type="text/css">
	i{
		font-size: 20px;
	}
</style>