const { endpoints } = require("@/utils/endpoints");
const { default: http } = require("@/utils/http");

const create = async (data) => {
  return await http().post(endpoints.plans.getAll, data);
};

const update = async (id, data) => {
  return await http().put(`${endpoints.plans.getAll}/${id}`, data);
};

const deleteById = async (id) => {
  return await http().delete(`${endpoints.plans.getAll}/${id}`);
};

const getById = async (id) => {
  const { data } = await http().get(`${endpoints.plans.getAll}/${id}`);
  return data;
};

const get = async (searchParams = "") => {
  const { data } = await http().get(
    `${endpoints.plans.getAll}?${searchParams}`
  );
  return data;
};

const plans = {
  create: create,
  update: update,
  deleteById: deleteById,
  getById: getById,
  get: get,
};

export default plans;
