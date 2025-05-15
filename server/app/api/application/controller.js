"use strict";
import table from "../../db/models.js";
import { sequelize } from "../../db/postgres.js";
import constants from "../../lib/constants/index.js";

const { message, status } = constants.http;

const create = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const tenderRecord = await table.TenderModel.getById(0, req.body.tender_id);
    if (!tenderRecord)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Tender not found!" });

    const record = await table.ApplicationModel.getByUserAndTenderId(req);
    if (record)
      return res
        .code(status.CONFLICT)
        .send({ status: false, message: "Already applied!" });

    await table.ApplicationModel.create(req, { transaction });

    const applied_count = Number(tenderRecord.applied_count) + 1;
    await table.TenderModel.update(
      { body: { applied_count } },
      req.body.tender_id,
      {
        transaction,
      }
    );

    await transaction.commit();

    res
      .code(status.CREATED)
      .send({ status: true, message: "Tender applied successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const get = async (req, res) => {
  try {
    res.send({
      status: true,
      data: await table.ApplicationModel.get(req),
    });
  } catch (error) {
    throw error;
  }
};

const deleteById = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const record = await table.ApplicationModel.getById(req);
    if (!record)
      return res.code(409).send({ status: false, message: "Not found!" });

    await table.ApplicationModel.deleteById(req, 0, { transaction });
    await transaction.commit();
    res.code(status.CREATED);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const update = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const record = await table.ApplicationModel.getById(req);
    if (!record)
      return res.code(409).send({ status: false, message: "Not found!" });

    await table.ApplicationModel.update(req, 0, { transaction });
    await transaction.commit();
    res.code(status.CREATED);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export default {
  create: create,
  get: get,
  deleteById: deleteById,
  update: update,
};
