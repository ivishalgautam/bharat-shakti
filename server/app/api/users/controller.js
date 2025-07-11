"use strict";

import table from "../../db/models.js";
import { sequelize } from "../../db/postgres.js";
import hash from "../../lib/encryption/index.js";

const create = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const record = await table.UserModel.getByUsername(req);

    if (record) {
      return res.code(409).send({
        message:
          "User already exists with username. Please try with different username",
      });
    }

    const user = await table.UserModel.create(req, { transaction });
    await transaction.commit();
    res.send(user);
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return res.send(error);
  }
};

const update = async (req, res) => {
  try {
    const record = await table.UserModel.getById(req);
    if (!record) {
      return res.code(404).send({ message: "User not exists" });
    }

    return res.send(await table.UserModel.update(req, 0));
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

const deleteById = async (req, res) => {
  try {
    const record = await table.UserModel.deleteById(req);
    if (record === 0) {
      return res.code(404).send({ message: "User not exists" });
    }

    return res.send(record);
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

const get = async (req, res) => {
  try {
    return res.send({ status: true, data: await table.UserModel.get(req) });
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.UserModel.getById(req);
    if (!record) {
      return res.code(404).send({ message: "User not exists" });
    }
    delete record.password;

    return res.send({ status: true, data: record });
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

const updatePassword = async (req, res) => {
  try {
    const record = await table.UserModel.getById(req);

    if (!record) {
      return res.code(404).send({ message: "User not exists" });
    }

    const verify_old_password = await hash.verify(
      req.body.old_password,
      record.password
    );

    if (!verify_old_password) {
      return res
        .code(404)
        .send({ message: "Incorrect password. Please enter a valid password" });
    }

    await table.UserModel.updatePassword(req);
    return res.send({
      message: "Password changed successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

const checkUsername = async (req, res) => {
  try {
    const user = await table.UserModel.getByUsername(req);
    if (user) {
      return res.code(409).send({
        message: "username already exists try with different username",
      });
    }
    return res.send({
      message: false,
    });
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

const getUser = async (req, res) => {
  try {
    const record = await table.UserModel.getById(undefined, req.user_data.id);
    if (!record) {
      return res.code(404).send({ message: "unauthorized!" });
    }
    return res.send(req.user_data);
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

const resetPassword = async (req, res) => {
  const resetToken = req.body.token;
  try {
    const token = await table.UserModel.getByResetToken(resetToken);
    if (!token || token.provider !== "credentials") {
      return res.code(401).send({ message: "Token expired" });
    }

    await table.UserModel.updatePassword(
      { body: { password: req.body.password } },
      token.id
    );
    return res.send({
      message: "Password reset successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};
export default {
  create: create,
  update: update,
  deleteById: deleteById,
  get: get,
  getById: getById,
  checkUsername: checkUsername,
  updatePassword: updatePassword,
  getUser: getUser,
  resetPassword: resetPassword,
};
