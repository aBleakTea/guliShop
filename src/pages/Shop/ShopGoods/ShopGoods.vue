<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for="(good,index) in goods" :key="index"
            :class="{current:currentIndex===index}"
            @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
              <img v-show="good.icon"  class="icon" :src="good.icon"/>
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodUI">
          <li class="food-list food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index">
                <div class="icon" @click="showFood(food)">
                  <img
                    width="57"
                    height="57"
                    :src="food.image"
                  />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span>
                  </div>
                  <div class="price"><span class="now">￥{{food.price}}</span></div>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  <div class="cartcontrol-wrapper"><cart-control :food="food"/></div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shop-cart />
    </div>
    <food :food="food" ref="food"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
import CartControl from '../../../components/CartControl/CartControl.vue';
import Food from '../../../components/Food/Food.vue';
import ShopCart from '../../../components/ShopCart/ShopCart.vue';
export default {
  components: { CartControl, Food, ShopCart },
  name: "ShopGoods",
  data() {
    return {
      scrollY:0,
      tops:[],
      food:{}
    }
  },
  computed: {
    ...mapState(["goods"]),
    currentIndex(){
      const {scrollY,tops}=this
      const index=tops.findIndex((top,index)=>{
        return scrollY>=top && scrollY<tops[index+1]
      })
      return index

    }
  },
  mounted() {
    this.$store.dispatch('receive_shopgoods',()=>{
      this.$nextTick(()=>{
        this._init_scroll()
        this._init_top()
      })
    })
  },
  methods: {
    _init_scroll(){
      this.foodsWrapper = new BScroll('.foods-wrapper',{
        probeType:2,
        click:true
      })
      new BScroll('.menu-wrapper', {
        click:true
      })
      //开始滚动监听
      this.foodsWrapper.on('scroll',(position)=>{
        this.scrollY=Math.abs(position.y)
      })
      this.foodsWrapper.on('scrollEnd',(position)=>{
        this.scrollY=Math.abs(position.y)
      })
    },

    _init_top(){
      const tops=[-10]
      let top=0
      const lis=this.$refs.foodUI.children
      Array.from(lis).forEach((li,index)=>{
        top+=li.clientHeight
        tops.push(top)
      })
      this.tops=tops
    },
    //点击侧栏，右侧滑动到相应位置
    clickMenuItem(index){
      const top=this.tops[index]
      // this.scrollY=top
      this.foodsWrapper.scrollTo(0,-top,300)
    },
    //点击显示的food
    showFood(food){
      this.food=food
      this.$refs.food.toggleShow()
    }
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" sc>
@import '../../../common/stylus/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 10px 18px;

      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));
      align-items:center;

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        // flex: 0 0 57px;
        margin-right: 10px;
        display:block;
      }

      .content {
        // flex: 1;
        padding-left :10px
        text-align :left

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position absolute;
          right: 0;
          bottom 8px
        }
      }
    }
  }
}
</style>
