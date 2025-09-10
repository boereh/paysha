import { Polar } from "@polar-sh/sdk";
import { polar, checkout, webhooks } from "@polar-sh/better-auth";

export const polar_client = new Polar({
  accessToken: getEnvVar("POLAR_ACCESS_TOKEN"),
  server: process.env.NODE_ENV === "development" ? "sandbox" : "production",
});

export const CLOUD_BASIC = {
  productId: "6e3543bb-d220-4bd2-9789-d18c80c5f715",
  slug: "cloud-basic",
};

export function polar_plugin() {
  return polar({
    client: polar_client,
    createCustomerOnSignUp: true,
    use: [
      checkout({
        products: [CLOUD_BASIC],
        successUrl: "/account/success",
        authenticatedUsersOnly: true,
      }),
      webhooks({
        secret: getEnvVar("POLAR_WEBHOOK_SECRET"),
        async onPayload(payload) {
          console.log("polar webhook:", payload);
        },
      }),
    ],
  });
}
