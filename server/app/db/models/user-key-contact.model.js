"use strict";
import constants from "../../lib/constants/index.js";
import sequelizeFwk, { Deferrable, Op, QueryTypes } from "sequelize";
const { DataTypes } = sequelizeFwk;

let UserContactModel = null;

const init = async (sequelize) => {
  UserContactModel = sequelize.define(
    constants.models.USER_CONTACT_TABLE,
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
      designation: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      person_name: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      contact_number: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      email: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await UserContactModel.sync({ alter: true });
};

const create = async (req, { transaction }) => {
  return await UserContactModel.create(
    {
      user_id: req.user_data.id,
      designation: req.body.designation,
      person_name: req.body.person_name,
      contact_number: req.body.contact_number,
      email: req.body.email,
    },
    { transaction }
  );
};

const get = async (req) => {
  const { role, id } = req.user_data;
  let whereConditions = [];
  const queryParams = {};

  if (role === "user") {
    whereConditions.push("uc.user_id = :userId");
    queryParams.userId = id;
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
      COUNT(uc.id) OVER()::integer as total
    FROM ${constants.models.USER_CONTACT_TABLE} uc
    ${whereClause}
    GROUP BY uc.id
    ORDER BY uc.created_at DESC
  `;

  let query = `
  SELECT
      uc.*
    FROM ${constants.models.USER_CONTACT_TABLE} uc
    ${whereClause}
    ORDER BY uc.created_at DESC
    LIMIT :limit OFFSET :offset
  `;

  const data = await UserContactModel.sequelize.query(query, {
    replacements: { ...queryParams, limit, offset },
    type: QueryTypes.SELECT,
    raw: true,
  });

  const count = await UserContactModel.sequelize.query(countQuery, {
    replacements: { ...queryParams },
    type: QueryTypes.SELECT,
    raw: true,
  });

  return { contacts: data, total: count?.[0]?.total ?? 0 };
};

const update = async (req, id, { transaction }) => {
  const [rowCount, rows] = await UserContactModel.update(
    {
      designation: req.body.designation,
      person_name: req.body.person_name,
      contact_number: req.body.contact_number,
      email: req.body.email,
    },
    {
      where: {
        id: req.params.id || id,
      },
      returning: true,
      raw: true,
      transaction,
    }
  );

  return rows[0];
};

const getById = async (req, id) => {
  return await UserContactModel.findOne({
    where: {
      id: req.params.id || id,
    },
    raw: true,
  });
};

const getByUserId = async (req, id) => {
  return await UserContactModel.findAll({
    where: {
      user_id: req.params.id || id,
    },
    raw: true,
  });
};

const getByPk = async (req, id) => {
  return await UserContactModel.findByPk(req?.params?.id || id);
};

const getBySlug = async (req, slug) => {
  return await UserContactModel.findOne({
    where: {
      slug: req.params?.slug || slug,
    },
    raw: true,
  });
};

const deleteById = async (req, id, { transaction }) => {
  return await UserContactModel.destroy({
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
  getByPk: getByPk,
  getBySlug: getBySlug,
  deleteById: deleteById,
  getByUserId: getByUserId,
};
