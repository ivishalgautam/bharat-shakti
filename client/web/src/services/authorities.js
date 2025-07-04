import config from "@/config";

const { endpoints } = require("@/utils/endpoints");
const { default: axios } = require("axios");

const get = async () => {
  const { data } = await axios.get(
    `${config.api_base}${endpoints.authorities.getAll}`,
  );
  return data?.data?.authorities ?? [];
};

const getFormatted = async () => {
  const { data } = await axios.get(
    `${config.api_base}${endpoints.authorities.getAll}`,
  );
  return data?.map(({ id: value, name: label }) => ({ value, label })) ?? [];
};

const getFeatured = async () => {
  const { data } = await axios.get(
    `${config.api_base}${endpoints.authorities.getAll}?featured=true`,
  );
  return data?.data?.authorities ?? [];
};

const authorities = {
  get: get,
  getFeatured: getFeatured,
  getFormatted: getFormatted,
};

export default authorities;
