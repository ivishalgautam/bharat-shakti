const { endpoints } = require("@/utils/endpoints");
const { default: http } = require("@/utils/http");

const create = async (data) => {
  return await http().post(endpoints.cities.getAll, data, true);
};

const update = async (id, data) => {
  return await http().put(`${endpoints.cities.getAll}/${id}`, data);
};

const deleteById = async (id) => {
  return await http().delete(`${endpoints.cities.getAll}/${id}`);
};

const getById = async (id) => {
  return await http().get(`${endpoints.cities.getAll}/${id}`);
};

const get = async (searchParams = "") => {
  return await http().get(`${endpoints.cities.getAll}?${searchParams}`);
};

const city = {
  create: create,
  update: update,
  deleteById: deleteById,
  getById: getById,
  get: get,
};

export default city;
