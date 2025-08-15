export async function load({ parent, locals }) {
  await parent();

  if (!locals.user) return {};

  return { book: {} };
}
