"use strict";
import { DataTypes, Deferrable, Op, QueryTypes } from "sequelize";
import sequelize from "sequelize";
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
const create = async (req, { transaction }) => {
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

const getDashboardStats = async () => {
  const [total, paid, failed, revenue] = await Promise.all([
    RazorpayPaymentModel.count(),
    RazorpayPaymentModel.count({ where: { status: "paid" } }),
    RazorpayPaymentModel.count({ where: { status: "failed" } }),
    RazorpayPaymentModel.sum("amount", { where: { status: "paid" } }),
  ]);

  return {
    total_payments: total,
    successful_payments: paid,
    failed_payments: failed,
    total_revenue: revenue ?? 0,
  };
};

const getTodayRevenue = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const revenueToday = await RazorpayPaymentModel.sum("amount", {
    where: {
      status: "paid",
      created_at: {
        [Op.between]: [today, tomorrow],
      },
    },
  });

  return revenueToday ?? 0;
};

const getPaymentsOverTime = async () => {
  const results = await RazorpayPaymentModel.findAll({
    attributes: [
      [
        RazorpayPaymentModel.sequelize.fn(
          "DATE",
          RazorpayPaymentModel.sequelize.col("created_at")
        ),
        "date",
      ],
      [
        RazorpayPaymentModel.sequelize.literal(
          `SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END)`
        ),
        "paid",
      ],
      [
        RazorpayPaymentModel.sequelize.literal(
          `SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END)`
        ),
        "failed",
      ],
    ],
    where: {
      created_at: {
        [Op.gte]: RazorpayPaymentModel.sequelize.literal(
          "CURRENT_DATE - INTERVAL '7 days'"
        ),
      },
    },
    group: [
      RazorpayPaymentModel.sequelize.fn(
        "DATE",
        RazorpayPaymentModel.sequelize.col("created_at")
      ),
    ],
    order: [
      [
        RazorpayPaymentModel.sequelize.fn(
          "DATE",
          RazorpayPaymentModel.sequelize.col("created_at")
        ),
        "ASC",
      ],
    ],
    raw: true,
  });

  return results;
};

const getLatestTransactions = async (limit = 10) => {
  const query = `
  SELECT
      rzrp.*,
      usr.id as user_id,
      usr.email as user_email,
      CONCAT(usr.first_name, ' ', usr.last_name) as user_name,
      pln.id as plan_id,
      pln.name as plan_name
    FROM ${constants.models.RAZORPAY_PAYMENT_TABLE} rzrp
    LEFT JOIN ${constants.models.USER_TABLE} usr ON usr.id = rzrp.user_id 
    LEFT JOIN ${constants.models.PLAN_TABLE} pln ON pln.id = rzrp.plan_id
    ORDER BY rzrp.created_at DESC
    LIMIT :limit
  `;

  return await RazorpayPaymentModel.sequelize.query(query, {
    replacements: { limit },
    type: QueryTypes.SELECT,
  });
};

const getStatusBreakdown = async () => {
  const result = await RazorpayPaymentModel.findAll({
    attributes: [
      "status",
      [sequelize.fn("COUNT", sequelize.col("status")), "count"],
    ],
    group: ["status"],
    raw: true,
  });

  return result.map((r) => ({
    status: r.status,
    value: parseInt(r.count),
  }));
};

export default {
  init: init,
  create: create,
  update: update,
  getByOrderId: getByOrderId,
  getByUserId: getByUserId,
  getDashboardStats: getDashboardStats,
  getTodayRevenue: getTodayRevenue,
  getPaymentsOverTime: getPaymentsOverTime,
  getLatestTransactions: getLatestTransactions,
  getStatusBreakdown: getStatusBreakdown,
};
