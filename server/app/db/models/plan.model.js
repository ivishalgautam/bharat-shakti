"use strict";
import { DataTypes, QueryTypes } from "sequelize";
import constants from "../../lib/constants/index.js";

let PlanModel = null;

const init = async (sequelize) => {
  PlanModel = sequelize.define(
    constants.models.PLAN_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Display name for this variant (e.g. "Monthly", "Quarterly")',
      },
      duration_in_months: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Subscription duration in months (1, 3, 6, 12, etc)",
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      discount_percentage: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0,
        comment: "Discount percentage compared to monthly price",
      },
      is_popular: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: "Flag to mark as popular/recommended option",
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      plan_tier: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "standard",
        validate: {
          isIn: {
            args: [["free", "standard", "premium", "elite"]],
            message: "Tier must be one of: free, standard, premium, elite",
          },
        },
      },
      features: {
        type: DataTypes.JSONB,
        defaultValue: [],
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await PlanModel.sync({ alter: true });
};

const create = async (req, { transaction }) => {
  return await PlanModel.create(
    {
      name: req.body.name,
      duration_in_months: req.body.duration_in_months,
      price: req.body.price,
      discount_percentage: req.body.discount_percentage,
      is_popular: req.body.is_popular,
      is_active: req.body.is_active,
      plan_tier: req.body.plan_tier,
      features: req.body.features,
    },
    { transaction }
  );
};

const updateById = async (req, id, { transaction }) => {
  return await PlanModel.update(
    {
      name: req.body.name,
      duration_in_months: req.body.duration_in_months,
      price: req.body.price,
      discount_percentage: req.body.discount_percentage,
      is_popular: req.body.is_popular,
      is_active: req.body.is_active,
      plan_tier: req.body.plan_tier,
      features: req.body.features,
    },
    {
      where: { id: req.params.id || id },
      transaction,
    }
  );
};

const get = async (req) => {
  let whereConditions = ["pln.is_active IS true"];
  const queryParams = {};
  let q = req.query.q;
  if (q) {
    whereConditions.push(`pln.name ILIKE :query`);
    queryParams.query = `%${q}%`;
  }

  const popular = req.query.popular;
  if (popular) {
    whereConditions.push(`pln.is_popular = true`);
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
      COUNT(pln.id) OVER()::integer as total
    FROM ${constants.models.PLAN_TABLE} pln
    ${whereClause}
    ORDER BY pln.created_at DESC
  `;

  let query = `
  SELECT
      pln.*
    FROM ${constants.models.PLAN_TABLE} pln
    ${whereClause}
    ORDER BY pln.created_at DESC
    LIMIT :limit OFFSET :offset
  `;

  const data = await PlanModel.sequelize.query(query, {
    replacements: { ...queryParams, limit, offset },
    type: QueryTypes.SELECT,
    raw: true,
  });

  const count = await PlanModel.sequelize.query(countQuery, {
    replacements: { ...queryParams },
    type: QueryTypes.SELECT,
    raw: true,
  });

  return { plans: data, total: count?.[0]?.total ?? 0 };
};

const getAll = async (req) => {
  let whereConditions = [];
  const queryParams = {};
  let q = req.query.q;
  if (q) {
    whereConditions.push(`pln.name ILIKE :query`);
    queryParams.query = `%${q}%`;
  }

  const popular = req.query.popular;
  if (popular) {
    whereConditions.push(`pln.is_popular = true`);
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
      COUNT(pln.id) OVER()::integer as total
    FROM ${constants.models.PLAN_TABLE} pln
    ${whereClause}
    ORDER BY pln.created_at DESC
  `;

  let query = `
  SELECT
      pln.*
    FROM ${constants.models.PLAN_TABLE} pln
    ${whereClause}
    ORDER BY pln.created_at DESC
    LIMIT :limit OFFSET :offset
  `;

  const data = await PlanModel.sequelize.query(query, {
    replacements: { ...queryParams, limit, offset },
    type: QueryTypes.SELECT,
    raw: true,
  });

  const count = await PlanModel.sequelize.query(countQuery, {
    replacements: { ...queryParams },
    type: QueryTypes.SELECT,
    raw: true,
  });

  return { plans: data, total: count?.[0]?.total ?? 0 };
};

const getById = async (req, id) => {
  return await PlanModel.findOne({
    where: {
      id: req?.params?.id || id,
    },
    raw: true,
  });
};

const getByFreePlan = async () => {
  return await PlanModel.findOne({
    where: { plan_tier: "free" },
    raw: true,
  });
};

const deleteById = async (req, id, { transaction }) => {
  return await PlanModel.destroy({
    where: { id: req.params.id || id },
    transaction,
  });
};

export default {
  init: init,
  create: create,
  get: get,
  getById: getById,
  deleteById: deleteById,
  updateById: updateById,
  getByFreePlan: getByFreePlan,
  getAll: getAll,
};
