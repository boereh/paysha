import { Polar } from "@polar-sh/sdk";
import { polar, checkout } from "@polar-sh/better-auth";

export const polar_client = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: "sandbox",
});

export function polar_plugin() {
  return polar({
    client: polar_client,
    createCustomerOnSignUp: true,
    use: [
      checkout({
        products: [
          {
            productId: "6e3543bb-d220-4bd2-9789-d18c80c5f715",
            slug: "cloud",
          },
        ],
        successUrl: process.env.POLAR_SUCCESS_URL,
        authenticatedUsersOnly: true,
      }),
    ],
  });
}
