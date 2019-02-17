<template>
  <div class="tmpl">
    <h3>{{infodata.title}}</h3>
    <div style="white-space:pre-wrap" class="content" v-html="infodata.content"></div>
  </div>
</template>
<script>
import common from '../../kits/common.js'

export default {
  data() {
    return {
      infodata:{}
    }
  },
  created(){
    this.getinfo();
  },
  methods:{
    getinfo(){
      let id = this.$route.params.id;
      let url = common.apihost + '/api/goods/getdesc/'+id;
      this.$http.get(url).then(
        res=>{
          this.infodata = res.body.message[0];
        }
      );
    }
  }
}
</script>
<style>
  .tmpl h3{
    color: #0094ff;
    padding:10px;
    border-bottom: 1px solid rgba(92,92,92,0.3)
  }
  .tmpl .content{
    width: 320px;
  }
</style>