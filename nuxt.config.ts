// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxthub/core",
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxt/icon",
    "@vueuse/nuxt",
    "radix-vue/nuxt",
    "nuxt-auth-utils",
    "@pinia/nuxt",
    "nuxt-time",
  ],

  components: [
    "~/components",
    {
      path: "~/components/ui",
      prefix: "Ui",
    },
  ],

  imports: {
    dirs: ["stores"],
  },

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
    ai: true,
    vectorize: {
      notes: {
        dimensions: 768,
        metric: "cosine",
      },
    },
  },
  eslint: {
    config: {},
  },
  googleFonts: {
    families: {
      Inconsolata: true,
    },
  },
  radix: {
    prefix: "Radix",
  },
  build: {
    transpile: ["trpc-nuxt"],
  },
});