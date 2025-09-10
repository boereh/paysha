import { CLOUD_BASIC } from "~~/server/utils/polar";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  if (!session) return false;

  const customer = await polar_client.customers.getStateExternal({
    externalId: session.user.id,
  });

  const index = customer.activeSubscriptions.findIndex(
    (v) => v.productId === CLOUD_BASIC.productId && v.status === "active",
  );

  return index >= 0;
});
