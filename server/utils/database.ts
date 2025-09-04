import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const runtime_config = useRuntimeConfig();

console.log(runtime_config);
console.log(process.env);

export const turso_client = createClient({
  url: runtime_config.tursoDatabaseUrl,
  authToken: runtime_config.tursoAuthToken,
});

export const database = drizzle({
  client: turso_client,
});
