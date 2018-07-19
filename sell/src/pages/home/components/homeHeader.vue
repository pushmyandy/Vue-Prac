
<template>
  <div>
      <div class="header">
        <div class="content">
          <div class="headerIcon">
            <img :src="seller.avatar">
          </div>
          <div class="headerDesc">
            <div class="title">
              <span class="brand"></span>
              <span class="name">{{seller.name}}</span>
            </div>
            <div class="description">{{seller.description}}/{{seller.deliveryTime}}</div>
            <div v-if="seller.supports" class="supports">
              <span class="spot" :class="this.classMap[seller.supports[0].type]"></span>
              <span class="sellerDescription">{{seller.supports[0].description}}</span>
            </div>
          </div>
        </div>
        <div @click="showDetail" class="number" v-if="seller.supports">
          <span class="count">{{seller.supports.length}}个</span>
          <span class="icon-keyboard_arrow_right"></span>
        </div>
        <div class="broadcast">
          <span class="broadcastTitle"></span>
          <span class="broadcastText" @click="showDetail">{{seller.bulletin}}</span>
          <span class="icon-keyboard_arrow_right"></span>
        </div>
        <div class="backImg">
          <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <transition name="fade">
          <div class="blurImg" v-show="detailShow"> <!--sticky footer 布局-->
            <div class="detailWrapper clearfix">
              <div class="detailMain">
                <h1 class="title">{{seller.name}}</h1>
                <div class="stars">
                  <star :size="48" :score="seller.score"></star>
                </div>
                <div class="divideLine">
                  <divide>
                    <div class="lineText">优惠信息</div>
                  </divide>
                </div>
                <ul v-if="seller.supports" class="iconSupports">
                  <li class="supportItem" v-for="(item, index) in seller.supports" :key="index">
                    <span class="supportIcons" :class="classMap[seller.supports[index].type]"></span>
                    <span class="supportTexts">{{seller.supports[index].description}}</span>
                  </li>
                </ul>
                <div class="divideLine">
                  <divide>
                    <div class="lineText">商家公告</div>
                  </divide>
                </div>
                <div class="bulletin">
                  <p class="content">{{seller.bulletin}}</p>
                </div>
              </div>
            </div>
            <div class="detailClose">
              <i class="icon-close" @click="closeDetail"></i>
            </div>
            <!--<div class="blurbg"></div>-->
          </div>
        </transition>
      </div>
  </div>
</template>

<script>
import star from './star/star'
import divide from './divide/divide'
export default {
  name: 'homeHeader',
  data () {
    return {
      detailShow: false
    }
  },
  props: {
    seller: Object
  },
  components: {
    star,
    divide
  },
  methods: {
    showDetail () {
      this.detailShow = true
    },
    closeDetail () {
      this.detailShow = false
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'invoice', 'guarantee', 'special']
  }
}
</script>

<style scoped lang="stylus">
  @import "../../../assets/stylus/mixin.styl"
  .header
    color white
    box-sizing border-box
    width 100%
    height 12rem
    background rgba(7,17,27,0.5)
    display flex
    flex-direction row
    overflow hidden
    position relative
    padding 2rem 1rem 1rem 2rem
    .content
      display flex
      flex-direction row
      .headerIcon
        width 5rem
        height 5rem
        img
          display block
          width 100%
          height 100%
      .headerDesc
        margin-left 1rem
        .title
          box-sizing border-box
          padding 0.25rem 0
          .name
            font-size 1.5rem
            display inline-block
            vertical-align top
          .brand
            display inline-block
            vertical-align top
            bg-image('brand')
            width 1.8rem
            height 1.3rem
            background-size 1.8rem 1.3rem
            background-repeat no-repeat
        .description
          box-sizing border-box
          padding 0.25rem 0
          font-size 1.1rem
        .supports
          box-sizing border-box
          padding 0.25rem 0
          font-size 1.1rem
          .spot
            display inline-block
            width 1rem
            height 1rem
            margin-right 0.3rem
            background-size 1rem 1rem
            background-repeat no-repeat
            vertical-align top
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.invoice
              bg-image('invoice_1')
            &.guarantee
              bg-image('guarantee_1')
            &.special
              bg-image('special_1')
          .sellerDescription
            vertical-align top
            display inline-block
            font-size 1rem
    .number
      font-size 1rem
      position absolute
      text-align center
      right 1rem
      bottom 2.5rem
      height 2.2rem
      border-radius 1rem
      width 4rem
      box-sizing border-box
      padding 0.1rem 0
      background-color rgba(0,0,0,0.2)
      .icon-keyboard_arrow_right
        display inline-block
        box-sizing border-box
        font-size 1rem
        line-height 1.8rem
      .count
        font-size 1rem
        margin-left 0.2rem
        line-height 1.8rem
    .broadcast
      position absolute
      width 100%
      height 2rem
      bottom 0
      left 0
      right 0
      background rgba(7,17,27,0.2)
      display flex
      flex-direction row
      justify-content space-around
      align-items center
      .broadcastTitle
        width 10%
        height 100%
        bg-image('bulletin')
        background-repeat no-repeat
        background-size 2rem 1.5rem
        margin-top 0.5rem
      .broadcastText
        width 60%
        height 100%
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
        margin-left 1rem
        line-height 2rem
      .icon-keyboard_arrow_right
        text-align center
        width 10%
        height 100%
        line-height 2rem
        margin-left  2rem
    .backImg
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index -999
      filter blur(10px)
    .fade-enter-active
      transition all 1s ease
    .fade-leave-active
      transition all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    .fade-enter, .fade-leave-to
      opacity 0
    .blurImg
      position fixed
      z-index 100
      top 0
      bottom 0
      left 0
      right 0
      overflow auto
      background-color rgba(7,17,27,0.8)
      .detailWrapper
        width 100%
        min-height 100%
      .detailMain
        margin-top 5rem
        padding-bottom 4.5rem
        .title
          text-align center
          font-size 1.6rem
          font-weight 700
          color rgba(255,255,255,1)
          line-height 2rem
        .stars
          margin-top 2rem
          margin-bottom 2rem
          text-align center
        .divideLine
          margin 0 auto
          .lineText
            font-weight 700
            font-size 1.2rem
            padding 0 0.5rem
        .iconSupports
          width 80%
          margin 0 auto
          margin-bottom 2rem
          .supportItem
            padding 0 1rem
            font-size 0
            margin-bottom 1rem
            &:last-child
              margin-bottom 0
            .supportIcons
              display inline-block
              width 1.5rem
              height 1.5rem
              vertical-align top
              margin-right 0.8rem
              background-size 1.5rem 1.5rem
              background-repeat no-repeat
              &.decrease
                bg-image('decrease_2')
              &.discount
                bg-image('discount_2')
              &.invoice
                bg-image('invoice_2')
              &.guarantee
                bg-image('guarantee_2')
              &.special
                bg-image('special_2')
            .supportTexts
              display inline-block
              font-size 1rem
              line-height 1.5rem
              height 1.5rem
        .bulletin
          width 80%
          margin 0 auto 1rem auto
          padding 2rem
          font-size 1rem
          line-height 2rem
          font-weight 200
          color rgb(255,255,255)
      .detailClose
        color rgba(255,255,255,0.5)
        position relative
        widows 2rem
        height 2rem
        margin -2rem auto 1em auto
        clear both
        font-size 3rem
        text-align center
</style>
