import { noteUpdateSchema } from "~~/server/utils/validations";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { Note } from "~~/server/utils/drizzle";

export const notesRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    const notes = await ctx.db.query.notes.findMany();

    return notes;
  }),

  create: protectedProcedure
    .input(noteInsertSchema.omit({ userId: true }))
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.db
        .insert(tables.notes)
        .values({
          ...input,
          userId: ctx.user.id,
        })
        .returning({
          id: tables.notes.id,
          content: tables.notes.content,
        });

      const note = result[0];

      if (!note) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create note",
        });
      }

      await upsertNoteVector(note);

      return {
        id: note.id,
        content: input.content,
      };
    }),

  update: protectedProcedure
    .input(noteUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .update(tables.notes)
        .set(input)
        .where(eq(tables.notes.id, input.id));

      if (input.content) {
        const existing = await ctx.db.query.notes.findFirst({
          where: eq(tables.notes.id, input.id),
        });

        if (input.content !== existing?.content) {
          await upsertNoteVector({
            id: input.id,
            content: input.content,
          });
        }
      }

      return {
        id: input.id,
      };
    }),

  delete: protectedProcedure
    .input(noteSchema.pick({ id: true }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.delete(tables.notes).where(eq(tables.notes.id, input.id));

      if (useRuntimeConfig().hub.remote) {
        await hubVectorize("notes").deleteByIds([input.id.toString()]);
      }

      return null;
    }),
});

async function upsertNoteVector(note: Pick<Note, "id" | "content">) {
  if (!useRuntimeConfig().hub.remote) {
    return;
  }

  const { data } = await hubAI().run("@cf/baai/bge-base-en-v1.5", {
    text: [note.content],
  });

  const values = data[0];

  if (!values) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to generate vector embedding",
    });
  }

  await hubVectorize("notes").upsert([
    {
      id: note.id.toString(),
      values: values,
    },
  ]);
}
