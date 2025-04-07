"use strict";
import constants from "../../lib/constants/index.js";
import sequelizeFwk, { Deferrable, Op, QueryTypes } from "sequelize";
const { DataTypes } = sequelizeFwk;

let WishlistModel = null;

const init = async (sequelize) => {
  WishlistModel = sequelize.define(
    constants.models.WISHLIST_TABLE,
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
        references: {
          model: constants.models.USER_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      tender_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: constants.models.TENDER_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await WishlistModel.sync({ alter: true });
};

const create = async (req, { transaction }) => {
  return await WishlistModel.create(
    {
      user_id: req.user_data.id,
      tender_id: req.body.tender_id,
    },
    { transaction }
  );
};

const get = async (req) => {
  let whereConditions = ["wl.user_id = :userId"];
  const queryParams = { userId: req.user_data.id };
  let q = req.query.q;
  if (q) {
    whereConditions.push(
      `(tdr.name ILIKE :query OR tdr.bid_number ILIKE :query)`
    );
    queryParams.query = `%${q}%`;
  }

  const authorities = req.query.authorities
    ? String(req.query.authorities).split(".")
    : null;
  if (authorities) {
    whereConditions.push(`tdr.authority_ids && :authorityIds`);
    queryParams.authorityIds = `{${authorities.join(",")}}`;
  }

  const keywords = req.query.keywords
    ? String(req.query.keywords).split(".")
    : null;
  if (keywords) {
    whereConditions.push(`tdr.keyword_ids && :keywordIds`);
    queryParams.keywordIds = `{${keywords.join(",")}}`;
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
    whereConditions.push(`wl.is_featured = true`);
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
      COUNT(wl.id) OVER()::integer as total
    FROM ${constants.models.WISHLIST_TABLE} wl
    LEFT JOIN ${constants.models.TENDER_TABLE} tdr ON tdr.id = wl.tender_id
    ${whereClause}
    GROUP BY wl.id
    ORDER BY wl.created_at DESC
  `;

  let query = `
  SELECT
      tdr.*,
      true as is_followed
    FROM ${constants.models.WISHLIST_TABLE} wl
    LEFT JOIN ${constants.models.TENDER_TABLE} tdr ON tdr.id = wl.tender_id
    ${whereClause}
    ORDER BY wl.created_at DESC
    LIMIT :limit OFFSET :offset
  `;

  const data = await WishlistModel.sequelize.query(query, {
    replacements: { ...queryParams, limit, offset },
    type: QueryTypes.SELECT,
    raw: true,
  });

  const count = await WishlistModel.sequelize.query(countQuery, {
    replacements: { ...queryParams },
    type: QueryTypes.SELECT,
    raw: true,
  });

  return { wishlists: data, total: count?.[0]?.total ?? 0 };
};

const getByUserAndTenderId = async (req) => {
  return await WishlistModel.findOne({
    where: {
      user_id: req.user_data.id,
      tender_id: req?.params?.id || req.body.tender_id,
    },
  });
};

const isTenderFollowed = async (req) => {
  const exists = await WishlistModel.findOne({
    where: {
      user_id: req.user_data.id,
      tender_id: req.params.id,
    },
  });

  return !!exists; // Converts result to true/false
};

const deleteByTenderId = async (req, id, { transaction }) => {
  return await WishlistModel.destroy({
    where: { tender_id: req.params.id || id },
    transaction,
  });
};

export default {
  init: init,
  create: create,
  get: get,
  getByUserAndTenderId: getByUserAndTenderId,
  deleteByTenderId: deleteByTenderId,
  isTenderFollowed: isTenderFollowed,
};
