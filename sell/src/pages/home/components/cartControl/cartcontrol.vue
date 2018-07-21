<template>
    <div class="cartControl">
      <div class="decrease icon-remove_circle_outline"
           @click="decreaseCount"
           v-show="food.count > 0"></div>
      <div class="count" v-show="food.count > 0">{{food.count}}</div>
      <div class="increase icon-add_circle" @click="addCount"></div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'cartcontrol',
  props: {
    food: Object
  },
  created () {

  },
  methods: {
    addCount () {
      if(!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    decreaseCount () {
      this.food.count--
    }
  }
}
</script>

<style scoped lang="stylus">
  .cartControl
    .decrease
      font-size 1.5rem
      display inline-block
      color rgb(0,160,220)
    .count
      vertical-align top
      text-align center
      width 1rem
      font-size 1rem
      line-height 1rem
      padding-top 0.3rem
      display inline-block
      color rgb(147, 153, 149)
    .increase
      font-size 1.5rem
      display inline-block
      color rgb(0,160,220)
</style>
