// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxt/image',
    '@kspace-trk/admin-ui-components',
  ],
  ssr: false,

  devtools: { enabled: true },

  // css: [
  //   '@kspace-trk/admin-ui-components/runtime/assets/css/reset.css',
  //   '@kspace-trk/admin-ui-components/runtime/assets/css/fonts/mplus-1p.css',
  // ],

  runtimeConfig: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },

  compatibilityDate: '2024-11-01',

  nitro: {
    preset: 'vercel',
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/variables.scss" as *;',
        },
      },
    },
  },

  eslint: {
    config: {
      stylistic: {
        indent: 2,
        semi: true,
        quotes: 'single',
      },
    },
  },
});
