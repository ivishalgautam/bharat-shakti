import http from "@/utils/http";
const { endpoints } = require("@/utils/endpoints");

const get = async (searchParams = "") => {
  const { data } = await http().get(
    `${endpoints.orderFollowups.getAll}?${searchParams}`,
  );
  return data;
};

const orderFollowup = {
  get: get,
};

export default orderFollowup;
