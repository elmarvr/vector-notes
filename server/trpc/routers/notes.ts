import { publicProcedure, router } from "../trpc";

export const notesRouter = router({
  list: publicProcedure.query(async () => {
    const db = useDrizzle();

    const notes = await db.query.notes.findMany();

    return notes;
  }),

  create: publicProcedure
    .input(noteInsertSchema)
    .mutation(async ({ input }) => {
      const db = useDrizzle();

      const note = await db.insert(tables.notes).values(input);

      return note;
    }),
});
