import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { Context } from "~~/server/trpc/context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(async (opts) => {
  const user = opts.ctx.session.user;

  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return opts.next({
    ctx: {
      user,
    },
  });
});
export const router = t.router;
export const middleware = t.middleware;
