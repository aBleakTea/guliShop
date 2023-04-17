import {
  getAddress, getCategotyList, getShops, reqUserInfo, reqLogout,
  reqShopGoods, reqShopRating, reqShopInfo,getSearchShops
} from '../api'

export default {
  async receive_address({ commit, state }) {
    const geohash = state.latitude + ',' + state.longtitude
    const res = await getAddress(geohash)
    commit('RECEIVE_ADDRESS', { address: res.data })
  },

  async receive_category({ commit },cb) {
    const res = await getCategotyList()
    commit('RECEIVE_CATEGORYS', { categorys: res.data })
    cb&cb()
  },

  async receive_shops({ commit, state }) {
    const res = await getShops(state.latitude, state.longtitude)
    commit('RECEIVE_SHOPS', { shops: res.data })
  },

  //获取一次性验证码
  // async get_checkCode({commit}){
  //    const code=await getCheckCode()
  //    commit('',{checkCode:code.})
  // }

  //保持用户数据
  save_user({ commit }, userInfo) {
    commit('SAVE_USER', { userInfo: userInfo })
  },

  //异步获取用户信息
  async getUserInfo({ commit }) {
    const res = await reqUserInfo()
    if (res.code === 0) {
      commit('SAVE_USER', { userInfo: res.data })
    }
  },

  //退出登录
  async logout({ commit }) {
    const res = await reqLogout()
    if (res.code === 0) {
      commit('CLEAR_USER')
    }
  },

  //获取商户商品信息
  async receive_shopgoods({ commit },callback) {
    const res = await reqShopGoods()
    if (res.code === 0) {
      commit('RECEIVE_GOODS', { goods: res.data })
      callback && callback()
    }
  },
  //获取商户信息
  async receive_shopinfo({ commit }) {
    const res = await reqShopInfo()
    if (res.code === 0) {
      commit('RECEIVE_INFO', { info: res.data })
    }
  },
  //获取商户商品评价
  async receive_shoprating({ commit },cb) {
    const res = await reqShopRating()
    if (res.code === 0) {
      commit('RECEIVE_RATINGS', { ratings: res.data })
      cb&&cb()
    }
  },
  //更行food中的count值
  async updateFoodCount({commit},{isAdd,food}){
    if(isAdd){
      commit('INCREACE_FOOD_COUNT',food)
    }else{
      commit('DECREACE_FOOD_COUNT', food)
    }
  },
  //清空购物车
  clearCart({commit}){
    commit('CLEARCART')
  },
  //根据关键字查找相关信息
  async searchItem({ commit,state}, { searchText }){
    const { latitude,longtitude}=state
    const res = await getSearchShops(searchText, latitude + ',' + longtitude)
    if(res.data!=null){
      commit('SEARCHITEMS', { searchShops:res.data})
    }
  }
}
