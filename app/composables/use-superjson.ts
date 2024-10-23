import { parse } from "superjson";

export const useSuperjson: typeof useFetch = (request, opts?) => {
  const fetch = useFetch(request, {
    ...opts,
    transform: (data) => {
      const value = parse(data as unknown as string);

      if (opts?.transform) {
        return opts.transform(value as any);
      }

      return value as string;
    },
  });

  return fetch;
};
