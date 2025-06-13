"use strict";
import { DataTypes, Deferrable, Op, QueryTypes } from "sequelize";
import constants from "../../lib/constants/index.js";

let RazorpayPaymentModel = null;

const init = async (sequelize) => {
  RazorpayPaymentModel = sequelize.define(
    constants.models.RAZORPAY_PAYMENT_TABLE,
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
      plan_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: constants.models.PLAN_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      razorpay_order_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      razorpay_payment_id: {
        type: DataTypes.STRING,
        allowNull: true, // filled after payment is done
      },
      amount: {
        type: DataTypes.INTEGER, // in paisa
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        defaultValue: "INR",
      },
      status: {
        type: DataTypes.ENUM("created", "paid", "failed"),
        defaultValue: "created",
      },
      receipt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await RazorpayPaymentModel.sync({ alter: true });
};

// Create a payment record
const create = async (req, { transaction } = {}) => {
  return await RazorpayPaymentModel.create(
    {
      user_id: req.user_data.id,
      plan_id: req.body.plan_id,
      razorpay_order_id: req.body.razorpay_order_id,
      amount: req.body.amount,
      currency: req.body.currency,
      receipt: req.body.receipt,
      status: req.body.status,
    },
    { transaction }
  );
};

// Update payment status/payment_id
const update = async (req, razorpay_order_id, { transaction } = {}) => {
  return await RazorpayPaymentModel.update(
    {
      status: req.body.status,
      razorpay_payment_id: req.body.razorpay_payment_id,
    },
    {
      where: { razorpay_order_id },
      transaction,
    }
  );
};

// Get by order ID
const getByOrderId = async (razorpay_order_id) => {
  return await RazorpayPaymentModel.findOne({
    where: { razorpay_order_id },
    raw: true,
  });
};

// Optional: Get all payments by user
const getByUserId = async (user_id) => {
  return await RazorpayPaymentModel.findAll({
    where: { user_id },
    order: [["created_at", "DESC"]],
    raw: true,
  });
};

export default {
  init: init,
  create: create,
  update: update,
  getByOrderId: getByOrderId,
  getByUserId: getByUserId,
};
