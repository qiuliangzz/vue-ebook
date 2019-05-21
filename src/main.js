import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/icon.css'
import i18n from './language'
import './mock'
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