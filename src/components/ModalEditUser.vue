<template>
	<div>
		<v-btn icon class="mx-0" >
			<v-icon color="teal" @click="editDialog=true">edit</v-icon>
		</v-btn>
		<v-layout row justify-center>
			<v-dialog max-width="600px" v-model="editDialog">
				<v-card>
					<v-card-title>
						<span class="headline">Sửa nhân viên</span>
					</v-card-title>
					<v-card-text>
						<v-container grid-list-md>
							<v-layout wrap>
								<v-flex xs12>
									<v-text-field label="Tên *" v-model="editUser.name" required></v-text-field>
								</v-flex>
								<v-flex xs12>
									<v-text-field label="Email *" v-model="editUser.email" required></v-text-field>
								</v-flex>
								<v-flex xs12>
									<v-text-field label="Số điện thoại *" v-model="editUser.mobile" required></v-text-field>
								</v-flex>
								<v-flex xs12>
									<p>Ngày sinh *</p>
									<v-menu
									ref="menu"
									v-model="menu"
									:close-on-content-click="false"
									:nudge-right="40"
									transition="scale-transition"
									offset-y
									full-width
									min-width="290px"
									>
									<template v-slot:activator="{ on }">
										<v-text-field
										v-model="editUser.birthday"
										prepend-icon="event"
										readonly
										v-on="on"
										></v-text-field>
									</template>
									<v-date-picker
									ref="picker"
									v-model="editUser.birthday"
									:max="new Date().toISOString().substr(0, 10)"
									min="1950-01-01"
									@change="save"
									header-color="primary"
									class="date-picker"
									></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex xs12>
								<div class="row">
									<v-flex sm6 >
										<p>Giới tính *</p>
										<v-radio-group v-model="user_gender" column style="padding-left: 30px;">
											<v-radio
											label="Nam"
											color="orange"
											value="1"
											></v-radio>
											<v-radio
											label="Nữ"
											color="orange"
											value="0"
											></v-radio>
										</v-radio-group>
									</v-flex>
									<v-flex sm6>
										<v-select
										v-model="editUser.type_job"
										:items="type_job"
										item-text="value"
										item-value="id"
										label="Hình thức làm việc"
										return-object
										single-line
										></v-select>
									</v-flex>
								</div>
							</v-flex>
							<v-flex xs12>
								<v-text-field 
								label="Địa chỉ " 
								v-model="editUser.address"
								></v-text-field>
							</v-flex>
							<v-flex xs12 sm6>
								<v-select
								v-model="editUser.department_id"
								:items="departments"
								item-text="value"
								item-value="id"
								label="Phòng ban"
								return-object
								single-line
								></v-select>
							</v-flex>
							<v-flex xs12 sm6>
								<v-select
								v-model="editUser.position_id"
								:items="positions"
								item-text="value"
								item-value="id"
								label="Chức vụ"
								return-object
								single-line
								></v-select>
							</v-flex>
							<v-flex xs12>
								<v-select
								v-model="role_id"
								:items="roles"
								item-text="display_name"
								item-value="id"
								chips
								label="Vai trò"
								multiple
								return-object
								attach
								></v-select>
							</v-flex>
						</v-layout>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="warning" text @click="editDialog = false" class="btn-close">Close</v-btn>
					<v-btn color="primary" text class="btn-save" @click.prevent="editUserSubmitted()">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-layout>
</div>
</template>

