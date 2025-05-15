const { endpoints } = require("@/utils/endpoints");
const { default: http } = require("@/utils/http");

const create = async (data) => {
  return await http().post(endpoints.subcategories.getAll, data, true);
};

const update = async (id, data) => {
  return await http().put(
    `${endpoints.subcategories.getAll}/${id}`,
    data,
    true
  );
};

const deleteById = async (id) => {
  return await http().delete(`${endpoints.subcategories.getAll}/${id}`);
};

const getById = async (id) => {
  const { data } = await http().get(`${endpoints.subcategories.getAll}/${id}`);
  return data;
};

const get = async (searchParams = "") => {
  const { data } = await http().get(
    `${endpoints.subcategories.getAll}?${searchParams}`
  );
  return data;
};

const subcategory = {
  create: create,
  update: update,
  deleteById: deleteById,
  getById: getById,
  get: get,
};

export default subcategory;
