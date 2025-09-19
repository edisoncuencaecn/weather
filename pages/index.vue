<template>
  <div class="bg-[url('~/assets/images/img_5terre.jpg')] bg-cover bg-center h-full opacity-100">
   <div class="container mx-auto p-4 h-auto">
    <h1 class="text-3xl font-bold mb-6 text-center">Weather Forecast</h1>
      <h2 class="text-xl font-bold mb-2 ">
         <NuxtTime :datetime="Date.now()" class="text-[clamp(1rem,2vw+1rem,1.5rem)]" second="numeric" month="long" day="numeric" hour="numeric" minute="numeric" />
         <div class="mb-4 text-[clamp(1rem,2vw+1rem,1.5rem)]">{{ city }} {{ tempUnit }}</div> 
         <div class="grid grid-cols-2 gap-20">
           <section>
          <select id = "city" class="inline appearance-none w-full md:w-1/2 lg:w-1/3 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
v-model = "city" :class="{ 'highlight-selection': isSelectedValid }">
            <option value = "Barrie">Barrie</option>
            <option value = "Toronto">Toronto</option>
            <option value = "Ottawa">Ottawa</option>
            <option value = "Montreal">Montreal</option>
            <option value = "Paris">Paris</option>
            <option value = "Rome">Rome</option>
            <option value = "Madrid">Madrid</option>
            <option value = "London">London</option>
            <option value = "Quito">Quito</option>
            <option value = "Lille">Lille</option>
            <option value = "Cuenca">Cuenca</option>
            <option value = "Bahamas">Bahamas</option>
          </select>
          <select id = "temptype" class="inline appearance-none w-full md:w-1/2 lg:w-1/3 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    v-model = "tempType" :class="{ 'highlight-selection': isSelectedValid }">
            <option value = "C">Celsius Degrees (°C)</option>
            <option value = "F">Fahrenheit Degrees (°F)</option>
            <option value = "K">Kelvin Degrees (°K) </option>
          </select>
            <select id = "numdays" class="inline appearance-none w-full md:w-1/2 lg:w-1/3 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    v-model = "numDays" :class="{ 'highlight-selection': isSelectedValid }">
              <option value = "1">Today's</option>
              <option value = "4">4 Days</option>
              <option value = "7">7 Days</option>
              <option value = "15">15 Days</option>
            </select>
           </section>
          <div v-if="ToSearch">
            <button v-on:click="callWeatherData()" class="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-sm sm:py-2 sm:px-4 sm:text-base md:py-3 md:px-6 md:text-lg rounded">
             Search
            </button>
          </div>
          <div v-else-if="status === 'pending'">
            Loading comments...
          </div>
          <div v-else>
            {{ status }}
          </div>
        </div>
      </h2>
     <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
      <div class="bg-blue-400/75 p-6 rounded-lg shadow-md gap-y-4">
        <h2 class="text-xl font-bold mb-2">
          </h2>
          <section>
            <div class = "text-xl font-bold mb-2">
             <div class="grid grid-cols-2 gap-5" >
                <NuxtPicture v-bind:src="`${conditionIcons[0]}`" class="icon"/> <!--This tells @nuxt/image to look in assets/images-->
                <p class="text-7xl text-[clamp(1rem,2vw+2rem,8rem)]">{{temps[0]}}<sup>{{tempSign}}</sup></p>
                <p class="text-lg ">Feels:{{temps_FeelLike[0]}}<sup>{{tempSign}}</sup></p>
                <p class="text-2xl text-[clamp(1rem,2vw+1rem,2.5rem)]">{{conditionDescs[0]}}</p>
                <p class="text-lg- ">H:{{temps_max[0]}}<sup>{{tempSign}}</sup></p>
                <p class="text-base ">Humidity:{{humidities[0]}}%</p>
                <p class="text-lg ">L:{{temps_min[0]}}<sup>{{tempSign}}</sup></p>
                <p class="text-base ">Wind:{{windSpeeds[0]}}km/h</p>
             </div>
            </div>
          </section>
        </div>
        <div class="bg-transparent p-4 rounded-lg shadow-md gap-y-4">
        </div>
    </div>
    <div>
        <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
            <li v-for="(temp, index) in temps.slice(1)" :key="index">
                <div class="bg-green-300 opacity-75 p-6 rounded-lg shadow-md">
                    <div v-if = "temps[index+1]">
                        <DailyWeatherCard
                            :conditionIcons="conditionIcons[index+1]"
                            :temps="temps[index+1]"
                            :conditionDescs="conditionDescs[index+1]"
                            :feels_like="temps_FeelLike[index+1]"
                            :temps_max="temps_max[index+1]"
                            :temps_min="temps_min[index+1]"
                            :humidities="humidities[index+1]"
                            :dayNumber="index"
                            :tempSign="tempSign"
                            :forecastDate="forecastDate(index+1)"
                            :windspeed = "windSpeeds[index+1]"
                        />
                    </div>
                </div>
            </li>
        </ul>
    </div>
  </div>
</div>
</template>

