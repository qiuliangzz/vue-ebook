import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/icon.css'
import i18n from './language'
// mock.js 下载问题，只能使用文本不能使用block对象，使用其他方法使用mock，如vue.config.js文件中进行接口模拟
// import './mock'
// 图片懒加载
import './utils/lazy'
import './utils/create-api'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n, // 挂载插件
  render: h => h(App)
}).$mount('#app')

// .env.development
// VUE_APP_RES_URL=http://127.0.0.1:8081
// VUE_APP_BASE_URL=http://127.0.0.1:8080