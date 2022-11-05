import Vue from "vue";
import App from "./App.vue";
import "./output.css";
import router from "./router";
import "tw-elements";
import store from './store'
import vuetify from './plugins/vuetify'
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
