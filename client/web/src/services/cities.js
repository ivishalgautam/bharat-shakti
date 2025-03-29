import config from "@/config";

const { endpoints } = require("@/utils/endpoints");
const { default: axios } = require("axios");

const get = async () => {
  const { data } = await axios.get(
    `${config.api_base}${endpoints.cities.getAll}`,
  );
  return data?.data?.cities ?? [];
};

const getFeatured = async () => {
  const { data } = await axios.get(
    `${config.api_base}${endpoints.cities.getAll}?featured=true`,
  );
  return data?.data?.cities ?? [];
};

const cities = {
  get: get,
  getFeatured: getFeatured,
};

export default cities;
