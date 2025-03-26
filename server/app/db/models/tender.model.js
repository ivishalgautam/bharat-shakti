"use strict";
import moment from "moment";
import constants from "../../lib/constants/index.js";
import sequelizeFwk, { Op, QueryTypes } from "sequelize";
const { DataTypes } = sequelizeFwk;

let TenderModel = null;

const init = async (sequelize) => {
  TenderModel = sequelize.define(
    constants.models.TENDER_TABLE,
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      tender_amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      // bid_start_date: {
      //   type: DataTypes.DATE,
      //   allowNull: false,
      // },
      // bid_end_date: {
      //   type: DataTypes.DATE,
      //   allowNull: false,
      // },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Tender exist with this name!",
        },
      },
      bid_number: { type: DataTypes.STRING, defaultValue: "" },
      dated: { type: DataTypes.STRING, defaultValue: "" },
      bid_end_date_time: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: { args: true, message: "Bid end date time is required" },
        },
      },
      department: { type: DataTypes.STRING, defaultValue: "" },
      organisation: { type: DataTypes.STRING, defaultValue: "" },
      office: { type: DataTypes.STRING, defaultValue: "" },
      item_gem_parts: { type: DataTypes.TEXT, defaultValue: "" },
      quantity: { type: DataTypes.STRING, defaultValue: "" },
      uom: { type: DataTypes.STRING, defaultValue: "" },
      no_of_items: { type: DataTypes.STRING, defaultValue: "" },
      minimum_average_annual_turnover: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      years_of_past_experience: { type: DataTypes.STRING, defaultValue: "" },
      evaluation_method: { type: DataTypes.STRING, defaultValue: "" },
      emd_amount: { type: DataTypes.STRING, defaultValue: "" },
      tender_value: { type: DataTypes.STRING, defaultValue: "" },
      ote_lte: { type: DataTypes.STRING, defaultValue: "" },
      epbg_percentage: { type: DataTypes.STRING, defaultValue: "" },
      buyer_specification_document: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      drawing: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
      consignee: { type: DataTypes.STRING, defaultValue: "" },
      delivery_days: { type: DataTypes.STRING, defaultValue: "" },
      distribution: { type: DataTypes.STRING, defaultValue: "" },
      pre_qualification_criteria: { type: DataTypes.STRING, defaultValue: "" },
      mse_exemption_for_turnover: { type: DataTypes.STRING, defaultValue: "" },
      startup_exemption_for_turnover: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      bid_to_ra_enabled: { type: DataTypes.STRING, defaultValue: "" },
      splitting_applied: { type: DataTypes.STRING, defaultValue: "" },
      save_to_my_business: { type: DataTypes.STRING, defaultValue: "" },
      authority_ids: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        defaultValue: [],
      },
      city_ids: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        defaultValue: [],
      },
      keyword_ids: {
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
      meta_title: { type: DataTypes.TEXT, defaultValue: "" },
      meta_description: { type: DataTypes.TEXT, defaultValue: "" },
      meta_keywords: { type: DataTypes.TEXT, defaultValue: "" },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await TenderModel.sync({ alter: true });
};

const create = async (req, { transaction }) => {
  return await TenderModel.create(
    {
      name: req.body.name,
      tender_amount: req.body.tender_amount,
      bid_start_date: req.body.bid_start_date,
      bid_end_date: req.body.bid_end_date,
      slug: req.body.slug,
      unique: req.body.unique,
      bid_number: req.body.bid_number,
      dated: req.body.dated,
      bid_end_date_time: req.body.bid_end_date_time,
      department: req.body.department,
      organisation: req.body.organisation,
      office: req.body.office,
      item_gem_parts: req.body.item_gem_parts,
      quantity: req.body.quantity,
      uom: req.body.uom,
      no_of_items: req.body.no_of_items,
      minimum_average_annual_turnover: req.body.minimum_average_annual_turnover,
      years_of_past_experience: req.body.years_of_past_experience,
      evaluation_method: req.body.evaluation_method,
      emd_amount: req.body.emd_amount,
      tender_value: req.body.tender_value,
      ote_lte: req.body.ote_lte,
      epbg_percentage: req.body.epbg_percentage,
      buyer_specification_document: req.body.buyer_specification_document,
      drawing: req.body.drawing,
      consignee: req.body.consignee,
      delivery_days: req.body.delivery_days,
      distribution: req.body.distribution,
      pre_qualification_criteria: req.body.pre_qualification_criteria,
      mse_exemption_for_turnover: req.body.mse_exemption_for_turnover,
      startup_exemption_for_turnover: req.body.startup_exemption_for_turnover,
      bid_to_ra_enabled: req.body.bid_to_ra_enabled,
      splitting_applied: req.body.splitting_applied,
      save_to_my_business: req.body.save_to_my_business,
      authority_ids: req.body.authority_ids,
      city_ids: req.body.city_ids,
      keyword_ids: req.body.keyword_ids,
      sector_ids: req.body.sector_ids,
      state_ids: req.body.state_ids,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_keywords: req.body.meta_keywords,
    },
    { transaction }
  );
};

