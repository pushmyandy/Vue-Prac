<template>
  <div class="ratings">
    <div class="ratingContent">
      <div class="overview">
        <div class="overviewLeft">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">{{seller.rankRate}}</div>
        </div>
        <div class="overviewRight">
          <div class="scoreWrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="scoreWrapper"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import star from './star/star'
export default {
  name: 'homeRatings',
  props: {
    seller: Object
  },
  components: {
    star
  }
}
</script>

<style scoped lang="stylus">
  .ratings
    position absolute
    height 100%
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
      display flex
      padding 1.2rem 0
      .overviewLeft
        flex 0 0 137px
        width 137px
        padding 6px 0
        border-right 1px solid rgba(7, 17, 27, 0.2)
        text-align center
        .score
          line-height 2rem
          font-size 2rem
          color rgb(255, 153, 0)
        .title
          line-height 1rem
          font-size 1rem
          color rgb(7, 17, 27)
        .rank
          margin-top 0.5rem
          line-height 0.8rem
          font-size 0.8rem
          color rgb(147, 153, 159)
      .overflowRight
        padding-left 1.6rem
        flex 1
</style>
