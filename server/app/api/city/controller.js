import slugify from "slugify";
import table from "../../db/models.js";
import { sequelize } from "../../db/postgres.js";
import { cleanupFiles } from "../../helpers/cleanup-files.js";
import constants from "../../lib/constants/index.js";
import { citySchema } from "../../utils/schema/city.schema.js";
import { getItemsToDelete } from "../../helpers/filter.js";

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
    const validateData = citySchema.parse(req.body);
    req.body.slug = slugify(validateData.name, { lower: true });
    await table.CityModel.create(req, { transaction });
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
    const record = await table.CityModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "City not found!" });

    const existingGallery = record.image;
    const updatedGallery = req.body.image;
    let documentsToDelete = [];

    if (updatedGallery) {
      req.body.image = [...(req.filePaths ?? []), ...updatedGallery];
      documentsToDelete = getItemsToDelete(existingGallery, updatedGallery);
    }

    await table.CityModel.update(req, 0, { transaction });

    if (documentsToDelete.length) {
      await cleanupFiles(documentsToDelete);
    }

    await transaction.commit();
    res.code(status.ACCEPTED).send({ message: "City Updated successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const deleteById = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const record = await table.CityModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "City not found!" });

    await table.CityModel.deleteById(req, 0, { transaction });
    if (record.image?.length) {
      await cleanupFiles(record.image);
    }

    await transaction.commit();
    res
      .code(status.ACCEPTED)
      .send({ status: true, message: "City Deleted successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const get = async (req, res) => {
  try {
    const data = await table.CityModel.get(req);
    res.code(status.OK).send({ status: true, data });
  } catch (error) {
    throw error;
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.CityModel.getById(req);
    if (!record)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "City not found!" });

    res.code(status.ACCEPTED).send({ status: true, data: record });
  } catch (error) {
    throw error;
  }
};

const importCities = async (req, res) => {
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

      const stateCityData = data.map(({ state, city }) => ({
        state,
        city,
      }));
      const obj = {};
      stateCityData.forEach(({ state, city }) => {
        let stateLower = String(state).trim().toLowerCase();
        let cityLower = String(city).trim().toLowerCase();

        if (!obj[stateLower]) {
          obj[stateLower] = [];
        }

        if (cityLower && !obj[stateLower].includes(cityLower)) {
          obj[stateLower].push(cityLower);
        }
      });

      try {
        const promises = Object.keys(obj).map(async (state) => {
          const stateSlug = slugify(state);

          let stateRecord = null;
          const isStateExist = await table.StateModel.getBySlug(0, stateSlug);

          if (isStateExist) {
            stateRecord = isStateExist;
          } else {
            stateRecord = await table.StateModel.create(
              {
                body: {
                  slug: stateSlug,
                  name: state,
                  type: state,
                },
              },
              { transaction }
            );
          }

          console.log({ stateRecord });
          // const cityPromises = obj[state].map(async (city) => {
          //   const citySlug = slugify(city);
          //   const isCityExist = await table.CityModel.getBySlug(0, citySlug);
          //   if (isCityExist) {
          //     await table.CityModel.update(
          //       {
          //         params: { id: isCityExist.id },
          //         body: {
          //           name: city,
          //           slug: citySlug,
          //           state_id: stateRecord.id,
          //         },
          //       },
          //       { transaction }
          //     );
          //   } else {
          //     await table.CityModel.create(
          //       {
          //         body: {
          //           name: city,
          //           slug: citySlug,
          //           state_id: stateRecord.id,
          //         },
          //       },
          //       { transaction }
          //     );
          //   }
          // });

          // await Promise.all(cityPromises);
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
  importCities: importCities,
};
