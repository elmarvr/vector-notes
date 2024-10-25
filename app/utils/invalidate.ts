import type { AnyQueryProcedure } from "@trpc/server";
import { getQueryKey } from "trpc-nuxt/client";

type InvalidateParams<TProcedure extends AnyQueryProcedure> =
  typeof getQueryKey<TProcedure> extends (...args: infer TArgs) => string
    ? TArgs
    : never;

export async function refresh<TProcedure extends AnyQueryProcedure>(
  ...params: InvalidateParams<TProcedure>
) {
  const queryKey = getQueryKey<TProcedure>(...params);

  return refreshNuxtData(queryKey);
}
