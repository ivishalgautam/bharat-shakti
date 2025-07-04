import http from "@/utils/http";

const { endpoints } = require("@/utils/endpoints");

const create = async (data) => {
  return await http().post(`${endpoints.preferences.getAll}`, data);
};

const update = async (id, data) => {
  return await http().put(`${endpoints.preferences.getAll}/${id}`, data);
};

const get = async () => {
  const { data } = await http().get(`${endpoints.preferences.getAll}`);
  return data;
};

const getById = async (id) => {
  const { data } = await http().get(`${endpoints.preferences.getAll}/${id}`);
  return data;
};

const preference = {
  create: create,
  update: update,
  get: get,
  getById: getById,
};

export default preference;
