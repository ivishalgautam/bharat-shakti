const { endpoints } = require("@/utils/endpoints");
const { default: http } = require("@/utils/http");

const create = async (data) => {
  return await http().post(endpoints.states.getAll, data, true);
};

const update = async (id, data) => {
  return await http().put(`${endpoints.states.getAll}/${id}`, data, true);
};

const deleteById = async (id) => {
  return await http().delete(`${endpoints.states.getAll}/${id}`);
};

const getById = async (id) => {
  const { data } = await http().get(`${endpoints.states.getAll}/${id}`);
  return data;
};

const get = async (searchParams = "") => {
  const { data } = await http().get(
    `${endpoints.states.getAll}?${searchParams}`
  );
  return data;
};

const state = {
  create: create,
  update: update,
  deleteById: deleteById,
  getById: getById,
  get: get,
};

export default state;
