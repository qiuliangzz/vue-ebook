// 图片懒加载
// vue文件中将需要懒加载的图片 :src="" 修改为 v-lazy=""

import Vue from 'vue'
import lazyload from 'vue-lazyload'

// 注册
Vue.use(lazyload, {
  error: require('../assets/images/loading.jpg'),
  loading: require('../assets/images/loading.jpg')
})
