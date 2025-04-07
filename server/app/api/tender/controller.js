import slugify from "slugify";
import table from "../../db/models.js";
import { sequelize } from "../../db/postgres.js";
import { cleanupFiles } from "../../helpers/cleanup-files.js";
import constants from "../../lib/constants/index.js";
import { getItemsToDelete } from "../../helpers/filter.js";
import { tenderSchema } from "../../utils/schema/tender.schema.js";

const status = constants.http.status;
const message = constants.http.message;

const create = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const validateData = tenderSchema.parse(req.body);
    req.body.slug = slugify(validateData.name, { lower: true });

    await table.TenderModel.create(req, { transaction });
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
    const record = await table.TenderModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Tender not found!" });
    console.log({ record });

    let documentsToDelete = [];
    const existingDocs = record.buyer_specification_document;
    const updatedDocs = req.body.buyer_specification_document_urls;
    console.log({ existingDocs, updatedDocs });

    if (updatedDocs) {
      req.body.buyer_specification_document = [
        ...(req.body.buyer_specification_document ?? []),
        ...updatedDocs,
      ];
      console.log("getItems", getItemsToDelete(existingDocs, updatedDocs));
      documentsToDelete.push(...getItemsToDelete(existingDocs, updatedDocs));
    }

    // const existingDrawings = record.drawing;
    // const updatedDrawings = req.body.drawing_urls;

    // if (updatedDrawings) {
    //   req.body.drawing = [...(req.body.drawing ?? []), ...updatedDrawings];
    //   documentsToDelete.push(
    //     ...getItemsToDelete(existingDrawings, updatedDrawings)
    //   );
    // }

    await table.TenderModel.update(req, 0, { transaction });
    if (documentsToDelete.length) {
      await cleanupFiles(documentsToDelete);
    }

    await transaction.commit();
    res.code(status.ACCEPTED).send({ message: "Tender Updated successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const deleteById = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const record = await table.TenderModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Tender not found!" });

    await table.TenderModel.deleteById(req, 0, { transaction });

    if (record.buyer_specification_document?.length) {
      console.log(
        "buyer_specification_document",
        record.buyer_specification_document
      );
      await cleanupFiles(record.buyer_specification_document);
    }
    if (record.drawing?.length) {
      console.log("drawing", record.drawing);
      await cleanupFiles(record.drawing);
    }

    await transaction.commit();
    res
      .code(status.ACCEPTED)
      .send({ status: true, message: "Tender Deleted successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const get = async (req, res) => {
  try {
    const data = await table.TenderModel.get(req);
    res.code(status.OK).send({ status: true, data });
  } catch (error) {
    throw error;
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.TenderModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Tender not found!" });

    res.code(status.ACCEPTED).send({ status: true, data: record });
  } catch (error) {
    throw error;
  }
};

const getBySlug = async (req, res) => {
  try {
    const record = await table.TenderModel.getBySlug(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Tender not found!" });

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
  getBySlug: getBySlug,
};
