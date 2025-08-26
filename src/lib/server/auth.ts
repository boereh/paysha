import { betterAuth } from "better-auth";
import { anonymous } from "better-auth/plugins";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";

export const auth = betterAuth({
  plugins: [sveltekitCookies(getRequestEvent), anonymous()],
});
