<template>
  <div class="subtmpl">
    <div class="left" @click="substrict()">-</div>
    <div class="middle">{{resObj.count}}</div>
    <div class="right" @click="add()">+</div>
  </div>
</template>
<style scoped>
  .subtmpl div{
    display: inline-block;
    padding: 5px;
    border: 1px solid rgba(92,92,92,0.3);
  }
  .subtmpl .left,.subtmpl .right,.subtmpl .middle{
    width: 30px;
    height: 25px;
    line-height: 15px;
    text-align: center;
  }
  .middle{
    width: 50px;
  }
</style>
<script>
const ADD = 'add';
const SUBSTRICT = 'substrict';
export default {
  data() {
    return {
      resObj:{type:ADD,goodsid:0,count:0}
    }
  },
  props:['initcount','goodsid'],//购物车中选择的商品的数量，goodsid购物车中选择商品的id
  created(){
    this.resObj.count = this.initcount>1?this.initcount:1;
    this.resObj.goodsid = this.goodsid>0?this.goodsid:0;
  },
  methods:{
    add(){
      this.resObj.count++;
      this.resObj.type = ADD;
      this.noticecount();
    },
    substrict(){
      if(this.resObj.count <= 1){
        this.resObj.count = 1;
        return;
      }
      this.resObj.count--;
      this.resObj.type = SUBSTRICT;
      this.noticecount();
    },
    //将最新的对象传给父组件，对象中包括（加减的类型，商品的id和数量）
    noticecount(){
      let key = 'count';
      this.$emit(key,this.resObj);
    }
  }
}
</script>