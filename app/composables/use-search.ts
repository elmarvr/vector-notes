import type { z } from "zod";

export function useSearch<TSchema extends z.ZodObject<any>>(
  schema: TSchema
): TSchema["_output"] {
  const router = useRouter();
  const route = useRoute();

  const query = reactive(schema.parse(route.query));

  watch(
    () => route.query,
    (value) => {
      Object.assign(query, schema.parse(value));
    },
    {
      deep: true,
    }
  );

  watch(
    () => query,
    (value) => {
      const { params, query, hash } = route;

      router.push({
        params,
        hash,
        query: {
          ...query,
          ...value,
        },
      });
    },
    {
      deep: true,
      flush: "sync",
    }
  );

  return query;
}
