"use strict";
import table from "../../db/models.js";

import moment from "moment";
import path from "path";
import fs from "fs";
import util from "util";
import xlsx from "xlsx";
import { pipeline } from "stream";
import { fileURLToPath } from "url";
import { sequelize } from "../../db/postgres.js";
import slugify from "slugify";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pump = util.promisify(pipeline);

const importExcelData = async (req, res) => {
  const { type } = req.query; // or use req.params if routing like `/import/:type`

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
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = xlsx.utils.sheet_to_json(sheet);
      fs.unlinkSync(tempPath);

      const transaction = await sequelize.transaction();
      try {
        if (type === "states") {
          const stateCityData = data.map(({ state, city }) => ({
            state,
            city,
          }));
          const obj = {};
          stateCityData.forEach(({ state, city }) => {
            if (!obj[state]) obj[state] = [];
            if (city && !obj[state].includes(city)) obj[state].push(city);
          });

          const promises = Object.keys(obj).map(async (state) => {
            const stateSlug = slugify(state, { lower: true });
            const isStateExist = await table.StateModel.getBySlug(0, stateSlug);
            if (!isStateExist) {
              await table.StateModel.create(
                { body: { slug: stateSlug, name: state, type: state } },
                { transaction }
              );
            }
          });

          await Promise.all(promises);
        } else if (type === "cities") {
          const stateCityData = data.map(({ state, city }) => ({
            state,
            city,
          }));
          const obj = {};
          stateCityData.forEach(({ state, city }) => {
            let stateLower = state ? String(state).trim().toLowerCase() : null;
            let cityLower = city ? String(city).trim().toLowerCase() : null;
            if (!obj[stateLower]) obj[stateLower] = [];
            if (cityLower && !obj[stateLower].includes(cityLower))
              obj[stateLower].push(cityLower);
          });

          const promises = Object.keys(obj).map(async (state) => {
            const stateSlug = slugify(state, { lower: true });
            let stateRecord =
              (await table.StateModel.getBySlug(0, stateSlug)) ||
              (await table.StateModel.create(
                { body: { slug: stateSlug, name: state, type: state } },
                { transaction }
              ));

            const cityPromises = obj[state].map(async (city) => {
              const citySlug = slugify(city, { lower: true });
              const isCityExist = await table.CityModel.getBySlug(0, citySlug);
              if (isCityExist) {
                await table.CityModel.update(
                  {
                    params: { id: isCityExist.id },
                    body: {
                      name: city,
                      slug: citySlug,
                      state_id: stateRecord.id,
                    },
                  },
                  { transaction }
                );
              } else {
                await table.CityModel.create(
                  {
                    body: {
                      name: city,
                      slug: citySlug,
                      state_id: stateRecord.id,
                    },
                  },
                  { transaction }
                );
              }
            });
            await Promise.all(cityPromises);
          });

          await Promise.all(promises);
        } else if (type === "subcategories") {
          const obj = {};
          data.forEach(({ category, classification1, classification2 }) => {
            let cat = String(category).toLowerCase();
            let class1 = String(classification1).toLowerCase();
            let class2 = String(classification2).toLowerCase();
            if (!obj[cat]) obj[cat] = [];
            if (class1 && !obj[cat].includes(class1)) obj[cat].push(class1);
            if (class2 && !obj[cat].includes(class2)) obj[cat].push(class2);
          });

          const promises = Object.keys(obj).map(async (category) => {
            const categorySlug = slugify(category, { lower: true });
            let categoryRecord =
              (await table.CategoryModel.getBySlug(0, categorySlug)) ||
              (await table.CategoryModel.create(
                {
                  body: { slug: categorySlug, name: category, type: category },
                },
                { transaction }
              ));

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
        } else if (type === "tenders") {
          const promises = data.map(async (item, index) => {
            const slug = slugify(item.bid_number, { lower: true });
            const record = await table.TenderModel.isSlugExist(slug);
            if (!record) {
              await table.TenderModel.create(
                {
                  body: {
                    slug: slug,
                    bid_number: item.bid_number,
                    dated: moment(item.dated, "DD-MM-YYYY").toISOString(),
                    bid_start_date_time: moment(
                      item.bid_start_date_time,
                      "DD-MM-YYYY HH:mm:ss"
                    ).toISOString(),
                    bid_end_date_time: moment(
                      item.bid_end_date_time,
                      "DD-MM-YYYY HH:mm:ss"
                    ).toISOString(),
                    department: item.department,
                    organisation: item.organisation,
                    office: item.office,
                    item_gem_arpts: item.item_gem_arpts,
                    quantity: item.quantity,
                    uom: item.uom,
                    no_of_items: item.no_of_items,
                    mse_exemption_for_turnover: item.mse_exemption_for_turnover,
                    startup_exemption_for_turnover:
                      item.startup_exemption_for_turnover,
                    bid_to_ra_enabled: Boolean(item.bid_to_ra_enabled),
                    evaluation_method: item.evaluation_method,
                    emd_amount: parseFloat(item.emd_amount) || 0,
                    tender_value: parseFloat(item.tender_value) || 0,
                    tender_amount: parseFloat(item.tender_value) || 0,
                    ote_lte: String(item.ote_lte).toLowerCase(),
                    epbg_percentage: item.epbg_percentage ?? 0,
                    delivery_days: item.delivery_days ?? 0,
                  },
                },
                { transaction }
              );
            }
          });

          await Promise.all(promises);
        } else {
          throw new Error("Invalid import type");
        }

        await transaction.commit();
        return res.send("created");
      } catch (err) {
        await transaction.rollback();
        return res.code(500).send({ error: err.message });
      }
    }
  }

  return res.code(400).send({ error: "No file uploaded" });
};

export default {
  importExcelData: importExcelData,
};
