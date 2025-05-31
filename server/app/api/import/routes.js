"use strict";
import controller from "./controller.js";

export async function importPublicRoutes(fastify, opts) {
  fastify.post("/", {}, controller.importExcelData);
}
