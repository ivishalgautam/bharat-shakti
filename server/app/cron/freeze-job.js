"use strict";
import table from "../db/models.js";

export default {
  cronTime: "* * * * *",
  pattern: "cron",
  onTick: async (server) => {
    console.log(`[${new Date().toISOString()}] Freeze job running`);
    // try {
    //   console.log(`[${new Date().toISOString()}] Running freeze job`);
    //   //   const response = await app.inject("/freeze");
    //   const subscriptions = await table.SubscriptionModel.getAll();
    //   console.log({ subscriptions });
    // } catch (err) {
    //   console.error(err);
    // }
  },
};
