import { multipartPreHandler } from "../../middlewares/multipart-prehandler.js";
import controller from "./controller.js";

export default async function routes(fastify, opts) {
  fastify.post("/", {}, controller.create);
  fastify.put("/:id", {}, controller.update);
  fastify.get("/:id", {}, controller.getById);
  fastify.delete("/:id", {}, controller.deleteById);
}

export async function faqPublicRoutes(fastify, opts) {
  fastify.get("/", {}, controller.get);
}
