// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxt/image',
  ],
  ssr: false,

  devtools: { enabled: true },

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
