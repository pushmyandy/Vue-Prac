<template>
  <transition name="move" >
    <div class="food" v-show="showFlag" ref="food">
      <div class="foodContent" >
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
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <div class="text">{{food.info}}</div>
        </div>
        <split v-show="food.info"></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <rating :select-type="selectType" :only-content="onlyContent"
          :desc="desc" :ratings="food.ratings"></rating>
          <div class="ratingWrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-for="rating in food.ratings" class="ratingItem">
                <div class="user">
                  <span class="name">{{ratings.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,
                  'icon-thumb_down': rating.rateType===1}"></span>
                </p>
              </li>
            </ul>
            <div class="noRating" v-show="!food.ratings || !food.ratings.length"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import CartControl from '../cartControl/cartcontrol'
import Split from '../split/split'
import Vue from 'vue'
import Rating from '../rating/rating'

const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
  name: 'food',
  components: {
    CartControl,
    Split,
    Rating
  },
  props: {
    food: Object
  },
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    show () {
      this.showFlag = true
      this.selectFood = ALL
      this.onlyContent = true
      this.$nextTick(() => {
        if(!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
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
      position relative
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
    .info
      padding 1rem
      .title
        line-height 1rem
        margin-bottom 0.5rem
        font-size 1rem
        color rgb(7,17,27)
      .text
        line-height 2rem
    .rating
      padding-top 1.2rem
      .title
        line-height 1rem
        margin-left 1.5rem
        font-size 1rem
        color rgb(7,17,27)
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
