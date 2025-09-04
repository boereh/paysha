import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { database } from "./database";
import { polar_plugin } from "./polar";
import * as SCHEMAS from "./schemas";
import * as AUTH_SCHEMAS from "./schemas-auth";

// import { createClient } from "@supabase/supabase-js";

const runtime_config = useRuntimeConfig();

// export const supabase_server = createClient(
//   runtime_config.public.supabase_url,
//   runtime_config.supabase_service_key,
// );

export const auth = betterAuth({
  secret: runtime_config.betterAuthSecret,
  database: drizzleAdapter(database, {
    provider: "sqlite",
    schema: { ...SCHEMAS, ...AUTH_SCHEMAS },
  }),
  socialProviders: {
    google: {
      clientId: runtime_config.googleClientId,
      clientSecret: runtime_config.googleClientSecret,
    },
    github: {
      clientId: runtime_config.githubClientId,
      clientSecret: runtime_config.githubClientSecret,
    },
  },
  plugins: [polar_plugin()],
});
