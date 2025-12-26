import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { database } from "./database";
import { polar_plugin } from "./polar";
import * as SCHEMAS from "./schemas";
import * as AUTH_SCHEMAS from "./schemas-auth";

export const auth = betterAuth({
  secret: getEnvVar("BETTER_AUTH_SECRET"),
  database: drizzleAdapter(database, {
    provider: "sqlite",
    schema: { ...SCHEMAS, ...AUTH_SCHEMAS },
  }),
  socialProviders: {
    discord: {
      clientId: getEnvVar("DISCORD_CLIENT_ID"),
      clientSecret: getEnvVar("DISCORD_CLIENT_SECRET"),
    },
    facebook: {
      clientId: getEnvVar("FACEBOOK_CLIENT_ID"),
      clientSecret: getEnvVar("FACEBOOK_CLIENT_SECRET"),
    },
    google: {
      clientId: getEnvVar("GOOGLE_CLIENT_ID"),
      clientSecret: getEnvVar("GOOGLE_CLIENT_SECRET"),
    },
    github: {
      clientId: getEnvVar("GITHUB_CLIENT_ID"),
      clientSecret: getEnvVar("GITHUB_CLIENT_SECRET"),
    },
    gitlab: {
      clientId: getEnvVar("GITLAB_CLIENT_ID"),
      clientSecret: getEnvVar("GITLAB_CLIENT_SECRET"),
      issuer: getEnvVar("GITLAB_ISSUER"),
    },
    linkedin: {
      clientId: getEnvVar("LINKEDIN_CLIENT_ID"),
      clientSecret: getEnvVar("LINKEDIN_CLIENT_SECRET"),
    },
    reddit: {
      clientId: getEnvVar("REDDIT_CLIENT_ID"),
      clientSecret: getEnvVar("REDDIT_CLIENT_SECRET"),
    },
    roblox: {
      clientId: getEnvVar("ROBLOX_CLIENT_ID"),
      clientSecret: getEnvVar("ROBLOX_CLIENT_SECRET"),
    },
    spotify: {
      clientId: getEnvVar("SPOTIFY_CLIENT_ID"),
      clientSecret: getEnvVar("SPOTIFY_CLIENT_SECRET"),
    },
    twitch: {
      clientId: getEnvVar("TWITCH_CLIENT_ID"),
      clientSecret: getEnvVar("TWITCH_CLIENT_SECRET"),
    },
    twitter: {
      clientId: getEnvVar("TWITTER_CLIENT_ID"),
      clientSecret: getEnvVar("TWITTER_CLIENT_SECRET"),
    },
  },
  plugins: [polar_plugin()],
});
