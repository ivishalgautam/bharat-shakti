import slugify from "slugify";
import table from "../../db/models.js";
import { sequelize } from "../../db/postgres.js";
import { cleanupFiles } from "../../helpers/cleanup-files.js";
import constants from "../../lib/constants/index.js";
import { keywordSchema } from "../../utils/schema/keyword.schema.js";

const status = constants.http.status;
const message = constants.http.message;

const create = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const validateData = keywordSchema.parse(req.body);
    const filePaths = req.filePaths;

    req.body.image = filePaths;
    req.body.slug = slugify(validateData.name);

    await table.KeywordModel.create(req, { transaction });
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
    const record = await table.KeywordModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Keyword not found!" });

    const existingGallery = record.image;
    const updatedGallery = req.body.image;
    req.body.image = [...(req.filePaths ?? []), ...updatedGallery];

    const documentsToDelete = getItemsToDelete(existingGallery, updatedGallery);
    await table.KeywordModel.update(req, 0, { transaction });

    if (documentsToDelete.length) {
      await cleanupFiles(documentsToDelete);
    }

    await transaction.commit();
    res
      .code(status.ACCEPTED)
      .send({ message: "Keyword Updated successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const deleteById = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const record = await table.KeywordModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Keyword not found!" });

    await table.KeywordModel.deleteById(req, 0, { transaction });
    await cleanupFiles([record.image]);

    await transaction.commit();
    res
      .code(status.ACCEPTED)
      .send({ status: true, message: "Keyword Deleted successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const get = async (req, res) => {
  try {
    const data = await table.KeywordModel.get(req);
    res.code(status.OK).send({ status: true, data });
  } catch (error) {
    throw error;
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.KeywordModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Keyword not found!" });

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
