// 一个能够让 Vue 组件通过 API 方式调用的插件
// 用法：https://php.ctolib.com/article/wiki/96982
// 应用场景：弹窗可使用
// 应用条件：全局的DOM，在view以外
// 使用的弹窗组件要加name属性

import Vue from 'vue'
import CreateAPI from 'vue-create-api'
import Toast from '../components/common/Toast'
import Popup from '../components/common/Popup'

Vue.use(CreateAPI)
Vue.createAPI(Toast, true)
Vue.createAPI(Popup, true)
Vue.mixin({
  methods: {
    toast(settings) {
      return this.$createToast({
        $props: settings
      })
    },
    popup(settings) {
      return this.$createPopup({
        $props: settings
      })
    }
  }
})
