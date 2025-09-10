import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { database } from "./database";
import { polar_plugin, polar_client } from "./polar";
// import { dodo } from "./dodopayments";
import * as SCHEMAS from "./schemas";
import * as AUTH_SCHEMAS from "./schemas-auth";
import { getEnvVar } from ".";

export const auth = betterAuth({
  secret: getEnvVar("BETTER_AUTH_SECRET"),
  database: drizzleAdapter(database, {
    provider: "sqlite",
    schema: { ...SCHEMAS, ...AUTH_SCHEMAS },
  }),
  socialProviders: {
    google: {
      clientId: getEnvVar("GOOGLE_CLIENT_ID"),
      clientSecret: getEnvVar("GOOGLE_CLIENT_SECRET"),
    },
    github: {
      clientId: getEnvVar("GITHUB_CLIENT_ID"),
      clientSecret: getEnvVar("GITHUB_CLIENT_SECRET"),
    },
  },
  plugins: [polar_plugin()],
});
