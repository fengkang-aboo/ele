<template lang="html">
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports">
        <span class="count" @click="showMask">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text" @click="showMask">{{seller.bulletin}}</span>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>
    <transition name="fade">
      <div class="mask" v-show="mask">
        <div class="mask-wrapper cf">
          <div class="mask-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item, $index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
                <span class="text">{{seller.supports[$index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="bulletin-text">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="mask-close" @click="closeMask">
          X
        </div>
      </div>
    </transition>
  </div>
</template>

<script type='text/ecmascript-6'>
  import star from '../star/star.vue';
  export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      mask: false,
      transitionName: 'fade'
    };
  },
  components: {
    star
  },
  methods: {
    showMask: function () {
      this.mask = true;
    },
    closeMask: function () {
      this.mask = false;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";
  // @import "../../common/stylus/style.css ";
  .header
    position: relative
    color: #fff
    background: rgba(7,17,27,0.5)
    overflow: hidden
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size:0
      .avatar
        display:inline-block
        font-size:14px
        vertical-align: top
        border-radius: 2px
      .content
        display:inline-block
        font-size:14px
        margin-left:16px
        .title
          margin:2px 0 8px 0
          .brand
            width:30px
            height:18px
            display:inline-block
            vertical-align: top
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
      .support-count
        position:absolute
        right: 12px
        bottom: 18px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background-color: rgba(0,0,0,0.2)
        text-align: center
        .count
          font-size: 10px
        .icon-keyboard_arrow_right
          font-size: 10px
      .description
        margin-top: 10px
        font-size: 12px
        line-height: 12px
      .support
        margin-top: 10px
        .icon
          display: inline-block
          width: 12px
          height: 12px
          vertical-align: middle
          margin-right: 4px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
        .text
          font-size: 12px
          line-height: 12px
          display: inline-block
    .bulletin-wrapper
      height: 28px
      line-height: 28px
      padding: 0 12px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background: rgba(0,0,0,0.2)
      .bulletin-title
        bg-image('bulletin')
        vertical-align: middle
        display: inline-block
        width: 22px
        height: 12px
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        font-size: 12px
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
    .mask
      width: 100%
      height: 100%
      position: fixed
      top: 0
      left: 0
      z-index: 100
      overflow: auto
      backdrop-filter: blur(10px)
      background: rgba(7,17,27,0.8)
      &.fade-enter-active, &.fade-leave-active
        transition: all .5s
      &.fade-enter, &.fade-leave-active
        opacity: 0
        background: rgba(7, 17, 27, 0)
      .mask-wrapper
        min-height: 100%
        width: 100%
        .mask-main
          margin-top: 64px
          padding-bottom: 64px
          .name
            text-align: center
            line-height: 16px
            font-size: 16px
            font-weight: 700
          .star-wrapper
            margin-top: 18px
            padding: 2px 0
            text-align: center
          .title
            width: 80%
            margin: 28px auto 24px
            display: flex
            .line
              flex: 1
              position: relative
              top: -6px
              border-bottom: 1px solid rgba(255,255,255,0.2)
            .text
              padding: 0 12px
              font-size: 14px
              font-weight: 700
          .supports
            width: 80%
            margin: 0 auto
            .support-item
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0
              &.last-child
                margin-bottom: 0
              .icon
                display: inline-block
                vertical-align: top
                width: 16px
                height: 16px
                vertical-align: top
                margin-right: 6px
                background-size: 16px 16px
                background-repeat: no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                font-size: 12px
                line-height: 16px
          .bulletin
            width: 80%
            margin: 0 auto
            .bulletin-text
              padding: 0 12px
              line-height: 24px
              font-size: 12px
      .mask-close
        position: relative
        width: 32px
        height: 32px
        line-height: 32px
        border-radius: 50%
        background: rgba(0,0,0,0.5)
        margin: -64px auto 0
        clear: both
        font-size: 25px
        text-align: center
</style>
