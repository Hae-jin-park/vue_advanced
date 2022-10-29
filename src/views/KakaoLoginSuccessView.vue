<template>
  <div>로그인 완료</div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    // console.log(window.Kakao);
    this.getToken();
  },
  methods: {
    async getToken() {
      const code = this.$route.query.code;
      console.log(code);

      const resp = await axios({
        url: "https://kauth.kakao.com/oauth/token",
        methods: "POST",
        params: {
          grant_type: "authorization_code",
          client_id: process.env.VUE_APP_KAKAO_REST_API_KEY,
          redirect_uri: "http://localhost:8081/success.do",
          code,
        },
      });
      console.log("access_token", resp.data.access_token);
    },
  },
};
</script>

<style></style>
