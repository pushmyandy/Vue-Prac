<template>
    <div class="ratingSelect">
      <div class="ratingType">
        <span @click="select(2)" class="block positive" :class="{'active': cType===2}">{{desc.all}}
          <span class="count">{{ratings.length}}</span>
        </span>
        <span @click="select(0)" class="block positive" :class="{'active': cType===0}">{{desc.positive}}
          <span class="count">{{positives.length}}</span>
        </span>
        <span @click="select(1)" class="block negative" :class="{'active': cType===1}">{{desc.negative}}
          <span class="count">{{negatives.length}}</span>
        </span>
      </div>
      <div @click="toggleContent" class="switch" :class="{'on': cContent}">
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
  },
  data () {
    return {
      cType: this.selectType,
      cContent: this.onlyContent// 防止更改父元素值
    }
  },
  computed: {
    positives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    negatives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  methods: {
    select (type) {
      this.cType = type
      this.$emit('typeChange', type)
    },
    toggleContent () {
      this.cContent = !this.cContent
      this.$emit('contentChange', this.cContent)
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
  .switch
    padding 1rem 1.2rem
    line-height 1.8rem
    font-size 1.5rem
    border-bottom 1px solid rgba(7, 17, 27, 0.2)
    color rgb(147, 153, 159)
    &.on
      .icon-check_circle
        color #00c850
    .icon-check_circle
      font-size 1.8rem
      display inline-block
      margin-right 0.4rem
    .text
      font-size 1rem
</style>
