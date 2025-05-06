"use strict";

import controller from "./controller.js";

export default async function routes(fastify, opt) {
  fastify.post("/", {}, controller.create);
  fastify.get("/:id", {}, controller.getById);
  fastify.put("/:id", {}, controller.update);
  fastify.delete("/:id", {}, controller.deleteById);
}

export async function planPublicRoutes(fastify, opt) {
  fastify.get("/", {}, controller.get);
}
