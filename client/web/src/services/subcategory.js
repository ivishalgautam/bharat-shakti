const { endpoints } = require("@/utils/endpoints");
const { default: http } = require("@/utils/http");

const get = async () => {
  const { data } = await http().get(`${endpoints.subcategories.getAll}`);
  return data?.subcategories ?? [];
};

const subcategory = {
  get: get,
};

export default subcategory;
