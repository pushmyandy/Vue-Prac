<template>
    <div class="cartControl">
      <transition name="move">
        <div @click="decreaseCount"
             v-show="food.count > 0" class="decrease">
          <span class="icon-remove_circle_outline"></span>
        </div>
      </transition>
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
  methods: {
    addCount () {
      if(!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      try {
        this.$emit('cartAdd', event.target)
      }catch (e) {
        console.log("error")
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
    .move-enter,.move-leave-to
      opacity 0
      transform translateX(2rem) rotate(90deg)
    .move-enter-active,.move-leave-active
      transition all 1s ease
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
