import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import firebase from './firebase'
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 
library.add(faUserSecret);
 
Vue.component('fa-icon', FontAwesomeIcon);

Vue.config.productionTip = false

new Vue({
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
