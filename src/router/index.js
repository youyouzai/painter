import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/index.vue'
import Project from '@/modules/paint/views/project/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/project',
      name: 'home',
      component: Home,
      children: [{
        path: '/project',
        name: 'project',
        component: Project
      }]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
