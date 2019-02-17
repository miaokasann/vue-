<template>
  <div class="tmpl">
    <!-- 使用subimgsilder.vue -->
    <subimgsilder :imglist="list"></subimgsilder>
    <!-- mint-ui的swipe组件实现轮播图
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in list" :key="index">
        <img class="img" :src="item.img" alt="轮播图">
      </mt-swipe-item>
    </mt-swipe> -->

    <!-- mui的九宫格实现系统的导航按钮 -->
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/news/newslist">
            <span class="mui-icon mui-icon-eye"></span>
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
            <router-link to="/photo/photolist">
              <span class="mui-icon mui-icon-phone"><span class="mui-badge mui-badge-red">5</span></span>
              <div class="mui-media-body">图片分享</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
            <router-link to="/goods/goodslist">
              <span class="mui-icon mui-icon-person"></span>
              <div class="mui-media-body">商品购买</div>
            </router-link>  
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
            <a href="#">
                <span class="mui-icon mui-icon-location"></span>
                <div class="mui-media-body">留言反馈</div>
            </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
            <a href="#">
                <span class="mui-icon mui-icon-search"></span>
                <div class="mui-media-body">视频专区</div>
            </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
            <a href="#">
                <span class="mui-icon mui-icon-email"></span>
                <div class="mui-media-body">联系我们</div>
            </a>
        </li>
      </ul>
    </div>
          

  </div>
</template>
<script>
import subimgsilder from '../subcomp/subimgsilder.vue'

export default {
  data() {
    return {
      list:[]
    }
  },
  created() {
    this.getlunbo();
  },
  methods: {
    getlunbo(){
      var url = 'http://localhost:8088/api/getlunbo';
      this.$http.get(url).then(res=>{
        this.list = res.body.message;
      },error=>{
        console.log('轮播图获取失败');
      });

    }
  },
  components:{
    subimgsilder
  }
}
</script>
<style scoped>
  .mui-content{
    background-color: #fff;
  }
  .mui-grid-view.mui-grid-9{
    background-color: #fff;
    border-top: none;
    border-left: none;
  }
  .mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border-right: none;
    border-bottom: none;
  }
  .mui-icon-eye {
    background-image: url(../../../static/img/menu10.png);
    background-repeat: round;
  }
  .mui-icon-phone {
    background-image: url(../../../static/img/menu9.png);
    background-repeat: round;
  }
  .mui-icon-person {
    background-image: url(../../../static/img/menu5.png);
    background-repeat: round;
  }
  .mui-icon-location {
    background-image: url(../../../static/img/menu4.png);
    background-repeat: round;
  }
  .mui-icon-search {
    background-image: url(../../../static/img/menu3.png);
    background-repeat: round;
  }
  .mui-icon-email {
    background-image: url(../../../static/img/menu6.png);
    background-repeat: round;
  }
  .mui-icon {
    width: 50px;
    height: 50px;
  }
  .mui-icon-eye:before,
  .mui-icon-phone:before,
  .mui-icon-person:before,
  .mui-icon-location:before,
  .mui-icon-search:before,
  .mui-icon-email:before{
    content:''
  }
  .img{
    width: 100%;
    height: 100%;
  }
  .mint-swipe {
    overflow: hidden;
    position: relative;
    height: 250px;
  }
  .mint-swipe-items-wrap {
    position: relative;
    overflow: hidden;
    height: 100%;
    -webkit-transform: translateZ(0);
    transform: translateZ(0)
  }
  .mint-swipe-items-wrap > div {
    position: absolute;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    width: 100%;
    height: 100%;
    display: none;
  }
  .mint-swipe-items-wrap > div.is-active {
    display: block;
    -webkit-transform: none;
    transform: none;
  }
  .mint-swipe-indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  .mint-swipe-indicator {
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 100%;
    background: #000;
    opacity: 0.2;
    margin: 0 3px;
  }
  .mint-swipe-indicator.is-active {
    background: #fff;
  }
</style>
