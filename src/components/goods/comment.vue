<template>
  <div class="tmpl">
    <subcomment :artid="goodsid"></subcomment>
  </div>
</template>
<script>
import subcomment from '../subcomp/subcomment.vue'

export default {
  data() {
    return {
      goodsid:0//商品id
    }
  },
  created(){
    this.goodsid = this.$route.params.id;
  },
  components:{
    subcomment
  },
  methods:{

  }
}
</script>