<template>
  <div>
    <div class="grid grid-cols-1">
      <div
        class="bg-white rounded-md m-10 px-4 py-4 border-2 border-emerald-600"
      >
        <input
          type="text"
          class="form-control block w-1/2 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          v-model="keyword"
          @keyup.enter="showMeTheData"
        />

        <button
          type="button"
          class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          @click="showMeTheData"
        >
          Button
        </button>
      </div>
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <p>
            <a :href="item.url" target="_blank"
              ><span v-html="item.title"></span
            ></a>
            <span>{{ new Date(item.datetime) }}</span>
          </p>
          <p v-html="item.contents"></p>
          <hr />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import { callKakaoAPI } from "@/plugins/axios";
// const API_KEY = process.env.VUE_APP_KAKAO_REST_API_KEY;
export default {
  data() {
    return { keyword: "", list: [] };
  },
  created() {
    //this.showMeTheData();
  },
  methods: {
    showMeTheData() {
      callKakaoAPI({
        method: "GET",
        url: "/v2/search/web",
        params: {
          query: this.keyword,
        },
        // kakaoAK {9d0fa5bef5991ef61a64731b643279e2}
      }).then((resp) => {
        this.list = resp.data.documents;
        //console.log(resp);
      });
    },
  },
};
</script>

<style></style>
