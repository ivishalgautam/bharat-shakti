const { endpoints } = require("@/utils/endpoints");
const { default: http } = require("@/utils/http");

const create = async (data) => {
  return await http().post(endpoints.faqs.getAll, data);
};

const update = async (id, data) => {
  return await http().put(`${endpoints.faqs.getAll}/${id}`, data);
};

const deleteById = async (id) => {
  return await http().delete(`${endpoints.faqs.getAll}/${id}`);
};

const getById = async (id) => {
  const { data } = await http().get(`${endpoints.faqs.getAll}/${id}`);
  return data;
};

const get = async (searchParams = "") => {
  const { data } = await http().get(`${endpoints.faqs.getAll}?${searchParams}`);
  return data;
};

const faq = {
  create: create,
  update: update,
  deleteById: deleteById,
  getById: getById,
  get: get,
};

export default faq;
