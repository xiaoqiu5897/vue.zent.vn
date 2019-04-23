import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'

// router setup
import { routes } from './route'
import './registerServiceWorker'
import VueParticles from 'vue-particles'
import VueAxios from 'vue-axios'
import axios from 'axios'
import { VueTable } from '@enso-ui/tables/bulma';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

// plugin setup
Vue.use(Vuetify)
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(LightBootstrap)
Vue.use(VueParticles)

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active',
  scrollBehavior: (to) => {
  	if (to.hash) {
  		return {selector: to.hash}
  	} else {
  		return { x: 0, y: 0 }
  	}
  }
})

router.beforeEach((to, from, next) => {
	const authUser = JSON.parse(window.localStorage.getItem('authUser'))
	console.log(to)
	console.log(from)
	if (to.meta.auth) {
		if (authUser == null) {
			router.go(-1);
		}
		if (authUser != null && authUser.access_token != null) {
			next()
		}
	}
	if (to.meta.checkLogin) {
		if (authUser != null && authUser.access_token != null) {
			if (to.name == 'login' && from.name != null) {
				router.push({ path: from.name })
				router.go(-1)
			}
			if (to.name == 'login' && from.name == null) {
				router.push({ name: 'Overview'})
			}
		}
	}
	next()
})

export const bus = new Vue()

new Vue({
	el: '#app',
	render: h => h(App),
	router
})
