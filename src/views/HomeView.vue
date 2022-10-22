<template>
  <div class="home">
    <img alt="Vue logo" class="mx-auto" src="../assets/logo.png" />
    {{ wrapData }}
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import mixin from "@/mixin";

export default {
  mixins: [mixin],
  name: "HomeView",
  components: {
    HelloWorld,
  },
  data() {
    return {
      toDay: new Date(),
    };
  },
  computed: {
    wrapData() {
      return this.toYmdHms(this.toDay);
    },
  },
};
</script>
