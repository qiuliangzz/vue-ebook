// vue-create-api 一个能够让 Vue 组件通过 API 方式调用的插件
// 弹窗可使用，因为这是在view以外，全局的DOM
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
