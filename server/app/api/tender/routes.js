import { multipartPreHandler } from "../../middlewares/multipart-prehandler.js";
import controller from "./controller.js";

export default async function routes(fastify, opts) {
  fastify.post(
    "/",
    {
      preHandler: (req, res) =>
        multipartPreHandler(req, res, [
          "authority_ids",
          "city_ids",
          "keyword_ids",
          "sector_ids",
          "state_ids",
        ]),
    },
    controller.create
  );
  fastify.put(
    "/:id",
    {
      preHandler: (req, res) =>
        multipartPreHandler(req, res, [
          "authority_ids",
          "city_ids",
          "keyword_ids",
          "sector_ids",
          "state_ids",
          "buyer_specification_document_urls",
          "drawing_urls",
        ]),
    },
    controller.update
  );
  fastify.get("/:id", {}, controller.getById);
  fastify.delete("/:id", {}, controller.deleteById);
}

export async function tenderPublicRoutes(fastify, opts) {
  fastify.get("/", {}, controller.get);
  fastify.get("/get-by-slug/:slug", {}, controller.getBySlug);
}
