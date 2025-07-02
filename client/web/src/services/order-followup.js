import http from "@/utils/http";
const { endpoints } = require("@/utils/endpoints");

const get = async (searchParams = "") => {
  const { data } = await http().get(
    `${endpoints.orderFollowups.getAll}?${searchParams}`,
  );
  return data;
};

const getByApplicationId = async (id) => {
  const { data } = await http().get(`${endpoints.orderFollowups.getAll}/${id}`);
  return data;
};

const orderFollowup = {
  get: get,
  getByApplicationId: getByApplicationId,
};

export default orderFollowup;
