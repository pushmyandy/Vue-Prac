<template>
  <div class="goods">
    <div class="leftMenu">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="leftItem">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon"
                  :class="classMap[item.type]"
            ></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="rightMenu">
      <ul>
        <li v-for="(item, index) in goods" :key="index">
          <h1 class="goodsTitle">{{item.name}}</h1>
          <ul>
            <li v-for="(food, index) in item.foods" :key="index">
              <div class="foodIcon"><img :src="food.icon"></div>
              <div class="foodContent">
                <h2 class="foodName">{{food.name}}</h2>
                <p class="foodDesc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div>
                  <span>￥{{food.price}}</span>
                  <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeGoods',
  props: {
    seller: Object
  },
  data () {
    return {
      ERR_OK: 0,
      goods: []
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'invoice', 'guarantee', 'special']
    this.$http.get('/api/goods').then((res) => {
      res = res.body
      if (res.errno === this.ERR_OK) {
        this.goods = res.data
      }
    })
  }
}
</script>

<style scoped lang="stylus">
  @import "../../../assets/stylus/mixin.styl"
  .goods
    display flex
    overflow hidden
    position absolute
    top 0
    left 0
    right 0
    bottom 3rem
    .leftMenu
      flex 0 0 6rem
      width 6rem
      background #f3f5f7
      .leftItem
        text-align center
        display table
        width 100%
        line-height 1.2rem
        font-size 1.2rem
        height 4rem
        .text
          font-size 1rem
          display table-cell
          width 100%
          vertical-align middle
          border-1px(lightgray)
        .icon
          display inline-block
          width 1rem
          height 1rem
          background-size 1rem 1rem
          background-repeat no-repeat
          vertical-align top
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.invoice
            bg-image('invoice_3')
          &.guarantee
            bg-image('guarantee_3')
          &.special
            bg-image('special_3')
    .rightMenu
      
</style>
