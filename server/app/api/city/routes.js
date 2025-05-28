import { multipartPreHandler } from "../../middlewares/multipart-prehandler.js";
import controller from "./controller.js";

export default async function routes(fastify, opts) {
  fastify.post(
    "/",
    { preHandler: (req, res) => multipartPreHandler(req, res, []) },
    controller.create
  );
  fastify.put(
    "/:id",
    { preHandler: (req, res) => multipartPreHandler(req, res, ["image"]) },
    controller.update
  );
  fastify.get("/:id", {}, controller.getById);
  fastify.delete("/:id", {}, controller.deleteById);
}

export async function citiesPublicRoutes(fastify, opts) {
  fastify.get("/", {}, controller.get);
  fastify.post("/import", {}, controller.importCities);
}
