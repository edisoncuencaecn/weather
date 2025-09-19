<!-- 84. Error.vue with error.statuscode & error.message 
 86. clearError() function and creating a respective button using the redirect option
 to redirect the page to the root route
 localhost:3000/product/100-->
<template>
    <div>
       <h1> Error{{ error.statusCode }}</h1>
       <h1> {{error.message}} </h1>
       <button v-on:click="handleError"> Clear Error</button>
    </div>
</template>

<script setup>
  defineProps(['error'])
  const handleError = () => {
    clearError({
       redirect: '/'
    })
  }
</script>

<style lang="scss" scoped>

</style>