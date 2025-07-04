"use strict";
import controller from "./controller.js";

export default async function routes(fastify, opts) {}

export async function inquiriesPublicRoutes(fastify, opts) {
  fastify.post("/", {}, controller.create);
}
