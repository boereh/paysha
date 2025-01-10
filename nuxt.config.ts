import {
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import Aura from "@primevue/themes/aura";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@unocss/nuxt", "@nuxt/fonts", "@pinia/nuxt", "@vueuse/nuxt"],
  css: ["@unocss/reset/tailwind.css"],
  unocss: {
    transformers: [
      transformerCompileClass(),
      transformerDirectives(),
      transformerVariantGroup(),
    ],
  },
});
