<template>
  <div>
    로그인 완료

    <span>nichName : {{ nickName }}</span>
    <img :src="img" alt="image" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      nickName: "",
      img: "",
    };
  },
  async created() {
    // console.log(window.Kakao);
    this.getToken();
    this.getUserInfo();
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
      //   console.log("access_token", resp.data.access_token);
      window.Kakao.Auth.setAccessToken(resp.data.access_token);
    },
    async getUserInfo() {
      window.Kakao.API.request({
        url: "/v2/user/me",
      })
        .then((resp) => {
          //   console.log(resp);
          this.nickName = resp.properties.nickname;
          this.img = resp.properties.profile_image;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
