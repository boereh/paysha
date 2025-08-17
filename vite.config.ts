import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import unocss from "unocss/vite";
import {
  presetWind3,
  presetWebFonts,
  presetTypography,
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import unicons from "unplugin-icons/vite";

export default defineConfig({
  plugins: [
    sveltekit(),
    unocss({
      theme: {
        fontSize: {
          xxs: {
            fontSize: "0.625rem",
            lineHeight: "1rem",
          },
        },
      },
      presets: [
        presetWind3(),
        presetTypography(),
        presetWebFonts({
          fonts: {
            sans: ["Inter:400,500,600,700"],
          },
        }),
      ],
      transformers: [
        transformerCompileClass(),
        transformerDirectives(),
        transformerVariantGroup(),
      ],
    }),
    unicons({
      compiler: "svelte",
    }),
  ],
});
