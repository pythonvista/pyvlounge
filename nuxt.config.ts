// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Lounge Management System',
      meta: [
        {
          name: 'description',
          content: 'a management system for lounge system',
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        },
      ],
    },
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'TSG Lounge',
      short_name: 'TSG',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'img/logo.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'img/logo.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'img/logo.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
  },
  runtimeConfig: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    public: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-security',
    'nuxt-swiper',
    'nuxt-quasar-ui',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
  ],
  quasar: {
    plugins: ['Notify', 'Dialog'],
  },
});
