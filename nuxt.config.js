// https://nuxt.com/docs/api/configuration/nuxt-config

//import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  /*
  experimental: {
    defaults: {
      useAsyncData: {
        deep: false // to allow shwllowRef to read shallow objects data
      }
    }
  },
  */
  modules: ['@nuxtjs/tailwindcss','@tailwindcss/postcss', '@nuxt/image',],
   image: {
    dir: 'assets/images', // This tells @nuxt/image to look in assets/images
    // Other image options if needed
  },
 
  //ssr: false,
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css'
        }
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js'
        }
      ],
    }
  },
  /*
  runtimeConfig: {
    Key: process.env.Key
  }
  */
})
