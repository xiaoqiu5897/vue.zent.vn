import DashboardLayout from './layout/DashboardLayout.vue'
import NotFound from './pages/NotFoundPage.vue'

import MasterLogin from './components/MasterLogin.vue'
import Dashboard from './components/Dashboard.vue'
import Overview from './pages/Overview.vue'
import UserProfile from './pages/UserProfile.vue'
import TableList from './pages/TableList.vue'
import Typography from './pages/Typography.vue'
import Icons from './pages/Icons.vue'
import Maps from './pages/Maps.vue'
import Notifications from './pages/Notifications.vue'
import Upgrade from './pages/Upgrade.vue'
import MasterRole from './components/Roles/MasterRole.vue'
import Permission from './components/Roles/Permission.vue'

export const routes = [
{ 
	path: '/login',
	name: 'login',
	component: MasterLogin,
	meta: {
		checkLogin: true
	}
},
{ 
	path: '/dashboard',
	name: 'dashboard',
	component: Dashboard,
	meta: {
		auth: true
	}
},
{
	path: '/admin',
	component: DashboardLayout,
	meta: {
		auth: true
	},
	children: [
	{
		path: 'overview',
		name: 'Overview',
		component: Overview,
		meta: {
			auth: true
		},
	},
	{
		path: 'user',
		name: 'User',
		component: TableList,
		meta: {
			auth: true
		}
	},
	{
		path: 'table-list',
		name: 'Table List',
		component: TableList,
		meta: {
			auth: true
		}
	},
	{
		path: 'role',
		name: 'role',
		component: MasterRole,
		meta: {
			auth: true
		}
	},
	{
		path: 'permission',
		name: 'permission',
		component: Permission,
		meta: {
			auth: true
		}
	},
	{
		path: 'icons',
		name: 'Icons',
		component: Icons,
		meta: {
			auth: true
		}
	},
	{
		path: 'maps',
		name: 'Maps',
		component: Maps
	},
	{
		path: 'notifications',
		name: 'Notifications',
		component: Notifications
	},
	{
		path: 'upgrade',
		name: 'Upgrade to PRO',
		component: Upgrade
	}
	]
},
{ path: '*', component: NotFound }
]

