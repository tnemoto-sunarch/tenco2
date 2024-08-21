// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'ja-JP'
      },
      title: 'てんこちゃん'
    }
  },
  devtools: { enabled: true },
  modules: [
    'nuxt-quasar-ui',
    '@pinia/nuxt'
  ],
  quasar: {
    // Configurable Component Defaults
    components: {
      defaults: {
        QBtn: {
          dense: true,
          flat: true,
        },
        QInput: {
          dense: true
        }
      }
    }
  },
  css: [
    'quasar/animations',
    'quasar/icons',
    'quasar/css',
  ]
})

