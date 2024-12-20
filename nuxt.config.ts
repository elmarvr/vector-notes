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
    "@nuxtjs/mdc",
    // "nuxt-cron",
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
        metadataIndexes: {
          userId: "number",
        },
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
