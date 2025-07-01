"use strict";
import table from "../../db/models.js";
import {
  calculateBasicValue,
  calculatePercentage,
} from "../../helpers/calculation.js";
import constants from "../../lib/constants/index.js";

const status = constants.http.status;

const create = async (req, res) => {
  try {
    const applicationId = req.body.application_id;
    const applicationRecord = await table.ApplicationModel.getById(
      0,
      applicationId
    );
    if (!applicationRecord)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Application not found!" });
    const tenderRecord = await table.TenderModel.getById(
      0,
      applicationRecord.tender_id
    );
    if (!tenderRecord)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Tender not found!" });

    const tenderValue = tenderRecord.tender_value;
    const quantityValue = tenderRecord.quantity;
    const finalValue = parseFloat(tenderValue) / parseFloat(quantityValue);
    const basicValue = calculateBasicValue(finalValue, 18);

    const paymentReceived = parseFloat(req.body.payment_received);
    const suppliedQuantity = parseFloat(req.body.supplied_quantity);
    const acceptedQuantity = parseFloat(req.body.accepted_quantity);
    const suppliedValueBasic = suppliedQuantity * basicValue;
    const suppliedValueGST = calculatePercentage(suppliedValueBasic, 18);
    const acceptedValueBasic = acceptedQuantity * basicValue;
    const acceptedValueGST = calculatePercentage(acceptedValueBasic, 18);
    const ldDeduction = parseFloat(req.body.ld_deduction);
    const gstTds = calculatePercentage(acceptedValueBasic, 2);
    const itTds = calculatePercentage(acceptedValueBasic, 1);

    req.body.tender_id = tenderRecord.id;
    req.body.supplied_value_basic = suppliedValueBasic; // supplied_quantity * basic_value
    req.body.supplied_value_gst = suppliedValueGST; // 18% of supplied_value_basic
    req.body.accepted_value_basic = acceptedValueBasic; // accepted_quantity * basic_value
    req.body.accepted_value_gst = acceptedValueGST; // 18% of accepted_value_basic
    req.body.ld_deduction = ldDeduction; // value idk * accepted_value_basic
    req.body.gst_tds = gstTds; // 2% of accepted_value_basic
    req.body.it_tds = itTds; // 1% of accepted_value_basic
    req.body.payment_dues =
      acceptedValueBasic +
      acceptedValueGST -
      (ldDeduction + gstTds + itTds) -
      paymentReceived; // (accepted_value_basic + accepted_value_gst) - (ld_deduction + gst_tds + it_tds) - payment_received

    await table.InvoiceMasterModel.create(req);

    res.code(status.CREATED).send({ status: true, message: "Invoice added" });
  } catch (error) {
    throw error;
  }
};

const get = async (req, res) => {
  try {
    const data = await table.InvoiceMasterModel.get(req);
    res.send({ status: true, data });
  } catch (error) {
    throw error;
  }
};

export default {
  create: create,
  get: get,
};
