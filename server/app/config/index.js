"use strict";
import "dotenv/config";

// Set the NODE_ENV to 'development' by default
process.env.PORT = process.env.PORT || 3001;

const config = {
  node_env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),

  // postgres creds
  pg_database_name: process.env.PG_DATABASE_NAME,
  pg_username: process.env.PG_USERNAME,
  pg_password: process.env.PG_PASSWORD,
  pg_host: process.env.PG_HOST,
  pg_dialect: process.env.DB_DIALECT,

  // jwt secret key
  jwt_secret: process.env.JWT_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  smtp_from_email: process.env.SMTP_EMAIL,
  smtp_port: parseInt(process.env.SMTP_PORT) || 465,
  smtp_host: process.env.SMTP_SERVER || "smtp.gmail.com",
  smtp_password: process.env.SMTP_PASSWORD,

  // razorpay
  razorpay_key_id: process.env.RAZORPAY_KEY_ID,
  razorpay_key_secret: process.env.RAZORPAY_KEY_SECRET,

  // smartping
  smartping_username: process.env.SMARTPING_USERNAME,
  smartping_password: process.env.SMARTPING_PASSWORD,
  smartping_content_id: process.env.SMARTPING_CONTENT_ID,
  smartping_principal_entity_id: process.env.SMARTPING_PRINCIPAL_ENTITY_ID,

  // waffly
  waffly_license_no: process.env.WAFFLY_LICENSE,
  waffly_api_key: process.env.WAFFLY_API_KEY,
  waffly_template_welcome: process.env.WAFFLY_TEMPLATE_WELCOME,
  waffly_template_status_change: process.env.WAFFLY_TEMPLATE_STATUS_CHANGE,
};

export default config;
