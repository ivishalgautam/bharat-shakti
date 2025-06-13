"use strict";
import moment from "moment";
import table from "../db/models.js";
import { sequelize } from "../db/postgres.js";

export default {
  cronTime: "*/10 * * * * *",
  onTick: async (server) => {
    const transaction = await sequelize.transaction();
    try {
      const subscriptions =
        await table.SubscriptionModel.getActiveSubscriptions();
      console.log({ subscriptions });
      const promises = subscriptions.map(async (sub) => {
        const expiryDate = moment(sub.end_date);
        const currDate = moment();
        console.log({ currDate, expiryDate });
        const isSubscriptionExpired = currDate.isAfter(expiryDate);
        console.log({ isSubscriptionExpired });
        // return;
        if (isSubscriptionExpired) {
          if (sub.plan_tier === "free") {
            await table.SubscriptionModel.deleteById(0, sub.id, {
              transaction,
            });
          } else {
            await table.SubscriptionModel.update(
              {
                body: { status: "expired" },
                params: { id: sub.id },
              },
              0,
              { transaction }
            );
          }
        }
      });

      await Promise.all(promises);
      if (transaction) {
        await transaction.commit();
      }
    } catch (err) {
      await transaction.rollback();
      console.error(err);
    }
  },
};
