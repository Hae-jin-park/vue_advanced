<template>
  <div>
    ID : <input type="text" v-model="id" /><br />
    PASSWORD : <input type="text" v-model="pw" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      pw: "",
    };
  },
};
</script>

<style scoped></style>
