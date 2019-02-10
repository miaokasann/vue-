<template>
  <div class="tmpl">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="(item,index) in newslist" :key="index">
        <router-link v-bind='{to:"/news/newsinfo/"+item.id}' @click=""></router-link>
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            {{item.title}}
            <p class='mui-ellipsis'>
              发布时间：{{item.add_time | fmtdate('LLL')}}
              <span>点击数：{{item.click}}</span>
            </p>
			    </div>
		    </a>
	    </li>
    </ul>
  </div>
</template>
<script>
export default {
  data(){
    return{
      newslist:[]
    }
  },
  created(){
    this.getnewslist();
  },
  methods:{
    getnewslist(){
      var url = 'http://localhost:8088/api/getnewslist';
      this.$http.get(url).then(res=>{
        this.newslist = res.body.message;
      },error=>{
        console.log('获取图文资讯失败');
      });
    }
  }
}
</script>
<style scoped>
  .mui-table-view .mui-media-object{
    max-width: 62px;
    height: 62px;
  }
  .mui-ellipsis{
    margin-top: 20px;
    color: #0094ff;
    font-size: 12px;
  }
  .mui-ellipsis > span{
    position: absolute; 
    right: 15px;
    top: 50px;
  }
</style>