"use strict";
import moment from "moment";
import constants from "../../lib/constants/index.js";
import { DataTypes, Deferrable, Op, QueryTypes } from "sequelize";

let SubCategoryModel = null;

const init = async (sequelize) => {
  SubCategoryModel = sequelize.define(
    constants.models.SUB_CATEGORY_TABLE,
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
          msg: "Sub Category exist with this name!",
        },
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: constants.models.CATEGORY_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
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

  await SubCategoryModel.sync({ alter: true });
};

const create = async (req, { transaction }) => {
  return await SubCategoryModel.create(
    {
      name: req.body.name,
      slug: req.body.slug,
      is_featured: req.body.is_featured,
      image: req.body.image,
      category_id: req.body.category_id,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_keywords: req.body.meta_keywords,
    },
    { transaction }
  );
};

const bulkCreate = async (subcategories, { transaction } = {}) => {
  return await SubCategoryModel.bulkCreate(subcategories, {
    transaction,
    validate: true,
    returning: true,
  });
};

const update = async (req, id) => {
  const [rowCount, rows] = await SubCategoryModel.update(
    {
      name: req.body.name,
      slug: req.body.slug,
      is_featured: req.body.is_featured,
      image: req.body.image,
      category_id: req.body.category_id,
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

const get = async (req) => {
  let whereConditions = [];
  const queryParams = {};
  let q = req.query.q;
  if (q) {
    whereConditions.push(`sbcat.name ILIKE :query`);
    queryParams.query = `%${q}%`;
  }

  let category = req.query.category;
  if (category) {
    whereConditions.push(`sbcat.category_id = :category`);
    queryParams.category = category;
  }

  const featured = req.query.featured;
  if (featured) {
    whereConditions.push(`sbcat.is_featured = true`);
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
      COUNT(sbcat.id) OVER()::integer as total
    FROM ${constants.models.SUB_CATEGORY_TABLE} sbcat
    LEFT JOIN ${constants.models.TENDER_TABLE} tdr ON sbcat.id = ANY(tdr.subcategory_ids)
    LEFT JOIN ${constants.models.CATEGORY_TABLE} cat ON cat.id = sbcat.category_id
    ${whereClause}
    GROUP BY sbcat.id, cat.name
    ORDER BY sbcat.created_at DESC
  `;

  let query = `
  SELECT
      sbcat.*,
      COUNT(tdr.id)::integer as tenders_count,
      cat.name as category_name
    FROM ${constants.models.SUB_CATEGORY_TABLE} sbcat
    LEFT JOIN ${constants.models.TENDER_TABLE} tdr ON sbcat.id = ANY(tdr.subcategory_ids)
    LEFT JOIN ${constants.models.CATEGORY_TABLE} cat ON cat.id = sbcat.category_id
    ${whereClause}
    GROUP BY sbcat.id, cat.name
    ORDER BY sbcat.created_at DESC
    LIMIT :limit OFFSET :offset
  `;

  const data = await SubCategoryModel.sequelize.query(query, {
    replacements: { ...queryParams, limit, offset },
    type: QueryTypes.SELECT,
    raw: true,
  });

  const count = await SubCategoryModel.sequelize.query(countQuery, {
    replacements: { ...queryParams },
    type: QueryTypes.SELECT,
    raw: true,
  });

  return { subcategories: data, total: count?.[0]?.total ?? 0 };
};

const getById = async (req, id) => {
  return await SubCategoryModel.findOne({
    where: {
      id: req?.params?.id || id,
    },
    raw: true,
  });
};

const getByPk = async (req, id) => {
  return await SubCategoryModel.findByPk(req?.params?.id || id);
};

const getBySlug = async (req, slug) => {
  return await SubCategoryModel.findOne({
    where: {
      slug: req.params?.slug || slug,
    },
    raw: true,
  });
};

const deleteById = async (req, id, { transaction }) => {
  return await SubCategoryModel.destroy({
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

  return await SubCategoryModel.count({
    where: where_query,
    raw: true,
  });
};

export default {
  init: init,
  create: create,
  bulkCreate: bulkCreate,
  get: get,
  update: update,
  getById: getById,
  getByPk: getByPk,
  getBySlug: getBySlug,
  deleteById: deleteById,
  count: count,
};
