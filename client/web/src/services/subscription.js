import http from "@/utils/http";

const { endpoints } = require("@/utils/endpoints");

const get = async (searchParams = "page=1") => {
  const { data } = await http().get(`${endpoints.subscriptions.getAll}`);
  return data;
};
const create = async (data) => {
  return await http().post(`${endpoints.subscriptions.getAll}`, data);
};

const subscriptions = {
  create: create,
  get: get,
};

export default subscriptions;
