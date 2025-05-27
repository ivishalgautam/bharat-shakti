"use strict";
import moment from "moment";
import constants from "../../lib/constants/index.js";
import sequelizeFwk, { Op, QueryTypes } from "sequelize";
import { toPgArray } from "../../helpers/to-pg-array.js";
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
      // name: {
      //   type: DataTypes.STRING,
      //   defaultValue: "",
      // },
      tender_amount: {
        type: DataTypes.STRING,
        defaultValue: 0,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Tender exist with this name!",
        },
      },
      bid_number: { type: DataTypes.STRING, defaultValue: "" },
      dated: { type: DataTypes.STRING, defaultValue: "" },
      processing_date_time: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bid_start_date_time: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bid_end_date_time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      department: { type: DataTypes.STRING, defaultValue: "" },
      organisation: { type: DataTypes.STRING, defaultValue: "" },
      office: { type: DataTypes.STRING, defaultValue: "" },
      item_gem_arpts: { type: DataTypes.TEXT, defaultValue: "" },
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

      save_to_my_business: { type: DataTypes.BOOLEAN, defaultValue: false },
      splitting_applied: { type: DataTypes.BOOLEAN, defaultValue: false },
      mse_exemption_for_turnover: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      startup_exemption_for_turnover: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      bid_to_ra_enabled: { type: DataTypes.BOOLEAN, defaultValue: false },
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

      view_count: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
      wishlist_count: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
      applied_count: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
      meta_title: { type: DataTypes.TEXT, defaultValue: "" },
      meta_description: { type: DataTypes.TEXT, defaultValue: "" },
      meta_keywords: { type: DataTypes.TEXT, defaultValue: "" },
      // search_vector: {
      //   type: DataTypes.TSVECTOR,
      //   allowNull: true,
      // },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await TenderModel.sync({ alter: true });
  // await sequelize.query(`
  //     UPDATE "${constants.models.TENDER_TABLE}"
  //     SET search_vector =
  //       setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
  //       setweight(to_tsvector('english', coalesce(array_to_string(keywords, ''), '')), 'B') ||
  //       setweight(to_tsvector('english', coalesce(bid_number, '')), 'C')`);
};

const create = async (req, { transaction }) => {
  return await TenderModel.create(
    {
      // name: req.body.name,
      tender_amount: req.body.tender_amount,
      slug: req.body.slug,
      unique: req.body.unique,
      bid_number: req.body.bid_number,
      dated: req.body.dated,
      processing_date_time: req.body.processing_date_time,
      bid_start_date_time: req.body.bid_start_date_time,
      bid_end_date_time: req.body.bid_end_date_time,
      department: req.body.department,
      organisation: req.body.organisation,
      office: req.body.office,
      item_gem_arpts: req.body.item_gem_arpts,
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

      subcategory_ids: req.body.subcategory_ids,
      authority_ids: req.body.authority_ids,
      city_ids: req.body.city_ids,
      industry_ids: req.body.industry_ids,
      sector_ids: req.body.sector_ids,
      state_ids: req.body.state_ids,
      keywords: req.body.keywords_str,

      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_keywords: req.body.meta_keywords,
    },
    { transaction }
  );
};

const bulkCreate = async (data) => {
  return await TenderModel.bulkCreate(data);
};

