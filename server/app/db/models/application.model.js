"use strict";
import constants from "../../lib/constants/index.js";
import sequelizeFwk, { Deferrable, Op, QueryTypes } from "sequelize";
const { DataTypes } = sequelizeFwk;

let ApplicationModel = null;

const init = async (sequelize) => {
  ApplicationModel = sequelize.define(
    constants.models.APPLICATION_TABLE,
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

  await ApplicationModel.sync({ alter: true });
};

const create = async (req, { transaction }) => {
  return await ApplicationModel.create(
    {
      user_id: req.user_data.id,
      tender_id: req.body.tender_id,
    },
    { transaction }
  );
};

const get = async (req) => {
  const { role, id } = req.user_data;
  let whereConditions = [];
  const queryParams = {};

  if (role === "user") {
    whereConditions.push("apl.user_id = :userId");
    queryParams.userId = id;
  }

  let q = req.query.q;
  if (q) {
    whereConditions.push(
      `(usr.first_name ILIKE :query OR usr.last_name ILIKE :query OR usr.email ILIKE :query OR tdr.name ILIKE :query OR tdr.bid_number ILIKE :query)`
    );
    queryParams.query = `%${q}%`;
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
      COUNT(apl.id) OVER()::integer as total
    FROM ${constants.models.APPLICATION_TABLE} apl
    LEFT JOIN ${constants.models.TENDER_TABLE} tdr ON tdr.id = apl.tender_id
    LEFT JOIN ${constants.models.USER_TABLE} usr ON usr.id = apl.user_id
    ${whereClause}
    GROUP BY apl.id
  `;

  let query = `
  SELECT
      apl.id, usr.id as user_id, CONCAT(usr.first_name, ' ', usr.last_name) as fullname, usr.username, 
      usr.mobile_number, usr.email, usr.role, usr.is_active, usr.created_at,
      tdr.id AS tender_id, tdr.name AS tender_name
    FROM ${constants.models.APPLICATION_TABLE} apl
    LEFT JOIN ${constants.models.TENDER_TABLE} tdr ON tdr.id = apl.tender_id
    LEFT JOIN ${constants.models.USER_TABLE} usr ON usr.id = apl.user_id
    ${whereClause}
    ORDER BY apl.created_at DESC
    LIMIT :limit OFFSET :offset
  `;

  const data = await ApplicationModel.sequelize.query(query, {
    replacements: { ...queryParams, limit, offset },
    type: QueryTypes.SELECT,
    raw: true,
  });

  const count = await ApplicationModel.sequelize.query(countQuery, {
    replacements: { ...queryParams },
    type: QueryTypes.SELECT,
    raw: true,
  });

  return { applications: data, total: count?.[0]?.total ?? 0 };
};

const getByUserAndTenderId = async (req) => {
  return await ApplicationModel.findOne({
    where: {
      user_id: req.user_data.id,
      tender_id: req?.params?.id || req.body.tender_id,
    },
  });
};

const deleteById = async (req, id, { transaction }) => {
  return await ApplicationModel.destroy({
    where: { id: req.params.id || id },
    transaction,
  });
};

const getById = async (req, id) => {
  return await ApplicationModel.findOne({
    where: { id: req.params.id || id },
  });
};

export default {
  init: init,
  create: create,
  get: get,
  getByUserAndTenderId: getByUserAndTenderId,
  deleteById: deleteById,
  getById: getById,
};
