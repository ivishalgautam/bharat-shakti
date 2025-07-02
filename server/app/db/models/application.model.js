"use strict";
import constants from "../../lib/constants/index.js";
import sequelizeFwk, { Deferrable, Op, QueryTypes } from "sequelize";
import { randomBytesGenerator } from "../../lib/encryption/index.js";
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
      application_id: {
        type: DataTypes.STRING,
        allowNull: false,
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
      status: {
        type: DataTypes.ENUM(
          "Pending",
          "Initiated",
          "Order Received",
          "Completed"
        ),
        defaultValue: "Pending",
        validate: {
          isIn: [["Pending", "Initiated", "Order Received", "Completed"]],
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
      application_id: randomBytesGenerator(8),
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
      `(usr.first_name ILIKE :query OR usr.last_name ILIKE :query OR usr.email ILIKE :query OR tdr.bid_number ILIKE :query OR apl.application_id ILIKE :query)`
    );
    queryParams.query = `%${q}%`;
  }

  const status = req.query.status ? req.query.status.split(".") : null;
  if (status?.length) {
    whereConditions.push(`apl.status = any(:status)`);
    queryParams.status = `{${status.join(",")}}`;
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
      apl.id, apl.application_id, apl.status, usr.id as user_id, CONCAT(usr.first_name, ' ', usr.last_name) as fullname, usr.username, 
      usr.mobile_number, usr.email, usr.role, usr.is_active, apl.created_at,
      tdr.id AS tender_id, tdr.bid_end_date_time, tdr.tender_value, tdr.bid_number, tdr.item_gem_arpts
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

  return { data: data, total: count?.[0]?.total ?? 0 };
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
    where: { id: req.params?.id || id },
    raw: true,
  });
};

const update = async (req, id, { transaction }) => {
  const [rowCount, rows] = await ApplicationModel.update(
    { status: req.body.status },
    {
      where: { id: req.params.id || id },
      returning: true,
      raw: true,
      plain: true,
      transaction,
    }
  );

  return rows;
};

export default {
  init: init,
  create: create,
  get: get,
  getByUserAndTenderId: getByUserAndTenderId,
  deleteById: deleteById,
  getById: getById,
  update: update,
};
