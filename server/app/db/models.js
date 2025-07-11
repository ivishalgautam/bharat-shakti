"use strict";
import userModel from "./models/user.model.js";
import authorityModel from "./models/authority.model.js";
import cityModel from "./models/city.model.js";
import sectorModel from "./models/sector.model.js";
import stateModel from "./models/state.model.js";
import tenderModel from "./models/tender.model.js";
import companyProfileModel from "./models/company-profile.model.js";
import userKeyContactModel from "./models/user-key-contact.model.js";
import wishlistModel from "./models/wishlist.model.js";
import viewedTenderModel from "./models/viewed-tender.model.js";
import applicationModel from "./models/application.model.js";
import industryModel from "./models/industry.model.js";
import planModel from "./models/plan.model.js";
import subscriptionModel from "./models/subscription.model.js";
import categoryModel from "./models/category.model.js";
import subCategoryModel from "./models/sub-category.model.js";
import preferenceModel from "./models/preference.model.js";
import sessionsModel from "./models/session.model.js";
import faqModel from "./models/faq.model.js";
import razorpayPaymentModel from "./models/razorpay-payment.model.js";
import otpModel from "./models/otp.model.js";
import invoiceMasterModel from "./models/invoice-master.model.js";

export default {
  UserModel: userModel,
  TenderModel: tenderModel,
  AuthorityModel: authorityModel,
  IndustryModel: industryModel,
  CityModel: cityModel,
  SectorModel: sectorModel,
  StateModel: stateModel,
  CompanyProfileModel: companyProfileModel,
  UserContactModel: userKeyContactModel,
  WishlistModel: wishlistModel,
  ViewedTenderModel: viewedTenderModel,
  ApplicationModel: applicationModel,
  PlanModel: planModel,
  SubscriptionModel: subscriptionModel,
  CategoryModel: categoryModel,
  SubCategoryModel: subCategoryModel,
  PreferenceModel: preferenceModel,
  SessionModel: sessionsModel,
  FAQModel: faqModel,
  RazorpayPaymentModel: razorpayPaymentModel,
  OTPModel: otpModel,
  InvoiceMasterModel: invoiceMasterModel,
};
