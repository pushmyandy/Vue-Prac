<template>
    <div class="cart">
      <div class="content">
        <div class="contentLeft">
          <div class="logoWrapper">
            <div class="logoIcon">
              <span class="icon-shopping_cart"></span>
            </div>
          </div>
          <div class="price">12</div>
          <div class="desc">配送费100</div>
        </div>
        <div class="contentRight"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'cart'
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
          margin 0 1rem
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
        .desc
          display inline-block
          box-sizing border-box
          padding-left 1rem
          font-size 1rem
          line-height 1rem
          color rgba(255,255,255,0.4)
          font-weight 700
      .contentRight
        flex 0 0 10rem
        width 10rem
        height 100%
</style>
