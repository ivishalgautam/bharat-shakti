"use strict";
import constants from "../../lib/constants/index.js";
import table from "../../db/models.js";
import { ErrorHandler } from "../../helpers/handleError.js";
import moment from "moment";

const status = constants.http.status;

const freezeSubscriptions = async (req, res) => {
  try {
    const subscritions = await table.SubscriptionModel.getAll(req);
  } catch (error) {
    throw error;
  }
};

export default {
  freezeSubscriptions: freezeSubscriptions,
};
