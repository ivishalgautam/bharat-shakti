import config from "./app/config/index.js";
import server from "./server.js";
import fastify from "fastify";

const app = fastify({ logger: true });

try {
  server(app);
} catch (e) {
  console.log({ error: e });
  process.exit(1);
}

/**
 * Run the server!
 */
const start = async () => {
  try {
    // await server(app);
    await app.listen({ port: config.port }, () => {
      // app.cron.startAllJobs();
    });
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
};

start();
