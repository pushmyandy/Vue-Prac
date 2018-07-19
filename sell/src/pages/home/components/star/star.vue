<template>
    <div class="star" :class="starType">
      <span v-for="item in itemClass" :class="item"
      :key="item.id" class="starItem"
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

    }
  },
  computed: {
    starType () {
      return 'star-' + this.size
    }
  }
}
</script>

<style scoped lang="stylus">
  .star
    font-size 0
    &.star-24
    &.star-48
    &.star-36
    .starItem
      display inline-block
      background-repeat no-repeat
</style>
