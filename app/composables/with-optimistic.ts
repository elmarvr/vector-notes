import {} from "trpc-nuxt";
import { getQueryKey } from "trpc-nuxt/client";

type Query = { query: (input: any) => any };

type QueryConfig<T extends Record<string, Query>> = {
  [K in keyof T]: [T[K], Parameters<T[K]["query"]>[0]];
};

type QueryStore<TQueries extends Record<string, Query>> = {
  [K in keyof TQueries]: Awaited<ReturnType<TQueries[K]["query"]>>;
};

export function withOptimistic<
  T extends { mutate: (input: any) => any },
  TQueries extends Record<string, Query>
>(
  procedure: T,
  opts: {
    queries: QueryConfig<TQueries>;
    onMutate: (
      store: QueryStore<TQueries>,
      input: Parameters<T["mutate"]>[0]
    ) => void;
  }
): T {
  const store = useQueryStore(opts.queries);

  return {
    mutate: async (input: any) => {
      let previous = { ...store };

      opts.onMutate(store, input);

      try {
        await procedure.mutate(input);
        await refreshQueries(opts.queries);
      } catch (e) {
        Object.assign(store, previous);
      }
    },
  } as T;
}

async function refreshQueries<TQueries extends Record<string, Query>>(
  queries: QueryConfig<TQueries>
): Promise<void[]> {
  return Promise.all(
    Object.values(queries).map(([query, input]) =>
      refreshNuxtData(getQueryKey(query, input))
    )
  );
}

function useQueryStore<TQueries extends Record<string, Query>>(
  queries: QueryConfig<TQueries>
): QueryStore<TQueries> {
  return reactiveComputed(() => {
    return Object.entries(queries).reduce(
      (acc, [key, [query, input]]) => ({
        ...acc,
        [key]: useNuxtData(getQueryKey(query, input)).data,
      }),
      {}
    );
  }) as QueryStore<TQueries>;
}
