import slugify from "slugify";
import table from "../../db/models.js";
import { sequelize } from "../../db/postgres.js";
import { cleanupFiles } from "../../helpers/cleanup-files.js";
import constants from "../../lib/constants/index.js";
import { getItemsToDelete } from "../../helpers/filter.js";
import { subcategorySchema } from "../../utils/schema/sub-category.schema.js";

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
    const validateData = subcategorySchema.parse(req.body);
    req.body.slug = slugify(validateData.name, { lower: true });
    await table.SubCategoryModel.create(req, { transaction });
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

    const record = await table.SubCategoryModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Sub Category not found!" });

    const existingGallery = record.image;
    const updatedGallery = req.body.image;

    let documentsToDelete = [];
    if (updatedGallery) {
      req.body.image = [...(req.filePaths ?? []), ...updatedGallery];
      documentsToDelete = getItemsToDelete(existingGallery, updatedGallery);
    }

    await table.SubCategoryModel.update(req, 0, { transaction });

    if (documentsToDelete.length) {
      await cleanupFiles(documentsToDelete);
    }

    await transaction.commit();
    res
      .code(status.ACCEPTED)
      .send({ message: "Sub Category Updated successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const deleteById = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const record = await table.SubCategoryModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Sub Category not found!" });

    await table.SubCategoryModel.deleteById(req, 0, { transaction });
    if (record.image?.length) {
      await cleanupFiles(record.image);
    }

    await transaction.commit();
    res
      .code(status.ACCEPTED)
      .send({ status: true, message: "Sub Category Deleted successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const get = async (req, res) => {
  try {
    const data = await table.SubCategoryModel.get(req);
    res.code(status.OK).send({ status: true, data });
  } catch (error) {
    throw error;
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.SubCategoryModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Sub Category not found!" });

    res.code(status.ACCEPTED).send({ status: true, data: record });
  } catch (error) {
    throw error;
  }
};

const getBySlug = async (req, res) => {
  try {
    const record = await table.SubCategoryModel.getBySlug(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Sub Category not found!" });

    res.code(status.ACCEPTED).send({ status: true, data: record });
  } catch (error) {
    throw error;
  }
};

const getByCategoryIds = async (req, res) => {
  try {
    const ids = req?.query?.category_ids?.split(".") ?? null;
    if (!ids) return res.send({ status: true, data: { subcategories: [] } });
    res.code(status.ACCEPTED).send({
      status: true,
      data: {
        subcategories: await table.SubCategoryModel.getByCategoryIds(ids ?? []),
      },
    });
  } catch (error) {
    throw error;
  }
};

const importSubcategories = async (req, res) => {
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

      const categories = data.map(
        ({ category, classification1, classification2 }) => ({
          category,
          classification1,
          classification2,
        })
      );
      const obj = {};
      categories.forEach(({ category, classification1, classification2 }) => {
        let cat = String(category).toLowerCase();
        let class1 = String(classification1).toLowerCase();
        let class2 = String(classification2).toLowerCase();

        if (!obj[cat]) {
          obj[cat] = [];
        }

        if (class1 && !obj[cat].includes(class1)) {
          obj[cat].push(class1);
        }

        if (class2 && !obj[cat].includes(class2)) {
          obj[cat].push(class2);
        }
      });
      try {
        const promises = Object.keys(obj).map(async (category) => {
          const categorySlug = slugify(category, { lower: true });

          let categoryRecord = null;
          const isCategoryExist = await table.CategoryModel.getBySlug(
            0,
            categorySlug
          );

          if (isCategoryExist) {
            categoryRecord = isCategoryExist;
          } else {
            categoryRecord = await table.CategoryModel.create(
              {
                body: {
                  slug: categorySlug,
                  name: category,
                  type: category,
                },
              },
              { transaction }
            );
          }
          const subcatePromises = obj[category].map(async (subcat) => {
            const subCatSlug = slugify(subcat, { lower: true });
            const isSubCatExist = await table.SubCategoryModel.getBySlug(
              0,
              subCatSlug
            );

            if (!isSubCatExist) {
              await table.SubCategoryModel.create(
                {
                  body: {
                    name: subcat,
                    slug: subCatSlug,
                    category_id: categoryRecord.id,
                  },
                },
                { transaction }
              );
            }
          });

          await Promise.all(subcatePromises);
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
  getById: getById,
  getBySlug: getBySlug,
  getByCategoryIds: getByCategoryIds,
  importSubcategories: importSubcategories,
};
