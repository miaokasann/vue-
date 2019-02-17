<template>
  <div class="tmpl">
    <!-- 1.实现轮播图 -->
    <subimgsilder class="subimgslider" :imglist="imglist"></subimgsilder>
    <!-- 2.实现商品的购买区域 -->
    <div class="sell">
      <h4>{{messagedata.title}}</h4>
      <div class="sellprice">
        市场价: <s>¥{{messagedata.market_price}}</s>
        销售价: <span>¥{{messagedata.sell_price}}</span>
      </div>
      <div class="count">
        购买数量:
        <!-- 放数量的组件 -->
        <subnumber class="subnumber" v-on:count="getcount"></subnumber>
      </div>
      <mt-button type="primary" size="small">立即购买</mt-button>
      <mt-button @click="toshopdata" type="danger" size="small">加入购物车</mt-button>
    </div>
    <!-- 3.商品参数区域 -->
    <div class="params">
      <h6>商品参数</h6>
      <ul>
        <li>商品货号:{{messagedata.goods_no}}</li>
        <li>库存情况:{{messagedata.stock_quantity}}件</li>
        <li>上架时间:{{messagedata.add_time | fmtdate('YYYY-MM-DD')}}</li>
      </ul>
    </div>
    <!-- 4.商品的图文信息描述goodsdesc.vue -->
    <!-- 5.商品的评论 -->
    <div class="footer">
      <mt-button @click="desc" plain type="primary" size="large">图文介绍</mt-button>
      <mt-button @click="comment" class="mt1" plain type="danger" size="large">商品评论</mt-button>
    </div>
  </div>
</template>
<script>
import common from '../../kits/common.js'
import subimgsilder from '../subcomp/subimgsilder.vue'
import subnumber from '../subcomp/subnumber.vue'
//注册commonvue.js
import { vueobj } from '../../kits/commonvue.js'

export default {
  data() {
    return {
      imglist:[],//用来存放轮播图数据
      messagedata:{},//用来存放商品详情信息
      goodscount:1//存放购买数量值
    }
  },
  created(){
    this.getimglist();
    this.getmessage();
    this.toshopdata();
  },
  components:{
    subimgsilder,
    subnumber
  },
  methods:{
    getimglist(){
      let id = this.$route.params.id;
      let url = common.apihost + '/api/getthumimages/'+id;
      this.$http.get(url).then(
        res=>{
          res.body.message.forEach(item=>{
            item.img = common.imghost + item.src;

            this.imglist = res.body.message;
          });
        }
      );
    },
    getcount(count){
      //console.log('count='+count);
      this.goodscount = count;
    },
    getmessage(){
      let id = this.$route.params.id;
      let url = common.apihost + '/api/goods/getinfo/'+id;
      this.$http.get(url).then(
        res=>{
          this.messagedata = res.body.message[0];
        }
      );
    },

    // 获取商品评论
    comment(){
      // 1.获取到商品ID
      let id = this.$route.params.id;
      // 2.跳转到商品评论组件comment.vue
      this.$router.push({name:'goodscomment',params:{id:id}});
    },

    //定义商品图文显示方法
    desc(){
      // 1.获取到商品ID
      let id = this.$route.params.id;
      // 2.跳转到商品评论组件.vue
      this.$router.push({name:'goodsdesc',params:{id:id}});
    },
    // 实现购物数据的通知
    toshopdata(){
      // 6.1获取到购买数量
      vueobj.$emit('shopdata',this.goodscount);
    }
  }
}
</script>
<style scoped>
  .subnumber{
    display: inline-block;
    margin-bottom: 10px;
  }
  .sell{
    padding-bottom: 20px;
  }
  .sell .sellprice{
    padding: 10px 0;
    color: rgba(92,92,92,0.8);
  }
  .sell .sellprice span{
    color: red;
    font-size: 18px;
  }
  .sell .sellprice s{
    margin-right: 10px;
  }
  .sell h4{
    color: #0094ff;
    border-bottom: 1px solid rgba(92,92,92,0.3);
    padding: 10px 0;
  }
  .subimgslider,.sell,.params{
    border: 1px solid rgba(92,92,92,0.3);
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
  }
  .subimgslider,.sell{
    padding: 10px;
  }
  .sell .count{
    padding: 15px 0 15px 0;
    color: rgba(92,92,92,0.8);
  }
  /* 商品参数样式begin */
  .params h6{
    padding: 5px;
    border-bottom: 1px solid rgba(92,92,92,0.8);
  }
  .params li{
    list-style: none;
    color: rgba(92,92,92,0.8);
  }
  /* 商品参数样式end */

  /* 底部样式begin */
  .mt1{
    margin-top: 20px;
  }
  /* 底部样式end */
</style>
