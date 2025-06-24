import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import formbody from "@fastify/formbody";
import fastifyHelmet from "@fastify/helmet";
import fastifyMultipart from "@fastify/multipart";
import fastifyRateLimit from "@fastify/rate-limit";
import fastifyStatic from "@fastify/static";
import fastifyCron from "fastify-cron";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// import internal modules
import authRoutes from "./app/api/auth/routes.js";
import uploadFileRoutes from "./app/api/upload_files/routes.js";
import closingTenderReminder from "./app/cron/closing-tender-reminder.js";
import freezeJob from "./app/cron/freeze-job.js";
import pg_database from "./app/db/postgres.js";
import constants from "./app/lib/constants/index.js";
import routes from "./app/routes/v1/index.js";
import publicRoutes from "./app/routes/v1/public.js";
import waffly from "./app/services/waffly.js";
import { ErrorHandler } from "./app/utils/error-handler.js";
import viewCount from "./app/cron/view-count.js";

export default async function server(app) {
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
    origin: constants.allowedOrigins,
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
  app.register(fastifyCron, {
    jobs: [freezeJob, closingTenderReminder, viewCount],
  });

  app.post("/testing", {}, async (req, res) => {
    return await waffly.sendWelcomeWhatsapp({ phone: req.body.phone });
  });
}
