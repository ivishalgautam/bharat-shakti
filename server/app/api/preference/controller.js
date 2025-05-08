import table from "../../db/models.js";
import { sequelize } from "../../db/postgres.js";
import constants from "../../lib/constants/index.js";

const status = constants.http.status;
const message = constants.http.message;

const create = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const record = await table.PreferenceModel.getByUser(req);
    if (record) {
      await table.PreferenceModel.update(req, record.id, { transaction });
    } else {
      await table.PreferenceModel.create(req, { transaction });
    }

    await transaction.commit();
    res.code(status.ACCEPTED).send({ message: "Updated successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const get = async (req, res) => {
  try {
    const data = await table.PreferenceModel.getByUser(req);
    res.code(status.OK).send({
      status: true,
      data: data ?? {
        subcategory_ids: [],
        authority_ids: [],
        city_ids: [],
        industry_ids: [],
        sector_ids: [],
        state_ids: [],
      },
    });
  } catch (error) {
    throw error;
  }
};

export default {
  create: create,
  get: get,
};
