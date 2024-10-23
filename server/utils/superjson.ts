import { stringify } from "superjson";

export function superjson<T>(data: T): SuperJsonResponse<T> {
  return stringify(data) as SuperJsonResponse<T>;
}

type SuperJsonResponse<T> = {
  [K in keyof T]: SuperJsonResponse<T[K]> & {
    toJSON(): T[K];
  };
};
