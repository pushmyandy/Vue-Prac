<template>
  <div>
      <div class="header">
        <div class="headerIcon">
          <img src="http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750">
        </div>
        <div class="headerDesc"></div>
      </div>
  </div>
</template>

<script>
export default {
  name: "homeHeader"
}
</script>

<style scoped lang="stylus">
  .header
    width 100%
    height 9.5rem
    background rgba(7,17,27,0.5)
    display flex
    flex-direction row
    overflow hidden
    position relative
    &::after
      position absolute
      top 0
      left 0
      bottom 0
      right 0
      filter blur(10px)
      background url("http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750")
    .headerIcon
      width 4.5rem
      height 4.5rem
      img
        display block
        width 100%
        height 100%
</style>
