import { drizzle } from "drizzle-orm/d1";

import { notes } from "../database/schema";

export * from "drizzle-orm/expressions";

export const tables = {
  notes,
};

export function useDrizzle() {
  return drizzle(hubDatabase(), {
    schema: {
      ...tables,
    },
  });
}

export type Note = typeof tables.notes.$inferSelect;
export type NoteInsert = typeof tables.notes.$inferInsert;
