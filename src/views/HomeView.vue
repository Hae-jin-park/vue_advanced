<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <KakaoMapComp />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import KakaoMapComp from "@/components/KakaoMapComp.vue";

export default {
  name: "HomeView",
  components: {
    // HelloWorld,
    KakaoMapComp,
  },
};
</script>
