<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="this.$route.meta.showFooter===true"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
import {mapActions} from 'vuex'
export default {
  name: 'App',
  components: {
    FooterGuide
  },
  mounted() {
    this.receive_address()
    this.getUserInfo()
  },
  methods: {
    ...mapActions(['receive_address','getUserInfo'])
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}
</style>