const update = async (req, id, { transaction }) => {
  const [rowCount, rows] = await TenderModel.update(
    {
      // name: req.body.name,
      tender_amount: req.body.tender_amount,
      slug: req.body.slug,
      unique: req.body.unique,
      bid_number: req.body.bid_number,
      dated: req.body.dated,

      processing_date_time: req.body.processing_date_time,
      bid_start_date_time: req.body.bid_start_date_time,
      bid_end_date_time: req.body.bid_end_date_time,

      department: req.body.department, //--
      organisation: req.body.organisation,
      office: req.body.office,
      item_gem_arpts: req.body.item_gem_arpts,
      quantity: req.body.quantity,
      uom: req.body.uom,
      no_of_items: req.body.no_of_items,
      minimum_average_annual_turnover: req.body.minimum_average_annual_turnover,
      years_of_past_experience: req.body.years_of_past_experience,
      evaluation_method: req.body.evaluation_method,
      emd_amount: req.body.emd_amount,
      tender_value: req.body.tender_value, //--
      ote_lte: req.body.ote_lte,
      epbg_percentage: req.body.epbg_percentage,
      buyer_specification_document: req.body.buyer_specification_document,
      drawing: req.body.drawing,
      consignee: req.body.consignee, //--
      delivery_days: req.body.delivery_days,
      distribution: req.body.distribution,

      pre_qualification_criteria: req.body.pre_qualification_criteria,
      mse_exemption_for_turnover: req.body.mse_exemption_for_turnover,
      startup_exemption_for_turnover: req.body.startup_exemption_for_turnover,
      bid_to_ra_enabled: req.body.bid_to_ra_enabled,
      splitting_applied: req.body.splitting_applied,
      save_to_my_business: req.body.save_to_my_business,

      subcategory_ids: req.body.subcategory_ids,
      authority_ids: req.body.authority_ids,
      city_ids: req.body.city_ids,
      industry_ids: req.body.industry_ids,
      sector_ids: req.body.sector_ids,
      state_ids: req.body.state_ids,
      keywords: req.body.keywords,

      view_count: req.body.view_count,
      wishlist_count: req.body.wishlist_count,
      applied_count: req.body.applied_count,

      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_keywords: req.body.meta_keywords,
    },
    {
      where: {
        id: req?.params?.id || id,
      },
      returning: true,
      raw: true,
      plain: true,
      transaction,
    }
  );

  return rows;
};

