<template>
  <section class="order">
    <HeaderTop title="订单列表">
      <router-link to='/search' class="header_search" slot="search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link :to="userInfo._id?'/userInfo':'/login'" class="header_login" slot="login">
        <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
        <span class="header_login_text" v-else><i class="iconfont icon-gerenzhongxin"></i></span>
      </router-link>
    </HeaderTop>
    <section class="order_no_login">
      <img src="./images/order/person.png" />
      <h3>登录后查看外卖订单</h3>
      <button>立即登陆</button>
    </section>
  </section>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import {mapState} from 'vuex'
export default {
  name: "Order",
  components:{
    HeaderTop
  },
  computed:{
    ...mapState(['userInfo'])
  }
};
</script>

<style lang="stylus">
&.order { // 订单
  width: 100%;
  .order_no_login {
    padding-top: 140px;
    width: 60%;
    margin: 0 auto;
    text-align: center;

    >img {
      display: block;
      width: 100%;
      height: 30%;
    }

    >h3 {
      padding: 10px 0;
      font-size: 17px;
      color: #6a6a6a;
    }

    >button {
      display: inline-block;
      background: #02a774;
      font-size: 14px;
      color: #fff;
      border: 0;
      outline: none;
      border-radius: 5px;
      padding: 10px 20px;
    }
  }
}
</style>
