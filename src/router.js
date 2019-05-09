import Vue from 'vue'
import Router from 'vue-router'
import Ebook from './views/ebook/index.vue'
import EbookReader from './components/ebook/EbookReader.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/ebook'
    },
    {
      path: '/ebook',
      name: 'ebook',
      component: Ebook,
      children: [
        // 动态路由，以:作为起点，后跟接收的参数名称
        {
          path: ':fileName',
          component: EbookReader
        }
      ]
    }
  ]
})
