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
      presets: [
        presetWind3(),
        presetTypography(),
        presetWebFonts({
          fonts: {
            sans: ["Inter"],
          },
        }),
        {
          name: "neu",
          enforce: "pre",
          rules: [
            [
              /^neushadow-(\d+)$/,
              ([, d]) => ({
                "box-shadow": [...Array(Number.parseInt(d))]
                  .map((v, i) => `${i + 1}px ${i + 1}px 0px currentColor`)
                  .join(","),
              }),
            ],
          ],
        },
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
