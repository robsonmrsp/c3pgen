// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'

import './plugins/theme';

import VeeValidateMessagesBR from "vee-validate/dist/locale/pt_BR";

import VeeValidate, { Validator } from 'vee-validate';

import * as uiv from 'uiv'

Validator.localize('pt_BR', VeeValidateMessagesBR);

const VueInputMask = require('vue-inputmask').default

Vue.config.productionTip = false

Vue.use(VueInputMask)

Vue.use(VeeValidate, {
  locale: 'pt_BR',
});

Vue.use(uiv)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
