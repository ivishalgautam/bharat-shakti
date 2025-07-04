import config from "@/config";
import http from "@/utils/http";

const { endpoints } = require("@/utils/endpoints");

const create = async (data) => {
  return await http().post(`${endpoints.wishlists.getAll}`, data);
};

const get = async (searchParams = "page=1") => {
  const { data } = await http().get(
    `${endpoints.wishlists.getAll}?${searchParams}`,
  );
  return data;
};

const deleteById = async (id) => {
  return await http().delete(`${endpoints.wishlists.getAll}/${id}`);
};

const wishlists = {
  create: create,
  get: get,
  deleteById: deleteById,
};

export default wishlists;
