"use strict";
import table from "../../db/models.js";
import { sequelize } from "../../db/postgres.js";
import constants from "../../lib/constants/index.js";
import config from "../../config/index.js";
import crypto from "crypto";

import { razorpay } from "../../config/razorpay.js";
import moment from "moment";
const status = constants.http.status;

const create = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const planId = req.body.plan_id;
    const planRecord = await table.PlanModel.getById(0, planId);
    if (!planRecord)
      return res.code(404).send({ status: false, message: "Plan not found!" });

    const record = await table.SubscriptionModel.getLastActivePlanByUserId(
      req.user_data.id
    );

    if (record && record.plan_tier !== "free") {
      return res
        .code(409)
        .send({ status: false, message: "You already have an active plan." });
    }

    if (record && record.plan_tier === "free") {
      await table.SubscriptionModel.deleteById(0, record.id, { transaction });
    }

    const options = {
      amount: parseInt(planRecord.price) * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    await table.RazorpayPaymentModel.create(
      {
        ...req,
        body: {
          plan_id: planId,
          razorpay_order_id: order.id,
          amount: order.amount,
          currency: order.currency,
          receipt: order.receipt,
          status: order.status || "created",
        },
      },
      { transaction }
    );

    await transaction.commit();
    res.code(status.CREATED).send({ status: true, order });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const verify = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const secret = config.razorpay_key_secret;
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);

    const generatedSignature = hmac.digest("hex");

    console.log({ generatedSignature, razorpay_signature });

    if (generatedSignature === razorpay_signature) {
      // !update payment status

      const paymentRecord =
        await table.RazorpayPaymentModel.getByOrderId(razorpay_order_id);
      if (!paymentRecord)
        return res
          .code(status.NOT_FOUND)
          .send({ status: false, message: "Payment record not found!" });

      const planRecord = await table.PlanModel.getById(
        0,
        paymentRecord.plan_id
      );
      if (!planRecord)
        return res
          .code(status.NOT_FOUND)
          .send({ status: false, message: "Plan not found!" });

      req.body.plan_tier = planRecord.plan_tier;
      req.body.plan_id = planRecord.id;
      req.body.start_date = moment();
      req.body.end_date = moment().add(planRecord.duration_in_months, "months");
      req.body.duration_in_months = planRecord.duration_in_months;
      await table.SubscriptionModel.create(req, { transaction });

      await transaction.commit();
      return res
        .code(status.OK)
        .send({ status: true, message: "Payment verified" });
    } else {
      // !update payment status
      return res
        .code(status.BAD_REQUEST)
        .send({ status: false, message: "Payment not verified" });
    }
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export default {
  create: create,
  verify: verify,
};
