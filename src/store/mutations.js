import Vue from 'vue'

export default {
    RECEIVE_ADDRESS(state,{address}){
        state.address=address
    },
    RECEIVE_CATEGORYS(state, {categorys}) {
        state.category = categorys
    },
    RECEIVE_SHOPS(state, { shops }) {
        state.shops = shops
    },
    SAVE_USER(state,{userInfo}){
        state.userInfo=userInfo
    },
    CLEAR_USER(state){
        state.userInfo={}
    },
  SEARCHITEMS(state, { searchShops }){
        state.searchShops = searchShops
    },
    RECEIVE_INFO(state, { info }) {
      state.info = info
    },
    RECEIVE_RATINGS(state, { ratings }) {
      state.ratings = ratings
    },
    RECEIVE_GOODS(state, { goods }) {
      state.goods = goods
    },

    //更改food中count数量
    INCREACE_FOOD_COUNT(state,food){
      if(!food.count){
        Vue.set(food,'count',1)
        state.cartFoods.push(food)
      }else{
        food.count++;
      }
    },
    DECREACE_FOOD_COUNT(state, food) {
      if(food.count>0){
        food.count--
        if(food.count===0){
          state.cartFoods.splice(state.cartFoods.indexOf(food),1)
        }
      }
    },
    //清空购物车
    CLEARCART(state){
      state.cartFoods.forEach(element => {
        element.count=0
      });
      state.cartFoods=[]
    }
}
