"use strict";
import { DataTypes, Deferrable } from "sequelize";
import constants from "../../lib/constants/index.js";

let UserSession = null;
const init = async (sequelize) => {
  UserSession = await sequelize.define(
    constants.models.USER_SESSION_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: constants.models.USER_TABLE,
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

  await UserSession.sync({ alter: true });
};

const create = async (user_id, { transaction }) => {
  const data = await UserSession.create(
    {
      user_id: user_id,
    },
    { returning: true, transaction }
  );

  return data.dataValues;
};

const deleteById = async (id, { transaction }) => {
  return await UserSession.destroy({
    where: { id: id },
    transaction,
  });
};

const getByUserId = async (user_id) => {
  return await UserSession.findAll({
    where: { user_id },
    orders: [["created_at", "DESC"]],
    raw: true,
  });
};

export default {
  init: init,
  create: create,
  deleteById: deleteById,
  getByUserId: getByUserId,
};
