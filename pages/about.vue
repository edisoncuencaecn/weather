<template>
    <div>
      <h1 class="text-green-600 text-5xl font-bold text-center">
        GeeksforGeeks
      </h1>
      <b class = "text-center">Tailwind CSS Line Height Class</b>
      <div class="mx-24 bg-green-200 text-justify">
        <p class="p-2">leading-none:<br>
            <span class="leading-none">
                How many times were you frustrated
                while looking out for a good
                collection of programming/algorithm
                /interview questions? What did you
                expect and what did you get?
                GeeksforGeeks.
            </span>
        </p>
      </div>
      <p class="p-2">leading-normal:<br>
            <span class="leading-normal">
                How many times were you frustrated
                while looking out for a good
                collection of programming/algorithm
                /interview questions? What did you
                expect and what did you get?
                GeeksforGeeks.
            </span>
      </p>

      <p class="p-2">leading-loose:<br>
            <span class="leading-loose">
                How many times were you frustrated
                while looking out for a good
                collection of programming/algorithm
                /interview questions? What did you
                expect and what did you get?
                GeeksforGeeks.
            </span>
      </p>
      <NuxtLink v-on:click="changeItemState(item)":to="`/`">
      </NuxtLink>
    </div>
</template>

<script setup>
   const itemState = useState('chosenItem', () => {})
   const changeItemState = (item) => {
    itemState.value = item
  }
</script>

<style lang="scss" scoped>
</style>