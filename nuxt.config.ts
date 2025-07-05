import {
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  modules: ["@nuxt/fonts", "@nuxt/icon", "@unocss/nuxt"],
  unocss: {
    transformers: [
      transformerCompileClass(),
      transformerVariantGroup(),
      transformerDirectives(),
    ],
  },
});
