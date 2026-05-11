import { createGlobalState, useStorage } from "@vueuse/core";

export const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

export const useGlobalState = createGlobalState(() =>
  useStorage<string>("vueuse-local-storage", ""),
);
