import { Polar } from "@polar-sh/sdk";
import { polar, checkout, webhooks } from "@polar-sh/better-auth";

export const polar_client = new Polar({
  accessToken: getEnvVar("POLAR_ACCESS_TOKEN"),
  server: process.env.NODE_ENV === "development" ? "sandbox" : "production",
});

export function polar_plugin() {
  return polar({
    client: polar_client,
    createCustomerOnSignUp: true,
    use: [
      checkout({
        products: [
          {
            productId: getEnvVar("POLAR_CLOUD_BASIC_ID"),
            slug: "cloud-basic",
          },
        ],
        successUrl: "/account/success",
        authenticatedUsersOnly: true,
      }),
    ],
  });
}
