<template lang="html">
  <div class="shopcart">
    <transition name="fade">
      <div class="list-mask" v-show="listShow"></div>
    </transition>
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight' :totalCount >0}">
            <span class="icon-shopping_cart" :class="{'highlight' :totalCount >0}"></span>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight' :totalPrice >0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class=title>购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listcontent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
  export default {
  props: {
    selectFoods: {
      type: Array,
      default () {
        return [
          {
            price: 10,
            count: 1
          }
        ];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // balls: [
      //   {
      //     show: false
      //   },
      //   {
      //     show: false
      //   },
      //   {
      //     show: false
      //   },
      //   {
      //     show: false
      //   },
      //   {
      //     show: false
      //   }
      // ],
      // dropBalls: [],
      fold: true
    };
  },
  components: {
    cartcontrol
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元起送`;
      } else {
        return '去结算';
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough';
      } else {
        return 'enough';
      }
    },
    listShow() {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      };
      let show = !this.fold;
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listcontent, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
      return show;
    }
  },
  methods: {
    toggleList() {
      if (!this.totalCount) {
        return;
      };
      this.fold = !this.fold;
    },
    empty() {
      this.selectFoods.forEach((food) => {
        food.count = 0;
      });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .shopcart
    position:fixed
    left:0
    bottom:0
    z-index:50
    width:100%
    height:48px
    .content
      display:flex
      background:#141d27
      font-size:0
      .content-left
        flex:1
        .logo-wrapper
          display:inline-block
          position:relative
          top:-10px
          margin:0 12px
          padding:6px
          width:56px
          height:56px
          box-sizing:border-box
          vertical-align:top
          border-radius:50%
          background:#141d27
          .logo
            width:100%
            height:100%
            border-radius:50%
            background:#2b343c
            text-align:center
            &.highlight
              background:rgb(0,160,220)
            .icon-shopping_cart
              font-size:24px
              line-height:44px
              color:#80858a
              &.highlight
                color:#fff
          .num
            background:rgb(240,20,20)
            position:absolute;
            font-size:9px
            font-weight:700
            color:#fff
            height:16px
            width:24px
            line-height:16px
            text-align:center
            border-radius:16px
            top:0px
            right:0
            box-shadow: 0px 4px 8px 0 rgba(0,0,0,0.4)
        .price
          display:inline-block
          font-size:16px
          font-weight:700
          vertical-align:top
          line-height:24px
          margin-top:12px
          box-sizing:border-box
          padding-right:12px
          border-right:1px solid rgba(255,255,255,0.1)
          color:rgba(255,255,255,0.4)
          &.highlight
            color:#fff
        .desc
          display:inline-block
          vertical-align:top
          line-height:24px
          margin:12px 0 0 12px
          line-height:24px
          font-size:10px
          color:rgba(255,255,255,0.4)
      .content-right
        flex: 0 0 105px
        width:105px
        .pay
          height:48px
          line-height:48px
          text-align:center
          font-size:12px
          font-weight:700
          color:rgba(255,255,255,0.4)
          background:#2b333b
          &.not-enoug
            background:#2b333b
          &.enough
            background:#00b43c
            color:#fff
    .shopcart-list
      position: absolute
      top:0
      left:0
      z-index:-1
      width:100%
      &.fold-enter-active
        transition: all .8s ease;
      &.fold-leave-active
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
      &.fold-enter, &.fold-leave-active
        transform: translateY(-100%);
        opacity: 0;
      .list-header
        height:40px
        line-height:40px
        padding:0 18px
        background:#f3f5f7
        border-bottom:solid 1px rgba(7,17,27,0.1)
        .title
          float:left
          font-size:14px
          color:rgb(7,17,27)
        .empty
          float:right
          font-size:12px
          color:rgb(0,160,220)
      .list-content
        padding:0 18px
        max-height:217px
        background:#fff
        overflow:hidden
        .food
          position:relative
          padding:12px 0
          box-sizing:border-box
          border-1px(rgba(7,17,27,0.1))
          .name
            line-height:24px
            font-size:14px
            color:rgb(7,17,27)
          .price
            position:absolute
            right:90px
            bottom:12px
            line-height:24px
            font-size:14px
            color:rgb(240,20,20)
            font-weight:700
          .cartcontrol-wrapper
            position:absolute
            bottom:6px
            right:0
    .list-mask
      position:fixed
      top:0
      left:0
      width:100%
      height:10000px
      background:rgba(7,17,27,0.6)
      backdrop-filter:blur(10px)
      z-index:-1
      &.fade-transition
        opacity:1
        background:rgba(7,17,27,0.6)
      &.fade-enter,&.fade-leave
        opacity:0
        background:rgba(7,17,27,0)
      /* 可以设置不同的进入和离开动画 */
      /* 设置持续时间和动画函数 */
      &.fade-enter-active
        transition: all .8s ease;
      &.fade-leave-active
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
      &.fade-enter, &.fade-leave-active
        transform: translateX(100px);
        opacity: 0;















</style>
