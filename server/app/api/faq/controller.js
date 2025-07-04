import table from "../../db/models.js";
import { sequelize } from "../../db/postgres.js";
import constants from "../../lib/constants/index.js";
import { faqSchema } from "../../utils/schema/faq.schema.js";

const status = constants.http.status;
const message = constants.http.message;

const create = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const validateData = faqSchema.parse(req.body);
    await table.FAQModel.create(req, { transaction });
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
    const record = await table.FAQModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "FAQ not found!" });

    await table.FAQModel.update(req, 0, { transaction });
    await transaction.commit();
    res.code(status.ACCEPTED).send({ message: "FAQ Updated successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const deleteById = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const record = await table.FAQModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "FAQ not found!" });

    await table.FAQModel.deleteById(req, 0, { transaction });
    await transaction.commit();
    res
      .code(status.ACCEPTED)
      .send({ status: true, message: "FAQ Deleted successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const get = async (req, res) => {
  try {
    const data = await table.FAQModel.get(req);
    res.code(status.OK).send({ status: true, data });
  } catch (error) {
    throw error;
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.FAQModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "FAQ not found!" });

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
