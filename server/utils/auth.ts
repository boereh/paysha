import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { database } from "./database";
// import { createClient } from "@supabase/supabase-js";

// const runtime_config = useRuntimeConfig();

// export const supabase_server = createClient(
//   runtime_config.public.supabase_url,
//   runtime_config.supabase_service_key,
// );

export const auth = betterAuth({
  secret: process.env.NUXT_BETTER_AUTH_SECRET,
  database: drizzleAdapter(database, {
    provider: "sqlite",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
});
