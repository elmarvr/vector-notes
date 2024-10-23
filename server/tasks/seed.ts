import { consola } from "consola";
import type { NoteInsert } from "../utils/drizzle";

export default defineTask({
  meta: {
    name: "db:seed",
    description: "Run database seed task",
  },
  async run() {
    const t0 = performance.now();

    const notes = [
      {
        title: "Elmar's first note",
        content: "This is the content of Elmar's first note",
      },
    ] satisfies NoteInsert[];

    await useDrizzle().insert(tables.notes).values(notes);

    const t1 = performance.now();

    consola.success(`Database seed done in ${Math.round(t1 - t0)}ms`);

    return { result: "success" };
  },
});
