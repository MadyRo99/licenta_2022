import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"

import { BounceLoader } from '@saeris/vue-spinners';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { ValidationObserver } from 'vee-validate';
import { ValidationProvider, extend } from 'vee-validate';
import { required, regex, oneOf, email, min, max } from "vee-validate/dist/rules";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

extend('required', {
  ...required,
  message: 'Campul de deasupra nu poate fi gol'
})
extend('regex', {
  ...regex,
  message: 'Campul de deasupra poate sa contina doar litere, spatii sau caracterul "-"'
})
extend('oneOf', {
  ...oneOf,
  message: 'Campul de deasupra trebuie sa contina o valoare valida'
})
extend('email', {
  ...email,
  message: 'Campul de deasupra trebuie sa contina un email valid'
})
extend('min', {
  ...min,
  message: 'Campul de deasupra contine prea putine caractere'
})
extend('max', {
  ...max,
  message: 'Campul de deasupra contine prea multe caractere'
})

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  BounceLoader,
  render: h => h(App)
}).$mount('#app')
