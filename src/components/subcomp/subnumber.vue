<template>
  <div class="subtmpl">
    <div class="left" @click="substrict()">-</div>
    <div class="middle">{{count}}</div>
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
export default {
  data() {
    return {
      count:1
    }
  },
  methods:{
    add(){
      this.count++;
      this.noticecount();
    },
    substrict(){
      if(this.count <= 1){
        this.count = 1;
        return;
      }
      this.count--;
      this.noticecount();
    },
    //将最新的count传给父组件
    noticecount(){
      let key = 'count';
      this.$emit(key,this.count);
    }

  }
}
</script>