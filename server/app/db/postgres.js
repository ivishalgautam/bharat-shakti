import config from "../config/index.js";
import { Sequelize } from "sequelize";
import migration from "./index.js";

export const sequelize = new Sequelize(
  config.pg_database_name,
  config.pg_username,
  config.pg_password,
  {
    host: config.pg_host,
    dialect: config.pg_dialect,
    logging: false,
    pool: {
      max: 20, // maximum open connections
      min: 0,
      acquire: 30000, // max time (ms) to wait for a connection before error
      idle: 10000, // time (ms) a connection can be idle before being released
    },
  }
);

async function postgresConnection(fastify, options) {
  let dbSuccess = null;

  try {
    await sequelize.authenticate();
    dbSuccess = true;
    fastify.log.info(`Postgres Database connection OK!`);
    fastify.log.info(`Initializing sequelize connection and models...`);
    await new Promise((resolve) => {
      // enableExtensions(sequelize);
      migration.init(sequelize);
      resolve(`Migration sucessfully completed...`);
    }).then((data) => fastify.log.info(data));
  } catch (error) {
    console.log(error);
    dbSuccess == false;
    process.exit(1);
  }
}

export default postgresConnection;
