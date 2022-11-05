import Vue from "vue";
import App from "./App.vue";
import "./output.css";
import router from "./router";
import "tw-elements";
import store from './store'
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
