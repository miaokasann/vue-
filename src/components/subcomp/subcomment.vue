<template>
  <div class="tmpl">
    <div class="submittitle">
      提交评论
    </div>
      <div class="submitarea">
        <textarea ref="postcontent" class="textarea" placeholder="请输入评论内容"></textarea>
        <mt-button type="primary" size="large" @click="postcomment()">发表</mt-button>
      </div>
    <div class="commenttitle">
      评论列表
    </div>
      <div class="commentlist">
        <div class="outwarp" v-for="item in comments" :key="item.index">
          <div class="content" v-text="item.content"></div>
          <div class="user" v-text="item.user_name"></div>
          <div class="time" v-text="item.add_time">{{item.add_time | fmtdate('YYYY-MM-DD HH:mm:ss')}}</div>
        </div>
      </div>

      <!-- 加载更多按钮 -->
      <mt-button class="more" type="danger" size="large" plain @click="getmore()">加载更多</mt-button>
  </div>
</template>
<script>
import common from '../../kits/common.js'
import { Toast } from 'mint-ui' //导入mint-ui中的提示组件

export default {
  data() {
    return {
      comments:[], //用来存放当前数据的评论信息列表
      pageindex:1 //获取评论的页码，默认为第一页
    }
  },
  created(){
    this.getcomment(this.pageindex);
  },
  methods:{
    //1.提交评论
    postcomment(){
      let url = common.apihost+'/api/postcomment/'+this.artid;
      //console.log(this.$refs.postcontent);//拿到文本的数据
      //1.通过vue来获取textarea的值
      let contentText = this.$refs.postcontent.value;
      if(!contentText || contentText.trim().length <=0){
        Toast('评论内容不能为空');
        return;
      }
      //2.将评论数据提交到服务器
      this.$http.post(url,{content:contentText},{emulateJSON:true}).then(res=>{
        Toast('评论提交成功！');

        //重新加载评论
        this.getcomment(this.pageindex,true);

        //清空文本框
        this.$refs.postcontent.value = '';
      },error=>{
        console.log('评论提交失败');
      });
    },
    //2.获取评论
    getcomment(pageindex,isreload){
      let url = common.apihost +'/api/getcomments/'+this.artid+'?pageindex='+pageindex;
      console.log(url);
      this.$http.get(url).then(res=>{
        //因为要实现加载更多的功能，所以不可以让最新的数据覆盖之前的数组，而是将数据追加到之前的数据后面
        //this.comments = res.body.message;
        if(isreload){
          this.comments = res.body.message;
        }
        else{
          this.comments = this.comments.concat(res.body.message);
        }
      },error=>{
        console.log('获取评论数据失败');
      });
    },
    getmore(){
      //1.将pageindex加一
      this.pageindex++;
      //2.将自增后的index数据传入getcomment方法，获取数据
      this.getcomment(this.pageindex);
    }
  },
  props:['artid'] //用来接收当前评论数据的所属内容id
}
</script>
<style scoped>
  .more{
    margin-top: 10px;
  }
  .tmpl{
    padding: 5px;
  }
  .submittitle,.commenttitle{
    font-weight: 700;
    font-size: 21px;
    border-bottom: 1px solid rgba(92,92,92,0.4);
    padding-bottom: 15px;
  }
  .submitarea{
    margin-top: 5px;
  }
  .commenttitle{
    margin-top: 10px;
    border-top: 1px solid rgba(92,92,92,0.4);
    padding: 10px 0 10px 0;
  }
  .outwarp{
    border-bottom: 1px solid rgba(92,92,92,0.4);
    clear: both;
    max-height: 100px;
    overflow-y: auto;
    padding: 5px;
  }
  .user{
    width: 50%;
    float: left;
    color: #0094ff;
  }
  .time{
    width: 50%;
    float: right;
    color: #0094ff;
  }
</style>