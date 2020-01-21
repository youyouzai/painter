import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import router from './router'
import store from './store'
import service from './utils/request'

import './modules/paint/startup.js'

Vue.use(ElementUI, {
  size: 'small'
})

Vue.http = Vue.prototype.$http = service
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
