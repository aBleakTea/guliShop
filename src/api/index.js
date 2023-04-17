import ajax from "./ajax";
import qs from 'querystring'

/*** 获取地址信息(根据经纬度串) */
export const getAddress=geo=>ajax(`/api/position/${geo}`)

//获取食品分类列表
export const getCategotyList = () => ajax('/api/index_category')

//根据经纬度获取商铺列表
export const getShops = (latitude, longtitude) => ajax(`/api/shops`,{latitude,longtitude})

//根据经纬度和关键字搜索商铺列表
export const getSearchShops = (keyword, geohash) => ajax(`/api/search_shops`,{keyword,geohash})

//获取一次性验证码
export const getCheckCode = () => ajax(`/api/captcha`)

//用户名登录
export const loginPwd = ({ name, pwd, captcha }) => ajax(`/api/login_pwd`, { name, pwd, captcha },'POST')

//发送短信验证码
export const sendCode = (phone) => ajax(`/api/sendcode`,{phone})

//手机号验证码登录
export const smsLogin = (phone, code) => ajax(`/api/login_sms`,{phone,code},'POST')

//获取用户信息
export const reqUserInfo=()=>ajax('/api/userInfo')

export const reqLogout = () => ajax('/api/logout')

//获取商户商品信息
export const reqShopGoods=()=>ajax('/goods')

//获取商户商品信息
export const reqShopRating = () => ajax('/ratings')

//获取商户商品信息
export const reqShopInfo = () => ajax('/info')
