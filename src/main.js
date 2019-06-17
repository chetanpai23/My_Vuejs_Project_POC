import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'

//Import Bootstrap Css files
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Layout from 'bootstrap-vue/es/components/layout'

Vue.use(Layout)
Vue.use(axios)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  render: h => h(App),
}).$mount('#app')
