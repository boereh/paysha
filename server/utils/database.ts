import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

export const turso_client = createClient({
  url: process.env.TURSO_DATABASE_URL as string,
  authToken: process.env.TURSO_AUTH_TOKEN as string,
});

export const database = drizzle({
  client: turso_client,
});
