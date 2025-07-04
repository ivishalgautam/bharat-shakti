const { endpoints } = require("@/utils/endpoints");
const { default: http } = require("@/utils/http");

const get = async () => {
  const { data } = await http().get(endpoints.reports.getAll);
  return data;
};

const reports = {
  get: get,
};

export default reports;
