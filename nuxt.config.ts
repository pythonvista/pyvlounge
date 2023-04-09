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
  modules: ['@nuxtjs/tailwindcss','nuxt-security', 'nuxt-swiper', 'nuxt-quasar-ui', '@nuxtjs/ionic','@pinia/nuxt'],
  quasar: { /* */ }
});
