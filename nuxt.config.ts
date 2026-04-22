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

  runtimeConfig: {
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
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
