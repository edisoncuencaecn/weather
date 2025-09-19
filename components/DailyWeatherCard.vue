<template>
      <div class=" p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-2">{{ forecastDate }}</h2>
         <div v-if = "temps" class = "text-xl font-bold mb-2">
            <div class="grid grid-cols-2 gap-5">
                <NuxtPicture v-bind:src="`${conditionIcons}`" class="icon"/> <!--This tells @nuxt/image to look in assets/images-->
                <p class="text-7xl text-[clamp(1rem,2vw+2rem,4.5rem)]">{{temps}}<sup>{{tempSign}}</sup></p>
                <p class="text-lg">Feels:{{feels_like}} <sup>{{tempSign}}</sup></p>
                <p class="text-2xl text-[clamp(1rem,2vw+1rem,2rem)]">{{conditionDescs}}</p>
                <p class="text-lg">H:{{temps_max}}<sup>{{tempSign}}</sup></p>
                <p class="text-base">Humidity:{{humidities}}%</p>
                <p class="text-lg">L:{{temps_min}}<sup>{{tempSign}}</sup></p>
                <p class="text-base">Wind:{{windspeed}}km/h</p>
             </div>
         </div>
      </div>
</template>

<script setup>
  defineProps([
    'conditionIcons',
    'temps',
    'conditionDescs',
    'feels_like',
    'temps_max',
    'temps_min',
    'humidities',
    'dayNumber',
    'tempSign',
    'forecastDate',
    'windspeed'
  ])
  const itemState = useState('chosenItem', () => {})
  const changeItemState = (item) => {
    itemState.value = item
  }
</script>

<style lang="scss" scoped>

</style>