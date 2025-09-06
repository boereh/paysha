import { dodopayments, checkout } from "@dodopayments/better-auth";
import DodoPayments from "dodopayments";

const runtime_config = useRuntimeConfig();

export const dodo_client = new DodoPayments({
  bearerToken: runtime_config.dodoSecret,
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
      successUrl: "/success",
      authenticatedUsersOnly: true,
    }),
  ],
});
