import { drizzle } from "drizzle-orm/d1";

import * as schema from "../database/schema";

export * from "drizzle-orm/expressions";

export const tables = {
  notes: schema.notes,
  users: schema.users,
};

export function useDrizzle() {
  return drizzle(hubDatabase(), {
    schema,
  });
}

export type Note = typeof schema.notes.$inferSelect;
export type NoteInsert = typeof schema.notes.$inferInsert;

export type User = typeof schema.users.$inferSelect;
export type UserInsert = typeof schema.users.$inferInsert;
