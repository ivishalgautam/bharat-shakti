import config from "@/config";
import http from "@/utils/http";

const { endpoints } = require("@/utils/endpoints");

const create = async (data) => {
  return await http().post(`${endpoints.viewTenders.getAll}`, data);
};

const get = async (searchParams = "page=1") => {
  const { data } = await http().get(
    `${endpoints.viewTenders.getAll}?${searchParams}`,
  );
  return data;
};

const count = async () => {
  const { count } = await http().get(`${endpoints.viewTenders.getAll}/count`);
  return count;
};

const deleteById = async (id) => {
  return await http().delete(`${endpoints.viewTenders.getAll}/${id}`);
};

const viewTenders = {
  create: create,
  get: get,
  deleteById: deleteById,
  count: count,
};

export default viewTenders;
