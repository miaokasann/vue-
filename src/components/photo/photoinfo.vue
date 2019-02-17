<template>
  <div class="tmpl">
    <!-- 标题 -->
    <div class="title">
      <h2>{{imgdata.title}}</h2>
      <p class="otitle">
        {{imgdata.add_time | fmtdate('LLL') }}
        {{imgdata.click}}次浏览
      </p>
    </div>

    <!-- 九宫格实现图片缩略图展示 -->
    <!-- <ul class="mui-table-view mui-grid-view mui-grid-9"> -->
        <!-- <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"> -->
            <vue-preview :slides="imglist" @close="handleClose"></vue-preview>
        <!-- </li> -->
    <!-- </ul> -->
    
    <div class="content" v-html="imgdata.content">
    </div>

    <!-- 评论组件的复用 -->
    <subcomment :artid="artid"></subcomment>
  </div>


</template>
<script>
import common from '../../kits/common.js'
import subcomment from '../subcomp/subcomment.vue'

export default {
  data() {
    return {
      imgdata:{}, //代表这张图片的详细描述信息
      imglist:[], //9宫格图片存储数组
      artid:0,
    }
  },
  created(){
    this.getimgdata();//根据图片id获取到图片的详细数据对象
    this.getthumbimgs(); //获取九宫格图片
    this.artid = this.$route.params.id;
  },
  components:{
    subcomment//将评论组件注册
  },
  methods:{
    handleClose () {
      console.log('close event')
    },
    getimgdata(){
      //1.0获取到图片的id
      let id = this.$route.params.id;
      let url = common.apihost+'/api/getimageInfo/'+id;
      this.$http.get(url).then(res=>{
        this.imgdata = res.body.message[0];
      });
    },
    getthumbimgs(){
      let id = this.$route.params.id;
      let url = common.apihost+'/api/getthumimages/'+id;
      let imghost = common.imghost; //图片云服务器域名
      this.$http.get(url).then(res=>{
        res.body.message.forEach(item=>{
          item.src = imghost + item.src;
          item.w = 600;
          item.h = 400;
        });
        //3.结果赋值给imglist
        this.imglist = res.body.message;
        console.log(this.imglist);
      });
    }
  }
}
</script>
<style scoped>

    /* 九宫格样式重写 */
  .mui-grid-view.mui-grid-9{
    background-color: #fff;
    
  }
  .mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border-right: none;
    border-bottom: none;
  }
  /* .mui-grid-view.mui-grid-9 .mui-table-view-cell{
    padding: 5px 5px;
  } */
  .title{
    padding: 10px;
    border-bottom: 2px solid rgba(92,92,92,0.2);
  }
  .title h2{
    color: #0094ff;
    font-size: 16px;
  }
  .title .otitle{
    font-size: 12px;
    color: rgba(92,92,92,0.6);
  }
  .content{
    padding: 10px;
    color:#5c5c5c;
  }



</style>
