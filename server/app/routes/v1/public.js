import { tenderPublicRoutes } from "../../api/tender/routes.js";
import { authorityPublicRoutes } from "../../api/authority/routes.js";
import { citiesPublicRoutes } from "../../api/city/routes.js";
import { keywordPublicRoutes } from "../../api/keyword/routes.js";
import { sectorPublicRoutes } from "../../api/sector/routes.js";
import { statePublicRoutes } from "../../api/state/routes.js";

export default async function routes(fastify, options) {
  fastify.register(tenderPublicRoutes, { prefix: "tenders" });
  fastify.register(authorityPublicRoutes, { prefix: "authorities" });
  fastify.register(citiesPublicRoutes, { prefix: "cities" });
  fastify.register(statePublicRoutes, { prefix: "states" });
  fastify.register(sectorPublicRoutes, { prefix: "sectors" });
  fastify.register(keywordPublicRoutes, { prefix: "keywords" });
}
