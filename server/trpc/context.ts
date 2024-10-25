import type { H3Event } from "h3";

export async function createContext(event: H3Event) {
  const session = await getUserSession(event);

  return {
    session,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
