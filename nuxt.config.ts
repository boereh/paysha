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
  icon: {
    serverBundle: {
      collections: ["solar", "simple-icons"],
    },
  },
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
        dim: {
          50: "#D8DCDF",
          100: "#CDD2D6",
          200: "#BBC2C7",
          300: "#A9B2B8",
          400: "#9AA2A7",
          500: "#8B9297",
          600: "#7C8287",
          700: "#6B7074",
          800: "#5D6165",
          900: "#4F5356",
          950: "#484C4F",
        },
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
    TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,

    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,

    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    POLAR_ACCESS_TOKEN: process.env.POLAR_ACCESS_TOKEN,
    POLAR_WEBHOOK_SECRET: process.env.POLAR_WEBHOOK_SECRET,

    DODO_SECRET: process.env.DODO_SECRET,
    DODO_WEBHOOK_SECRET: process.env.DODO_WEBHOOK_SECRET,
  },
});
