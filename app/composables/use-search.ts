import { type InferOutput, type ObjectSchema, parse } from "valibot";
import type { Reactive } from "vue";

export function useSearch<TSchema extends ObjectSchema<any, any>>(
  schema: TSchema
): Reactive<InferOutput<TSchema>> {
  const router = useRouter();
  const route = useRoute();

  const query = reactive(parse(schema, route.query));

  watch(
    () => route.query,
    (value) => {
      Object.assign(query, parse(schema, value));
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
