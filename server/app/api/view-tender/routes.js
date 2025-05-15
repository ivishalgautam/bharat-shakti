"use strict";

import controller from "./controller.js";

export default async function routes(fastify, opt) {
  fastify.post("/", {}, controller.create);
  fastify.get("/", {}, controller.get);
  fastify.get("/count", {}, controller.count);
  fastify.delete("/:id", {}, controller.deleteById);
}
