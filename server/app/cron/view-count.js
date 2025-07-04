"use strict";
import table from "../db/models.js";
import { viewCounter } from "../store/store.js";

export default {
  cronTime: "* * * * *",
  onTick: async (server) => {
    try {
      console.log(viewCounter);
      for (const [id, count] of viewCounter.entries()) {
        if (!count || count <= 0) continue;
        await table.TenderModel.incrementViewCount(id, count);
        viewCounter.delete(id);
      }
    } catch (err) {
      console.error(`View sync failed:`, err);
    }
  },
};
