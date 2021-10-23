import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

Vue.config.productionTip = false
//
// // Ensure we checked auth before each page load.
// router.beforeEach((to, from, next) =>
//     Promise.all([store.dispatch(CHECK_AUTH)]).then(next)
// );

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
