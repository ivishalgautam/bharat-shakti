import http from "@/utils/http";

const { endpoints } = require("@/utils/endpoints");

const create = async (data) => {
  return await http().post(`${endpoints.applications.getAll}`, data);
};

const get = async (searchParams = "page=1") => {
  const { data } = await http().get(
    `${endpoints.applications.getAll}?${searchParams}`,
  );
  return data;
};

const deleteById = async (id) => {
  return await http().delete(`${endpoints.applications.getAll}/${id}`);
};

const application = {
  create: create,
  get: get,
  deleteById: deleteById,
};

export default application;
