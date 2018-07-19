<template>
    <div class="star" :class="starType">
      <span v-for="itemClass in itemClasses" :class="itemClass"
      :key="itemClass.id" class="star-item"
      ></span>
    </div>
</template>

<script>
export default {
  name: 'star',
  props: {
    size: Number,
    score: Number
  },
  data () {
    return {
      Length: 5,
      Class_on: 'on',
      Class_half: 'half',
      Class_off: 'off'
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size
    },
    itemClasses () {
      let result = []
      let score = Math.floor((this.score * 2) / 2) // 整数部分
      let hasDecimal = (this.score - score) !== 0 // 判断小数
      let integer = Math.floor(score) // 为什么要再floor一下 这没必要
      for (let i = 0; i < integer; i++) {
        result.push(this.Class_on) // 有多少整数push多少on星星
      }
      if (hasDecimal) {
        result.push(this.Class_half)
      }
      while (result.length < this.Length) {
        result.push(this.Class_off)
      }
      return result
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "../../../../assets/stylus/mixin.styl"
  .star
    font-size 0
    &.star-24
      .star-item
        width 1rem
        height 1rem
        margin-right 1rem
        background-size 1rem 1rem
        &:last-child
          margin-right 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
    &.star-48
      .star-item
        width 1.8rem
        height 1.8rem
        margin-right 1.8rem
        background-size 1.8rem 1.8rem
        &:last-child
          margin-right 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width 1.5rem
        height 1.5rem
        margin-right 1.5rem
        background-size 1.5rem 1.5rem
        &:last-child
          margin-right 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    .star-item
      display inline-block
      background-repeat no-repeat
</style>
