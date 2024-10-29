import type { H3Event } from "h3";

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },

  async onSuccess(event, result) {
    const user = await getUser(event, result.user);

    await setUserSession(event, {
      user: {
        ...user,
        role: "user",
      },
    });

    return sendRedirect(event, "/");
  },
});

export async function getUser(
  event: H3Event,
  data: {
    id: string;
    email: string;
    name: string;
  }
) {
  const db = useDrizzle();

  const existingUser = await db.query.users.findFirst({
    where: eq(tables.users.githubId, data.id),
    columns: {
      id: true,
      email: true,
      name: true,
    },
  });

  if (existingUser) {
    return existingUser;
  }

  const session = await getUserSession(event);
  if (session.user?.role === "guest") {
    const result = await db
      .update(tables.users)
      .set({
        role: "user",
        name: data.name,
        email: data.email,
        githubId: data.id,
      })
      .where(eq(tables.users.id, session.user.id))
      .returning({
        id: tables.users.id,
        email: tables.users.email,
        name: tables.users.name,
      });

    return result[0];
  }

  const result = await db
    .insert(tables.users)
    .values({
      email: data.email,
      name: data.name,
      githubId: data.id,
    })
    .returning({
      id: tables.users.id,
      email: tables.users.email,
      name: tables.users.name,
    });

  return result[0];
}
