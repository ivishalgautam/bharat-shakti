import config from "@/config";

const { endpoints } = require("@/utils/endpoints");
const { default: axios } = require("axios");

const get = async () => {
  const { data } = await axios.get(
    `${config.api_base}${endpoints.states.getAll}`,
  );
  return data?.data?.states ?? [];
};

const getFeatured = async () => {
  const { data } = await axios.get(
    `${config.api_base}${endpoints.states.getAll}?featured=true`,
  );
  return data?.data?.states ?? [];
};

const states = {
  get: get,
  getFeatured: getFeatured,
};

export default states;
