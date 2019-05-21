import Vue from 'vue'
import Router from 'vue-router'

// 注册路由
Vue.use(Router)

// 实例化路由对象
export default new Router({
  // 定义路由规则
  routes: [
    {
      path: '/',
      redirect: '/store'
    },
    {
      path: '/store',
      name: 'store',
      component: () => import('./views/ebookstore/index.vue'),
      redirect: '/store/home',
      children: [
        {
          path: '/store/home',
          name: 'home',
          component: () => import('./views/ebookstore/StoreHome.vue')
        }
      ]
    },
    {
      path: '/ebook',
      name: 'ebook',
      component: () => import('./views/ebook/index.vue'),
      children: [
        // 动态路由，以:作为起点，后跟接收的参数名称
        {
          path: ':fileName',
          component: () => import('./components/ebook/EbookReader.vue')
        }
      ]
    }
  ]
})
