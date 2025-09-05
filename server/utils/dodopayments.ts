import {
  dodopayments,
  checkout,
  portal,
  webhooks,
} from "@dodopayments/better-auth";
import DodoPayments from "dodopayments";

const runtime_config = useRuntimeConfig();

export const dodo_client = new DodoPayments({
  bearerToken: runtime_config.autumnSecret,
  environment: "test_mode",
});

export const dodo = dodopayments({
  client: dodo_client,
  createCustomerOnSignUp: true,
  use: [
    checkout({
      products: [
        {
          productId: "pdt_G1mVZqJTCCTO1Uy7EFRci",
          slug: "cloud",
        },
      ],
      successUrl: "/dashboard/success",
      authenticatedUsersOnly: true,
    }),
    portal(),
    webhooks({
      webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_SECRET!,
      onPayload: async (payload: any) => {
        console.log("Received webhook:", payload);
      },
    }),
  ],
});
