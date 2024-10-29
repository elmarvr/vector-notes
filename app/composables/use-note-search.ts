import { z } from "zod";

export function useNoteSearch() {
  const note = useRouteQuery("note", undefined, {
    transform: (value) => {
      return z
        .union([z.coerce.number(), z.literal("create")])
        .optional()
        .catch(undefined)
        .parse(value);
    },
  });

  return reactive({
    note,
  });
}
