"use strict";

import hash from "../../lib/encryption/index.js";

import table from "../../db/models.js";
import authToken from "../../helpers/auth.js";
import { userSchema } from "../../utils/schema/user.schema.js";
import { sequelize } from "../../db/postgres.js";
import constants from "../../lib/constants/index.js";
import moment from "moment";

const verifyUserCredentials = async (req, res) => {
  const { username, password, provider, provider_account_id, email } = req.body;

  let userData = null;

  const transaction = await sequelize.transaction();

  try {
    if (username && password) {
      userData = await table.UserModel.getByUsername(req);
      // console.log({ userData });
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
          message: "Invalid Credentials.",
        });
      }
    } else if (provider && provider_account_id && email) {
      userData = await table.UserModel.getByEmailId(req);
      if (!userData) {
        userData = await table.UserModel.create(req, { transaction });
        const freePlan = await table.PlanModel.getByFreePlan();
        const currDate = moment();
        const startDate = currDate.toISOString();
        const endDate = currDate.add(7, "days");
        await table.SubscriptionModel.create(
          {
            user_data: { id: userData.id },
            body: {
              plan_id: freePlan.id,
              plan_tier: freePlan.plan_tier,
              start_date: startDate,
              end_date: endDate,
              duration_in_months: 0,
            },
          },
          { transaction }
        );
      } else {
        if (!userData.provider) {
          await table.UserModel.update(
            { body: { provider, provider_account_id } },
            userData.id,
            { transaction }
          );
        }
      }
    } else {
      return res.code(400).send({ message: "Invalid login request." });
    }

    const planTier = await table.SubscriptionModel.getLastActivePlanByUserId(
      userData.id
    );
    const allowedSessions =
      constants.plan_limits[planTier?.plan_tier ?? "free"];
    const sessions = await table.SessionModel.getByUserId(userData.id);
    if (sessions.length >= allowedSessions) {
      const toRemove = sessions[0].id;
      await table.SessionModel.deleteById(toRemove, { transaction });
    }

    const session = await table.SessionModel.create(userData.id, {
      transaction,
    });
    // console.log({ allowedSessions, sessions, session });

    const userPayload = {
      ...userData,
      session_id: session.id,
    };
    const [jwtToken, expiresIn] = authToken.generateAccessToken(userPayload);
    const [refreshToken, refreshExpireTime] =
      authToken.generateRefreshToken(userPayload);

    await transaction.commit();
    return res.send({
      token: jwtToken,
      expire_time: Date.now() + expiresIn,
      refresh_token: refreshToken,
      refresh_expire_time: Date.now() + refreshExpireTime,
      user_data: userData,
    });
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return res.code(500).send({ message: "Internal Server Error", error });
  }
};

const createNewUser = async (req, res) => {
  const transaction = await sequelize.transaction();

  let userData;
  try {
    const validateData = userSchema.parse(req.body);
    userData = await table.UserModel.getByUsername(req);
    if (userData) {
      return res
        .code(409)
        .send({ message: "User with this username already exists." });
    }

    userData = await table.UserModel.create(req, { transaction });

    console.log({ userData });
    const freePlan = await table.PlanModel.getByFreePlan();
    const currDate = moment();
    const startDate = currDate.toISOString();
    const endDate = currDate.add(7, "days");
    await table.SubscriptionModel.create(
      {
        user_data: {
          id: userData.id,
        },
        body: {
          plan_id: freePlan.id,
          plan_tier: freePlan.plan_tier,
          start_date: startDate,
          end_date: endDate,
          duration_in_months: 0,
        },
      },
      { transaction }
    );

    await transaction.commit();
    res.send({ message: "User created successfully." });
  } catch (error) {
    await transaction.rollback();
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
