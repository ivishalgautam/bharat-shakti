import slugify from "slugify";
import table from "../../db/models.js";
import { sequelize } from "../../db/postgres.js";
import { cleanupFiles } from "../../helpers/cleanup-files.js";
import constants from "../../lib/constants/index.js";
import { getItemsToDelete } from "../../helpers/filter.js";
import { tenderSchema } from "../../utils/schema/tender.schema.js";

import moment from "moment";
import path from "path";
import fs from "fs";
import util from "util";
import xlsx from "xlsx";
import { pipeline } from "stream";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pump = util.promisify(pipeline);

const status = constants.http.status;
const message = constants.http.message;

const create = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const validateData = tenderSchema.parse(req.body);
    req.body.slug = slugify(validateData.bid_number, { lower: true });

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

    req.body.slug = slugify(req.body.bid_number, { lower: true });
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

function removeDuplicates(data, key) {
  return Array.from(
    new Set(
      data
        .map((item) => item[key])
        .map((item) => String(item).toLowerCase())
        .filter(Boolean)
    )
  );
}

const importTenders = async (req, res) => {
  const parts = req.parts();
  for await (const part of parts) {
    if (part.file) {
      const tempPath = path.join(
        __dirname,
        "../../../",
        "uploads",
        part.filename
      );
      await pump(part.file, fs.createWriteStream(tempPath));

      const workbook = xlsx.readFile(tempPath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet);
      // Clean up temp file
      fs.unlinkSync(tempPath);
      // name slug category_id

      const transaction = await sequelize.transaction();

      try {
        // const promises = data.map(async (item, index) => {
        //   const slug = slugify(item.bid_number, { lower: true });
        //   const record = await table.TenderModel.isSlugExist(slug);
        //   if (!record) {
        //     await table.TenderModel.create(
        //       {
        //         body: {
        //           slug: slug,
        //           bid_number: item.bid_number,
        //           dated: moment(item.dated, "DD-MM-YYYY").toISOString(),
        //           bid_start_date_time: moment(
        //             item.bid_start_date_time,
        //             "DD-MM-YYYY HH:mm:ss"
        //           ).toISOString(),
        //           bid_end_date_time: moment(
        //             item.bid_end_date_time,
        //             "DD-MM-YYYY HH:mm:ss"
        //           ).toISOString(),
        //           department: item.department,
        //           organisation: item.organisation,
        //           office: item.office,
        //           item_gem_arpts: item.item_gem_arpts,
        //           quantity: item.quantity,
        //           uom: item.uom,
        //           no_of_items: item.no_of_items,
        //           mse_exemption_for_turnover: item.mse_exemption_for_turnover,
        //           startup_exemption_for_turnover:
        //             item.startup_exemption_for_turnover,
        //           bid_to_ra_enabled: Boolean(item.bid_to_ra_enabled),
        //           evaluation_method: item.evaluation_method,
        //           emd_amount: parseFloat(item.emd_amount) || 0,
        //           tender_value: parseFloat(item.tender_value) || 0,
        //           tender_amount: parseFloat(item.tender_value) || 0,
        //           ote_lte: String(item.ote_lte).toLowerCase(),
        //           epbg_percentage: item.epbg_percentage ?? 0,
        //           delivery_days: item.delivery_days ?? 0,
        //         },
        //       },
        //       { transaction }
        //     );
        //   }
        // });
        const promises = data.map(async (item, index) => {
          const slug = slugify(item.bid_number, { lower: true });
          const record = await table.TenderModel.getBySlug(0, slug);
          const categorySlug = slugify(item.category, { lower: true });
          const categoryRecord = await table.CategoryModel.getBySlug(
            0,
            categorySlug
          );
          const [subcat1, subcat2] = await Promise.all([
            table.SubCategoryModel.getBySlug(
              0,
              slugify(item.classification1, { lower: true })
            ),
            table.SubCategoryModel.getBySlug(
              0,
              slugify(item.classification2, { lower: true })
            ),
          ]);

          const stateRecord = await table.StateModel.getBySlug(
            0,
            slugify(item?.state ?? "", { lower: true })
          );
          const cityRecord = await table.CityModel.getBySlug(
            0,
            slugify(item?.city ?? "", { lower: true })
          );

          // console.log({
          //   categoryRecord,
          //   subcat1,
          //   subcat2,
          //   stateRecord,
          //   cityRecord,
          // });
          if (
            categoryRecord &&
            subcat1 &&
            subcat2 &&
            stateRecord &&
            (cityRecord || true)
          ) {
            await table.TenderModel.update(
              {
                params: { id: record.id },
                body: {
                  category_id: categoryRecord.id,
                  subcategory_ids: [subcat1.id, subcat2.id],
                  state_id: stateRecord.id,
                  city_id: cityRecord?.id ?? null,
                },
              },
              0,
              { transaction }
            );
          }
          // const promises = data.map(async (item, index) => {
          //   const slug = slugify(item.bid_number, { lower: true });
          //   const record = await table.TenderModel.isSlugExist(slug);
          //   console.log({ record });
          //   if (!record) {
          //     await table.TenderModel.create(
          //       {
          //         body: {
          //           slug: slug,
          //           bid_number: item.bid_number,
          //           dated: moment(item.dated, "DD-MM-YYYY").toISOString(),
          //           bid_start_date_time: moment(
          //             item.bid_start_date_time,
          //             "DD-MM-YYYY HH:mm:ss"
          //           ).toISOString(),
          //           bid_end_date_time: moment(
          //             item.bid_end_date_time,
          //             "DD-MM-YYYY HH:mm:ss"
          //           ).toISOString(),
          //           department: item.department,
          //           organisation: item.organisation,
          //           office: item.office,
          //           item_gem_arpts: item.item_gem_arpts,
          //           quantity: item.quantity,
          //           uom: item.uom,
          //           no_of_items: item.no_of_items,
          //           mse_exemption_for_turnover: item.mse_exemption_for_turnover,
          //           startup_exemption_for_turnover:
          //             item.startup_exemption_for_turnover,
          //           bid_to_ra_enabled: Boolean(item.bid_to_ra_enabled),
          //           evaluation_method: item.evaluation_method,
          //           emd_amount: parseFloat(item.emd_amount) || 0,
          //           tender_value: parseFloat(item.tender_value) || 0,
          //           tender_amount: parseFloat(item.tender_value) || 0,
          //           ote_lte: String(item.ote_lte).toLowerCase(),
          //           epbg_percentage: item.epbg_percentage ?? 0,
          //           delivery_days: item.delivery_days ?? 0,
          //         },
          //       },
          //       { transaction }
          //     );
          //   }
          // });
          // await table.TenderModel.update(
          //   {
          //     params: { id: record.id },
          //     body: { category_id: categoryRecord.id },
          //   },
          //   0,
          //   { transaction }
          // );

          // const states = await table.StateModel.get(0);
          // const statePromises = states.states.map(async (item) => {
          //   await table.StateModel.update(
          //     {
          //       params: { id: item.id },
          //       body: { slug: slugify(item.slug, { lower: true }) },
          //     },
          //     0,
          //     { transaction }
          //   );
          // });

          // await Promise.all(statePromises);
        });

        await Promise.all(promises);
        await transaction.commit();
        return res.send("created");
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    }
  }

  return res.code(400).send({ error: "No file uploaded" });
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
  importTenders: importTenders,
};
