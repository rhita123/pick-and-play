// src/main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

// 🔥 Configurer Axios
axios.defaults.baseURL = 'http://localhost:5050/api'

// 🔥 Ajouter axios globalement
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')