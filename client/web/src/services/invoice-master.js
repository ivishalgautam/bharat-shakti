import http from "@/utils/http";
const { endpoints } = require("@/utils/endpoints");

const create = async (data) => {
  return await http().post(endpoints.invoiceMasters.getAll, data);
};

const get = async (searchParams = "") => {
  const { data } = await http().get(
    `${endpoints.invoiceMasters.getAll}?${searchParams}`,
  );
  return data;
};

const invoiceMaster = {
  create: create,
  get: get,
};

export default invoiceMaster;
