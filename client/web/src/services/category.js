const { endpoints } = require("@/utils/endpoints");
const { default: http } = require("@/utils/http");

const get = async () => {
  const { data } = await http().get(`${endpoints.categories.getAll}`);
  return data;
};

const category = {
  get: get,
};

export default category;
