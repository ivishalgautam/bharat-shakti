import config from "@/config";

const { endpoints } = require("@/utils/endpoints");
const { default: axios } = require("axios");

const get = async () => {
  const { data } = await axios.get(
    `${config.api_base}${endpoints.keywords.getAll}`,
  );
  return data?.data?.keywords ?? [];
};

const getFeatured = async () => {
  const { data } = await axios.get(
    `${config.api_base}${endpoints.keywords.getAll}?featured=true`,
  );
  return data?.data?.keywords ?? [];
};

const keywords = {
  get: get,
  getFeatured: getFeatured,
};

export default keywords;
