import moment from "moment";
import table from "../../db/models.js";
import { sequelize } from "../../db/postgres.js";
import constants from "../../lib/constants/index.js";

const status = constants.http.status;
const message = constants.http.message;

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

    if (record)
      return res
        .code(409)
        .send({ status: false, message: "You already have an active plan." });

    req.body.plan_tier = planRecord.plan_tier;
    req.body.start_date = moment();
    req.body.end_date = moment().add("months", planRecord.duration_in_months);
    req.body.duration_in_months = planRecord.duration_in_months;
    // req.body.payment_reference = planRecord.payment_reference;

    await table.SubscriptionModel.create(req, { transaction });
    await transaction.commit();
    res.code(status.CREATED).send({ message: message.HTTP_STATUS_CODE_201 });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const update = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const record = await table.SubscriptionModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Subscription not found!" });

    await table.SubscriptionModel.update(req, 0, { transaction });
    await transaction.commit();
    res
      .code(status.ACCEPTED)
      .send({ message: "Subscription updated successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const get = async (req, res) => {
  try {
    const data = await table.SubscriptionModel.get(req);
    res.code(status.OK).send({ status: true, data });
  } catch (error) {
    throw error;
  }
};

export default {
  create: create,
  update: update,
  get: get,
};
