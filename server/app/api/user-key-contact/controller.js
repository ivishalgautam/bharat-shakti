"use strict";
import table from "../../db/models.js";
import { sequelize } from "../../db/postgres.js";
import constants from "../../lib/constants/index.js";

const { message, status } = constants.http;

const create = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    await table.UserContactModel.create(req, { transaction });
    await transaction.commit();

    res
      .code(status.CREATED)
      .send({ status: true, message: "Contact added successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const get = async (req, res) => {
  try {
    res.send({
      status: true,
      data: await table.UserContactModel.get(req),
    });
  } catch (error) {
    throw error;
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.UserContactModel.getById(req);
    if (!record)
      return res.code(409).send({ status: false, message: "Not found!" });

    res.code(status.OK).send({ status: true, data: record });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const getByUserId = async (req, res) => {
  try {
    const record = await table.UserContactModel.getByUserId(req);
    res.code(status.OK).send({ status: true, data: record });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const update = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const record = await table.UserContactModel.getById(req);
    if (!record)
      return res.code(409).send({ status: false, message: "Not found!" });

    await table.UserContactModel.update(req, 0, { transaction });
    await transaction.commit();
    res
      .code(status.CREATED)
      .send({ status: true, message: "Updated successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const deleteById = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const record = await table.UserContactModel.getById(req);
    if (!record)
      return res.code(409).send({ status: false, message: "Not found!" });

    await table.UserContactModel.deleteById(req, 0, { transaction });
    await transaction.commit();
    res
      .code(status.CREATED)
      .send({ status: true, message: "Unfollowed successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export default {
  create: create,
  get: get,
  getById: getById,
  update: update,
  deleteById: deleteById,
  getByUserId: getByUserId,
};
