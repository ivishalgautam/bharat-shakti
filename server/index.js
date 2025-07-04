import config from "./app/config/index.js";
import server from "./server.js";
import fastify from "fastify";

const app = fastify({ logger: true });
// const app = fastify({
//   logger: {
//     level: "info",
//     transport: {
//       target: "@mgcrea/pino-pretty-compact",
//       options: {
//         translateTime: "HH:MM:ss Z",
//         ignore: "pid,hostname",
//         colorize: true,
//       },
//     },
//   },
// });

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
    app.listen({ port: config.port }, () => {
      app.cron.startAllJobs();
    });
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
};

start();
