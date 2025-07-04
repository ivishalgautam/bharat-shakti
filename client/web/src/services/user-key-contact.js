import http from "@/utils/http";
const { endpoints } = require("@/utils/endpoints");

const create = async (data) => {
  return await http().post(endpoints.userKeyContacts.getAll, data);
};

const update = async (id, data) => {
  return await http().put(`${endpoints.userKeyContacts.getAll}/${id}`, data);
};

const getById = async (id) => {
  const { data } = await http().get(
    `${endpoints.userKeyContacts.getAll}/${id}`,
  );
  return data;
};

const deleteById = async (id) => {
  const { data } = await http().delete(
    `${endpoints.userKeyContacts.getAll}/${id}`,
  );
  return data;
};

const get = async () => {
  const { data } = await http().get(`${endpoints.userKeyContacts.getAll}`);
  return data;
};

const userKeyContact = {
  create: create,
  update: update,
  deleteById: deleteById,
  getById: getById,
  get: get,
};

export default userKeyContact;
