// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import vueResource from 'vue-resource'
Vue.use(vueResource)

import VuePreview from 'vue-preview'
Vue.use(VuePreview)


import '../static/mui/dist/css/mui.min.css'
import '../static/mui/examples/hello-mui/css/icons-extra.css'
import mintUI from 'mint-ui'
Vue.use(mintUI)
import 'mint-ui/lib/style.css'

//导入我自己定义好的全局样式，可以用来覆盖mint-ui和mui的样式、
import '../static/css/site.css'

//做一个时间格式过滤器
import moment from 'moment'
Vue.filter('fmtdate',function(input,datefmtstring){
  return moment(input).format(datefmtstring);

})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
