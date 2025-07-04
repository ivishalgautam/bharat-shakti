"use strict";
import constants from "../../lib/constants/index.js";
import sequelizeFwk, { Deferrable, Op, QueryTypes } from "sequelize";
const { DataTypes } = sequelizeFwk;

let CompanyProfileModel = null;

const init = async (sequelize) => {
  CompanyProfileModel = sequelize.define(
    constants.models.COMPANY_PROFILE_TABLE,
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
        onDelete: "CASCADE",
        unique: true,
        references: {
          model: constants.models.USER_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      company_name: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      company_gst: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      company_type: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      year_of_establishment: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      business_types: {
        type: DataTypes.JSONB,
        defaultValue: [],
      },
      turnover: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      operating_locations: {
        type: DataTypes.JSONB,
        defaultValue: [],
      },
      website_link: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await CompanyProfileModel.sync({ alter: true });
};

const create = async (req, user_id, { transaction }) => {
  return await CompanyProfileModel.create(
    {
      user_id: user_id,
      company_name: req.body.company_name,
      company_gst: req.body.company_gst,
      company_type: req.body.company_type,
      year_of_establishment: req.body.year_of_establishment,
      business_types: req.body.business_types,
      turnover: req.body.turnover,
      operating_locations: req.body.operating_locations,
      website_link: req.body.website_link,
    },
    { transaction }
  );
};

const update = async (req, id, { transaction }) => {
  const [rowCount, rows] = await CompanyProfileModel.update(
    {
      company_name: req.body.company_name,
      company_gst: req.body.company_gst,
      company_type: req.body.company_type,
      year_of_establishment: req.body.year_of_establishment,
      business_types: req.body.business_types,
      turnover: req.body.turnover,
      operating_locations: req.body.operating_locations,
      website_link: req.body.website_link,
    },
    {
      where: {
        user_id: req?.user_data?.id || id,
      },
      returning: true,
      raw: true,
      transaction,
    }
  );

  return rows[0];
};

const getById = async (req, id) => {
  return await CompanyProfileModel.findOne({
    where: {
      id: req.params.id || id,
    },
    raw: true,
  });
};

const getByUserId = async (req, id) => {
  const user_id = req.user_data.id || id;

  return await CompanyProfileModel.findOne({
    where: {
      user_id: user_id,
    },
    raw: true,
  });
};

const getByUserIdParam = async (req, id) => {
  const user_id = req.params.id || id;

  return await CompanyProfileModel.findOne({
    where: {
      user_id: user_id,
    },
    raw: true,
  });
};

export default {
  init: init,
  create: create,
  update: update,
  getById: getById,
  getByUserId: getByUserId,
  getByUserIdParam: getByUserIdParam,
};
