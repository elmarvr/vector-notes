import { drizzle } from "drizzle-orm/d1";

import { notes, users } from "../database/schema";

export * from "drizzle-orm/expressions";

export const tables = {
  notes,
  users,
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

export type User = typeof tables.users.$inferSelect;
export type UserInsert = typeof tables.users.$inferInsert;
