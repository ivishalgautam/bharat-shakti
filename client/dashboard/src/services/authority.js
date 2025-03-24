const { endpoints } = require("@/utils/endpoints");
const { default: http } = require("@/utils/http");

const create = async (data) => {
  return await http().post(endpoints.authorities.getAll, data, true);
};

const update = async (id, data) => {
  return await http().put(`${endpoints.authorities.getAll}/${id}`, data);
};

const deleteById = async (id) => {
  return await http().delete(`${endpoints.authorities.getAll}/${id}`);
};

const getById = async (id) => {
  return await http().get(`${endpoints.authorities.getAll}/${id}`);
};

const get = async (searchParams = "") => {
  return await http().get(`${endpoints.authorities.getAll}?${searchParams}`);
};

const authority = {
  create: create,
  update: update,
  deleteById: deleteById,
  getById: getById,
  get: get,
};

export default authority;
