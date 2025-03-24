import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import fastifyHelmet from "@fastify/helmet";
import fastifyRateLimit from "@fastify/rate-limit";
import cookie from "@fastify/cookie";
import formbody from "@fastify/formbody";
import { fileURLToPath } from "url";
import cors from "@fastify/cors";
import { dirname } from "path";
import path from "path";

// import internal modules
import authRoutes from "./app/api/auth/routes.js";
import pg_database from "./app/db/postgres.js";
import routes from "./app/routes/v1/index.js";
import publicRoutes from "./app/routes/v1/public.js";
import uploadFileRoutes from "./app/api/upload_files/routes.js";
import { ErrorHandler } from "./app/utils/error-handler.js";
/*
    Register External packages, routes, database connection
*/

export default (app) => {
  app.setErrorHandler(ErrorHandler);
  app.register(fastifyRateLimit, {
    max: Number(process.env.MAX_RATE_LIMIT),
    timeWindow: process.env.TIME_WINDOW,
    errorResponseBuilder: (req, context) => {
      throw {
        statusCode: 429,
        error: "Too Many Requests",
        message: `You have exceeded the ${context.max} requests in ${context.after} time window.`,
      };
    },
  });
  app.register(fastifyHelmet);
  app.register(fastifyStatic, {
    root: path.join(dirname(fileURLToPath(import.meta.url), "public")),
  });
  app.register(formbody);
  app.register(cors, {
    origin: ["http://localhost:3000", "http://localhost:4000"],
    credentials: true,
  });

  app.register(cookie, {
    hook: "onRequest",
  });
  app.register(pg_database);
  app.register(fastifyMultipart, {
    limits: { fileSize: 5 * 1024 * 1024 * 1024 },
  });
  app.register(routes, { prefix: "v1" });
  app.register(publicRoutes, { prefix: "v1" });
  app.register(authRoutes, { prefix: "v1/auth" });
  app.register(uploadFileRoutes, { prefix: "v1/upload" });
};
