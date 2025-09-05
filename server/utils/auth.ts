import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { database } from "./database";
// import { polar_plugin } from "./polar";
import { dodo } from "./dodopayments";
import * as SCHEMAS from "./schemas";
import * as AUTH_SCHEMAS from "./schemas-auth";

const runtime_config = useRuntimeConfig();

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
  plugins: [dodo],
});
