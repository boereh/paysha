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
  modules: ["@unocss/nuxt", "reka-ui/nuxt", "@nuxt/icon", "@polar-sh/nuxt"],
  css: ["@unocss/reset/tailwind.css"],
  unocss: {
    presets: [
      presetWind3({ dark: "media" }),
      presetWebFonts({
        fonts: {
          sans: "Poppins:400,500,600",
        },
      }),
    ],
    theme: {
      colors: {
        whiskey: {
          50: "#fbf5f1",
          100: "#f7ece4",
          200: "#f4e2d6",
          300: "#f0d9c8",
          400: "#ebcfbb",
          500: "#e7c5ad",
          600: "#e3bca0",
          700: "#dfb293",
          800: "#daa985",
          900: "#d69f78",
          950: "#d1966a",

          dark: {
            50: "#d1966a",
            100: "#b8845d",
            200: "#a0724f",
            300: "#886043",
            400: "#714f36",
            500: "#5b3f2a",
            600: "#452f1f",
            700: "#312014",
            800: "#1e120a",
            900: "#0c0603",
            950: "#020100",
          },
        },
      },
    },
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

    dodoSecret: "",
    dodoWebhookSecret: "",

    public: {
      betterAuthUrl: "",
    },
  },
});
