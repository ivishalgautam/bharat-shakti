import config from "@/config";
import http from "@/utils/http";

const { endpoints } = require("@/utils/endpoints");

const get = async (searchParams = "page=1") => {
  const { data } = await http().get(
    `${endpoints.plans.getAll}?${searchParams}`,
  );
  return data;
};

const plans = {
  get: get,
};

export default plans;
