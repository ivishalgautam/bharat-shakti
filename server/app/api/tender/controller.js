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

    let documentsToDelete = [];
    const existingDocs = record.buyer_specification_document;
    const updatedDocs = req.body.buyer_specification_document_urls;

    if (updatedDocs) {
      req.body.buyer_specification_document = [
        ...(req.body?.buyer_specification_document ?? []),
        ...updatedDocs,
      ];
      documentsToDelete.push(...getItemsToDelete(existingDocs, updatedDocs));
    }

    const existingDrawings = record.drawing;
    const updatedDrawings = req.body.drawing_urls;

    if (updatedDrawings) {
      req.body.drawing = [...(req.body.drawing ?? []), ...updatedDrawings];
      documentsToDelete.push(
        ...getItemsToDelete(existingDrawings, updatedDrawings)
      );
    }

    await table.TenderModel.update(req, 0, { transaction });
    // await table.TenderModel.updateVector(record.id, { transaction });
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
      await cleanupFiles(record.buyer_specification_document);
    }
    if (record.drawing?.length) {
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

const getWithPlan = async (req, res) => {
  try {
    const data = await table.TenderModel.getWithPlan(req);
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

    res.code(status.OK).send({ status: true, data: record });
  } catch (error) {
    throw error;
  }
};

const getSimilarTenders = async (req, res) => {
  try {
    const { plan_tier } = req.user_data;

    if (plan_tier === "premium") {
      const preferences = await table.PreferenceModel.getByUser(req);

      function mergeArrays(field) {
        const merged = preferences.flatMap((pref) => pref[field] || []);
        return [...new Set(merged)];
      }

      const mergedPreferences = {
        keywords: mergeArrays("keywords"),
        subcategory_ids: mergeArrays("subcategory_ids"),
        authority_ids: mergeArrays("authority_ids"),
        city_ids: mergeArrays("city_ids"),
        industry_ids: mergeArrays("industry_ids"),
        sector_ids: mergeArrays("sector_ids"),
        state_ids: mergeArrays("state_ids"),
      };

      let data = await table.TenderModel.getTendersByUserPreferences(
        req,
        mergedPreferences
      );

      return res.code(status.OK).send({
        status: true,
        data: data,
      });
    }

    if (plan_tier === "standard") {
      const record = await table.ViewedTenderModel.getTenderByUser(req);
      if (!record) return res.code(status.OK).send({ status: true, data: [] });

      const tender = await table.TenderModel.getById(0, record.tender_id);
      if (!tender) return res.code(status.OK).send({ status: true, data: [] });

      let data = await table.TenderModel.getSimilarTenders(
        req,
        tender.id,
        tender
      );

      return res.code(status.OK).send({
        status: true,
        data: { tenders: data, total: 3 },
      });
    }

    return res.code(status.OK).send({ status: true, data: [] });
  } catch (error) {
    throw error;
  }
};

const getTendersByUserPreferences = async (req, res) => {
  try {
    res.code(status.OK).send({
      status: true,
    });
  } catch (error) {
    throw error;
  }
};

const getBySlug = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const record = await table.TenderModel.getBySlug(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Tender not found!" });

    const view_count = Number(record.view_count) + 1;
    await table.TenderModel.update({ body: { view_count } }, record.id, {
      transaction,
    });

    await transaction.commit();
    res.code(status.ACCEPTED).send({ status: true, data: record });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export default {
  create: create,
  update: update,
  deleteById: deleteById,
  get: get,
  getWithPlan: getWithPlan,
  getById: getById,
  getBySlug: getBySlug,
  getSimilarTenders: getSimilarTenders,
};
