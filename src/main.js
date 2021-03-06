import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import './assets/css/global.css'
import { Notify } from 'vant'
import { Button } from 'vant'


 Vue.prototype.$http = axios;

new Vue({
    router,
    store,
    Notify,
    Button,
    render: h => h(App)
}).$mount('#app')