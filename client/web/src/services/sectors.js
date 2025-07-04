import config from "@/config";

const { endpoints } = require("@/utils/endpoints");
const { default: axios } = require("axios");

const get = async () => {
  const { data } = await axios.get(
    `${config.api_base}${endpoints.sectors.getAll}`,
  );
  return data?.data?.sectors ?? [];
};

const getFeatured = async () => {
  const { data } = await axios.get(
    `${config.api_base}${endpoints.sectors.getAll}?featured=true`,
  );
  return data?.data?.sectors ?? [];
};

const sectors = {
  get: get,
  getFeatured: getFeatured,
};

export default sectors;
