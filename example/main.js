import Vue from 'vue'
import router from './router'
import App from './App.vue'
import fastclick from 'fastclick'

/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole' // develop console

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
