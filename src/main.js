import Vue from "vue";
import App from "./App.vue";
import "./output.css";
import router from "./router";
import "tw-elements";
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
