import type { H3Event } from "h3";

export async function setAnonymousSession(event: H3Event) {
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
    throw createError({
      status: 500,
      message: "Failed to create anonymous session",
    });
  }

  return setUserSession(event, {
    user: {
      id: user.id,
      role: "guest",
      name: null,
      email: null,
      avatar: null,
    },
  });
}
