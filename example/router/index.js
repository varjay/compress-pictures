import Vue from 'vue'
import Router from 'vue-router'
import Features from 'example/pages/features'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Features
    }
  ]
})
