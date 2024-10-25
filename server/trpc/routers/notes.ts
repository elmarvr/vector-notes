import { noteUpdateSchema } from "~~/server/utils/validations";
import { privateProcedure, publicProcedure, router } from "../trpc";

export const notesRouter = router({
  list: publicProcedure.query(async () => {
    const db = useDrizzle();

    const notes = await db.query.notes.findMany();

    return notes;
  }),

  create: privateProcedure
    .input(noteInsertSchema.omit({ userId: true }))
    .mutation(async ({ input, ctx }) => {
      const db = useDrizzle();

      const [note] = await db
        .insert(tables.notes)
        .values({
          ...input,
          userId: ctx.user.id,
        })
        .returning({
          id: tables.notes.id,
        });

      return note;
    }),

  update: publicProcedure
    .input(noteUpdateSchema)
    .mutation(async ({ input }) => {
      const db = useDrizzle();

      await db
        .update(tables.notes)
        .set(input)
        .where(eq(tables.notes.id, input.id));

      return {
        id: input.id,
      };
    }),

  delete: publicProcedure
    .input(noteSchema.pick({ id: true }))
    .mutation(async ({ input }) => {
      const db = useDrizzle();

      await db.delete(tables.notes).where(eq(tables.notes.id, input.id));

      return null;
    }),

  byId: publicProcedure
    .input(noteSchema.pick({ id: true }))
    .query(async ({ input }) => {
      const db = useDrizzle();

      const note = await db.query.notes.findFirst({
        where: eq(tables.notes.id, input.id),
      });

      return note;
    }),
});
