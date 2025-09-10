export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });
  if (!session) return;

  const user_id = session.user.id;
  if (!user_id) return;

  const customer = await polar_client.customers.getStateExternal({
    externalId: user_id,
  });
  const index = customer.activeSubscriptions.findIndex(
    (v) => v.productId === CLOUD_BASIC.productId && v.status === "active",
  );
  if (index >= 0) return;

  const checkout = await polar_client.checkouts.create({
    products: ["6e3543bb-d220-4bd2-9789-d18c80c5f715"],
    customerId: customer.id,
  });

  return checkout.url;
});
