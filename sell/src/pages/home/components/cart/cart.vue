<template>
    <div class="cart">
      <div class="content">
        <div class="contentLeft">
          <div class="logoWrapper">
            <div class="logoIcon" :class="{'highlight': totalCount>0}">
              <span class="icon-shopping_cart"
                    :class="{'highlight': totalCount>0}"
              ></span>
            </div>
            <div class="number" v-show="totalCount">
              {{totalCount}}
            </div>
          </div>
          <div class="price" :class="{'highlight': totalCount>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费{{deliveryPrice}}元</div>
        </div>
        <div class="contentRight" :class=" totalPrice>=minPrice ? 'enough' : 'notEnough' ">
          <span>{{payDesc}}</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'cart',
  props: {
    deliveryPrice: Number,
    minPrice: Number,
    selectFoods: Array // 数组default是个函数
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}起送`
      } else if (this.totalPrice >= this.minPrice) {
        return '去结算'
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .cart
    position fixed
    bottom 0
    left 0
    width 100%
    height 4rem
    z-index 50
    .content
      display flex
      height 100%
      background #141d27
      .contentLeft
        flex 1
        height 100%
        .logoWrapper
          display inline-block
          position relative
          top -1rem
          margin 0 0 0 1rem
          padding 0.5rem
          width 4.5rem
          height 4.5rem
          box-sizing border-box
          vertical-align middle
          border-radius 50%
          background #141d27
          .logoIcon
            width 100%
            height 100%
            border-radius 50%
            background #2b343c
            color rgba(255,255,255,0.4)
            font-size 2rem
            text-align center
            line-height 49px //可以换算成rem
            &.highlight
              background rgb(0, 160, 220)
            .icon-shopping_cart
              &.highlight
                color #fff
          .number
            position absolute
            top 0
            right 0
            width 1.5rem
            height 1rem
            line-height 1rem
            text-align center
            border-radius 1rem
            font-size 0.5rem
            font-weight 700
            color #fff
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 1rem
          color rgba(255,255,255,0.4)
          font-size 2rem
          padding-right 1rem
          line-height 2rem
          box-sizing border-box
          border-right 1px solid rgb(255,255,255,0.1)
          &.highlight
            color #fff
        .desc
          display inline-block
          box-sizing border-box
          padding-left 0.5rem
          font-size 0.5rem
          line-height 0.5rem
          color rgba(255,255,255,0.4)
          font-weight 700
      .contentRight
        flex 0 0 8rem
        width 8rem
        height 100%
        font-size 1.2rem
        line-height 4rem
        color rgba(255,255,255,0.4)
        text-align center
        &.notEnough
          background #2b343c
        &.enough
          color white
          background rgb(0, 160, 220)
</style>
