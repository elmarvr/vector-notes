import { setAnonymousSession } from "~~/server/utils/auth";

export default defineEventHandler(async (event) => {
  await setAnonymousSession(event);

  return sendRedirect(event, "/");
});
