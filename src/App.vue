<template>
  <div class="app">
    <!-- 整个系统的头部 -->
    <mt-header fixed title="vue内容管理系统"></mt-header>

    <div class="back" v-if="isShow">
      <a @click="goback">返回</a>
    </div>
  <!-- 路由占位，将来所有的组件都是替换这个位置来实现路由页面的跳转 -->
  <router-view></router-view>
    <!-- 整个系统的底部 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" to="/Home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/Member">
        <span class="mui-icon mui-icon-person"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item" to="/buycar">
        <span class="mui-icon mui-icon-gear">
          <span id="badge" class="mui-badge">5</span>
        </span>
        <span class="mui-tab-label">购物</span>
      </router-link>
      <router-link class="mui-tab-item" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
//6.2注册commonvue.js用来接收goodsinfo.vue中通过vueobj.$emit()发送过来的数据
import { vueobj } from './kits/commonvue.js'
//6.3注册接收事件
vueobj.$on('shopdata',function(data){
  //console.log(data);
  //因为vuepbj和export default是不同的vue对象,所以此处必须通过操纵DOM来实现购物车数量的增加
  let badge = document.getElementById('badge');
  let count = badge.innerText - 0;//获取原始值
  count+=data;//在原始值上加上新数据

  //将新数据同步到DOM中
  badge.innerText = count;
});
export default {
  data() {
    return{
      isShow:true //控制返回按钮显示还是隐藏
    }
  },
  created(){
    this.isShow = false;
  },
  watch:{
    //监控当前路由对象$route,如果url的路由规则发生改变，就会出发这个方法
    '$route':function(newval,oldval){
      //console.log(newval);
      if(newval.path.toLowerCase() == '/home') {
        this.isShow = false;
      }
      else{
        this.isShow = true;
      }
    }
  },
  methods:{
    goback(){
      this.$router.go(-1);//返回上一个页面
    }
  }
}
</script>

<style scoped>
  .back{
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 999;
  }
  .back a{
    font-size: 16px;
    color: #fff;
    font-weight: bold;
  }
</style>
