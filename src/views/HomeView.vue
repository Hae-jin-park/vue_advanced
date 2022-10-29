<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <AxiosTestView /> -->
    <KakaoLoginView/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
//import AxiosTestView from "@/views/AxiosTestView.vue";

import KakaoLoginView from '@/views/KakaoLoginView.vue'
export default {
  name: "HomeView",
  components: {
    // HelloWorld
  //  AxiosTestView,
  KakaoLoginView,
  },
};
</script>
