export default {
  namespaced: true,
  state: {
    name: "구자경",
    id: "mrgu",
  },
  getters: {
    name(state) {
      return state.name;
    },
    id(state) {
      return state.id;
    },
  },
  mutations: {},
  actions: {},
};