<script>
	import {APP_URL} from 'src/routes/env.js'

	export default {
		data: () => ({
			date: null,
			menu: false,
			editDialog: false,
			departments: [],
			positions: [],
			roles: [],
			role_id: [],
			user_gender: '',
			type_job: [
			{
				id: 1, 
				value: 'Full-time'
			},
			{
				id: 0, 
				value: 'Part-time'
			}]
		}),
		watch: {
			menu (val) {
				val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
			}
		},
		props: ['editUser'],
		created: function () {
			this.listDepartments(),
			this.listPositions(),
			this.listRoles(),
			this.convertRoles(),
			this.convertGender()
		}, 
		methods: {
			convertGender () {
				this.user_gender = this.editUser.gender.toString()
			},
			convertRoles() {
				var user_role = this.editUser.roles
				var role_user_id = Object.keys(user_role).map(function(key) {
					return user_role[key].role_id;
				});
				this.role_id = role_user_id
			},
			save (date) {
				this.$refs.menu.save(date)
			},
			listDepartments: function () {
				const departments = []
				axios.get(''+APP_URL+'/departments',{
					headers:{
						'Accept':'application/json',
						'Authorization':'Bearer ' + JSON.parse(window.localStorage.getItem('authUser')).access_token,
						'cache-control':'no-cache'
					}
				})
				.then(response => {
					var result = Object.keys(response.data.data).map(function(key) {
						return response.data.data[key];
					});
					this.departments = result
				}).catch(error => {
					this.error = error
				});
			},
			listPositions: function () {
				const positions = []
				axios.get(''+APP_URL+'/positions',{
					headers:{
						'Accept':'application/json',
						'Authorization':'Bearer ' + JSON.parse(window.localStorage.getItem('authUser')).access_token,
						'cache-control':'no-cache'
					}
				})
				.then(response => {
					var result = Object.keys(response.data.data).map(function(key) {
						return response.data.data[key];
					});
					this.positions = result
				}).catch(error => {
					this.error = error
				});
			},
			listRoles: function () {
				const roles = []
				axios.get(''+APP_URL+'/roles',{
					headers:{
						'Accept':'application/json',
						'Authorization':'Bearer ' + JSON.parse(window.localStorage.getItem('authUser')).access_token,
						'cache-control':'no-cache'
					}
				})
				.then(response => {
					var result = Object.keys(response.data.data).map(function(key) {
						return response.data.data[key];
					});
					this.roles = result
				}).catch(error => {
					this.error = error
				});
			},
			editUserSubmitted: function () {
				var role_user_id = this.role_id
				$.each(role_user_id, function(i, item) {
					if ((typeof item) == 'object') {
						role_user_id.push(item.id)
						role_user_id.splice(i, 1) //xóa object khỏi mảng
					}
				})
				//kiểm tra nếu type_job là object thì gán user_type_job = id của type_job
				var user_type_job = this.editUser.type_job
				if ((typeof user_type_job) == 'object') {
					user_type_job = this.editUser.type_job.id
				}
				//kiểm tra nếu department_id là object thì gán user_department_id = id của department_id
				var user_department_id = this.editUser.department_id
				if ((typeof user_department_id) == 'object') {
					user_department_id = this.editUser.department_id.id
				}
				axios({
					method: 'put',
					url: ''+ APP_URL +'/user/'+ this.editUser.id,
					headers: {
						'Accept':'application/json',
						'Authorization':'Bearer ' + JSON.parse(window.localStorage.getItem('authUser')).access_token,
						'cache-control':'no-cache'
					},
					data: {
						email: this.editUser.email, 
						name: this.editUser.name,
						birthday: this.editUser.birthday,
						mobile: this.editUser.mobile,
						gender: parseInt(this.user_gender),
						type_job: user_type_job,
						address: this.editUser.address,
						roles: role_user_id,
						department_id: user_department_id,
						position_id: this.editUser.position_id
					}
				})
				.then(response => {
					toastr.success('Sửa thành công')
					this.$emit('keykeychanged')
					this.editDialog = false
				}).catch(error => {
					if (!error.response) {
						this.errorStatus = 'Error: Network Error';
					} else {
						this.editDialog = true
						if (typeof error.response.data.errors.message == 'string') {
							toastr.error(error.response.data.errors.message)
						} else {
							for(var k in error.response.data.errors.message) {
								toastr.error(error.response.data.errors.message[k]);
							}
						}
					}
				});
			}
		}
	}
</script>

<style type="text/css">
	.add-btn {
		background: rgba(71,201,229,0.9);
		background: linear-gradient(45deg,rgba(71,201,229,0.9) 0,rgba(102,252,233,0.9) 100%);
	}
	.btn-save {
		background-color: #f48f42!important;
	}
	.btn-close {
		background-color: #41e2f4!important;
	}
	.date-picker{
		background: rgba(71,201,229,0.9);
		background: linear-gradient(45deg,rgba(71,201,229,0.9) 0,rgba(102,252,233,0.9) 100%);
	}
	
</style>