<template>
  <div class="tmpl">
    <!-- 1.0把mui中的图文表格迁移过来后加以改成自己的需求 -->
    <ul class="mui-table-view mui-grid-view">
      <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="item in goodslist" :key="item.index">
          <router-link v-bind="{to:'/goods/goodsinfo/'+item.id}">
            <img class="mui-media-object" :src="item.img_url">
          </router-link>
          <div class="desc">
            <router-link to="/goods/goodsinfo">
              <h5>{{item.title}}</h5>
            </router-link>
            <div class="box">
              <h6>
                <p><span>¥{{item.market_price}}</span><s>¥{{item.sell_price}}</s></p>
              </h6>
              <div class="sell">
                <div class="topsell">热卖中</div>
                <div class="count">剩余{{item.stock_quantity}}件</div>
              </div>
            </div>
          </div>
      </li>
    </ul>
  </div>
</template>
<script>
import common from '../../kits/common.js'

export default {
  data() {
    return {
      goodslist:[],
      pageIndex:1
    }
  },
  created(){
    this.getgoodslist(this.pageIndex);
  },
  methods:{
    getgoodslist(pageIndex){
      let url = common.apihost + '/api/getgoods?pageindex='+pageIndex;
      this.$http.get(url).then(
        res=>{
          this.goodslist = res.body.message;
        },error=>{}
      );
    }
  }
}
</script>
<style scoped>
  .desc h5{
    color: #000;
    text-align: left;
    font-family: '微软雅黑';
  }
  .desc .box{
    background-color: rgba(92,92,92,0.1);
    padding: 5px;
    height: 60px;
  }
  .desc .box h6{
    text-align: left;
  }
  .desc .box h6 span{
    color: red;
    font-size: 16px;
    margin-right: 15px;
  }
  .sell{
    margin-top: 15px;
    font-size: 12px;
  }
  .sell .topsell{
    float: left;
    width: 40%;
    text-align: left;
    color: rgba(92,92,92,0.8);
  }
  .sell .count{
    float: right;
    width: 55%;
    text-align: right;
    color: rgba(92,92,92,0.8);
  }
  .mui-table-view.mui-grid-view .mui-table-view-cell{
    padding: 5px;
  }
  .mui-grid-view li{
    border: 0.5px solid rgba(92,92,92,0.4);
    margin: 4px 5px 4px 4px;
    height: 300px;
  }
  .mui-table-view-cell>a:not(.mui-btn){
    padding: 0px;
  }
  .mui-grid-view li img{
    position: relative;
    left: 14px;
    top: 10px;
  }
</style>