import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const noteSchema = createSelectSchema(tables.notes);
export const noteInsertSchema = createInsertSchema(tables.notes);
