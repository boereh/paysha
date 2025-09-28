const CLOUD_BASIC_ID = getEnvVar("POLAR_CLOUD_BASIC_ID");

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  if (!session) return false;

  const customer = await polar_client.customers.getStateExternal({
    externalId: session.user.id,
  });

  const index = customer.activeSubscriptions.findIndex(
    (v) => v.productId === CLOUD_BASIC_ID && v.status === "active",
  );

  return index >= 0;
});
