import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入全局样式表
import "./assets/css/global.css"

// 全局引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {Message} from "element-ui"
Vue.use(ElementUI)
Vue.prototype.$message = Message



// 导入字体图表
import "./assets/fonts/iconfont.css"

// 全局引入axios
import axios from "axios"
// 配置请求的根路径
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios




Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