const get = async (req) => {
  let whereConditions = [];
  const queryParams = {};
  let q = req.query.q;
  if (q) {
    whereConditions.push(
      `(tdr.bid_number ILIKE :ilikeQuery OR array_to_string(tdr.keywords, '') ILIKE :ilikeQuery)`
    );
    queryParams.ilikeQuery = `%${q}%`;
  }

  const categories = req.query.categories
    ? String(req.query.categories).split(".")
    : null;
  if (categories) {
    whereConditions.push(`
      EXISTS (
        SELECT 1
        FROM ${constants.models.SUB_CATEGORY_TABLE} sub
        WHERE sub.id = ANY(tdr.subcategory_ids)
        AND sub.category_id = ANY(:categoryIds)
      )
    `);
    queryParams.categoryIds = `{${categories.join(",")}}`;
  }

  const subcategories = req.query.subcategories
    ? String(req.query.subcategories).split(".")
    : null;
  if (subcategories) {
    whereConditions.push(`tdr.subcategory_ids && :subcategoryIds`);
    queryParams.subcategoryIds = `{${subcategories.join(",")}}`;
  }

  const authorities = req.query.authorities
    ? String(req.query.authorities).split(".")
    : null;
  if (authorities) {
    whereConditions.push(`tdr.authority_ids && :authorityIds`);
    queryParams.authorityIds = `{${authorities.join(",")}}`;
  }

  const industries = req.query.industries
    ? String(req.query.industries).split(".")
    : null;
  if (industries) {
    whereConditions.push(`tdr.industry_ids && :industryIds`);
    queryParams.industryIds = `{${industries.join(",")}}`;
  }

  const states = req.query.states ? String(req.query.states).split(".") : null;
  if (states) {
    whereConditions.push(`tdr.state_ids && :stateIds`);
    queryParams.stateIds = `{${states.join(",")}}`;
  }

  const cities = req.query.cities ? String(req.query.cities).split(".") : null;
  if (cities) {
    whereConditions.push(`tdr.city_ids && :cityIds`);
    queryParams.cityIds = `{${cities.join(",")}}`;
  }

  const sectors = req.query.sectors
    ? String(req.query.sectors).split(".")
    : null;
  if (sectors) {
    whereConditions.push(`tdr.sector_ids && :sectorIds`);
    queryParams.sectorIds = `{${sectors.join(",")}}`;
  }

  const startDate = req.query.start_date || null;
  const endDate = req.query.end_date || null;
  if (startDate && endDate) {
    whereConditions.push(
      `tdr.bid_end_date_time BETWEEN :startDate AND :endDate`
    );
    queryParams.startDate = startDate;
    queryParams.endDate = endDate;
  } else if (startDate) {
    whereConditions.push(`tdr.bid_end_date_time >= :startDate`);
    queryParams.startDate = startDate;
  } else if (endDate) {
    whereConditions.push(`tdr.bid_end_date_time <= :endDate`);
    queryParams.endDate = endDate;
  }

  const amountMin = Number(req.query.amount_min) || null;
  const amountMax = Number(req.query.amount_max) || null;
  if (amountMin && amountMax) {
    whereConditions.push(
      `(tdr.tender_amount::integer BETWEEN :amountMin AND :amountMax)`
    );
    queryParams.amountMin = amountMin;
    queryParams.amountMax = amountMax;
  } else if (amountMin) {
    whereConditions.push(`(tdr.tender_amount::integer >= :amountMin)`);
    queryParams.amountMin = amountMin;
  } else if (amountMax) {
    whereConditions.push(`(tdr.tender_amount::integer <= :amountMax)`);
    queryParams.amountMax = amountMax;
  }

  const featured = req.query.featured;
  if (featured) {
    whereConditions.push(`tdr.is_featured = true`);
  }

  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 10;
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
    LEFT JOIN ${constants.models.AUTHORITY_TABLE} atr ON atr.id = ANY(tdr.authority_ids)
    LEFT JOIN ${constants.models.CITY_TABLE} ct ON ct.id = ANY(tdr.city_ids)
    LEFT JOIN ${constants.models.INDUSTRY_TABLE} ind ON ind.id = ANY(tdr.industry_ids)
    LEFT JOIN ${constants.models.SECTOR_TABLE} sct ON sct.id = ANY(tdr.sector_ids)
    LEFT JOIN ${constants.models.STATE_TABLE} st ON st.id = ANY(tdr.state_ids)
    ${whereClause}
    GROUP BY tdr.id
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

const getWithPlan = async (req) => {
  let whereConditions = [];
  const queryParams = {};
  let q = req.query.q;
  if (q) {
    whereConditions.push(
      `(tdr.name ILIKE :query
        OR tdr.bid_number ILIKE :query OR array_to_string(tdr.keywords, '') ILIKE :ilikeQuery
        OR EXISTS (SELECT 1 FROM ${constants.models.INDUSTRY_TABLE} ind WHERE ind.id = ANY(tdr.industry_ids) AND ind.name ILIKE :ilikeQuery)
        OR EXISTS (SELECT 1 FROM ${constants.models.AUTHORITY_TABLE} atr WHERE atr.id = ANY(tdr.authority_ids) AND atr.name ILIKE :ilikeQuery)
        OR EXISTS (SELECT 1 FROM ${constants.models.CITY_TABLE} ct WHERE ct.id = ANY(tdr.city_ids) AND ct.name ILIKE :ilikeQuery)
        OR EXISTS (SELECT 1 FROM ${constants.models.SECTOR_TABLE} sct WHERE sct.id = ANY(tdr.sector_ids) AND sct.name ILIKE :ilikeQuery)
        OR EXISTS (SELECT 1 FROM ${constants.models.STATE_TABLE} st WHERE st.id = ANY(tdr.state_ids) AND st.name ILIKE :ilikeQuery))`
    );
    queryParams.ilikeQuery = `%${q}%`;
  }

  const categories = req.query.categories
    ? String(req.query.categories).split(".")
    : null;
  if (categories) {
    whereConditions.push(`
      EXISTS (
        SELECT 1
        FROM ${constants.models.SUB_CATEGORY_TABLE} sub
        WHERE sub.id = ANY(tdr.subcategory_ids)
        AND sub.category_id = ANY(:categoryIds)
      )
    `);
    queryParams.categoryIds = `{${categories.join(",")}}`;
  }

  const subcategories = req.query.subcategories
    ? String(req.query.subcategories).split(".")
    : null;
  if (subcategories) {
    whereConditions.push(`tdr.subcategory_ids && :subcategoryIds`);
    queryParams.subcategoryIds = `{${subcategories.join(",")}}`;
  }

  const authorities = req.query.authorities
    ? String(req.query.authorities).split(".")
    : null;
  if (authorities) {
    whereConditions.push(`tdr.authority_ids && :authorityIds`);
    queryParams.authorityIds = `{${authorities.join(",")}}`;
  }

  const industries = req.query.industries
    ? String(req.query.industries).split(".")
    : null;
  if (industries) {
    whereConditions.push(`tdr.industry_ids && :industryIds`);
    queryParams.industryIds = `{${industries.join(",")}}`;
  }

  const states = req.query.states ? String(req.query.states).split(".") : null;
  if (states) {
    whereConditions.push(`tdr.state_ids && :stateIds`);
    queryParams.stateIds = `{${states.join(",")}}`;
  }

  const cities = req.query.cities ? String(req.query.cities).split(".") : null;
  if (cities) {
    whereConditions.push(`tdr.city_ids && :cityIds`);
    queryParams.cityIds = `{${cities.join(",")}}`;
  }

  const sectors = req.query.sectors
    ? String(req.query.sectors).split(".")
    : null;
  if (sectors) {
    whereConditions.push(`tdr.sector_ids && :sectorIds`);
    queryParams.sectorIds = `{${sectors.join(",")}}`;
  }

  const startDate = req.query.start_date || null;
  const endDate = req.query.end_date || null;
  if (startDate && endDate) {
    whereConditions.push(
      `tdr.bid_end_date_time BETWEEN :startDate AND :endDate`
    );
    queryParams.startDate = startDate;
    queryParams.endDate = endDate;
  } else if (startDate) {
    whereConditions.push(`tdr.bid_end_date_time >= :startDate`);
    queryParams.startDate = startDate;
  } else if (endDate) {
    whereConditions.push(`tdr.bid_end_date_time <= :endDate`);
    queryParams.endDate = endDate;
  }

  const amountMin = Number(req.query.amount_min) || null;
  const amountMax = Number(req.query.amount_max) || null;
  if (amountMin && amountMax) {
    whereConditions.push(
      `(tdr.tender_amount::integer BETWEEN :amountMin AND :amountMax)`
    );
    queryParams.amountMin = amountMin;
    queryParams.amountMax = amountMax;
  } else if (amountMin) {
    whereConditions.push(`(tdr.tender_amount::integer >= :amountMin)`);
    queryParams.amountMin = amountMin;
  } else if (amountMax) {
    whereConditions.push(`(tdr.tender_amount::integer <= :amountMax)`);
    queryParams.amountMax = amountMax;
  }

  const featured = req.query.featured;
  if (featured) {
    whereConditions.push(`tdr.is_featured = true`);
  }

  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 10;
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
      tdr.*,
      CASE WHEN 
        ws.tender_id IS NOT NULL THEN true
        ELSE false
      END as is_followed
    FROM ${constants.models.TENDER_TABLE} tdr
    LEFT JOIN ${constants.models.AUTHORITY_TABLE} atr ON atr.id = ANY(tdr.authority_ids)
    LEFT JOIN ${constants.models.CITY_TABLE} ct ON ct.id = ANY(tdr.city_ids)
    LEFT JOIN ${constants.models.INDUSTRY_TABLE} ind ON ind.id = ANY(tdr.industry_ids)
    LEFT JOIN ${constants.models.SECTOR_TABLE} sct ON sct.id = ANY(tdr.sector_ids)
    LEFT JOIN ${constants.models.STATE_TABLE} st ON st.id = ANY(tdr.state_ids)
    LEFT JOIN ${constants.models.WISHLIST_TABLE} ws ON ws.user_id = :userId AND ws.tender_id = tdr.id
    ${whereClause}
    GROUP BY tdr.id, ws.tender_id
    ORDER BY tdr.created_at DESC
    LIMIT :limit OFFSET :offset
  `;
  const data = await TenderModel.sequelize.query(query, {
    replacements: { ...queryParams, userId: req.user_data.id, limit, offset },
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

const getSimilarTenders = async (req, tenderId, tender) => {
  const query = `
  SELECT 
      tdr.*, 
      CASE 
        WHEN ws.tender_id IS NOT NULL THEN true 
        ELSE false 
      END AS is_followed
  FROM 
    ${constants.models.TENDER_TABLE} tdr
  LEFT JOIN 
    ${constants.models.WISHLIST_TABLE} ws 
    ON ws.user_id = :userId AND ws.tender_id = tdr.id
  WHERE 
    tdr.id != :tenderId
    AND (
      tdr.keywords && :keywords
      OR tdr.subcategory_ids && :subcategory_ids
      OR tdr.authority_ids && :authority_ids
      OR tdr.city_ids && :city_ids
      OR tdr.industry_ids && :industry_ids
      OR tdr.sector_ids && :sector_ids
      OR tdr.state_ids && :state_ids
    )
  ORDER BY tdr.created_at DESC
  LIMIT 3;
`;

  return await TenderModel.sequelize.query(query, {
    replacements: {
      userId: req.user_data.id,
      tenderId: tenderId,
      keywords: toPgArray(tender.keywords),
      subcategory_ids: toPgArray(tender.subcategory_ids),
      authority_ids: toPgArray(tender.authority_ids),
      city_ids: toPgArray(tender.city_ids),
      industry_ids: toPgArray(tender.industry_ids),
      sector_ids: toPgArray(tender.sector_ids),
      state_ids: toPgArray(tender.state_ids),
    },
    type: QueryTypes.SELECT,
  });
};

async function getTendersByUserPreferences(req, preference) {
  let whereConditions = [
    "(tdr.keywords && :keywords OR tdr.subcategory_ids && :subcategory_ids OR tdr.authority_ids && :authority_ids OR tdr.city_ids && :city_ids OR tdr.industry_ids && :industry_ids OR tdr.sector_ids && :sector_ids OR tdr.state_ids && :state_ids )",
  ];
  const queryParams = {
    userId: req.user_data.id,
    keywords: toPgArray(preference.keywords),
    subcategory_ids: toPgArray(preference.subcategory_ids),
    authority_ids: toPgArray(preference.authority_ids),
    city_ids: toPgArray(preference.city_ids),
    industry_ids: toPgArray(preference.industry_ids),
    sector_ids: toPgArray(preference.sector_ids),
    state_ids: toPgArray(preference.state_ids),
  };

  let q = req.query.q;
  if (q) {
    whereConditions.push(
      `(tdr.name ILIKE :query
        OR tdr.bid_number ILIKE :query OR array_to_string(tdr.keywords, '') ILIKE :query
        OR EXISTS (SELECT 1 FROM ${constants.models.INDUSTRY_TABLE} ind WHERE ind.id = ANY(tdr.industry_ids) AND ind.name ILIKE :query)
        OR EXISTS (SELECT 1 FROM ${constants.models.AUTHORITY_TABLE} atr WHERE atr.id = ANY(tdr.authority_ids) AND atr.name ILIKE :query)
        OR EXISTS (SELECT 1 FROM ${constants.models.CITY_TABLE} ct WHERE ct.id = ANY(tdr.city_ids) AND ct.name ILIKE :query)
        OR EXISTS (SELECT 1 FROM ${constants.models.SECTOR_TABLE} sct WHERE sct.id = ANY(tdr.sector_ids) AND sct.name ILIKE :query)
        OR EXISTS (SELECT 1 FROM ${constants.models.STATE_TABLE} st WHERE st.id = ANY(tdr.state_ids) AND st.name ILIKE :query))`
    );
    queryParams.query = `%${q}%`;
  }

  const categories = req.query.categories
    ? String(req.query.categories).split(".")
    : null;
  if (categories) {
    whereConditions.push(`
      EXISTS (
        SELECT 1
        FROM ${constants.models.SUB_CATEGORY_TABLE} sub
        WHERE sub.id = ANY(tdr.subcategory_ids)
        AND sub.category_id = ANY(:categoryIds)
      )
    `);
    queryParams.categoryIds = `{${categories.join(",")}}`;
  }

  const subcategories = req.query.subcategories
    ? String(req.query.subcategories).split(".")
    : null;
  if (subcategories) {
    whereConditions.push(`tdr.subcategory_ids && :subcategoryIds`);
    queryParams.subcategoryIds = `{${subcategories.join(",")}}`;
  }

  const authorities = req.query.authorities
    ? String(req.query.authorities).split(".")
    : null;
  if (authorities) {
    whereConditions.push(`tdr.authority_ids && :authorityIds`);
    queryParams.authorityIds = `{${authorities.join(",")}}`;
  }

  const industries = req.query.industries
    ? String(req.query.industries).split(".")
    : null;
  if (industries) {
    whereConditions.push(`tdr.industry_ids && :industryIds`);
    queryParams.industryIds = `{${industries.join(",")}}`;
  }

  const states = req.query.states ? String(req.query.states).split(".") : null;
  if (states) {
    whereConditions.push(`tdr.state_ids && :stateIds`);
    queryParams.stateIds = `{${states.join(",")}}`;
  }

  const cities = req.query.cities ? String(req.query.cities).split(".") : null;
  if (cities) {
    whereConditions.push(`tdr.city_ids && :cityIds`);
    queryParams.cityIds = `{${cities.join(",")}}`;
  }

  const sectors = req.query.sectors
    ? String(req.query.sectors).split(".")
    : null;
  if (sectors) {
    whereConditions.push(`tdr.sector_ids && :sectorIds`);
    queryParams.sectorIds = `{${sectors.join(",")}}`;
  }

  const startDate = req.query.start_date || null;
  const endDate = req.query.end_date || null;
  if (startDate && endDate) {
    whereConditions.push(
      `tdr.bid_end_date_time BETWEEN :startDate AND :endDate`
    );
    queryParams.startDate = startDate;
    queryParams.endDate = endDate;
  } else if (startDate) {
    whereConditions.push(`tdr.bid_end_date_time >= :startDate`);
    queryParams.startDate = startDate;
  } else if (endDate) {
    whereConditions.push(`tdr.bid_end_date_time <= :endDate`);
    queryParams.endDate = endDate;
  }

  const amountMin = Number(req.query.amount_min) || null;
  const amountMax = Number(req.query.amount_max) || null;
  if (amountMin && amountMax) {
    whereConditions.push(
      `(tdr.tender_amount::integer BETWEEN :amountMin AND :amountMax)`
    );
    queryParams.amountMin = amountMin;
    queryParams.amountMax = amountMax;
  } else if (amountMin) {
    whereConditions.push(`(tdr.tender_amount::integer >= :amountMin)`);
    queryParams.amountMin = amountMin;
  } else if (amountMax) {
    whereConditions.push(`(tdr.tender_amount::integer <= :amountMax)`);
    queryParams.amountMax = amountMax;
  }

  const featured = req.query.featured;
  if (featured) {
    whereConditions.push(`tdr.is_featured = true`);
  }

  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  const offset = (page - 1) * limit;

  let whereClause = "";
  if (whereConditions.length > 0) {
    whereClause = "WHERE " + whereConditions.join(" AND ");
  }

  const query = `
    SELECT 
      tdr.*,
      CASE 
          WHEN ws.tender_id IS NOT NULL THEN true 
          ELSE false 
      END AS is_followed
    FROM 
      ${constants.models.TENDER_TABLE} tdr
    LEFT JOIN 
      ${constants.models.WISHLIST_TABLE} ws 
      ON ws.user_id = :userId AND ws.tender_id = tdr.id
      ${whereClause}
    ORDER BY 
      tdr.created_at DESC
    LIMIT :limit OFFSET :offset;
  `;

  let countQuery = `
  SELECT
      COUNT(tdr.id) OVER()::integer as total
    FROM ${constants.models.TENDER_TABLE} tdr
    ${whereClause}
    GROUP BY tdr.id
    ORDER BY tdr.created_at DESC
  `;

  const tenders = await TenderModel.sequelize.query(query, {
    replacements: { ...queryParams, limit, offset },
    type: QueryTypes.SELECT,
  });
  const count = await TenderModel.sequelize.query(countQuery, {
    replacements: { ...queryParams },
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
  });

  return { tenders, total: count?.total ?? 0 };
}

const updateVector = async (id, { transaction }) => {
  let query = `
    UPDATE "${constants.models.TENDER_TABLE}"
    SET search_vector = 
      setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
      setweight(to_tsvector('english', coalesce(bid_number, '')), 'C') ||
      setweight(to_tsvector('english', coalesce(array_to_string(keywords, ''), '')), 'B')
    WHERE id = :id`;

  return await TenderModel.sequelize.query(query, {
    replacements: { id: id },
    transaction,
  });
};

const getById = async (req, id) => {
  return await TenderModel.findOne({
    where: {
      id: req.params?.id || id,
    },
    raw: true,
  });
};

const getByPk = async (req, id) => {
  return await TenderModel.findByPk(req?.params?.id || id);
};

const getBySlug = async (req, slug) => {
  let query = `
  SELECT
      tdr.*,
      (
        SELECT COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', atr.id, 'name', atr.name)), '[]')
        FROM ${constants.models.AUTHORITY_TABLE} atr
        WHERE atr.id = ANY(tdr.authority_ids)
      ) AS authorities,
      (
        SELECT COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', ct.id, 'name', ct.name)), '[]')
        FROM ${constants.models.CITY_TABLE} ct
        WHERE ct.id = ANY(tdr.city_ids)
      ) AS cities,
      (
        SELECT COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', ind.id, 'name', ind.name)), '[]')
        FROM ${constants.models.INDUSTRY_TABLE} ind
        WHERE ind.id = ANY(tdr.industry_ids)
      ) AS keywords,
      (
        SELECT COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', sct.id, 'name', sct.name)), '[]')
        FROM ${constants.models.SECTOR_TABLE} sct
        WHERE sct.id = ANY(tdr.sector_ids)
      ) AS sectors,
      (
        SELECT COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', st.id, 'name', st.name)), '[]')
        FROM ${constants.models.STATE_TABLE} st
        WHERE st.id = ANY(tdr.state_ids)
      ) AS states
    FROM ${constants.models.TENDER_TABLE} tdr
    WHERE tdr.slug = :slug
`;

  return await TenderModel.sequelize.query(query, {
    replacements: { slug: req.params?.slug || slug },
    type: QueryTypes.SELECT,
    plain: true,
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
  bulkCreate: bulkCreate,
  get: get,
  getWithPlan: getWithPlan,
  update: update,
  updateVector: updateVector,
  getById: getById,
  getByPk: getByPk,
  getBySlug: getBySlug,
  deleteById: deleteById,
  count: count,
  getSimilarTenders: getSimilarTenders,
  getTendersByUserPreferences: getTendersByUserPreferences,
};