<script setup >
  import { ref, computed, onMounted, onUnmounted, callWithAsyncErrorHandling  } from 'vue';
  //import { useAsyncData } from '#app';
  const selectedValue = ref('');
  import { refreshNuxtData } from '#app'; // Import refreshNuxtData

   // using fetch instead useAsyncdata to avoid issue stopping fetch data once it's already onMounted.
  const data = ref(null);
  const abortController = new AbortController();

  // Computed property to determine if the selected value is 'valid' (not empty)
  const isSelectedValid = computed(() => selectedValue.value !== '');

  let iconImage = ref('/images/50n.png')
  const iconCode = ref('10n')

  const Key = ref('4b789f98ae236c0e032ca04e471c8c93')
  let tempSign = ref('(°C)')
  let unitType = ref('metric')
  const units = ref(['standard','metric','imperial'])
  const tempTypes = ref(['Kelvin','Celsius','Fahrenheit'])
  const tempUnit = computed(() => {
    if (tempType.value === 'K') {
       unitType.value = 'standard';
    } else if (tempType.value === 'C') {
       unitType.value = 'metric';
    } else {
       unitType.value = 'imperial';
    }
    return tempSign.value;
  });

  // "Monday, September 15, 2025"
  const forecastDate = (dayNumber) => {
    const todate = new Date()
    todate.setDate(todate.getDate() + dayNumber)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = todate.toLocaleDateString('en-US', options);
    return formattedDate;
  }

  const tempFloor = (temp) => {
    return Math.floor(temp)
  }

  const dateString = "2025-10-26T10:00:00.000Z";
  const dateObject = new Date(dateString);
  const tempType = ref('C') 
  const city = ref('Barrie')
  const numDays = ref(7)
  const country = ref('CA')
  const cityLon = ref(0.0000) 
  const cityLat = ref(0.0000)
  const iconImages = ref([])
  const cities = ref([])
  const days = ref([])
  const conditionIcons = ref([])
  const conditionMains = ref([])
  const conditionDescs = ref([])
  const conditionIds = ref([])
  const temps = ref([])
  const tempsCard = ref([])
  const temps_FeelLike = ref([])
  const temps_max = ref([])
  const temps_min = ref([])
  const pressures = ref([])
  const humidities = ref([])
  const visibilities = ref([])
  const windSpeeds = ref([])
  const windDegs = ref([])
  const windGusts = ref([])
  const cloudss = ref([])
  const rains = ref([])
  const ToSearch = ref(true);

  onMounted(async () => {
    // Perform some async operation after the component is mounted
    callWeatherData();
  });

  async function callWeatherData () {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city.value}&cnt=${numDays.value}&units=${unitType.value}&appid=${Key.value}`, { signal: abortController.signal });
      data.value = await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        alert('Fetch aborted');
      } else {
        alert('Error fetching data:', error);
      }
    }
    updateWeatherData(data);
    return {data}
  }

  //when the component is unmounted. This will cancel any pending fetch requests associated with that controller.
  onUnmounted(() => {
    abortController.abort();
  });


function updateWeatherData(data) {
    iconImages.value = []
    cities.value = []
    days.value = []
    conditionIcons.value = []
    conditionMains.value = []
    conditionDescs.value = []
    conditionIds.value = []
    temps.value = []
    temps_FeelLike.value = []
    temps_max.value = []
    temps_min.value = []
    pressures.value = []
    humidities.value = []
    visibilities.value = []
    windSpeeds.value = []
    windDegs.value = []
    windGusts.value = []
    cloudss.value = []
    rains.value = []

    if (tempType.value === 'K') {
       tempSign.value = '(°K)';
    } else if (tempType.value === 'C') {
       tempSign.value = '(°C)';
    } else {
       tempSign.value = '(°F)';
    }
  
    for (const f of data.value.list){
      humidities.value.push(`${f.humidity}`)
      temps.value.push(`${Math.floor(f.temp.day)}`)
      temps_min.value.push(`${Math.floor(f.temp.min)}`)
      temps_max.value.push(`${Math.floor(f.temp.max)}`)
      temps_FeelLike.value.push(`${Math.floor(f.feels_like.day)}`)
      windSpeeds.value.push(`${Math.floor(f.speed)}`)
      windDegs.value.push(`${f.deg}`)
      windGusts.value.push(`${f.gust}`)
      cloudss.value.push(`${f.clouds}`)
      rains.value.push(`${f.pop}`)
      for (const [key, value] of Object.entries(f.weather)) {
          const weatherValue = value
          for (var [keyw, valuew] of Object.entries(weatherValue)) {
            switch (keyw) {
              case 'description':
                  conditionDescs.value.push(valuew)
                  break;
              case 'icon':
                  conditionIcons.value.push(`/${valuew}.png`)// to be used w/ @nuxt/image & NuxtPicture
                  break;
              case 'id':
                  conditionIds.value.push(valuew)
                  break;
              case 'main':
                  conditionMains.value.push(valuew)
                  break;
              default :
                  console.log('invalid:', valuew);
              }
          }
      }
   }   
  
  }

    const handleRefresh = async () => {
     // You can refresh specific data by providing its key(s)
     // or refresh all data by calling refreshNuxtData() without arguments
     await refreshNuxtData('weather'); 
     // Alternatively, if you have access to the refresh function returned by useAsyncData:
     //await refresh(); 
     console.log('Data refreshed!',weather);
    };

</script>
<style lang="css" scoped>
</style>



 
