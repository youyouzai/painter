
import Vue from 'vue'
import Node from './components/node.vue'
import './assets/index.less'
import Echarts from 'echarts'

Vue.prototype.$echarts = Echarts
Vue.prototype.$EventBus = new Vue()
Vue.use(Node)
Vue.component('node', Node)
