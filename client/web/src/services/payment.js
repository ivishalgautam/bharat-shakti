import http from "@/utils/http";

const { endpoints } = require("@/utils/endpoints");

const get = async (searchParams = "page=1") => {
  const { data } = await http().get(`${endpoints.payments.getAll}`);
  return data;
};
const create = async (data) => {
  return await http().post(`${endpoints.payments.getAll}`, data);
};
const verify = async (data) => {
  return await http().post(`${endpoints.payments.getAll}/verify`, data);
};

const payments = {
  create: create,
  get: get,
  verify: verify,
};

export default payments;
