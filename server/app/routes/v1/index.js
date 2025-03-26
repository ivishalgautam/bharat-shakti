import jwtVerify from "../../helpers/auth.js";
import userRoutes from "../../api/users/routes.js";
import tenderRoutes from "../../api/tender/routes.js";
import authorityRoutes from "../../api/authority/routes.js";
import stateRoutes from "../../api/state/routes.js";
import cityRoutes from "../../api/city/routes.js";
import sectorRoutes from "../../api/sector/routes.js";
import keywordRoutes from "../../api/keyword/routes.js";

export default async function routes(fastify, options) {
  fastify.addHook("onRequest", jwtVerify.verifyToken);
  fastify.register(userRoutes, { prefix: "users" });
  fastify.register(tenderRoutes, { prefix: "tenders" });
  fastify.register(authorityRoutes, { prefix: "authorities" });
  fastify.register(stateRoutes, { prefix: "states" });
  fastify.register(cityRoutes, { prefix: "cities" });
  fastify.register(keywordRoutes, { prefix: "keywords" });
  fastify.register(sectorRoutes, { prefix: "sectors" });
}
