import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import goods from './components/goods/goods.vue';
import ratings from './components/ratings/ratings.vue';
import seller from './components/seller/seller.vue';

// import 'common/stylus/index.styl';

Vue.use(VueRouter);
Vue.use(VueResource);
// 6-6

const routes = [
  {
    // 打开页面默认进入的路由页
    path: '/',
    component: goods
  },
  {
    path: '/goods',
    component: goods,
    beforeEnter: (to, from, next) => {
      next();
    }
  },
  { path: '/ratings',
    component: ratings,
    beforeEnter: (to, from, next) => {
      next();
    }
  },
  {
    path: '/seller',
    component: seller,
    beforeEnter: (to, from, next) => {
      next();
    }
  }
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes, // （缩写）相当于 routes: routes
  linkActiveClass: 'active'
});

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    router,
    render: h => h(App)
}).$mount('#app');
