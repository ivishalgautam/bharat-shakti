import slugify from "slugify";
import table from "../../db/models.js";
import { sequelize } from "../../db/postgres.js";
import { cleanupFiles } from "../../helpers/cleanup-files.js";
import constants from "../../lib/constants/index.js";
import { getItemsToDelete } from "../../helpers/filter.js";
import { CategorySchema } from "../../utils/schema/category.schema.js";

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
    const validateData = CategorySchema.parse(req.body);
    req.body.slug = slugify(validateData.name, { lower: true });
    await table.CategoryModel.create(req, { transaction });
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
    if (req.body.name) {
      req.body.slug = slugify(req.body.name, { lower: true });
    }

    const record = await table.CategoryModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Category not found!" });

    const existingGallery = record.image;
    const updatedGallery = req.body.image;

    let documentsToDelete = [];
    if (updatedGallery) {
      req.body.image = [...(req.filePaths ?? []), ...updatedGallery];
      documentsToDelete = getItemsToDelete(existingGallery, updatedGallery);
    }

    await table.CategoryModel.update(req, 0, { transaction });

    if (documentsToDelete.length) {
      await cleanupFiles(documentsToDelete);
    }

    await transaction.commit();
    res
      .code(status.ACCEPTED)
      .send({ message: "Category Updated successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const deleteById = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const record = await table.CategoryModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Category not found!" });

    await table.CategoryModel.deleteById(req, 0, { transaction });
    if (record.image?.length) {
      await cleanupFiles(record.image);
    }

    await transaction.commit();
    res
      .code(status.ACCEPTED)
      .send({ status: true, message: "Category Deleted successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const get = async (req, res) => {
  try {
    const data = await table.CategoryModel.get(req);
    res.code(status.OK).send({ status: true, data });
  } catch (error) {
    throw error;
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.CategoryModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Category not found!" });

    res.code(status.ACCEPTED).send({ status: true, data: record });
  } catch (error) {
    throw error;
  }
};

const getBySlug = async (req, res) => {
  try {
    const record = await table.CategoryModel.getBySlug(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Category not found!" });

    res.code(status.ACCEPTED).send({ status: true, data: record });
  } catch (error) {
    throw error;
  }
};

const importCategories = async (req, reply) => {
  const parts = req.parts();

  for await (const part of parts) {
    if (part.file) {
      const tempPath = path.join(__dirname, "uploads", part.filename);
      await pump(part.file, fs.createWriteStream(tempPath));

      const workbook = xlsx.readFile(tempPath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet);
      // Clean up temp file
      fs.unlinkSync(tempPath);

      // name slug category_id

      const groupedData = groupData(data);
      const transaction = await sequelize.transaction();
      try {
        // Iterate over the grouped data
        for (const type of Object.keys(groupedData)) {
          for (const category of Object.keys(groupedData[type])) {
            const slug = slugify(category, { lower: true });
            const categoryPayload = {
              name: category,
              slug: slug,
              type: String(type).toLowerCase(),
            };
            const categoryData = await table.CategoryModel.create(
              { body: categoryPayload },
              { transaction }
            );

            const subCategoryBulkData = groupedData[type][category].map(
              (item) => ({
                name: item,
                slug: slugify(item, { lower: true }),
                category_id: categoryData.id,
              })
            );

            await table.SubCategoryModel.bulkCreate(subCategoryBulkData, {
              transaction,
            });
          }
        }

        await transaction.commit();
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
      return { data: groupedData };
    }
  }

  return reply.code(400).send({ error: "No file uploaded" });
};

function groupData(data) {
  const result = {};

  for (const item of data) {
    const { type, category, sub_category } = item;

    if (!result[type]) {
      result[type] = {};
    }

    if (!result[type][category]) {
      result[type][category] = [];
    }

    result[type][category].push(sub_category);
  }

  return result;
}

export default {
  create: create,
  update: update,
  deleteById: deleteById,
  get: get,
  getById: getById,
  getBySlug: getBySlug,
};
