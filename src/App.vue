<template>
  <div id="app">
    <top v-bind:seller="seller"></top>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
    <div class="footer">
      I am footer.
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import top from './components/header/header.vue';

const ERR_OK = 0;

export default {
  data () {
    return {
      seller: {}
    };
  },
  created () {
    this.$http.get('./api/seller').then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.seller = response.data;
        console.log(this.seller);
      };
    });
  },
  components: {
    top
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl";
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    position: relative
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size:14px
        color:rgb(77,85,93)
        &.active
          color: #f01414
</style>
