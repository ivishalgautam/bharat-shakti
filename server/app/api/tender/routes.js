import { multipartPreHandler } from "../../middlewares/multipart-prehandler.js";
import controller from "./controller.js";

export default async function routes(fastify, opts) {
  fastify.post(
    "/",
    {
      preHandler: (req, res) =>
        multipartPreHandler(req, res, [
          "subcategory_ids",
          "authority_ids",
          "industry_ids",
          "sector_ids",
          "keywords",
        ]),
    },
    controller.create
  );
  fastify.put(
    "/:id",
    {
      preHandler: (req, res) =>
        multipartPreHandler(req, res, [
          "subcategory_ids",
          "authority_ids",
          "industry_ids",
          "sector_ids",
          "buyer_specification_document_urls",
          "drawing_urls",
          "keywords",
        ]),
    },
    controller.update
  );
  fastify.get("/:id", {}, controller.getById);
  fastify.delete("/:id", {}, controller.deleteById);
  fastify.get("/all-tenders", {}, controller.getWithPlan);
  fastify.get("/get-similar-tenders", {}, controller.getSimilarTenders);
}

export async function tenderPublicRoutes(fastify, opts) {
  fastify.get("/", {}, controller.get);
  fastify.get("/get-by-slug/:slug", {}, controller.getBySlug);
  fastify.post("/import", {}, controller.importTenders);
  fastify.post("/add-view/:id", {}, controller.addView);
}
