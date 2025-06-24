"use strict";
import table from "../../db/models.js";
import { sequelize } from "../../db/postgres.js";
import constants from "../../lib/constants/index.js";

const { message, status } = constants.http;

const create = async (req, res) => {
  try {
    const tenderRecord = await table.TenderModel.getById(0, req.body.tender_id);
    if (!tenderRecord)
      return res
        .code(status.NOT_FOUND)
        .send({ status: false, message: "Tender not found!" });

    const record = await table.WishlistModel.getByUserAndTenderId(req);
    if (record)
      return res
        .code(409)
        .send({ status: false, message: "Already followed." });

    await table.WishlistModel.create(req);

    const wishlist_count = Number(tenderRecord.wishlist_count) + 1;
    await table.TenderModel.update(
      { body: { wishlist_count } },
      req.body.tender_id
    );

    res
      .code(status.CREATED)
      .send({ status: true, message: "Followed successfully" });
  } catch (error) {
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
  try {
    const record = await table.WishlistModel.getByUserAndTenderId(req);
    if (!record)
      return res.code(409).send({ status: false, message: "Not found!" });
    await table.WishlistModel.deleteByTenderId(0, record.id);
    res
      .code(status.CREATED)
      .send({ status: true, message: "Unfollowed successfully." });
  } catch (error) {
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
