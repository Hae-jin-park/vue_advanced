<template>
  <div>
    카카오 로그인
    <a id="kakao-login-btn" @click="doLogin">
      <img
        src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
        width="222"
        alt="카카오 로그인 버튼"
      />
    </a>
  </div>
</template>

<script>
export default {
  created() {
    window.Kakao.init(process.env.VUE_APP_KAKAO_JS_API_KEY);
    console.log(window.Kakao);
  },
  methods: {
    doLogin() {
      window.Kakao.Auth.authorize({
        redirectUri: "http://localhost:8081/success.do",
      });
    },
  },
};
</script>

<style scoped></style>
