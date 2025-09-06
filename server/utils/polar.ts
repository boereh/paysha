import {} from "@polar-sh/sdk/webhooks";
import { Polar } from "@polar-sh/sdk";
import { polar, checkout, webhooks } from "@polar-sh/better-auth";

const runtime_config = useRuntimeConfig();

export const polar_client = new Polar({
  accessToken: runtime_config.polarAccessToken,
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
            productId: "6e3543bb-d220-4bd2-9789-d18c80c5f715",
            slug: "cloud",
          },
        ],
        successUrl: process.env.POLAR_SUCCESS_URL,
        authenticatedUsersOnly: true,
      }),
      webhooks({
        secret: runtime_config.polarWebhookSecret,
        async onPayload(payload) {
          console.log("polar webhook:", payload);
        },
      }),
    ],
  });
}
