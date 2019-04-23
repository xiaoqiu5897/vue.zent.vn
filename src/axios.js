import axios from 'axios'

const API_URL = process.env.API_URL || 'http://vue.zent.project:8888/api'

// export default axios.create({
// 	baseURL: API_URL,
// 	headers: {
// 		'Content-Type': 'application/json',
// 		'Authorization': 'Bearer ' + JSON.parse(window.localStorage.getItem('authUser')).access_token
// 	}
// })