<template>
      <div class="cartcontrol">
        <transition name="move">
          <div class="icon-remove_circle_outline" v-show="food.count" @click="addFood(false)">
            <i class="iconfont icon-icon_remove-circle-outline"></i>
          </div>
      </transition>
      <div class="cart-count" v-show="food.count">{{food.count}}</div>
      <div class="icon-add_circle" @click.stop="addFood(true)"><i class="iconfont icon-icon-add-circle"></i></div>

  </div>
</template>

<script>
export default {
  name:'CartControl',
  props:{
    food:Object
  },
  methods: {
    addFood(isAdd){
      this.$store.dispatch('updateFoodCount',{isAdd,food:this.food})
    }
  },
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixins.styl"
.cartcontrol
  font-size: 0

  .cart-decrease
    display: inline-block
    padding: 6px
    line-height: 24px
    font-size: 24px
    color: rgb(0, 160, 220)

  .icon-remove_circle_outline
    display: inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color $green

    &.move-enter-active,&.move-leave-active{
      transition all .3s
    }

    &.move-enter,&.move-leave-to{
      opacity 0
      transform translateX(15px) rotate(180deg)
    }

  .cart-count
    display: inline-block
    vertical-align: top
    width: 12px
    padding-top: 8px
    line-height: 24px
    text-align: center
    font-size: 10px
    color: rgb(147, 153, 159)

  .icon-add_circle
    display: inline-block
    padding: 6px
    line-height: 24px
    font-size: 24px
    color $green
</style>
