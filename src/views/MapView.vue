<template>
  <div id="map" style="width: 600px; height: 500px"></div>
</template>

<script>
export default {
  methods: {
    initKakaoMap(callback) {
      const script = document.createElement("script");
      script.onload = () => window.kakao.maps.load(callback);
      //console.log(process.env.VUE_APP_KAKAO_JS_API_KEY);
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.VUE_APP_KAKAO_JS_API_KEY}&autoload=false`;
      document.head.appendChild(script);
    },
    initMap() {
      var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      var options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(
          37.6771176065756,
          126.749259861283
        ), //지도의 중심좌표.
        level: 5, //지도의 레벨(확대, 축소 정도)
      };
      new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    },
  },

  mounted() {
    if (typeof window.kakao?.maps === "undefined") {
      this.initKakaoMap(this.initMap);
    } else {
      this.initMap();
    }
  },
};
</script>

<style scoped></style>