const get = async (req) => {
  let whereConditions = [];
  const queryParams = {};
  let q = req.query.q;
  if (q) {
    whereConditions.push(`tdr.name ILIKE :query`);
    queryParams.query = `%${q}%`;
  }

  const featured = req.query.featured;
  if (featured) {
    whereConditions.push(`tdr.is_featured = true`);
  }

  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : null;
  const offset = (page - 1) * limit;

  let whereClause = "";
  if (whereConditions.length > 0) {
    whereClause = "WHERE " + whereConditions.join(" AND ");
  }

  let countQuery = `
  SELECT
      COUNT(tdr.id) OVER()::integer as total
    FROM ${constants.models.TENDER_TABLE} tdr
    ${whereClause}
    GROUP BY tdr.id
    ORDER BY tdr.created_at DESC
  `;

  let query = `
  SELECT
      tdr.*
    FROM ${constants.models.TENDER_TABLE} tdr
    ${whereClause}
    ORDER BY tdr.created_at DESC
    LIMIT :limit OFFSET :offset
  `;

  const data = await TenderModel.sequelize.query(query, {
    replacements: { ...queryParams, limit, offset },
    type: QueryTypes.SELECT,
    raw: true,
  });

  const count = await TenderModel.sequelize.query(countQuery, {
    replacements: { ...queryParams },
    type: QueryTypes.SELECT,
    raw: true,
  });

  return { tenders: data, total: count?.[0]?.total ?? 0 };
};

const update = async (req, id, { transaction }) => {
  const [rowCount, rows] = await TenderModel.update(
    {
      name: req.body.name,
      tender_amount: req.body.tender_amount,
      bid_start_date: req.body.bid_start_date,
      bid_end_date: req.body.bid_end_date,
      slug: req.body.slug,
      unique: req.body.unique,
      bid_number: req.body.bid_number,
      dated: req.body.dated,
      bid_end_date_time: req.body.bid_end_date_time,
      department: req.body.department,
      organisation: req.body.organisation,
      office: req.body.office,
      item_gem_parts: req.body.item_gem_parts,
      quantity: req.body.quantity,
      uom: req.body.uom,
      no_of_items: req.body.no_of_items,
      minimum_average_annual_turnover: req.body.minimum_average_annual_turnover,
      years_of_past_experience: req.body.years_of_past_experience,
      evaluation_method: req.body.evaluation_method,
      emd_amount: req.body.emd_amount,
      tender_value: req.body.tender_value,
      ote_lte: req.body.ote_lte,
      epbg_percentage: req.body.epbg_percentage,
      buyer_specification_document: req.body.buyer_specification_document,
      drawing: req.body.drawing,
      consignee: req.body.consignee,
      delivery_days: req.body.delivery_days,
      distribution: req.body.distribution,
      pre_qualification_criteria: req.body.pre_qualification_criteria,
      mse_exemption_for_turnover: req.body.mse_exemption_for_turnover,
      startup_exemption_for_turnover: req.body.startup_exemption_for_turnover,
      bid_to_ra_enabled: req.body.bid_to_ra_enabled,
      splitting_applied: req.body.splitting_applied,
      save_to_my_business: req.body.save_to_my_business,
      authority_ids: req.body.authority_ids,
      city_ids: req.body.city_ids,
      keyword_ids: req.body.keyword_ids,
      sector_ids: req.body.sector_ids,
      state_ids: req.body.state_ids,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_keywords: req.body.meta_keywords,
    },
    {
      where: {
        id: req.params.id || id,
      },
      returning: true,
      raw: true,
      plain: true,
      transaction,
    }
  );

  return rows;
};

const getById = async (req, id) => {
  return await TenderModel.findOne({
    where: {
      id: req.params.id || id,
    },
    raw: true,
  });
};

const getByPk = async (req, id) => {
  return await TenderModel.findByPk(req?.params?.id || id);
};

const getBySlug = async (req, slug) => {
  return await TenderModel.findOne({
    where: {
      slug: req.params?.slug || slug,
    },
    raw: true,
  });
};

const deleteById = async (req, id, { transaction }) => {
  return await TenderModel.destroy({
    where: { id: req.params.id || id },
    transaction,
  });
};

const count = async (last_30_days = false) => {
  let where_query;
  if (last_30_days) {
    where_query = {
      created_at: {
        [Op.gte]: moment()
          .subtract(30, "days")
          .format("YYYY-MM-DD HH:mm:ss.SSSZ"),
      },
    };
  }

  return await TenderModel.count({
    where: where_query,
    raw: true,
  });
};

export default {
  init: init,
  create: create,
  get: get,
  update: update,
  getById: getById,
  getByPk: getByPk,
  getBySlug: getBySlug,
  deleteById: deleteById,
  count: count,
};
