<template>
  <div class="tmpl">
    <div class="row" v-for="(item,index) in shopcarlist" :key="item.index">
      <div class="left">
        <mt-switch class="switch" v-model="values[index]"></mt-switch>
      </div>
      <div class="center">
        <img width="75" height="75" :src="item.thumb_path" alt="">
      </div>
      <div class="right">
        <h4>{{item.title}}</h4>
        <span>￥{{item.sell_price}}</span>
        <subnumber :initcount="item.count" :goodsid="item.id" class="subnumber" v-on:count="getcount"></subnumber>
        <a @click="del(item.id)" >删除</a>
      </div>
    </div>

    <!-- 总计 -->
    <div class="total">
      <div class="left">
        <h5>商品总计：（不含运费）</h5>
        <span>购买商品{{selectedcount}}件，总计价格{{setment}}元</span>
      </div>
      <div class="right">
        <mt-button class="jiesuan" type="danger" size="normal">去结算</mt-button>
      </div>
    </div>
    {{values}}
  </div>
</template>
<script>
import subnumber from '../subcomp/subnumber.vue'
import { getItem,setItem,subStrictItem,removeItem } from '../../kits/localStorageHelper.js'
import common from '../../kits/common.js'

export default {
  data() {
    return {
      selectedcount:0,
      values:[],//用来存储每条数据的switch值
      shopcarlist:[],//用来存储购物车商品
    }
  },
  computed:{
    //统计总价格
    setment(){
      //1.统计当前选择的个数
      let trueArr = this.values.filter(v=>v==true);
      this.selectedcount = trueArr.length;

      //统计被选择的商品的总价
      return this.getTotalAmount();
    }
  },
  components:{
    subnumber
  },
  created(){
    this.initPageData();
  },
  methods:{
    getcount(resObj){
      //1.判断resobj中的type类型
      if(resObj.type == 'add'){
        //增加商品数量
        this.add(resObj);
        //2.更新掉shopcarlist中当前商品所对应的数量
        this.updateshopcarlist(1,resObj.goodsid);
      }
      else if(resObj.type == 'substrict'){
        //减少商品数量
        subStrictItem(resObj.goodsid);
        //2.更新掉shopcarlist中当前商品所对应的数量
        this.updateshopcarlist(-1,resObj.goodsid);
      }

    },
    add(resObj){
      setItem({goodsid:resObj.goodsid,count:1});
    },
    updateshopcarlist(count,goodsid){
      for(var i = 0;i<this.shopcarlist.length;i++){
        if(this.shopcarlist[i].id == goodsid){
          this.shopcarlist[i].count = this.shopcarlist[i].count + count;
        }
      }
    },
    //根据商品id获取数据
    initPageData(){
      //1.从localStorage中获取所有商品的id
      //arr的数据格式：[{goodsid:1,count:1},{},{}]
      let arr = getItem();
      // let tmpArr = [];//存储商品id
      // let counts = [];//负责存储商品ID对应的数量
      let goodsObj = {};//对象的键名作为商品的id，键值是商品的数量
      arr.forEach(item=>{
        if(goodsObj[item.goodsid]){
          //存在，则将count追加上去
          let tmpcount = goodsObj[item.goodsid];
          tmpcount += item.count;
          goodsObj[item.goodsid] = tmpcount;
        }
        else{
          //不存在，直接设置count上去
          goodsObj[item.goodsid] = item.count;
        }
      });
      //将goodsObj中的属性名称拿出来
      let idarr = [];
      for(let goodsidvalue in goodsObj){
        idarr.push(goodsidvalue);
      }
      let ids = idarr.join(',');//商品id获取到了

      //2.请求api获取数据
      let url = common.apihost+'/api/goods/getshopcarlist/'+ids;
      this.$http.get(url).then(res=>{
        res.body.message.forEach(item=>{
          item.thumb_path = common.imghost+item.thumb_path;
          item.count = goodsObj[item.id];
          //初始化values数组，值全部设置为false
          this.values.push(false);
        });
        this.shopcarlist = res.body.message;
        
      });
    },
    //统计选择商品的总价
    getTotalAmount(){
      let totalAmount = 0;
      this.values.forEach((item,index)=>{
        if(item == true){
          let goodsinfo = this.shopcarlist[index];//获得到当前选择的商品
          //开始计算商品总价
          let amount = goodsinfo.count * goodsinfo.sell_price;
          totalAmount += amount;
        }
      });
      return totalAmount;
    },
    del(goodsid){
      //1.现在shopcarlist中删除商品
      let index = this.shopcarlist.findIndex(c=>c.id==goodsid);
      if(index >= 0){
        this.shopcarlist.splice(index,1);
      }
      //2.从localstroage中删除
      removeItem(goodsid);
    }
  }
}
</script>
<style scoped>
  /* 总计样式⬇ */
  .total{
    padding:10px;
    background-color: rgba(1,1,1,0.1);
    margin-top: 10px;
    height: 80px;
  }
  .total h5{
    color: #000;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .total .left{
    width: 70%;
    float: left;
  }
  .total .right{
    width: 30%;
    float: right;
  }
  .jiesuan{
    margin-top: 10px;
  }

  /* 商品列表样式⬇ */
  .row{
    display:flex;
    border-bottom: 1px solid rgba(1,1,1,0.3);
    margin-top: 5px;
    padding: 5px;
  }
  .row .left{
    flex:0 0 30px;
  }
  .row .center{
    flex:0 0 100px;
  }
  .row .center img{
    margin-left: 10px;
  }
  .row .right{
    flex:1;
  }
  .switch{
    margin-top: 20px;
  }
  .row .right h4{
    color: #0094ff;
    padding: 5px 0;
  }
  .row .right .subnumber{
    display: inline;
    margin: 0 10px;
  }
  .row .right span{
    color: red;
    font-size: 16px;
  }

</style>
