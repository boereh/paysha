import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { database } from "./database";
import { polar_plugin } from "./polar";
import * as SCHEMAS from "./schemas";
import * as AUTH_SCHEMAS from "./schemas-auth";

// import { createClient } from "@supabase/supabase-js";

// const runtime_config = useRuntimeConfig();

// export const supabase_server = createClient(
//   runtime_config.public.supabase_url,
//   runtime_config.supabase_service_key,
// );

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(database, {
    provider: "sqlite",
    schema: { ...SCHEMAS, ...AUTH_SCHEMAS },
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [polar_plugin()],
});
