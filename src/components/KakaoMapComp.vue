<template>
  <div class="map_wrap">
    <div id="map" class="mx-auto w-full h-96"></div>
    <!-- <div class="hAddr">
      <span class="title">지도중심기준 행정동 주소정보</span>
      <span id="centerAddr"></span>
    </div> -->
    <button
      type="button"
      class="inline-block px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      @click="currentPos"
    >
      현재 위치로 이동
    </button>
    <br />
    <br />
    <button
      type="button"
      class="inline-block px-6 py-2.5 bg-purple-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      @click="defaultPos"
    >
      기본값 위치로 이동
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      lat: 0,
      lng: 0,
      markers: [],
      geocoder: null,
      marker: null,
      infowindow: null,
      detailAddr: "",
      content: "",
    };
  },
  mounted() {
    this.latitude = 37.6771176065756; //pos.coords.latitude;
    this.longitude = 126.749259861283; //pos.coords.longitude;
    if (!("geolocation" in navigator)) {
      return;
    }
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" +
        process.env.VUE_APP_KAKAO_API_KEY +
        "&libraries=services";
      document.head.appendChild(script);
    }

    // get position
  },
  methods: {
    moveMap() {
      this.displayMarker([[this.latitude, this.longitude]]);
      this.searchAddrFromCoords(this.map.getCenter(), this.displayCenterInfo);
    },
    defaultPos() {
      this.latitude = 37.6771176065756; //pos.coords.latitude;
      this.longitude = 126.749259861283; //pos.coords.longitude
      this.moveMap();
    },
    currentPos() {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.latitude = pos.coords.latitude;
          this.longitude = pos.coords.longitude;
          this.moveMap();
        },
        (err) => {
          alert(err.message);
        }
      );
    },
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.6678578, 126.7446242),
        level: 4,
      };
      this.map = new kakao.maps.Map(container, options);

      this.displayMarker([[this.latitude, this.longitude]]);
      // 주소-좌표 변환 객체를 생성합니다
      this.geocoder = new kakao.maps.services.Geocoder();

      this.marker = new kakao.maps.Marker(); // 클릭한 위치를 표시할 마커입니다
      this.ps = new window.kakao.maps.services.Places();
      this.infowindow = new kakao.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다
      // 지도 타입 변경 컨트롤을 생성한다
      var mapTypeControl = new kakao.maps.MapTypeControl();

      // 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
      this.map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
      this.searchAddrFromCoords(this.map.getCenter(), this.displayCenterInfo);
      kakao.maps.event.addListener(this.map, "click", this.mapClickCallback);
    },
    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      const positions = markerPositions.map(
        (position) => new kakao.maps.LatLng(...position)
      );

      if (positions.length > 0) {
        this.markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
            })
        );

        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        );

        this.map.setBounds(bounds);
      }
    },
    searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      this.geocoder.coord2RegionCode(
        coords.getLng(),
        coords.getLat(),
        callback
      );
    },
    displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        //var infoDiv = document.getElementById("centerAddr");

        for (var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === "H") {
            //infoDiv.innerHTML = result[i].address_name;
            break;
          }
        }
      }
    },
    searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      this.geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    },
    mapClickCallback(mouseEvent) {
      var context = this;
      this.searchDetailAddrFromCoords(
        mouseEvent.latLng,
        function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            context.addrToCoord(result[0].address.address_name);
            var detailAddr = result[0].road_address
              ? "<div>도로명주소 : " +
                result[0].road_address.address_name +
                "<br>" +
                result[0].road_address.building_name +
                "</div>"
              : "";
            detailAddr +=
              "<div>지번 주소 : " + result[0].address.address_name + "</div>";

            var content =
              '<div class="bAddr">' +
              '<span class="title">법정동 주소정보</span>' +
              detailAddr +
              "</div>";
            // 마커를 클릭한 위치에 표시합니다
            context.marker.setPosition(mouseEvent.latLng);
            context.marker.setMap(context.map);

            // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
            context.infowindow.setContent(content);
            context.infowindow.open(context.map, context.marker);
          }
        }
      );
    },
    addrToCoord(addr) {
      // 주소로 좌표를 검색합니다
      var context = this;
      this.geocoder.addressSearch(addr, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          //console.log(result);
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          context.latitude = coords.getLat();
          context.longitude = coords.getLng();
        }
      });
    },
  },
};
</script>

<style>
.map_wrap {
  position: relative;
  width: 100%;
  height: 350px;
}
.title {
  font-weight: bold;
  display: block;
}
.hAddr {
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 2px;
  background: #fff;
  background: rgba(255, 255, 255, 0.8);
  z-index: 1;
  padding: 5px;
}
#centerAddr {
  display: block;
  margin-top: 2px;
  font-weight: normal;
}
.bAddr {
  padding: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
