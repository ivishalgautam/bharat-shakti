const { endpoints } = require("@/utils/endpoints");
const { default: http } = require("@/utils/http");

const create = async (data) => {
  return await http().post(endpoints.keywords.getAll, data, true);
};

const update = async (id, data) => {
  return await http().put(`${endpoints.keywords.getAll}/${id}`, data);
};

const deleteById = async (id) => {
  return await http().delete(`${endpoints.keywords.getAll}/${id}`);
};

const getById = async (id) => {
  return await http().get(`${endpoints.keywords.getAll}/${id}`);
};

const get = async (searchParams = "") => {
  const { data } = await http().get(
    `${endpoints.keywords.getAll}?${searchParams}`
  );
  return data;
};

const keyword = {
  create: create,
  update: update,
  deleteById: deleteById,
  getById: getById,
  get: get,
};

export default keyword;
