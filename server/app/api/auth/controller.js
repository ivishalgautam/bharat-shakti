"use strict";

import hash from "../../lib/encryption/index.js";

import table from "../../db/models.js";
import authToken from "../../helpers/auth.js";
import { userSchema } from "../../utils/schema/user.schema.js";

const verifyUserCredentials = async (req, res) => {
  const { username, password, provider, provider_account_id } = req.body;

  let userData = null;

  try {
    if (username && password) {
      userData = await table.UserModel.getByUsername(req);

      if (!userData) {
        return res
          .code(404)
          .send({ message: "User with that username does not exist" });
      }

      // 🚨 If user registered via social, tell them to use social login
      if (userData.provider && userData.provider !== "credentials") {
        return res.code(400).send({
          message: `Please login using ${userData.provider} instead of username and password.`,
        });
      }

      const passwordIsValid = await hash.verify(password, userData.password);

      if (!passwordIsValid) {
        return res.code(401).send({
          message: "Incorrect password. Please enter a valid password",
        });
      }
    } else if (provider && provider_account_id && email) {
      userData = await table.UserModel.getByEmailId(req);

      if (!userData) {
        userData = await table.UserModel.create(req);
      } else {
        if (!userData.provider) {
          await userData.update({ body: { provider, provider_account_id } });
        }
      }
    } else {
      return res.code(400).send({ message: "Invalid login request." });
    }

    const [jwtToken, expiresIn] = authToken.generateAccessToken(userData);
    const [refreshToken, refreshExpireTime] =
      authToken.generateRefreshToken(userData);

    return res.send({
      token: jwtToken,
      expire_time: Date.now() + expiresIn,
      refresh_token: refreshToken,
      refresh_expire_time: Date.now() + refreshExpireTime,
      user_data: userData,
    });
  } catch (error) {
    console.log(error);
    return res.code(500).send({ message: "Internal Server Error", error });
  }
};

const createNewUser = async (req, res) => {
  let userData;
  try {
    const validateData = userSchema.parse(req.body);

    userData = await table.UserModel.getByUsername(req);
    if (userData) {
      return res
        .code(409)
        .send({ message: "User with this username already exists." });
    }

    await table.UserModel.create(req);

    return res.send({
      message: "User created successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const verifyRefreshToken = async (req, res) => {
  return authToken.verifyRefreshToken(req, res);
};

export default {
  verifyUserCredentials,
  createNewUser,
  verifyRefreshToken,
};
