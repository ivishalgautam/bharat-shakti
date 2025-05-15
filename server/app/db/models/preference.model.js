"use strict";
import moment from "moment";
import constants from "../../lib/constants/index.js";
import sequelizeFwk, { Deferrable, Op, QueryTypes } from "sequelize";
const { DataTypes } = sequelizeFwk;

let PreferenceModel = null;

const init = async (sequelize) => {
  PreferenceModel = sequelize.define(
    constants.models.PREFERENCE_TABLE,
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: constants.models.USER_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
        onDelete: "CASCADE",
      },
      name: { type: DataTypes.STRING, allowNull: false },
      category_ids: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        defaultValue: [],
      },
      subcategory_ids: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        defaultValue: [],
      },
      authority_ids: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        defaultValue: [],
      },
      city_ids: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        defaultValue: [],
      },
      industry_ids: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        defaultValue: [],
      },
      sector_ids: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        defaultValue: [],
      },
      state_ids: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        defaultValue: [],
      },
      keywords: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await PreferenceModel.sync({ alter: true });
};

const create = async (req, { transaction }) => {
  return await PreferenceModel.create(
    {
      user_id: req.user_data.id,
      name: req.body.name,
      category_ids: req.body.category_ids,
      subcategory_ids: req.body.subcategory_ids,
      authority_ids: req.body.authority_ids,
      city_ids: req.body.city_ids,
      industry_ids: req.body.industry_ids,
      sector_ids: req.body.sector_ids,
      state_ids: req.body.state_ids,
    },
    { transaction }
  );
};

const update = async (req, id, { transaction }) => {
  const [rowCount, rows] = await PreferenceModel.update(
    {
      name: req.body.name,
      category_ids: req.body.category_ids,
      subcategory_ids: req.body.subcategory_ids,
      authority_ids: req.body.authority_ids,
      city_ids: req.body.city_ids,
      industry_ids: req.body.industry_ids,
      sector_ids: req.body.sector_ids,
      state_ids: req.body.state_ids,
    },
    {
      where: { id: req?.params?.id || id },
      returning: true,
      raw: true,
      plain: true,
      transaction,
    }
  );

  return rows;
};

const get = async (req) => {
  const preferences = await PreferenceModel.findAll({
    where: { user_id: req?.user_data?.id || userId },
    order: [["created_at", "DESC"]],
  });

  return { preferences };
};

const getById = async (req, id) => {
  return await PreferenceModel.findOne({
    where: { id: req?.params?.id || id },
    raw: true,
  });
};

const getByUser = async (req, userId) => {
  return await PreferenceModel.findAll({
    where: { user_id: req?.user_data?.id || userId },
  });
};

const countByUser = async (req, userId) => {
  return await PreferenceModel.count({
    where: { user_id: req?.user_data?.id || userId },
  });
};

export default {
  init: init,
  create: create,
  update: update,
  get: get,
  getById: getById,
  getByUser: getByUser,
  countByUser: countByUser,
};
