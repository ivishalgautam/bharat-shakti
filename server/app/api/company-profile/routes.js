"use strict";

import controller from "./controller.js";

export default async function routes(fastify, opt) {
  fastify.put("/", {}, controller.update);
  fastify.get("/get-by-user", {}, controller.getByUserId);
  fastify.get("/get-by-user/:id", {}, controller.getByUserIdParam);
}
