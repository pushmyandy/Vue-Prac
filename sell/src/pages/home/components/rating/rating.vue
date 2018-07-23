<template>
    <div class="ratingSelect">
      <div class="ratingType">
        <span class="block positive" :class="{'active': selectType===2}">{{desc.all}}</span>
        <span class="block positive" :class="{'active': selectType===0}">{{desc.positive}}</span>
        <span class="block negative" :class="{'active': selectType===1}">{{desc.negative}}</span>
      </div>
      <div class="switch">
        <span class="icon-check_circle"></span>
        <span class="text">只看有内容的评价</span>
      </div>
    </div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
  name: 'rating',
  props: {
    ratings: Array,
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "../../../../assets/stylus/mixin.styl"
  .ratingSelect
    .ratingType
      padding 1rem 0
      margin 0 1.2rem
      border-1px(gray)
      font-size 0
      .block
        display inline-block
        padding 0.5rem 1rem
        margin 0.5rem
        border-radius 1px
        font-size 1rem
        color rgv(77, 85, 93)
        &.active
          color: white
        .count
          font-size 0.5rem
          margin-left 0.2rem
          line-height 1rem
        &.positive
          background rgba(0, 160, 220, 0.2)
          &.active
            background rgb(0, 160, 220)
        &.negative
          background rgba(77, 85, 93, 0.2)
          &.active
            background rgb(77, 85, 93)
</style>
