<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="foodContent">
        <div class="image">
          <img :src="food.image">
          <div class="back" @click="backTo">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sellCount">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">${{food.price}}</span>
            <span class="old">{{food.oldPrice}}</span>
          </div>
          <div class="cartControlWrapper">
            <CartControl :food="food"></CartControl>
          </div>
          <transition name="fade">
            <div @click.stop="addFirst($event)"
                 class="buy" v-show="!food.count || food.count===0">加入购物车</div>
          </transition>
        </div>
      </div>

    </div>
  </transition>
</template>

<script>
import Bscroll from 'better-scroll'
import CartControl from '../cartControl/cartcontrol'
import Vue from 'vue'
export default {
  name: 'food',
  components: {CartControl},
  props: {
    food: Object
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show () {
      this.showFlag = true
      this.$nextTick(() => {
        if(!this.scroll) {
          this.scroll = new Bscroll(this.$refs.food, {
            click: true
          }) }
          else {
            this.scroll.refresh()
          }
      })
    },
    backTo (event) {
      this.showFlag = false
    },
    addFirst (event) {
      this.$emit('cartAdd', event.target)
      Vue.set(this.food, 'count', 1)
    }
  }
}
</script>

<style scoped lang="stylus">
  .food
    position fixed
    width 100%
    left 0
    right 0
    top 0
    bottom 3.5rem
    z-index 30
    background white
    .image
      position relative
      width 100%
      height 0
      padding-top 100%
      img
        position absolute
        top 0
        left 0
        right 0
        width 100%
        height 100%
      .back
        position absolute
        top 1rem
        left 1rem
        width 3rem
        height 3rem
        border-radius 50%
        line-height 3rem
        text-align center
        color white
        background rgba(0, 0, 0, 0.8)
    .content
      padding 1rem
      .title
        font-size 2rem
        line-height 1rem
        font-weight 700
        margin-bottom 1rem
        color rgb(7, 17, 27)
      .detail
        margin-bottom 1.2rem
        line-height 0.8rem
        font-size 0
        height 1rem
        .sellCount, .rating
          font-size 0.8rem
          color rgb(147, 153, 159)
        .sellCount
          margin-right 0.5rem
      .price
        .now
          font-size 1.2rem
          line-height 1.2rem
          font-weight 700
          color red
        .old
          font-size 1rem
          line-height 1rem
          font-weight 700
          color lightgray
    .cartControlWrapper
      position absolute
      right 1rem
      bottom 1rem
    .buy
      position absolute
      border-radius 10px
      right 1rem
      bottom 1rem
      z-index 10
      line-height 1.5rem
      height 1.5rem
      padding 0 1rem
      box-sizing border-box
      font-size 1rem
      color white
      background rgb(0, 160, 220)
    .fade-enter-active, .fade-leave-active
      transition all 1s
    .fade-enter, .fade-leave-to
      opacity 0
  .move-enter-active
    animation move 0.5s linear
  .move-leave-active
    animation move 0.5s reverse linear
  @keyframes move
    0% {
      opacity 0
    }
    100% {
      opacity 1
    }
</style>
