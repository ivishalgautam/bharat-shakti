const { endpoints } = require("@/utils/endpoints");
const { default: http } = require("@/utils/http");

const create = async (data) => {
  return await http().post(endpoints.categories.getAll, data, true);
};

const update = async (id, data) => {
  return await http().put(`${endpoints.categories.getAll}/${id}`, data, true);
};

const deleteById = async (id) => {
  return await http().delete(`${endpoints.categories.getAll}/${id}`);
};

const getById = async (id) => {
  const { data } = await http().get(`${endpoints.categories.getAll}/${id}`);
  return data;
};

const get = async (searchParams = "") => {
  const { data } = await http().get(
    `${endpoints.categories.getAll}?${searchParams}`
  );
  return data;
};

const category = {
  create: create,
  update: update,
  deleteById: deleteById,
  getById: getById,
  get: get,
};

export default category;
