import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

export const turso_client = createClient({
  url: process.env.NUXT_TURSO_DATABASE_URL!,
  authToken: process.env.NUXT_TURSO_AUTH_TOKEN!,
});

export const database = drizzle({
  client: turso_client,
});
