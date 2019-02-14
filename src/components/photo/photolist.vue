<template>
  <div class="tmpl">
    <!-- 1.分类 -->
    <div class="cate">
      <ul>
        <li><a @click="getimglist(0)">全部</a></li>
        <li v-for="item in catelist"><a @click="getimglist(item.id)">{{item.title}}</a></li>
        
      </ul>
    </div>
    <!-- 2.图片列表 -->
    <div class="imglist">
      <ul>
        <li v-for="item in list">
          <img v-lazy="item.img_url">
          <p>
            <span class="title">{{item.title}}</span><br>
            {{item.zhaiyao}}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import common from '../../kits/common.js'

export default {
  data() {
    return{
      catelist:[], //存储分类数据
      list:[]
    }
  },
  created(){
    this.getcate();
    this.getimglist(0);
  },
  methods:{
    //1.获取图片数据
    getcate(){
      let url = 'http://localhost:8088/api/getimgcategory';
      this.$http.get(url).then(res=>{
        this.catelist = res.body.message;
      },error=>{

      });
    },
    //2。根据分类的id获取图片的数据
    getimglist(cateid){
      //console.log(cateid);
      this.list=';//这里有可能要先清空，否则有可能导致第一张图片不会被覆盖'

      let url = common.apihost+'/api/getimages/'+cateid;
      this.$http.get(url).then(res=>{
        //考虑到服务器提供的地址只是路径部分，所以要拼接上图片云服务器的前缀
        let imghost = common.imghost;//云服务器地址
        //接下来遍历res.body.message
        let tmplist = res.body.message;
        tmplist.forEach(item=>{
          item.img_url = imghost + item.img_url;
        })
        this.list = tmplist;
        console.log(tmplist);
      },error=>{

      });
    }
  }
}
</script>
<style scoped>
  /* 懒加载图片样式 start*/
  .imglist p{
    color: #000;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,0.4);
  }
  .imglist .title{
    font-weight: bold;

  }
  .imglist ul{
    padding: 0;
  }
  .imglist li{
    list-style: none;
    position: relative;
  }
  .imglist img{
    width: 100%;
    height: 300px;
  }

  image[lazy=loading] {
    width: 100%;
    height: 300px;
    margin: auto;
  }
   /* 懒加载图片样式 end*/

   /* 分类样式开始 */
  .cate{
    max-width: 400px;
    overflow-x: auto;
    overflow-y: hidden; 
  }
  .cate ul{
    padding-left: 10px;
    width: 10000px;
    margin: 0;
  }
  .cate li{
    list-style: none;
    display: inline-block;
    padding: 0 0 0 5px;
  }
  .cate li a{
    color:#0094ff;
    font-size: 14px;
  }
  /* 分类样式结束 */
</style>