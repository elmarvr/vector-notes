import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const noteSchema = createSelectSchema(tables.notes);
export const noteInsertSchema = createInsertSchema(tables.notes);
export const noteUpdateSchema = noteSchema
  .partial()
  .merge(noteSchema.pick({ id: true }));
