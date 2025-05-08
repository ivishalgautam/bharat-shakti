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
      user_id: req.body.user_id,
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
  const data = await PreferenceModel.sequelize.query(query, {
    replacements: { ...queryParams, limit, offset },
    type: QueryTypes.SELECT,
    raw: true,
  });

  const count = await PreferenceModel.sequelize.query(countQuery, {
    replacements: { ...queryParams },
    type: QueryTypes.SELECT,
    raw: true,
  });

  return { tenders: data, total: count?.[0]?.total ?? 0 };
};

const getByUser = async (req, userId) => {
  return await PreferenceModel.findOne({
    where: { user_id: req?.user_data?.id || userId },
  });
};

export default {
  init: init,
  create: create,
  update: update,
  get: get,
  getByUser: getByUser,
};
