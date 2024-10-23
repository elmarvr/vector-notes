import { superjson } from "../utils/superjson";

export default defineEventHandler(async (_) => {
  const db = useDrizzle();

  const notes = await db.query.notes.findMany();

  return superjson({
    notes,
  });
});
