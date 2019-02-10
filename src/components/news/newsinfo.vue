<template>
  <div class="tmpl">
    <div class="title">
      <p class="ptitle" v-text="article.title"></p>
      <p class="otitle">
        {{article.add_time | fmtdate('LLL') }}
        {{article.click}}次浏览
      </p>
    </div>
    <div class="content" v-html="article.content"></div>

    <!-- 评论组件的使用 -->
    <div>
      <subcomment :artid="artid"></subcomment>  
    </div>
  </div>
</template>
<script>
//1.导入评论组件
import subcomment from '../subcomp/subcomment.vue'

export default {
  data() {
    return {
      article:{},
      artid:0 //3.接收评论组件要接收的id值
    }
  },
  components:{
    subcomment //2.注册私有组件
  },
  created(){
    this.getdata();
    //4.获取到url传入过来的值
    this.artid = this.$route.params.id;

  },
  methods:{
    getdata(){
      let id = this.$route.params.id;
      let url = 'http://localhost:8088/api/getnew/'+ id;
      this.$http.get(url).then(res=>{
        this.article = res.body.message[0];
      },error=>{
        console.log('获取资讯内容失败');
      });
    }
  }
}
</script>
<style lang="">
  .title{
    height: 100%;
    border-bottom: 2px solid rgba(92,92,92,0.3);
    padding: 5px;
  }
  .title .ptitle{
    font-size: 16px;
    font-weight: bold;
    color: #0094ff;
  }
  .title .otitle{
    font-size: 12px;
    color: rgba(92,92,92,0.6);
  }
  .content{
    padding: 5px;
  }
</style>