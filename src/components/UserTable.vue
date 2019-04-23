<template >
	<v-card>
		<v-card-title>
			<h3>Danh sách nhân viên</h3>
			<v-spacer></v-spacer>
			<v-text-field
			v-model="search"
			append-icon="search"
			label="Search"
			single-line
			hide-details
			></v-text-field>
		</v-card-title>
		<modal-add-user @keykeychanged="changedKey"/>
		<v-data-table
		:user-key="userKey"
		style="padding: 30px;"
		:headers="headers"
		:items="users" 
		:search="search"
		:loading="loadingStatus"
		>
		<v-progress-linear v-slot:progress indeterminate  background-color="pink lighten-3" color="pink lighten-1"></v-progress-linear>
		<template v-slot:items="list">
			<td>{{ list.item.name }}</td>
			<td class="text-xs-right">{{ list.item.email }}</td>
			<td class="text-xs-right">{{ list.item.mobile }}</td>
			<td class="text-xs-right">
				<i class="fas fa-venus" v-if="list.item.gender === 0" style="color: #f945de"></i>
				<i class="fas fa-mars" v-else style="color: #459ff9"></i>
			</td>
			<td class="text-xs-right">{{ list.item.birthday }}</td>
			<td class="text-xs-right">{{ list.item.position }}</td>
			<td class="text-xs-right">{{ list.item.type_job_name }}</td>
			<td class="text-xs-right">
				<i class="fas fa-check" v-if="list.item.status === 1" style="color: #aeff00"></i>
				<i class="fas fa-times" v-else style="color: #ff0000"></i>
			</td>
			<td class="text-xs-right">
				<modal-edit-user 
				:editUser = "{
				id: list.item.id,
				name: list.item.name,
				email: list.item.email,
				mobile: list.item.mobile,
				birthday: list.item.birthday,
				gender: list.item.gender,
				address: list.item.address,
				department_id: list.item.department_id,
				position_id: list.item.position_id,
				type_job: list.item.type_job,
				roles: list.item.roles
			}"
			@keykeychanged="changedKey"/>
			<v-btn icon class="mx-0" @click="deleteItem(list.item)">
				<v-icon color="pink">delete</v-icon>
			</v-btn>
		</td>
	</template>


</v-data-table>

	<!-- <v-alert v-slot:no-results :value="true" color="error" icon="warning">
		Your search for "{{ search }}" found no results.
	</v-alert> -->
</v-card>
</template>

<script>
	import {APP_URL} from 'src/routes/env.js'
	import ModalAddUser from 'src/components/ModalAddUser.vue'
	import ModalEditUser from 'src/components/ModalEditUser.vue'

	export default {
		data () {
			return {
				search: '',
				userKey: 0,
				dialog: false,
				loadingStatus: true,
				headers: [
				{
					text: 'Tên',
					align: 'center',
					sortable: false,
					value: 'name',
				},
				{ text: 'Email', value: 'email', align: 'center'},
				{ text: 'Số điện thoại', value: 'mobile', align: 'center' },
				{ text: 'Giới tính', value: 'gender', align: 'center' },
				{ text: 'Ngày sinh', value: 'birthday', align: 'center' },
				{ text: 'Chức vụ', value: 'position', align: 'center' },
				{ text: 'Hình thức', value: 'type_job', align: 'center' },
				{ text: 'Trạng thái', value: 'status', align: 'center' },
				{ text: 'Chức năng', value: 'function', align: 'center' },
				],
				users: [],
				editUser: [],
			}
		},
		components: {
			ModalAddUser: ModalAddUser,
			ModalEditUser: ModalEditUser
		},
		created: function () {
			this.fetchData();
		},
		methods: { 
			changedKey() {
				this.$emit('keyChanged')
			},
			fetchData: function () {
				axios.get(''+APP_URL+'/users',{
					headers:{
						'Accept':'application/json',
						'Authorization':'Bearer ' + JSON.parse(window.localStorage.getItem('authUser')).access_token,
						'cache-control':'no-cache'
					}
				})
				.then(response => {
					this.loadingStatus = false
					this.users = response.data.data
					console.log(this.users)
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