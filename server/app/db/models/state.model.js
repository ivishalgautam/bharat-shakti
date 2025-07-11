"use strict";
import moment from "moment";
import constants from "../../lib/constants/index.js";
import sequelizeFwk, { Op, QueryTypes } from "sequelize";
const { DataTypes } = sequelizeFwk;

let StateModel = null;

const init = async (sequelize) => {
  StateModel = sequelize.define(
    constants.models.STATE_TABLE,
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
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "State exist with this name!",
        },
      },
      is_featured: { type: DataTypes.BOOLEAN, defaultValue: false },
      image: { type: DataTypes.ARRAY(DataTypes.TEXT), defaultValue: [] },
      meta_title: { type: DataTypes.TEXT, defaultValue: "" },
      meta_description: { type: DataTypes.TEXT, defaultValue: "" },
      meta_keywords: { type: DataTypes.TEXT, defaultValue: "" },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await StateModel.sync({ alter: true });
};

const create = async (req, { transaction }) => {
  const data = await StateModel.create(
    {
      name: req.body.name,
      slug: req.body.slug,
      is_featured: req.body.is_featured,
      image: req.body.image,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_keywords: req.body.meta_keywords,
    },
    { transaction }
  );

  return data.dataValues;
};

const get = async (req) => {
  let whereConditions = [];
  const queryParams = {};
  let q = req.query?.q;
  if (q) {
    whereConditions.push(`st.name ILIKE :query`);
    queryParams.query = `%${q}%`;
  }

  const featured = req.query?.featured;
  if (featured) {
    whereConditions.push(`st.is_featured = true`);
  }

  const page = req.query?.page ? Number(req.query.page) : 1;
  const limit = req.query?.limit ? Number(req.query.limit) : null;
  const offset = (page - 1) * limit;

  let whereClause = "";
  if (whereConditions.length > 0) {
    whereClause = "WHERE " + whereConditions.join(" AND ");
  }

  let countQuery = `
  SELECT
      COUNT(st.id) OVER()::integer as total
    FROM ${constants.models.STATE_TABLE} st
    LEFT JOIN ${constants.models.TENDER_TABLE} tdr ON st.id = tdr.state_id
    LEFT JOIN ${constants.models.CITY_TABLE} ct ON ct.state_id = st.id
    ${whereClause}
    GROUP BY st.id
    ORDER BY st.created_at DESC
  `;

  let query = `
  SELECT
      st.*,
      COUNT(DISTINCT tdr.id)::integer AS tenders_count,
      COUNT(DISTINCT ct.id)::integer AS city_count
    FROM ${constants.models.STATE_TABLE} st
    LEFT JOIN ${constants.models.TENDER_TABLE} tdr ON st.id = tdr.state_id
    LEFT JOIN ${constants.models.CITY_TABLE} ct ON ct.state_id = st.id
    ${whereClause}
    GROUP BY st.id
    ORDER BY st.name ASC
    LIMIT :limit OFFSET :offset
  `;

  const data = await StateModel.sequelize.query(query, {
    replacements: { ...queryParams, limit, offset },
    type: QueryTypes.SELECT,
    raw: true,
  });

  const count = await StateModel.sequelize.query(countQuery, {
    replacements: { ...queryParams },
    type: QueryTypes.SELECT,
    raw: true,
  });

  return { states: data, total: count?.[0]?.total ?? 0 };
};

const update = async (req, id) => {
  const [rowCount, rows] = await StateModel.update(
    {
      name: req.body.name,
      slug: req.body.slug,
      is_featured: req.body.is_featured,
      image: req.body.image,
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
    }
  );

  return rows[0];
};

const getById = async (req, id) => {
  return await StateModel.findOne({
    where: {
      id: req.params.id || id,
    },
    raw: true,
  });
};

const getByPk = async (req, id) => {
  return await StateModel.findByPk(req?.params?.id || id);
};

const getBySlug = async (req, slug) => {
  return await StateModel.findOne({
    where: {
      slug: req.params?.slug || slug,
    },
    raw: true,
  });
};

const deleteById = async (req, id, { transaction }) => {
  return await StateModel.destroy({
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

  return await StateModel.count({
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
