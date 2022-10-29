<template>
  <div></div>
</template>

<script>
export default {
  created() {
    const a = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(1);
        } catch (error) {
          reject(error);
        }
      }, 1000);
    }),
    const b = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            try{
                resolve(2);
            }catch(error){
                reject(error);
            }
        },2000);
  }),
}
</script>

<style></style>
