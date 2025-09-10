import { createAuthClient } from "better-auth/vue";
import { polarClient } from "@polar-sh/better-auth";

export const auth_client = createAuthClient({
  plugins: [polarClient()],
});
