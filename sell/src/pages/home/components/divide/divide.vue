<template>
  <div class="line">
    <div class="lineLight"></div>
    <slot class="middle"></slot>
    <div class="lineLight"></div>
  </div>
</template>

<script>
export default {
  name: 'divide'
}
</script>

<style scoped lang="stylus">
  .line
    display flex
    width 80%
    margin 0 auto 2rem auto
    flex-direction row
    .lineLight
      position relative
      top -0.5rem
      border-bottom 1px solid rgba(255,255,255,0.2)
      flex 1
    .middle
      flex 1
</style>
