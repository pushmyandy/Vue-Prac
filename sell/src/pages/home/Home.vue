<template>
  <div class="master">
    <home-header :seller="seller"></home-header>
    <div class="homeTab border-1px">
      <router-link to="/goods">
        <div>商品</div>
      </router-link>
      <router-link to="/ratings">
        <div>评价</div>
      </router-link>
      <router-link to="/seller">
        <div>商家</div>
      </router-link>
    </div>
    <div class="content">
      <router-view :seller="seller"></router-view>
    </div>
  </div>
</template>

<script>
import homeHeader from './components/homeHeader'
export default {
  name: 'Home',
  components: {
    homeHeader
  },
  data () {
    return {
      seller: {},
      ERR_OK: 0
    }
  },
  created () {
    this.$http.get('/api/seller').then((res) => {
      res = res.body
      if (res.errno === this.ERR_OK) {
        this.seller = res.data
      }
    })
  }
}
</script>

<style scoped lang='stylus'>
  @import "../../../src/assets/stylus/mixin.styl"
  .master
    width: 100%;
    height 100%
    .homeTab
      width 100%
      height 3.5rem
      border-1px(rgba(7,17,27,0.1))
      display flex
      flex-direction row
      a
        flex 1
        text-align center
        line-height 3.5rem
    .active
      color rgb(240,20,20)
    .content
      width 100%
      height 66%
      position relative
</style>
