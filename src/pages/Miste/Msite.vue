<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <router-link to="/search" class="header_search" slot="search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link :to="userInfo._id?'/userInfo':'/login'" class="header_login" slot="login">
        <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
        <span class="header_login_text" v-else><i class="iconfont icon-gerenzhongxin"></i></span>
      </router-link>
    </HeaderTop>

    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="category.length">
        <div class="swiper-wrapper" v-if="categorysArr!=0">
          <div class="swiper-slide" v-for="(cRow,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="c in cRow" :key="c.id">
              <div class="food_container">
                <img :src="imageBaseUrl+c.image_url"/>
              </div>
              <span>{{c.title}}</span>
            </a>

          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" v-else/>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <shop-list/>
    </div>
  </section>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import ShopList from '../../components/ShopList/ShopList.vue';
import {mapState} from 'vuex'

import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'

export default {
  name: "Miste",
  data() {
    return {
      imageBaseUrl:'https://fuss10.elemecdn.com'
    }
  },
  components: {
    HeaderTop,
    ShopList
  },
  computed:{
    ...mapState(['address','category','userInfo']),

    categorysArr(){
      const {category}=this
      let smallArr=[]
      const arr=[]
      category.forEach(element => {
        smallArr.push(element)
        if(smallArr.length===8){
          arr.push(smallArr)
          smallArr=[]
        }
      });
      return arr
    }
  },
  mounted() {
    this.$store.dispatch('receive_category',()=>{
      this.$nextTick(()=>{
        //创建swiper对象
        new Swiper('.swiper-container',{
          direction:'vertical',
          loop:true,

          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
        })
      })
    })


  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';
.msite_shop_list {
  top-border-1px(#e4e4e4);
  margin-top: 10px;
  background: #fff;

  .shop_header {
    padding: 10px 10px 0;

    .shop_icon {
      margin-left: 5px;
      color: #999;
    }

    .shop_header_title {
      color: #999;
      font-size: 14px;
      line-height: 20px;
    }
  }
}
.msite { // 首页
  width: 100%;

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }
}
</style>
