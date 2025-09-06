import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { database } from "./database";
// import { polar_plugin } from "./polar";
// import { dodo } from "./dodopayments";
import * as SCHEMAS from "./schemas";
import * as AUTH_SCHEMAS from "./schemas-auth";

export const auth = betterAuth({
  secret: process.env.NUXT_BETTER_AUTH_SECRET!,
  database: drizzleAdapter(database, {
    provider: "sqlite",
    schema: { ...SCHEMAS, ...AUTH_SCHEMAS },
  }),
  socialProviders: {
    google: {
      clientId: process.env.NUXT_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NUXT_GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.NUXT_GITHUB_CLIENT_ID!,
      clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [],
  hooks: {
    after: createAuthMiddleware(async (event) => {
      console.log(event.context.session);
      console.log(event.context.newSession);
      console.log(event.path);
    }),
  },
});
