import table from "../../db/models.js";
import { sequelize } from "../../db/postgres.js";
import constants from "../../lib/constants/index.js";
import { planSchema } from "../../utils/schema/plan.schema.js";

const status = constants.http.status;
const message = constants.http.message;

const create = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    await table.PlanModel.create({ body: validateData }, { transaction });
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
    const record = await table.PlanModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Plan not found!" });

    await table.PlanModel.updateById(req, 0, { transaction });
    await transaction.commit();
    res.code(status.ACCEPTED).send({ message: "Plan updated successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const deleteById = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const record = await table.PlanModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Plan not found!" });

    await table.PlanModel.deleteById(req, 0, { transaction });

    await transaction.commit();
    res
      .code(status.ACCEPTED)
      .send({ status: true, message: "Plan deleted successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const get = async (req, res) => {
  try {
    const data = await table.PlanModel.get(req);
    res.code(status.OK).send({ status: true, data });
  } catch (error) {
    throw error;
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.PlanModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Plan not found!" });

    res.code(status.ACCEPTED).send({ status: true, data: record });
  } catch (error) {
    throw error;
  }
};

export default {
  create: create,
  update: update,
  deleteById: deleteById,
  get: get,
  getById: getById,
};
