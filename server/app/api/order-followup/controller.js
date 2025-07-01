"use strict";
import table from "../../db/models.js";
import constants from "../../lib/constants/index.js";

const status = constants.http.status;

const get = async (req, res) => {
  try {
    const data = await table.InvoiceMasterModel.getOrderFollowup(req);
    res.send({ status: true, data });
  } catch (error) {
    throw error;
  }
};

export default {
  get: get,
};
