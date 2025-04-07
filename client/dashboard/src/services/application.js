const { endpoints } = require("@/utils/endpoints");
const { default: http } = require("@/utils/http");

const create = async (data) => {
  return await http().post(endpoints.applications.getAll, data);
};

const update = async (id, data) => {
  return await http().put(`${endpoints.applications.getAll}/${id}`, data);
};

const deleteById = async (id) => {
  return await http().delete(`${endpoints.applications.getAll}/${id}`);
};

const getById = async (id) => {
  const { data } = await http().get(`${endpoints.applications.getAll}/${id}`);
  return data;
};

const get = async (searchParams = "") => {
  const { data } = await http().get(
    `${endpoints.applications.getAll}?${searchParams}`
  );
  return data;
};

const application = {
  create: create,
  update: update,
  deleteById: deleteById,
  getById: getById,
  get: get,
};

export default application;
