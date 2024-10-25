export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },

  async onSuccess(event, { user }) {
    const db = useDrizzle();

    let dbUser = await db.query.users.findFirst({
      where: eq(tables.users.githubId, user.id),
    });

    if (!dbUser) {
      const result = await db
        .insert(tables.users)
        .values({
          email: user.email,
          name: user.name,
          githubId: user.id,
        })
        .returning();

      dbUser = result[0];
    }

    await setUserSession(event, {
      user: {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
      },
    });

    return sendRedirect(event, "/");
  },
});
