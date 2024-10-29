import type { H3Event } from "h3";

export async function createContext(event: H3Event) {
  const session = await getUserSession(event);

  const db = useDrizzle();
  const ai = hubAI();

  return {
    session,
    db,
    ai,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
