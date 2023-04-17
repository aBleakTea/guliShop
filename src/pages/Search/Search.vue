<template>
  <section class="search">
    <HeaderTop title="搜索">
      <router-link to="/search" class="header_search" slot="search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link
        :to="userInfo._id ? '/userInfo' : '/login'"
        class="header_login"
        slot="login">
        <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
        <span class="header_login_text" v-else
          ><i class="iconfont icon-gerenzhongxin"></i
        ></span>
      </router-link>
    </HeaderTop>

    <form class="search_form" @submit.prevent="search">
      <input
        type="search"
        v-model.trim="searchText"
        placeholder="请输入商家或美食名称"
        class="search_input"
      />
      <input type="submit" name="submit" class="search_submit" />
    </form>

    <section class="list" v-if="searchShops.length">
      <ul class="list_container">
        <li class="list_li" v-for="(item,index) in searchShops" :key="index">
          <section class="item_left">
            <img src="../Miste/images/shop/4.jpg" class="restaurant_img"/>
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>aaa</span>
              </p>
              <p>月售 671 单</p>
              <p>20 元起送 / 距离 1058.2 公里</p>
            </div>
          </section>
        </li>
        <li class="list_li">
          <section class="item_left">
            <img
              src="http://cangdu.org:8001/img/16265a70fe27854.jpg"
              class="restaurant_img"
            />
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>aaa</span>
              </p>
              <p>月售 671 单</p>
              <p>20 元起送 / 距离 1058.2 公里</p>
            </div>
          </section>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import { mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      searchText:''
    }
  },
  components: {
    HeaderTop,
  },
  computed: {
    ...mapState(["userInfo",'searchShops']),
  },
  methods: {
    search(){
      const {searchText}=this
      if(searchText!=null){
        this.$store.dispatch('searchItem',{searchText:searchText})
      }
    }
  },
};
</script>

<style lang="stylus">
&.search { // 搜索
  width: 100%;

  .header {
    background-color: #02a774;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 45px;

    .header_search {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      width: 10%;
      height: 50%;

      .icon-sousuo {
        font-size: 25px;
        color: #fff;
      }
    }

    .header_title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50%;
      color: #fff;
      text-align: center;

      .header_title_text {
        font-size: 20px;
        color: #fff;
        display: block;
      }
    }

    .header_login {
      font-size: 14px;
      color: #fff;
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);

      .header_login_text {
        color: #fff;
      }
    }
  }

  .search_form {
    clearFix();
    margin-top: 45px;
    background-color: #fff;
    padding: 12px 8px;

    input {
      height: 35px;
      padding: 0 4px;
      border-radius: 2px;
      font-weight: bold;
      outline: none;

      &.search_input {
        float: left;
        width: 79%;
        border: 4px solid #f2f2f2;
        font-size: 14px;
        color: #333;
        background-color: #f2f2f2;
      }

      &.search_submit {
        float: right;
        width: 18%;
        border: 4px solid #02a774;
        font-size: 16px;
        color: #fff;
        background-color: #02a774;
      }
    }
  }
  .list{
    .list_container{
      background-color: #fff
        .list_li{
          display: flex;
          justify-content: center;
          padding: 10px
          border-bottom: 1px solid $bc;
          .item_left{
            margin-right: 10px
            .restaurant_img{
              width 50px
              height 50px
              display block
            }
          }
          .item_right{
            font-size 12px
            flex 1
            .item_right_text{
              p{
                line-height 12px
                margin-bottom 6px
                &:last-child{
                  margin-bottom 0
                }

                }
              }
          }
        }
    }
    .search_none{
      margin: 0 auto
      color: #333
      background-color: #fff
      text-align: center
      margin-top: 0.125rem
    }
  }

}
</style>
