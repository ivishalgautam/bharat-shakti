import slugify from "slugify";
import table from "../../db/models.js";
import { sequelize } from "../../db/postgres.js";
import { cleanupFiles } from "../../helpers/cleanup-files.js";
import constants from "../../lib/constants/index.js";
import { stateSchema } from "../../utils/schema/state.schema.js";

const status = constants.http.status;
const message = constants.http.message;

const create = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const validateData = stateSchema.parse(req.body);
    req.body.slug = slugify(validateData.name);

    await table.StateModel.create(req, { transaction });
    await transaction.commit();
    res.code(status.CREATED).send({ message: message.HTTP_STATUS_CODE_201 });
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw error;
  }
};

const update = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const record = await table.StateModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "State not found!" });

    await table.StateModel.update(req, 0, { transaction });
    await transaction.commit();
    res.code(status.ACCEPTED).send({ message: "State Updated successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const deleteById = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const record = await table.StateModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "State not found!" });

    await table.StateModel.deleteById(req, 0, { transaction });
    await cleanupFiles([record.image]);

    await transaction.commit();
    res
      .code(status.ACCEPTED)
      .send({ status: true, message: "State Deleted successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const get = async (req, res) => {
  try {
    const data = await table.StateModel.get(req);
    res.code(status.OK).send({ status: true, data });
  } catch (error) {
    throw error;
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.StateModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "State not found!" });

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
