import jwtVerify from "../../helpers/auth.js";
import userRoutes from "../../api/users/routes.js";
import tenderRoutes from "../../api/tender/routes.js";
import authorityRoutes from "../../api/authority/routes.js";
import stateRoutes from "../../api/state/routes.js";
import cityRoutes from "../../api/city/routes.js";
import sectorRoutes from "../../api/sector/routes.js";
import industryRoutes from "../../api/industry/routes.js";
import wishlistRoutes from "../../api/wishlist/routes.js";
import viewTenderRoutes from "../../api/view-tender/routes.js";
import companyProfileRoutes from "../../api/company-profile/routes.js";
import userKeyContactRoutes from "../../api/user-key-contact/routes.js";
import applicationRoutes from "../../api/application/routes.js";
import planRoutes from "../../api/plan/routes.js";
import subscriptionRoutes from "../../api/subscription/routes.js";
import categoryRoutes from "../../api/category/routes.js";
import subCategoryRoutes from "../../api/sub-category/routes.js";
import preferenceRoutes from "../../api/preference/routes.js";
import faqRoutes from "../../api/faq/routes.js";
import paymentRoutes from "../../api/payment/routes.js";

export default async function routes(fastify, options) {
  fastify.addHook("onRequest", jwtVerify.verifyToken);
  fastify.addHook("preHandler", async (request, reply) => {
    request.body && console.log("body", request.body);
  });
  fastify.register(userRoutes, { prefix: "users" });
  fastify.register(tenderRoutes, { prefix: "tenders" });
  fastify.register(authorityRoutes, { prefix: "authorities" });
  fastify.register(stateRoutes, { prefix: "states" });
  fastify.register(cityRoutes, { prefix: "cities" });
  fastify.register(industryRoutes, { prefix: "industries" });
  fastify.register(sectorRoutes, { prefix: "sectors" });
  fastify.register(wishlistRoutes, { prefix: "wishlists" });
  fastify.register(viewTenderRoutes, { prefix: "view-tenders" });
  fastify.register(companyProfileRoutes, { prefix: "company-profiles" });
  fastify.register(userKeyContactRoutes, { prefix: "user-key-contacts" });
  fastify.register(applicationRoutes, { prefix: "applications" });
  fastify.register(planRoutes, { prefix: "plans" });
  fastify.register(subscriptionRoutes, { prefix: "subscriptions" });
  fastify.register(categoryRoutes, { prefix: "categories" });
  fastify.register(subCategoryRoutes, { prefix: "sub-categories" });
  fastify.register(preferenceRoutes, { prefix: "preferences" });
  fastify.register(faqRoutes, { prefix: "faqs" });
  fastify.register(paymentRoutes, { prefix: "payments" });
}
