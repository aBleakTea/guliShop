<template>
  <footer class="footer_guide">
    <a href="javascript:;" class="guide_item"
    :class="{on_light:'/msite'===$route.path}"
    @click="goto('/msite')">
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </a>
    <a href="javascript:;" class="guide_item"
    :class="{on_light:'/search'===$route.path}"
    @click="goto('/search')">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>搜索</span>
    </a>
    <a href="javascript:;" class="guide_item"
    :class="{on_light:'/order'===$route.path}" @click="goto('/order')">
      <span class="item_icon">
        <i class="iconfont icon-wode"></i>
      </span>
      <span>订单</span>
    </a>
    <a href="javascript:;" class="guide_item"
    :class="{on_light:'/profile'===$route.path}" @click="goto('/profile')">
      <span class="item_icon">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span>我的</span>
    </a>
  </footer>
</template>

<script>
export default {
  name:'FooterGuide',
  methods:{
    goto(path){
      this.$router.push({path:path},
      ()=>{},
      ()=>{})
    }
  }
};
</script>

<style lang="less">
.footer_guide{
  position: fixed;
  z-index: 100;
  border-top: 1px grey solid;
  width:100%;
  height: 50px;
  bottom: 0;
  background-color: #fff;
  display: flex;
  justify-content: space-around;


  .guide_item{
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    margin: 5px;
    color: #999999;

    span{
      margin:2px auto;
      font-size: 12px;

      .iconfont{
        font-size: 22px;
      }
    }
  }

  .on_light{
    color: #02a774;
  }
}
</style>
