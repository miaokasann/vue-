<template>
  <div class="tmpl">
    <div class="submittitle">
      提交评论
    </div>
      <div class="submitarea">
        <textarea class="textarea" placeholder="请输入评论内容"></textarea>
        <mt-button type="primary" size="large">发表</mt-button>
      </div>
    <div class="commenttitle">
      评论列表
    </div>
      <div class="commentlist">
        <!-- <div class="outwarp" v-for="item in comments" >
          <div class="content" v-text="item.content"></div>
          <div class="user" v-text="item.user_name"></div>
          <div class="time" v-text="item.add_time">{{item.add_time | fmtdate('YYYY-MM-DD HH:mm:ss')}}</div>
        </div> -->
        <div class="outwarp">
          <div class="content">这是一条评论</div>
          <div class="user">我是xx</div>
          <div class="time">2019-2-3 12:03:09</div>
        </div>
        <div class="outwarp">
          <div class="content">这是一条评论</div>
          <div class="user">我是xx</div>
          <div class="time">2019-2-3 12:03:09</div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comments:[] //用来存放当前数据的评论信息列表
    }
  },
  methods:{
    //1.提交评论
    postcomment(){

    },
    //2.获取评论
    getcomment(){
      
    }
  },
  props:['artid'] //用来接收当前评论数据的所属内容id
}
</script>
<style scoped>
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
  .commentlist{

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