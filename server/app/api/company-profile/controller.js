"use strict";
import table from "../../db/models.js";
import { sequelize } from "../../db/postgres.js";
import constants from "../../lib/constants/index.js";

const { message, status } = constants.http;

const update = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const record = await table.CompanyProfileModel.getByUserId(req);
    if (!record) {
      const data = await table.CompanyProfileModel.create(
        req,
        req.user_data.id,
        { transaction }
      );
      await transaction.commit();
      return res.code(status.CREATED).send({ status: true, data: data });
    }

    const data = await table.CompanyProfileModel.update(req, 0, {
      transaction,
    });
    await transaction.commit();

    res.code(status.CREATED).send({ status: true, data: data });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const getByUserId = async (req, res) => {
  try {
    const record = await table.CompanyProfileModel.getByUserId(req);

    res.send({
      status: true,
      data: record ?? {},
    });
  } catch (error) {
    throw error;
  }
};

const getByUserIdParam = async (req, res) => {
  try {
    const record = await table.CompanyProfileModel.getByUserIdParam(req);

    res.send({
      status: true,
      data: record ?? {},
    });
  } catch (error) {
    throw error;
  }
};

export default {
  update: update,
  getByUserId: getByUserId,
  getByUserIdParam: getByUserIdParam,
};
