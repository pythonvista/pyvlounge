// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    '/': {
      security: {
        rateLimiter: {
          tokensPerInterval: 200,
          interval: 'hour',
        },
      },
    },
  },
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
  modules: ['@nuxtjs/tailwindcss','nuxt-security', 'nuxt-swiper', 'nuxt-quasar-ui','@pinia/nuxt'],
  quasar: { /* */ }
});
