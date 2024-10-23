// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxthub/core", "@nuxt/eslint", "@nuxtjs/tailwindcss"],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      helloText: "Hello from the Edge 👋",
    },
  },
  future: { compatibilityVersion: 4 },
  compatibilityDate: "2024-07-30",
  nitro: {
    experimental: {
      tasks: true,
    },
  },
  hub: {
    database: true,
  },
  eslint: {
    config: {},
  },
});