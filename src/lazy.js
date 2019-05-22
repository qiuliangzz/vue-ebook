// 图片懒加载
import Vue from 'vue'
import lazyload from 'vue-lazyload'

Vue.use(lazyload, {
  error: require('./assets/images/loading.jpg'),
  loading: require('./assets/images/loading.jpg')
})
