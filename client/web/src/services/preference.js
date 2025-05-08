import http from "@/utils/http";

const { endpoints } = require("@/utils/endpoints");

const create = async (data) => {
  return await http().post(`${endpoints.preferences.getAll}`, data);
};

const get = async () => {
  const { data } = await http().get(`${endpoints.preferences.getAll}`);
  return data;
};

const preference = {
  create: create,
  get: get,
};

export default preference;
