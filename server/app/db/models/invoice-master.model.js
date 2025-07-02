"use strict";
import constants from "../../lib/constants/index.js";
import sequelizeFwk, { Deferrable, Op, QueryTypes } from "sequelize";
const { DataTypes } = sequelizeFwk;

let InvoiceMasterModel = null;

const init = async (sequelize) => {
  InvoiceMasterModel = sequelize.define(
    constants.models.INVOICE_MASTER_TABLE,
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      application_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: constants.models.APPLICATION_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
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
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      internal_order_no: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      invoice_no: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      delivery_date_with_ld: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      delivery_date_without_ld: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      invoice_quantity: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
      supplied_quantity: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
      rejected_quantity: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
      accepted_quantity: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
      supplied_value_basic: {
        // ! supplied_quantity * basic_value
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
      supplied_value_gst: {
        // ! 18% of supplied_value_basic
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
      accepted_value_basic: {
        // ! accepted_quantity * basic_value
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
      accepted_value_gst: {
        // ! 18% of accepted_value_basic
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
      payment_received: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
      ld_deduction: {
        // ! value idk * accepted_value_basic
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
      gst_tds: {
        // ! 2% of accepted_value_basic
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
      it_tds: {
        // ! 1% of accepted_value_basic
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
      payment_dues: {
        // ! (accepted_value_basic + accepted_value_gst) - (ld_deduction + gst_tds + it_tds) - payment_received
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
      payment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      days: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await InvoiceMasterModel.sync({ alter: true });
};

const create = async (req, transaction) => {
  const options = {};

  if (transaction) options.transaction = transaction;

  return await InvoiceMasterModel.create(
    {
      application_id: req.body.application_id,
      user_id: req.user_data.id,
      tender_id: req.body.tender_id,
      unit: req.body.unit,
      internal_order_no: req.body.internal_order_no,
      invoice_no: req.body.invoice_no,
      date: req.body.date,
      invoice_quantity: req.body.invoice_quantity,
      delivery_date_with_ld: req.body.delivery_date_with_ld,
      delivery_date_without_ld: req.body.delivery_date_without_ld,
      supplied_quantity: req.body.supplied_quantity,
      rejected_quantity: req.body.rejected_quantity,
      accepted_quantity: req.body.accepted_quantity,
      supplied_value_basic: req.body.supplied_value_basic, // ! supplied_quantity * basic_value
      supplied_value_gst: req.body.supplied_value_gst, // ! 18% of supplied_value_basic
      accepted_value_basic: req.body.accepted_value_basic, // ! accepted_quantity * basic_value
      accepted_value_gst: req.body.accepted_value_gst, // ! 18% of accepted_value_basic
      payment_received: req.body.payment_received,
      ld_deduction: req.body.ld_deduction, // ! value idk * accepted_value_basic
      gst_tds: req.body.gst_tds, // ! 2% of accepted_value_basic
      it_tds: req.body.it_tds, // ! 1% of accepted_value_basic
      payment_dues: req.body.payment_dues, // ! (accepted_value_basic + accepted_value_gst) - (ld_deduction + gst_tds + it_tds) - payment_received
      payment_date: req.body.payment_date,
      days: req.body.days,
    },
    options
  );
};

const get = async (req) => {
  const { role, id } = req.user_data;
  let whereConditions = ["im.user_id = :userId"];
  const queryParams = { userId: id };

  let q = req.query.q;
  if (q) {
    whereConditions.push(`(tdr.bid_number ILIKE :query)`);
    queryParams.query = `%${q}%`;
  }

  const status = req.query.status ? req.query.status.split(".") : null;
  if (status?.length) {
    whereConditions.push(`im.status = any(:status)`);
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
      COUNT(im.id) OVER()::integer as total
    FROM ${constants.models.INVOICE_MASTER_TABLE} im
    LEFT JOIN ${constants.models.TENDER_TABLE} tdr ON tdr.id = im.tender_id
    ${whereClause}
    `;

  let query = `
    SELECT
        im.*,
        tdr.bid_number, tdr.item_gem_arpts as items
      FROM ${constants.models.INVOICE_MASTER_TABLE} im
      LEFT JOIN ${constants.models.TENDER_TABLE} tdr ON tdr.id = im.tender_id
      ${whereClause}
      ORDER BY im.created_at DESC
      LIMIT :limit OFFSET :offset
  `;

  const data = await InvoiceMasterModel.sequelize.query(query, {
    replacements: { ...queryParams, limit, offset },
    type: QueryTypes.SELECT,
    raw: true,
  });

  const count = await InvoiceMasterModel.sequelize.query(countQuery, {
    replacements: { ...queryParams },
    type: QueryTypes.SELECT,
    raw: true,
  });

  return { data: data, total: count?.[0]?.total ?? 0 };
};

const getOrderFollowups = async (req) => {
  const { role, id } = req.user_data;
  let whereConditions = ["im.user_id = :userId"];
  const queryParams = { userId: id };

  let q = req.query.q;
  if (q) {
    whereConditions.push(
      `(tdr.bid_number ILIKE :query OR im.application_id ILIKE :query)`
    );
    queryParams.query = `%${q}%`;
  }

  const status = req.query.status ? req.query.status.split(".") : null;
  if (status?.length) {
    whereConditions.push(`im.status = any(:status)`);
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
      COUNT(im.application_id) OVER()::integer as total
    FROM ${constants.models.INVOICE_MASTER_TABLE} im
    LEFT JOIN ${constants.models.TENDER_TABLE} tdr ON tdr.id = im.tender_id
    ${whereClause}
    GROUP BY im.application_id
    `;

  let query = `
    SELECT
      im.application_id,
      MAX(im.internal_order_no) as internal_order_no,
      tdr.id as tender_id,
      tdr.bid_number,
      tdr.item_gem_arpts as items,

      -- Aggregated values
      SUM(im.payment_received) as payment_received,
      SUM(im.payment_dues) as payment_dues
    FROM ${constants.models.INVOICE_MASTER_TABLE} im
    LEFT JOIN ${constants.models.TENDER_TABLE} tdr ON tdr.id = im.tender_id
    ${whereClause}
    GROUP BY im.application_id, tdr.id
    LIMIT :limit OFFSET :offset
  `;

  const data = await InvoiceMasterModel.sequelize.query(query, {
    replacements: { ...queryParams, limit, offset },
    type: QueryTypes.SELECT,
    raw: true,
  });

  const count = await InvoiceMasterModel.sequelize.query(countQuery, {
    replacements: { ...queryParams },
    type: QueryTypes.SELECT,
    raw: true,
  });

  return { data: data, total: count?.[0]?.total ?? 0 };
};

const getOrderFollowupByApplicationId = async (req, id) => {
  let query = `
    SELECT
        im.application_id,
        MAX(im.internal_order_no) as internal_order_no,
        MAX(im.date) as date,
        MAX(im.delivery_date_without_ld) as delivery_period,
        MAX(im.delivery_date_with_ld) as extended_dp,
        MAX(im.created_at) as last_invoice_date,
        tdr.id as tender_id,
        tdr.bid_number,
        tdr.item_gem_arpts as items,
        tdr.quantity::integer as order_quantity,
        tdr.tender_value as order_value,
        (tdr.tender_value::integer / tdr.quantity::integer) as rate_inc_gst,
        ((tdr.tender_value::integer / tdr.quantity::integer) / (1 + 18/100)) as basic_rate,

        -- Aggregated values
        SUM(im.invoice_quantity) as invoice_quantity,
        SUM(im.supplied_quantity) as supplied_quantity,
        SUM(im.rejected_quantity) as rejected_quantity,
        SUM(im.accepted_quantity) as accepted_quantity,
        (tdr.quantity::integer - SUM(im.accepted_quantity)) as so_due,
        SUM(im.supplied_value_basic) as supplied_value_basic,
        SUM(im.supplied_value_gst) as supplied_value_gst,
        SUM(im.accepted_value_basic) as accepted_value_basic,
        SUM(im.accepted_value_gst) as accepted_value_gst,
        SUM(im.payment_received) as payment_received,
        SUM(im.ld_deduction) as ld_deduction,
        SUM(im.gst_tds) as gst_tds,
        SUM(im.it_tds) as it_tds,
        SUM(im.payment_dues) as payment_dues
    FROM ${constants.models.INVOICE_MASTER_TABLE} im
    LEFT JOIN ${constants.models.TENDER_TABLE} tdr ON tdr.id = im.tender_id
    WHERE im.application_id = :applicationId
    GROUP BY im.application_id, tdr.id
  `;

  return await InvoiceMasterModel.sequelize.query(query, {
    replacements: { applicationId: req?.params?.id || id },
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
  });
};

const getByUserAndTenderId = async (req) => {
  return await InvoiceMasterModel.findOne({
    where: {
      user_id: req.user_data.id,
      tender_id: req?.params?.id || req.body.tender_id,
    },
  });
};

const deleteById = async (req, id, { transaction }) => {
  return await InvoiceMasterModel.destroy({
    where: { id: req.params.id || id },
    transaction,
  });
};

const getById = async (req, id) => {
  let query = `
    SELECT
        im.*,
        tdr.bid_number, tdr.item_gem_arpts as items
      FROM ${constants.models.INVOICE_MASTER_TABLE} im
      LEFT JOIN ${constants.models.TENDER_TABLE} tdr ON tdr.id = im.tender_id
      WHERE im.id = :id
  `;

  return await InvoiceMasterModel.sequelize.query(query, {
    replacements: { id: req?.params?.id || id },
    type: QueryTypes.SELECT,
    plain: true,
    raw: true,
  });
};

export default {
  init: init,
  create: create,
  get: get,
  getByUserAndTenderId: getByUserAndTenderId,
  deleteById: deleteById,
  getById: getById,
  getOrderFollowups: getOrderFollowups,
  getOrderFollowupByApplicationId: getOrderFollowupByApplicationId,
};
