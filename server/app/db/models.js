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

export default {
  UserModel: userModel,
  TenderModel: tenderModel,
  AuthorityModel: authorityModel,
  IndustryModel: industryModel,
  CityModel: cityModel,
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
};
