"use strict";
import userModel from "./models/user.model.js";
import authorityModel from "./models/authority.model.js";
import cityModel from "./models/city.model.js";
import keywordModel from "./models/keyword.model.js";
import sectorModel from "./models/sector.model.js";
import stateModel from "./models/state.model.js";
import tenderModel from "./models/tender.model.js";

export default {
  UserModel: userModel,
  TenderModel: tenderModel,
  AuthorityModel: authorityModel,
  CityModel: cityModel,
  KeywordModel: keywordModel,
  SectorModel: sectorModel,
  StateModel: stateModel,
};
