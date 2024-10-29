import { defineCronHandler } from "#nuxt/cron";

export default defineCronHandler("daily", async () => {
  const db = useDrizzle();

  const anonymousUsers = await db.query.users.findMany({
    where: eq(tables.users.role, "guest"),
    with: {
      notes: {
        orderBy: desc(tables.notes.updatedAt),
        limit: 1,
      },
    },
  });

  for (const user of anonymousUsers) {
    const note = user.notes[0];

    if (!note) {
      db.delete(tables.users).where(eq(tables.users.id, user.id));
      continue;
    }

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    if (note.updatedAt < weekAgo) {
      db.delete(tables.users).where(eq(tables.users.id, user.id));
    }
  }
});
