"use strict";
import moment from "moment";
import constants from "../../lib/constants/index.js";
import sequelizeFwk, { Op, QueryTypes } from "sequelize";
const { DataTypes } = sequelizeFwk;

let FAQModel = null;

const init = async (sequelize) => {
  FAQModel = sequelize.define(
    constants.models.FAQ_TABLE,
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      faqs: {
        type: DataTypes.JSONB,
        defaultValue: [],
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await FAQModel.sync({ alter: true });
};

const create = async (req, { transaction }) => {
  return await FAQModel.create(
    {
      faqs: req.body.faqs,
    },
    { transaction }
  );
};

const get = async (req) => {
  return await FAQModel.findAll({ order: [["created_at", "DESC"]] });
};

const update = async (req, id) => {
  const [rowCount, rows] = await FAQModel.update(
    {
      faqs: req.body.faqs,
    },
    {
      where: {
        id: req.params.id || id,
      },
      returning: true,
      raw: true,
    }
  );

  return rows[0];
};

const getById = async (req, id) => {
  return await FAQModel.findOne({
    where: {
      id: req.params.id || id,
    },
    raw: true,
  });
};

const deleteById = async (req, id, { transaction }) => {
  return await FAQModel.destroy({
    where: { id: req.params.id || id },
    transaction,
  });
};

export default {
  init: init,
  create: create,
  get: get,
  update: update,
  getById: getById,
  deleteById: deleteById,
};
