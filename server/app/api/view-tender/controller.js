"use strict";
import table from "../../db/models.js";
import { sequelize } from "../../db/postgres.js";
import constants from "../../lib/constants/index.js";

const { message, status } = constants.http;

const create = async (req, res) => {
  try {
    console.time("countByUser");
    const viewedTendersCount = await table.ViewedTenderModel.countByUser(req);
    console.timeEnd("countByUser");
    if (req.user_data.plan_tier === "free" && viewedTendersCount === 5)
      return res
        .code(status.CREATED)
        .send({ status: true, message: "Free plan limit reached" });

    console.time("getByUserAndTenderId");
    const record = await table.ViewedTenderModel.getByUserAndTenderId(req);
    console.timeEnd("getByUserAndTenderId");
    if (record) {
      return res
        .code(status.CREATED)
        .send({ status: true, message: "Already viewed" });
    }
    await table.ViewedTenderModel.create(req);
    res.code(status.CREATED).send({ status: true, message: "View recorded" });
  } catch (error) {
    throw error;
  }
};

const get = async (req, res) => {
  try {
    res.send({
      status: true,
      data: await table.ViewedTenderModel.get(req),
    });
  } catch (error) {
    throw error;
  }
};

const deleteById = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const record = await table.ViewedTenderModel.getByUserAndTenderId(req);
    if (!record)
      return res.code(409).send({ status: false, message: "Not found!" });

    await table.ViewedTenderModel.deleteByTenderId(req, 0, { transaction });
    await transaction.commit();
    res.code(status.CREATED);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const count = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const record = await table.ViewedTenderModel.countByUser(req);

    res.code(status.CREATED).send({ count: record });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export default {
  create: create,
  get: get,
  deleteById: deleteById,
  count: count,
};
