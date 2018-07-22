<template>
  <div class="goods" >
    <div class="leftMenu" ref="leftMenu">
      <ul>
        <li v-for="(item, index) in goods" :key="index"
         class="leftItem" :class="{'current': currentIndex === index}"
        @click="handleLeftClick(index)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon"
                  :class="classMap[item.type]"
            ></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="rightMenu" ref="foodMenu">
      <ul >
        <li v-for="(item, index) in goods" :key="index" class="listFood">
          <h1 class="goodsTitle">{{item.name}}</h1>
          <ul>
            <li v-for="(food, index) in item.foods" :key="index"
            class="foodItem border-1px"
            >
              <div class="foodIcon"><img :src="food.icon"></div>
              <div class="foodContent">
                <h2 class="foodName">{{food.name}}</h2>
                <p class="foodDesc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div>
                  <span class="foodPrice">￥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartWrapper">
                  <cart-control :food="food" v-on:cartAdd="cartRound"></cart-control> <!--监听子组件的方法-->
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <cart ref="shopCart" :selectFoods = "selectFoods"
      :delivery-price = "seller.deliveryPrice"
          :minPrice="seller.minPrice"></cart>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import Cart from './cart/cart'
import CartControl from './cartControl/cartcontrol'
export default {
  name: 'homeGoods',
  props: {
    seller: Object
  },
  components: {
    Cart,
    CartControl
  },
  data () {
    return {
      ERR_OK: 0,
      goods: [],
      listHeight: [],
      scrollY: 0
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'invoice', 'guarantee', 'special']
    this.$http.get('/api/goods').then((res) => {
      res = res.body
      if (res.errno === this.ERR_OK) {
        this.goods = res.data
        this.$nextTick(() => { // 等待渲染完成
          this._initScroll() // 获取this.scrollY
          this._calculateHeight() //得到每一个list的高度和的数组
        })
      }
    })
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let preHeight = this.listHeight[i]
        let afterHeight = this.listHeight[i + 1]
        if (!afterHeight || (this.scrollY >= preHeight && this.scrollY < afterHeight)) {
          return i // 落点在一个list的上高和下高间
        }
      }
      return 0
    },
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if(food.count){
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  methods: {
    _initScroll () {
      this.menuScroll = new Bscroll(this.$refs.leftMenu, {
        click: true
      })
      this.foodScroll = new Bscroll(this.$refs.foodMenu, {
        click: true,
        probeType: 3 // 获取滚动距离
      })
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight () {
      let foodList = this.$refs.foodMenu.getElementsByClassName('listFood')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList.item(i)
        height += item.clientHeight
        this.listHeight.push(height) //等差数列
      }
    },
    handleLeftClick (index) {
      let foodList = this.$refs.foodMenu.getElementsByClassName('listFood')
      let el = foodList[index]
      this.foodScroll.scrollToElement(el, 300) // 滚动接口 后面是时间 foodScroll是一个Bscroll对象
    },
    cartRound (el) {
      this.$nextTick(() => { // 优化贝塞尔曲线的卡顿
        this.$refs['shopCart'].drop(el)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "../../../assets/stylus/mixin.styl"
  .goods
    display flex
    overflow hidden
    position absolute
    top 0
    left 0
    right 0
    bottom 3rem
    .leftMenu
      flex 0 0 6rem
      width 6rem
      background #f3f5f7
      .leftItem
        text-align center
        display table
        width 100%
        line-height 1.2rem
        font-size 1.2rem
        height 4rem
        &.current
          background white
          position relative
          font-weight 700
          z-index 10
          margin-top -1px
          .text
            border-none()
        .text
          font-size 1rem
          display table-cell
          width 100%
          vertical-align middle
          border-1px(lightgray)
        .icon
          display inline-block
          width 1rem
          height 1rem
          background-size 1rem 1rem
          background-repeat no-repeat
          vertical-align top
          &.decrease
            bg-image('./imgs/decrease_3')
          &.discount
            bg-image('./imgs/discount_3')
          &.invoice
            bg-image('./imgs/invoice_3')
          &.guarantee
            bg-image('./imgs/guarantee_3')
          &.special
            bg-image('./imgs/special_3')
    .rightMenu
      flex: 1
      .goodsTitle
        padding-left 0.2rem
        border-left 2px solid #d9dde1
        font-size 1rem
        line-height 1.6rem
        background #f3f5f7
        color rgb(147, 153, 159)
      .foodItem
        display flex
        margin 1rem
        padding-bottom 1rem
        border-1px(lightgray)
        &:last-child
          margin-bottom 0
        .foodIcon
          width 5rem
          height 5rem
          margin-right 1rem
          img
            display block
            width 100%
            height 100%
        .foodContent
          h2
            font-size 1.3rem
            line-height 1.3rem
            font-weight 800
          .foodDesc
            display block
            width 10rem
            font-size 1rem
            line-height 1rem
            color lightgray
            margin-bottom 0.5rem
            margin-top 0.5rem
          .extra
            margin-bottom 0.5rem
            font-size 1rem
            line-height 1rem
            color lightgray
            &:first-child
              margin-right 1rem
          .foodPrice
            font-size 1.2rem
            line-height 1.2rem
            font-weight 700
            color red
          .oldPrice
            font-size 1rem
            line-height 1rem
            font-weight 700
            color lightgray
          .cartWrapper
            position absolute
            right 0
            bottom 0.5rem
</style>
