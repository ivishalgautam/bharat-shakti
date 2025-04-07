"use strict";
import table from "../../db/models.js";
import { sequelize } from "../../db/postgres.js";
import constants from "../../lib/constants/index.js";

const { message, status } = constants.http;

const create = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const record = await table.WishlistModel.getByUserAndTenderId(req);
    if (record)
      return res
        .code(409)
        .send({ status: false, message: "Already followed." });

    await table.WishlistModel.create(req, { transaction });
    await transaction.commit();

    res
      .code(status.CREATED)
      .send({ status: true, message: "Followed successfully" });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const get = async (req, res) => {
  try {
    res.send({
      status: true,
      data: await table.WishlistModel.get(req),
    });
  } catch (error) {
    throw error;
  }
};

const deleteById = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const record = await table.WishlistModel.getByUserAndTenderId(req);
    if (!record)
      return res.code(409).send({ status: false, message: "Not found!" });

    await table.WishlistModel.deleteByTenderId(req, 0, { transaction });
    await transaction.commit();
    res
      .code(status.CREATED)
      .send({ status: true, message: "Unfollowed successfully." });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const isTenderFollowed = async (req, res) => {
  try {
    res.send(await table.WishlistModel.isTenderFollowed(req));
  } catch (error) {
    throw error;
  }
};

export default {
  create: create,
  get: get,
  deleteById: deleteById,
  isTenderFollowed: isTenderFollowed,
};
