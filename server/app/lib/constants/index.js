"use strict";

const constants = {
  environment: {
    LOCAL: "local",
    DEVELOPMENT: "development",
    TEST: "test",
    PRODUCTION: "production",
  },
  http: {
    status: {
      OK: 200,
      CREATED: 201,
      ACCEPTED: 202,
      NOCONTENT: 204,
      MULTI_STATUS: 207,
      REDIRECT: 301,
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      CONFLICT: 409,
      INTERNAL_SERVER_ERROR: 500,
      NOT_FOUND: 404,
    },
    message: {
      // HTTP Status code messages
      HTTP_STATUS_CODE_201: "Created",
      HTTP_STATUS_CODE_400: "Bad Request.",
      HTTP_STATUS_CODE_301: "Redirect to other url",
      HTTP_STATUS_CODE_401: "Unauthorized.",
      HTTP_STATUS_CODE_403: "Forbidden.",
      HTTP_STATUS_CODE_404: "The specified resource was not found.",
      HTTP_STATUS_CODE_409: "Resource already exists",
      HTTP_STATUS_CODE_500: "Internal Server Error.",
      INVALID_LOGIN: "Invalid Login",
      EMAIL_MISSING: "Email Missing",
      PAYMENT_ACCOUNT_ID_MISSING: "Payment Account Id Missing",
      INVALID_PAYMENT_ACCOUNT_ID: "Invalid Payment Account Id provided",
    },
  },
  error: {
    validation: {},
  },
  models: {
    USER_TABLE: "users",
    BANNER_TABLE: "banners",
    TENDER_TABLE: "tenders",
    STATE_TABLE: "states",
    CITY_TABLE: "cities",
    AUTHORITY_TABLE: "authorities",
    INDUSTRY_TABLE: "industries",
    SECTOR_TABLE: "sectors",
    COMPANY_PROFILE_TABLE: "company_profiles",
    USER_CONTACT_TABLE: "user_key_contacts",
    WISHLIST_TABLE: "wishlists",
    VIEWED_TENDER_TABLE: "viewed_tenders",
    APPLICATION_TABLE: "applications",
    PLAN_TABLE: "plans",
    SUBSCRIPTION_TABLE: "subscriptions",
    CATEGORY_TABLE: "categories",
    SUB_CATEGORY_TABLE: "sub_categories",
    PREFERENCE_TABLE: "preferences",
    USER_SESSION_TABLE: "user_sessions",
    FAQ_TABLE: "faqs",
    RAZORPAY_PAYMENT_TABLE: "razorpay_payments",
    OTP_TABLE: "otps",
  },
  bcrypt: {
    SALT_ROUNDS: 10,
  },
  time: {
    TOKEN_EXPIRES_IN: 1000 * 60 * 15, // 15 * 1 minute = 15 minutes
    REFRESH_TOKEN_EXPIRES_IN: 1000 * 60 * 60 * 24 * 1, // 1 day
  },
  plan_limits: {
    unsubscribed: 1,
    free: 1,
    standard: 1,
    premium: 3,
  },
  allowedOrigins: [
    "http://localhost:3000",
    "http://localhost:4000",
    "https://bsdashboard.bwdemo.in",
    "https://bsapi.bwdemo.in",
    "https://bharatshaktitenders.com",
  ],
};

export default constants;
