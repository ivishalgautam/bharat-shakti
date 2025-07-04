import { tenderPublicRoutes } from "../../api/tender/routes.js";
import { authorityPublicRoutes } from "../../api/authority/routes.js";
import { citiesPublicRoutes } from "../../api/city/routes.js";
import { keywordPublicRoutes } from "../../api/industry/routes.js";
import { sectorPublicRoutes } from "../../api/sector/routes.js";
import { statePublicRoutes } from "../../api/state/routes.js";
import { planPublicRoutes } from "../../api/plan/routes.js";
import { categoryPublicRoutes } from "../../api/category/routes.js";
import { subCategoryPublicRoutes } from "../../api/sub-category/routes.js";
import { faqPublicRoutes } from "../../api/faq/routes.js";
import { importPublicRoutes } from "../../api/import/routes.js";
import { inquiriesPublicRoutes } from "../../api/inquiry/routes.js";

export default async function routes(fastify, options) {
  fastify.addHook("preHandler", async (request, reply) => {
    request.body && console.log("body", request.body);
  });

  fastify.register(tenderPublicRoutes, { prefix: "tenders" });
  fastify.register(authorityPublicRoutes, { prefix: "authorities" });
  fastify.register(citiesPublicRoutes, { prefix: "cities" });
  fastify.register(statePublicRoutes, { prefix: "states" });
  fastify.register(sectorPublicRoutes, { prefix: "sectors" });
  fastify.register(keywordPublicRoutes, { prefix: "industries" });
  fastify.register(planPublicRoutes, { prefix: "plans" });
  fastify.register(categoryPublicRoutes, { prefix: "categories" });
  fastify.register(subCategoryPublicRoutes, { prefix: "sub-categories" });
  fastify.register(faqPublicRoutes, { prefix: "faqs" });
  fastify.register(importPublicRoutes, { prefix: "import" });
  fastify.register(inquiriesPublicRoutes, { prefix: "inquiries" });
}
