// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  
  app:{
    head:{
        title: 'Lounge Management System',
        meta:[
            {name: 'description', content: 'a management system for lounge system'}
        ],
        link:[
            {rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'},
            {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'}
          
        ]
    }
  },
 
  runtimeConfig: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    public:{
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY
    },
   
   
    
  },
  modules: ['@nuxtjs/tailwindcss','nuxt-security', 'nuxt-swiper', 'nuxt-quasar-ui','@pinia/nuxt'],
  quasar: {
    plugins:['Notify', 'Dialog']
  },
 
  
});
