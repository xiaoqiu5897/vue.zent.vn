<template>
	<v-layout row justify-center >
		<v-dialog v-model="addDialog" max-width="600px">
			<template v-slot:activator="{ on }">
				<v-btn color="primary" dark v-on="on" class="add-btn">Thêm mới</v-btn>
			</template>
			<v-card>
				<v-card-title>
					<span class="headline">Thêm mới nhân viên </span>
				</v-card-title>
				<v-card-text>
					<v-container grid-list-md>
						<v-layout wrap>
							<v-flex xs12>
								<v-text-field label="Tên *" v-model="addUser.name" required></v-text-field>
							</v-flex>
							<v-flex xs12>
								<v-text-field label="Email *" v-model="addUser.email" required></v-text-field>
							</v-flex>
							<v-flex xs12>
								<v-text-field label="Số điện thoại *" v-model="addUser.mobile" required></v-text-field>
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
									v-model="addUser.birthday"
									prepend-icon="event"
									readonly
									v-on="on"
									></v-text-field>
								</template>
								<v-date-picker
								ref="picker"
								v-model="addUser.birthday"
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
									<v-radio-group v-model="addUser.gender" column style="padding-left: 30px;">
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
									v-model="addUser.type_job"
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
							v-model="addUser.address"
							></v-text-field>
						</v-flex>
						<v-flex xs12 sm6>
							<v-select
							v-model="addUser.department"
							:items="departments"
							item-text="value"
							item-value="id"
							label="Phòng ban "
							return-object
							single-line
							></v-select>
						</v-flex>
						<v-flex xs12 sm6>
							<v-select
							v-model="addUser.position"
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
							v-model="addUser.roles"
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
				<v-btn color="warning" text @click="addDialog = false" class="btn-close">Close</v-btn>
				<v-btn color="primary" text class="btn-save" @click.prevent="addUserSubmitted()">Save</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</v-layout>
</template>

<script>
	import {APP_URL} from 'src/routes/env.js'

	export default {
		data: () => ({
			addDialog: false,
			date: null,
			menu: false,
			departments: [],
			positions: [],
			roles: [],
			type_job: [{id: 1 , value: 'Full-time'},{id: 0, value: 'Part-time'}],
			addUser: {
				email: '',
				name: '',
				birthday: '',
				mobile: '',
				gender: '',
				type_job: {id:'',value:''},
				address: '',
				roles: [{id:'',display_name:''}],
				department: {id:'',value:''},
				position: {id:'',value:''}
			},
		}),
		watch: {
			menu (val) {
				val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
			}
		},
		created: function () {
			this.listDepartments(),
			this.listPositions(),
			this.listRoles()
		}, 
		methods: {
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
			addUserSubmitted: function () {
				//Convert object Roles thành array
				var array = $.map(this.addUser.roles, function(value, index) {
					return [value.id];
				});
				console.log(array)
				axios({
					method: 'post',
					url: ''+APP_URL+'/user',
					headers: {
						'Accept':'application/json',
						'Authorization':'Bearer ' + JSON.parse(window.localStorage.getItem('authUser')).access_token,
						'cache-control':'no-cache'
					},
					data: {
						email: this.addUser.email, 
						name: this.addUser.name,
						birthday: this.addUser.birthday,
						mobile: this.addUser.mobile,
						gender: this.addUser.gender,
						typejob: this.addUser.type_job.id,
						address: this.addUser.address,
						roles: array,
						departmentid: this.addUser.department.id,
						positionid: this.addUser.position.id
					}
				})
				.then(response => {
					toastr.success('Thêm mới thành công')
					//gọi đến hàm keykeychanged ở component cha UserTable
					this.$emit('keykeychanged')
					this.addDialog = false
				}).catch(error => {
					if (!error.response) {
						this.errorStatus = 'Error: Network Error';
					} else {
						this.addDialog = true
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
		background: rgba(71,201,229,0.9)!important;
		background: linear-gradient(45deg,rgba(71,201,229,0.9) 0,rgba(102,252,233,0.9) 100%)!important;
	}
	
</style>