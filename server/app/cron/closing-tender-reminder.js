"use strict";
import moment from "moment";
import table from "../db/models.js";
import _ from "lodash";
import { Brevo } from "../services/mailer.js";

export default {
  cronTime: "0 0 * * *",
  //   cronTime: "*/10 * * * * *",
  onTick: async (server) => {
    try {
      const tenders = await table.WishlistModel.getExpiringTendersWithUsers();
      const groupedByUser = _.groupBy(tenders, "user_id");

      for (const [userId, tenders] of Object.entries(groupedByUser)) {
        const { user_email: userEmail, fullname } = tenders[0];

        const formattedTenders = tenders.map((tender) => ({
          bid_number: tender.bid_number,
          closingDate: moment(tender.dated).format("MMMM D, YYYY"),
          organization: tender.organisation || "Unknown",
          location: tender.office || "Unknown",
          url: `https://bharatshaktitenders.com/tenders/${tender.slug}`,
        }));

        await Brevo.sendTenderReminderEmail({
          userEmail,
          fullname,
          tenders: formattedTenders,
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
