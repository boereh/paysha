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
  modules: [
    "@unocss/nuxt",
    "unplugin-icons/nuxt",
    "reka-ui/nuxt",
    "@nuxt/icon",
  ],
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
  // runtimeConfig: {
  //   turso_database_url: "",
  //   turso_auth_token: "",
  //   better_auth_secret: "",
  //   github_client_id: "",
  //   github_client_secret: "",
  //   google_client_id: "",
  //   google_client_secret: "",
  //   supabase_service_key: "",

  //   public: {
  //     better_auth_url: "",
  //     supabase_url: "",
  //     supabase_key: "",
  //   },
  // },
});
