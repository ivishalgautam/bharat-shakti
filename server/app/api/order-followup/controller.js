"use strict";
import table from "../../db/models.js";
import constants from "../../lib/constants/index.js";

const status = constants.http.status;

const get = async (req, res) => {
  try {
    const data = await table.InvoiceMasterModel.getOrderFollowups(req);
    res.send({ status: true, data });
  } catch (error) {
    throw error;
  }
};

const getByApplicationId = async (req, res) => {
  try {
    const record = await table.ApplicationModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Application not found!" });

    const data =
      await table.InvoiceMasterModel.getOrderFollowupByApplicationId(req);
    res.send({ status: true, data });
  } catch (error) {
    throw error;
  }
};

export default {
  get: get,
  getByApplicationId: getByApplicationId,
};
