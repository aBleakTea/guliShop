<script>
import Vue from "vue";
import VueRouter from "vue-router";

//路由懒加载
const Msite=() => import("../pages/Miste/Msite.vue")
const Order=()=>import("../pages/Order/Order.vue")
const Profile=()=>import("../pages/Profile/Profile.vue")
const Search=()=>import("../pages/Search/Search")
const Login=()=>import("../pages/Login/Login")
const Shop=()=>import("../pages/Shop/Shop")
const ShopInfo=()=>import("../pages/Shop/ShopInfo/ShopInfo")
const ShopGoods=()=>import("../pages/Shop/ShopGoods/ShopGoods")
const ShopRating=()=>import("../pages/Shop/ShopRating/ShopRating")

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: "/", redirect: "/msite", meta: { showFooter: true } },
    { path: "/msite", component: Msite, meta: { showFooter: true } },
    { path: "/search", component: Search, meta: { showFooter: true } },
    { path: "/order", component: Order, meta: { showFooter: true } },
    { path: "/profile", component: Profile, meta: { showFooter: true } },
    { path: "/login", component: Login, meta: { showFooter: false } },
    {
      path: "/shop",
      component: Shop,
      meta: { showFooter: false },
      children: [
        {
          path: "/goods",
          component: ShopGoods,
        },
        {
          path: "/rating",
          component: ShopRating,
        },
        {
          path: "/info",
          component: ShopInfo,
        },
        {
          path: "/",
          redirect: "/goods"
        }
      ],
    },
  ],
});
</script>
