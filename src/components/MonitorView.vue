<template>
  <div>
    <h3>MonitorView</h3>
    <span>count -> {{ count }}</span>
    <br />
    <span>formatCount -> {{ formatCnt }}</span>
    <br />
    <span>{{ msg }}</span>
    <p>{{ userName }} {{ id }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    // count() {
    //   return this.$store.state.count;
    // },
    ...mapState(["count"]),
    ...mapGetters(["formatCnt", "msg"]),
    ...mapGetters("user", ["name", "id"]),
    ...mapGetters({ userName: "user/name" }),
    formatCnt() {
      return this.$store.getters.formatCnt;
    },
  },
};
</script>

<style scoped></style>
