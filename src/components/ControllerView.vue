<template>
  <div>
    <h3>컨트롤러 부분</h3>
    <div class="flex space-x-2 justify-center">
      <button
        type="button"
        @click="inc"
        class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        증가
      </button>
      <button
        type="button"
        @click="dec"
        class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        감소
      </button>
    </div>
    <div class="flex justify-center">
      <div class="mb-3 xl:w-96">
        <label
          for="exampleFormControlInput1"
          class="form-label inline-block mb-2 text-gray-700"
          >Example label</label
        >
        <input
          type="text"
          class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="exampleFormControlInput1"
          placeholder="Example label"
          @input="(e) => changeMsg(e.target.value)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["increase", "decrease", "changeMsg"]),
  },
};
</script>

<style scoped></style>
