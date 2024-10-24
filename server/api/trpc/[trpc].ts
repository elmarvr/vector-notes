import { createNuxtApiHandler } from "trpc-nuxt";
import { appRouter } from "~~/server/trpc/routers/_app";
import { createContext } from "~~/server/trpc/context";

export default createNuxtApiHandler({
  router: appRouter,
  createContext,
});
