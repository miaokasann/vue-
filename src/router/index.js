import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '../components/Home/Home.vue'
import member from '../components/member/member.vue'
import buycar from '../components/buycar/buycar.vue'
import search from '../components/search/search.vue'
import newslist from '../components/news/newslist.vue'
import newsinfo from '../components/news/newsinfo.vue'
import photolist from '../components/photo/photolist.vue'

export default new Router({
  linkActiveClass:'mui-active',
  routes: [
    {name: 'root', path: '/', redirect: '/Home'},
    {name: 'home', path: '/Home', component: Home},
    {name: 'member', path: '/member', component: member},
    {name: 'buycar', path: '/buycar', component: buycar},
    {name: 'search', path: '/search', component: search},
    {name: 'newslist',path: '/news/newslist',component: newslist},//图文资讯列表组件
    {name: 'newsinfo',path: '/news/newsinfo/:id',component: newsinfo},
    {name: 'photolist',path: '/photo/photolist',component: photolist} //图片分享列表组件
  ]
})
