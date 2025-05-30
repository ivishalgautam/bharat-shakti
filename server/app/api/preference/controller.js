import table from "../../db/models.js";
import { sequelize } from "../../db/postgres.js";
import constants from "../../lib/constants/index.js";

const status = constants.http.status;
const message = constants.http.message;

const create = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { plan_tier } = req.user_data;
    const count = await table.PreferenceModel.countByUser(req);
    if (plan_tier === "free" && count > 0)
      return res.code(status.CONFLICT).send({
        status: false,
        message: "You have exceed the limit of adding preferences.",
      });

    await table.PreferenceModel.create(req, { transaction });

    await transaction.commit();
    res.code(status.ACCEPTED).send({ message: "Updated successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const update = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const data = await table.PreferenceModel.getById(req);
    if (!data) return res.code(404).send({ message: "Preference not found." });

    await table.PreferenceModel.update(req, 0, { transaction });
    await transaction.commit();

    res.code(status.OK).send({
      status: true,
      message: "Updated successfully",
    });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const get = async (req, res) => {
  try {
    const data = await table.PreferenceModel.get(req);
    res.code(status.OK).send({
      status: true,
      data: data,
    });
  } catch (error) {
    throw error;
  }
};

const getById = async (req, res) => {
  try {
    const data = await table.PreferenceModel.getById(req);
    res.code(status.OK).send({
      status: true,
      data: data ?? {
        subcategory_ids: [],
        authority_ids: [],
        industry_ids: [],
        sector_id: [],
        state_id: null,
        city_id: null,
      },
    });
  } catch (error) {
    throw error;
  }
};

export default {
  create: create,
  update: update,
  get: get,
  getById: getById,
};
