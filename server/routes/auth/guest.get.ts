export default defineEventHandler(async (event) => {
  const db = useDrizzle();

  const result = await db
    .insert(tables.users)
    .values({
      role: "guest",
    })
    .returning({
      id: tables.users.id,
    });

  const user = result[0];

  if (!user) {
    throw new Error("Failed to create anonymous session");
  }

  await setUserSession(event, {
    user: {
      id: user.id,
      role: "guest",
      name: null,
      email: null,
    },
  });

  return sendRedirect(event, "/");
});
