import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/icon.css'
import i18n from './language';
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n, // 挂载插件
  render: h => h(App)
}).$mount('#app')
