import slugify from "slugify";
import table from "../../db/models.js";
import { sequelize } from "../../db/postgres.js";
import { cleanupFiles } from "../../helpers/cleanup-files.js";
import constants from "../../lib/constants/index.js";
import { authoritySchema } from "../../utils/schema/authority.schema.js";
import { getItemsToDelete } from "../../helpers/filter.js";

const status = constants.http.status;
const message = constants.http.message;

const create = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const validateData = authoritySchema.parse(req.body);
    req.body.slug = slugify(validateData.name, { lower: true });
    await table.AuthorityModel.create(req, { transaction });
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
    const record = await table.AuthorityModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Authority not found!" });

    const existingGallery = record.image;
    const updatedGallery = req.body.image;

    let documentsToDelete = [];
    if (updatedGallery) {
      req.body.image = [...(req.filePaths ?? []), ...updatedGallery];
      documentsToDelete = getItemsToDelete(existingGallery, updatedGallery);
    }

    await table.AuthorityModel.update(req, 0, { transaction });

    if (documentsToDelete.length) {
      await cleanupFiles(documentsToDelete);
    }

    await transaction.commit();
    res
      .code(status.ACCEPTED)
      .send({ message: "Authority Updated successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const deleteById = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const record = await table.AuthorityModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Authority not found!" });

    await table.AuthorityModel.deleteById(req, 0, { transaction });
    if (record.image?.length) {
      await cleanupFiles(record.image);
    }

    await transaction.commit();
    res
      .code(status.ACCEPTED)
      .send({ status: true, message: "Authority Deleted successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const get = async (req, res) => {
  try {
    const data = await table.AuthorityModel.get(req);
    res.code(status.OK).send({ status: true, data });
  } catch (error) {
    throw error;
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.AuthorityModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Authority not found!" });

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
