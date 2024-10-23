import { consola } from "consola";
import { migrate } from "drizzle-orm/d1/migrator";

export default defineNitroPlugin(async () => {
  if (!import.meta.dev) return;

  onHubReady(async () => {
    const t0 = performance.now();
    await migrate(useDrizzle(), {
      migrationsFolder: "server/database/migrations",
    })
      .then(() => {
        const t1 = performance.now();
        consola.success(`Database migrations done in ${Math.round(t1 - t0)}ms`);
      })
      .catch((err) => {
        consola.error("Database migrations failed", err);
      });
  });
});
