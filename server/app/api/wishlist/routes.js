"use strict";

import controller from "./controller.js";

export default async function routes(fastify, opt) {
  fastify.post("/", {}, controller.create);
  fastify.get("/", {}, controller.get);
  fastify.delete("/:id", {}, controller.deleteById);
  fastify.get("/is-tender-followed/:id", {}, controller.isTenderFollowed);
}
