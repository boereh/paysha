import {
  presetWind3,
  presetWebFonts,
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@unocss/nuxt", "reka-ui/nuxt", "@nuxt/icon"],
  css: ["@unocss/reset/tailwind.css"],
  unocss: {
    presets: [
      presetWind3(),
      presetWebFonts({
        fonts: {
          sans: "Poppins:400,500,600",
        },
      }),
    ],
    transformers: [
      transformerCompileClass(),
      transformerDirectives(),
      transformerVariantGroup(),
    ],
  },
  runtimeConfig: {
    tursoDatabaseUrl: "",
    tursoAuthToken: "",

    betterAuthSecret: "",

    githubClientId: "",
    githubClientSecret: "",
    googleClientId: "",
    googleClientSecret: "",

    polarAccessToken: "",
    polarWebhookSecret: "",

    public: {
      betterAuthUrl: "",
    },
  },
});
