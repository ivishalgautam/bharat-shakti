import config from "@/config";

const { endpoints } = require("@/utils/endpoints");
const { default: axios } = require("axios");

const get = async (searchParams = "") => {
  const { data } = await axios.get(
    `${config.api_base}${endpoints.industries.getAll}?${searchParams}`,
  );
  return data?.data?.industries ?? [];
};

const getFeatured = async () => {
  const { data } = await axios.get(
    `${config.api_base}${endpoints.industries.getAll}?featured=true`,
  );
  return data?.data?.industries ?? [];
};

const industries = {
  get: get,
  getFeatured: getFeatured,
};

export default industries;
