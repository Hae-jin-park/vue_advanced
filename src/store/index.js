import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //data:{}와 유사
    count: 1,
    msg: "",
  },
  getters: {
    formatCnt(state) {
      return String(state.count).padStart(2, "0");
    },
    msg(state) {
      return state.msg;
    },
  },
  mutations: {
    increase(state) {
      state.count++;
    },
    decrease(state) {
      state.count--;
    },
    changeMsg(state, value) {
      state.msg = value;
    },
  }, //state를 set하는 함수부
  actions: {
    increase(context) {
      setTimeout(() => {
        context.commit("increase");
      }, 5000);
    },
    decrease(context) {
      context.commit("decrease");
    },
    changeMsg(context, value) {
      context.commit("changeMsg", value);
    },
  },
  modules: { user },
});
