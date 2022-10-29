import Vue from "vue";
import App from "./App.vue";
import "./output.css";
import router from "./router";
import "tw-elements";
import mixin from "./mixin";
Vue.config.productionTip = false;
Vue.use(mixin);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
