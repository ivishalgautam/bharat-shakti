"use strict";
import moment from "moment";
import constants from "../../lib/constants/index.js";
import { Deferrable, DataTypes, Op } from "sequelize";

let SubscriptionModel = null;

const init = async (sequelize) => {
  SubscriptionModel = sequelize.define(
    constants.models.SUBSCRIPTION_TABLE,
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
      plan_tier: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      duration_in_months: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("active", "expired", "cancelled"),
        defaultValue: "active",
      },
      payment_reference: {
        type: DataTypes.STRING,
        allowNull: true, // you can link this to a payment gateway txn ID
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await SubscriptionModel.sync({ alter: true });
};

const create = async (req, { transaction }) => {
  return await SubscriptionModel.create(
    {
      user_id: req.user_data.id,
      plan_tier: req.body.plan_tier,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      duration_in_months: req.body.duration_in_months,
      payment_reference: req.body.payment_reference,
    },
    { transaction }
  );
};

const update = async (req, id, { transaction }) => {
  return await SubscriptionModel.create(
    { status: req.body.status },
    { where: { id: id }, transaction }
  );
};

const get = async (req) => {
  return await SubscriptionModel.findAll({
    user_id: req.user_data.id,
  });
};

const deleteById = async (req, id, { transaction }) => {
  return await SubscriptionModel.destroy({
    where: { id: req.params.id || id },
    transaction,
  });
};

const getById = async (req, id) => {
  return await SubscriptionModel.findOne({
    where: { id: req?.params?.id || id },
  });
};

const getLastActivePlanByUserId = async (user_id) => {
  return await SubscriptionModel.findOne({
    where: {
      user_id: user_id,
      status: "active",
      end_date: { [Op.gte]: moment() },
    },
    order: [["created_at", "DESC"]],
    plain: true,
    raw: true,
  });
};

export default {
  init: init,
  create: create,
  update: update,
  get: get,
  deleteById: deleteById,
  getById: getById,
  getLastActivePlanByUserId: getLastActivePlanByUserId,
};
