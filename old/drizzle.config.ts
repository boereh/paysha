import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "turso",
  schema: ["./server/utils/schemas.ts", "./server/utils/schemas-auth.ts"],
  dbCredentials: {
    url: process.env.NUXT_TURSO_DATABASE_URL!,
    authToken: process.env.NUXT_TURSO_AUTH_TOKEN!,
  },
});
